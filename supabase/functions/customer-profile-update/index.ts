import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    );

    const { customerId, updates, changeReason } = await req.json();

    if (!customerId || !updates) {
      return new Response(
        JSON.stringify({ error: 'Customer ID and updates are required' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Get current customer data for audit trail
    const { data: currentData, error: fetchError } = await supabaseClient
      .from('customers')
      .select('*')
      .eq('id', customerId)
      .single();

    if (fetchError) {
      console.error('Error fetching current customer data:', fetchError);
      return new Response(
        JSON.stringify({ error: 'Failed to fetch customer data' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Update customer profile
    const { error: updateError } = await supabaseClient
      .from('customers')
      .update({
        ...updates,
        updated_at: new Date().toISOString()
      })
      .eq('id', customerId);

    if (updateError) {
      console.error('Error updating customer profile:', updateError);
      return new Response(
        JSON.stringify({ error: 'Failed to update customer profile' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Create audit log entries for changed fields
    const auditEntries = [];
    for (const [field, newValue] of Object.entries(updates)) {
      const oldValue = currentData[field];
      
      // Only log if value actually changed
      if (oldValue !== newValue) {
        auditEntries.push({
          customer_id: customerId,
          changed_by: currentData.user_id,
          field_name: field,
          old_value: oldValue ? String(oldValue) : null,
          new_value: newValue ? String(newValue) : null,
          change_reason: changeReason || 'Profile update'
        });
      }
    }

    // Insert audit entries if any changes were made
    if (auditEntries.length > 0) {
      const { error: auditError } = await supabaseClient
        .from('customer_profile_audit')
        .insert(auditEntries);

      if (auditError) {
        console.error('Error creating audit log:', auditError);
        // Don't fail the update if audit logging fails
      }
    }

    return new Response(
      JSON.stringify({ success: true, changesLogged: auditEntries.length }),
      { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Error in customer-profile-update function:', error);
    return new Response(
      JSON.stringify({ error: 'Internal server error' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});