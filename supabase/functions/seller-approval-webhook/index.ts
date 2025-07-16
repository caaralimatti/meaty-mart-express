
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type, x-api-key',
}

interface SellerApprovalPayload {
  seller_id: string;
  is_approved: boolean;
  rejection_reason?: string;
  updated_at: string;
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    // API Key authentication
    const apiKey = req.headers.get("x-api-key");
    const expectedApiKey = Deno.env.get("WEBHOOK_API_KEY");
    
    if (!apiKey || apiKey !== expectedApiKey) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 401,
      });
    }

    const payload: SellerApprovalPayload = await req.json();
    
    // Validate required fields
    if (!payload.seller_id || typeof payload.is_approved !== "boolean") {
      return new Response(JSON.stringify({ error: "Missing required fields: seller_id, is_approved" }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 400,
      });
    }

    // Create Supabase client with service role key
    const supabase = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "",
      { auth: { persistSession: false } }
    );

    // Find seller by ID
    const { data: seller, error: sellerError } = await supabase
      .from("sellers")
      .select("*")
      .eq("id", payload.seller_id)
      .single();

    if (sellerError || !seller) {
      return new Response(JSON.stringify({ error: "Seller not found" }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 404,
      });
    }

    // Update seller approval status
    const { error: updateError } = await supabase
      .from("sellers")
      .update({
        approval_status: payload.is_approved ? "approved" : "rejected",
        approved_at: payload.is_approved ? new Date().toISOString() : null,
        updated_at: new Date().toISOString(),
      })
      .eq("id", payload.seller_id);

    if (updateError) {
      throw updateError;
    }

    // Update seller_approvals table
    const { error: approvalError } = await supabase
      .from("seller_approvals")
      .upsert({
        seller_id: payload.seller_id,
        approval_status: payload.is_approved ? "approved" : "rejected",
        approved_at: payload.is_approved ? new Date().toISOString() : null,
        rejected_at: payload.is_approved ? null : new Date().toISOString(),
        rejection_reason: payload.rejection_reason || null,
        updated_at: new Date().toISOString(),
      });

    if (approvalError) {
      throw approvalError;
    }

    console.log(`Seller ${payload.seller_id} approval status updated to: ${payload.is_approved ? 'approved' : 'rejected'}`);

    return new Response(JSON.stringify({ 
      success: true, 
      message: `Seller approval status updated successfully`,
      seller_id: payload.seller_id,
      status: payload.is_approved ? "approved" : "rejected"
    }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 200,
    });

  } catch (error) {
    console.error("Error in seller approval webhook:", error);
    return new Response(JSON.stringify({ error: "Internal server error" }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 500,
    });
  }
})
