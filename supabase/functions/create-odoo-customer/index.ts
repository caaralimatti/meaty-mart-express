import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface CreateCustomerRequest {
  name: string;
  phone: string;
  email?: string;
  address?: string;
  customer_id: string;
}

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { name, phone, email, address, customer_id }: CreateCustomerRequest = await req.json();

    if (!name || !phone || !customer_id) {
      return new Response(JSON.stringify({ error: "Missing required fields" }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 400,
      });
    }

    // Load Odoo configuration
    const odooUrl = Deno.env.get("ODOO_URL");
    const odooDb = Deno.env.get("ODOO_DB");
    const odooUsername = Deno.env.get("ODOO_USERNAME");
    const odooPassword = Deno.env.get("ODOO_PASSWORD");

    if (!odooUrl || !odooDb || !odooUsername || !odooPassword) {
      console.error("Missing Odoo configuration");
      return new Response(JSON.stringify({ error: "Odoo configuration not found" }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 500,
      });
    }

    // Create Odoo customer
    const createCustomerPayload = {
      jsonrpc: "2.0",
      method: "call",
      params: {
        service: "object",
        method: "execute_kw",
        args: [
          odooDb,
          parseInt(Deno.env.get("ODOO_USER_ID") || "1"),
          odooPassword,
          "res.partner",
          "create",
          [{
            name: name,
            phone: phone,
            email: email || null,
            street: address || null,
            is_company: false,
            customer_rank: 1,
            supplier_rank: 0,
            category_id: [[6, 0, []]] // Empty category
          }]
        ]
      },
      id: Math.random()
    };

    const odooResponse = await fetch(`${odooUrl}/jsonrpc`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(createCustomerPayload),
    });

    if (!odooResponse.ok) {
      throw new Error(`Odoo API error: ${odooResponse.status}`);
    }

    const odooResult = await odooResponse.json();
    
    if (odooResult.error) {
      console.error("Odoo error:", odooResult.error);
      throw new Error(`Odoo error: ${odooResult.error.message}`);
    }

    const odooCustomerId = odooResult.result;

    // Update customer record with Odoo ID
    const supabase = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "",
      { auth: { persistSession: false } }
    );

    const { error: updateError } = await supabase
      .from('customers')
      .update({ 
        odoo_partner_id: odooCustomerId,
        updated_at: new Date().toISOString()
      })
      .eq('user_id', customer_id);

    if (updateError) {
      console.error("Error updating customer with Odoo ID:", updateError);
      // Don't fail the request if Supabase update fails
    }

    console.log(`Customer created in Odoo with ID: ${odooCustomerId}`);

    return new Response(JSON.stringify({ 
      success: true, 
      odoo_partner_id: odooCustomerId,
      message: "Customer created successfully in Odoo"
    }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 200,
    });

  } catch (error) {
    console.error("Error creating Odoo customer:", error);
    return new Response(JSON.stringify({ 
      error: "Failed to create customer in Odoo",
      details: error instanceof Error ? error.message : "Unknown error"
    }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 500,
    });
  }
});