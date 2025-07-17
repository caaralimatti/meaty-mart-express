
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type, x-api-key',
}

interface ProductApprovalPayload {
  product_id: string;
  seller_id: string;
  product_type: 'meat' | 'livestock';
  approval_status: "approved" | "rejected" | "pending";
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

    const payload: ProductApprovalPayload = await req.json();
    
    // Validate required fields
    if (!payload.product_id || !payload.seller_id || !payload.product_type || !payload.approval_status) {
      return new Response(JSON.stringify({ error: "Missing required fields: product_id, seller_id, product_type, approval_status" }), {
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

    // Verify seller exists
    const { data: seller, error: sellerError } = await supabase
      .from("sellers")
      .select("id")
      .eq("id", payload.seller_id)
      .single();

    if (sellerError || !seller) {
      return new Response(JSON.stringify({ error: "Seller not found" }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 404,
      });
    }

    let productTable: string;
    let approvalTable: string;
    
    if (payload.product_type === 'meat') {
      productTable = 'meat_products';
      approvalTable = 'product_approvals';
    } else {
      productTable = 'livestock_listings';
      approvalTable = 'livestock_approvals';
    }

    // Find and update product
    const { data: product, error: productError } = await supabase
      .from(productTable)
      .select("*")
      .eq("id", payload.product_id)
      .eq("seller_id", payload.seller_id)
      .single();

    if (productError || !product) {
      return new Response(JSON.stringify({ error: "Product not found or doesn't belong to seller" }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 404,
      });
    }

    // Update product approval status
    const { error: updateError } = await supabase
      .from(productTable)
      .update({
        approval_status: payload.approval_status,
        approved_at: payload.approval_status === "approved" ? new Date().toISOString() : null,
        updated_at: new Date().toISOString(),
      })
      .eq("id", payload.product_id);

    if (updateError) {
      throw updateError;
    }

    // Update approval table
    const approvalData = {
      approval_status: payload.approval_status,
      approved_at: payload.approval_status === "approved" ? new Date().toISOString() : null,
      rejected_at: payload.approval_status === "rejected" ? new Date().toISOString() : null,
      rejection_reason: payload.rejection_reason || null,
      updated_at: new Date().toISOString(),
    };

    if (payload.product_type === 'meat') {
      await supabase
        .from(approvalTable)
        .upsert({
          ...approvalData,
          meat_product_id: payload.product_id,
        });
    } else {
      await supabase
        .from(approvalTable)
        .upsert({
          ...approvalData,
          livestock_listing_id: payload.product_id,
        });
    }

    console.log(`${payload.product_type} product ${payload.product_id} approval status updated to: ${payload.approval_status}`);

    return new Response(JSON.stringify({ 
      success: true, 
      message: `Product approval status updated successfully`,
      product_id: payload.product_id,
      product_type: payload.product_type,
      status: payload.approval_status
    }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 200,
    });

  } catch (error) {
    console.error("Error in product approval webhook:", error);
    return new Response(JSON.stringify({ error: "Internal server error" }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 500,
    });
  }
})
