import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  if (req.method !== "POST") {
    return new Response(
      JSON.stringify({ error: "Method not allowed" }),
      { 
        status: 405,
        headers: { ...corsHeaders, "Content-Type": "application/json" }
      }
    );
  }

  try {
    const { customerId, address, lat, lng } = await req.json();

    // Validate required fields
    if (!customerId || !address) {
      return new Response(
        JSON.stringify({ error: "Customer ID and address are required" }),
        { 
          status: 400,
          headers: { ...corsHeaders, "Content-Type": "application/json" }
        }
      );
    }

    // Create Supabase client
    const supabase = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? ""
    );

    // Update customer location
    const { data, error } = await supabase
      .from("customers")
      .update({
        address: address,
        location_latitude: lat || null,
        location_longitude: lng || null,
        updated_at: new Date().toISOString()
      })
      .eq("id", customerId)
      .select();

    if (error) {
      console.error("Database error:", error);
      return new Response(
        JSON.stringify({ error: "Failed to save location" }),
        { 
          status: 500,
          headers: { ...corsHeaders, "Content-Type": "application/json" }
        }
      );
    }

    if (!data || data.length === 0) {
      return new Response(
        JSON.stringify({ error: "Customer not found" }),
        { 
          status: 404,
          headers: { ...corsHeaders, "Content-Type": "application/json" }
        }
      );
    }

    // Log the location update in audit trail
    const auditData = {
      customer_id: customerId,
      field_name: "delivery_location",
      old_value: null, // Could fetch previous value if needed
      new_value: JSON.stringify({ address, lat, lng }),
      change_reason: "Location updated by customer",
      changed_by: null // Could be set to customer's user_id if available
    };

    // Insert audit record (non-blocking)
    supabase
      .from("customer_profile_audit")
      .insert(auditData)
      .then(({ error: auditError }) => {
        if (auditError) {
          console.error("Audit log error:", auditError);
        }
      });

    console.log(`Location saved for customer ${customerId}: ${address}`);

    return new Response(
      JSON.stringify({ 
        success: true, 
        message: "Location saved successfully",
        data: data[0]
      }),
      { 
        status: 200,
        headers: { ...corsHeaders, "Content-Type": "application/json" }
      }
    );

  } catch (error) {
    console.error("Error in save-customer-location function:", error);
    return new Response(
      JSON.stringify({ error: "Internal server error" }),
      { 
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" }
      }
    );
  }
});