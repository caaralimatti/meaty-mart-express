
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
    
    console.log('Received seller approval webhook:', { webhook_id, approval_status })

    // Update seller approval record
    const { data: approval, error: approvalError } = await supabaseClient
      .from('seller_approvals')
      .update({
        approval_status,
        approved_at: approval_status === 'approved' ? new Date().toISOString() : null,
        rejected_at: approval_status === 'rejected' ? new Date().toISOString() : null,
        rejection_reason: approval_status === 'rejected' ? rejection_reason : null,
      })
      .eq('webhook_id', webhook_id)
      .select('seller_id')
      .single()

    if (approvalError) {
      console.error('Error updating seller approval:', approvalError)
      throw approvalError
    }

    // Update seller status
    if (approval?.seller_id) {
      const { error: sellerError } = await supabaseClient
        .from('sellers')
        .update({
          approval_status,
          approved_at: approval_status === 'approved' ? new Date().toISOString() : null,
        })
        .eq('id', approval.seller_id)

      if (sellerError) {
        console.error('Error updating seller status:', sellerError)
        throw sellerError
      }
    }

    return new Response(
      JSON.stringify({ success: true, message: 'Seller approval updated successfully' }),
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
