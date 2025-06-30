
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    )

    const { webhook_id, approval_status, rejection_reason } = await req.json()
    
    console.log('Received product approval webhook:', { webhook_id, approval_status })

    // Update product approval record
    const { data: approval, error: approvalError } = await supabaseClient
      .from('product_approvals')
      .update({
        approval_status,
        approved_at: approval_status === 'approved' ? new Date().toISOString() : null,
        rejected_at: approval_status === 'rejected' ? new Date().toISOString() : null,
        rejection_reason: approval_status === 'rejected' ? rejection_reason : null,
      })
      .eq('webhook_id', webhook_id)
      .select('meat_product_id')
      .single()

    if (approvalError) {
      console.error('Error updating product approval:', approvalError)
      throw approvalError
    }

    // Update product status
    if (approval?.meat_product_id) {
      const { error: productError } = await supabaseClient
        .from('meat_products')
        .update({
          approval_status,
          approved_at: approval_status === 'approved' ? new Date().toISOString() : null,
        })
        .eq('id', approval.meat_product_id)

      if (productError) {
        console.error('Error updating product status:', productError)
        throw productError
      }
    }

    return new Response(
      JSON.stringify({ success: true, message: 'Product approval updated successfully' }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      }
    )
  } catch (error) {
    console.error('Webhook error:', error)
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 400,
      }
    )
  }
})
