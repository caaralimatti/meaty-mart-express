import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { transactionId } = await req.json();

    if (!transactionId) {
      return new Response(JSON.stringify({ error: "Transaction ID is required" }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 400,
      });
    }

    // Get PhonePe configuration from environment
    const merchantId = Deno.env.get("PHONEPE_MERCHANT_ID");
    const saltKey = Deno.env.get("PHONEPE_SALT_KEY");
    const saltIndex = Deno.env.get("PHONEPE_SALT_INDEX") || "1";
    const baseUrl = Deno.env.get("PHONEPE_BASE_URL") || "https://api-preprod.phonepe.com/apis/pg-sandbox";

    if (!merchantId || !saltKey) {
      return new Response(JSON.stringify({ error: "PhonePe configuration not found" }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 500,
      });
    }

    // Generate checksum for status check
    const checksumString = `/pg/v1/status/${merchantId}/${transactionId}` + saltKey;
    const checksum = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(checksumString));
    const checksumHex = Array.from(new Uint8Array(checksum))
      .map(b => b.toString(16).padStart(2, '0'))
      .join('');
    const finalChecksum = checksumHex + "###" + saltIndex;

    // Make status check request to PhonePe
    const phonePeResponse = await fetch(`${baseUrl}/pg/v1/status/${merchantId}/${transactionId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "X-VERIFY": finalChecksum,
        "X-MERCHANT-ID": merchantId,
        "Accept": "application/json"
      }
    });

    if (!phonePeResponse.ok) {
      const errorText = await phonePeResponse.text();
      console.error("PhonePe status check error:", errorText);
      throw new Error(`PhonePe status check error: ${phonePeResponse.status}`);
    }

    const phonePeResult = await phonePeResponse.json();

    // Create Supabase client
    const supabase = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "",
      { auth: { persistSession: false } }
    );

    // Update payment status in database
    if (phonePeResult.success && phonePeResult.data) {
      const paymentStatus = phonePeResult.data.state;
      const isSuccessful = paymentStatus === 'COMPLETED';

      // Update payment record
      await supabase
        .from('payments')
        .update({
          status: isSuccessful ? 'paid' : 'failed',
          gateway_response: phonePeResult,
          updated_at: new Date().toISOString()
        })
        .eq('gateway_transaction_id', transactionId);

      // Update order status
      await supabase
        .from('orders')
        .update({
          payment_status: isSuccessful ? 'paid' : 'failed',
          status: isSuccessful ? 'confirmed' : 'cancelled',
          updated_at: new Date().toISOString()
        })
        .eq('gateway_transaction_id', transactionId);

      // Send SMS notification if payment successful
      if (isSuccessful) {
        try {
          // Get order details for SMS
          const { data: order } = await supabase
            .from('orders')
            .select(`
              *,
              customers!inner (
                full_name,
                phone_number
              )
            `)
            .eq('gateway_transaction_id', transactionId)
            .single();

          if (order && order.customers) {
            await supabase.functions.invoke('send-order-confirmation-sms', {
              body: {
                phoneNumber: order.customers.phone_number,
                orderNumber: order.order_number,
                customerName: order.customers.full_name,
                amount: order.total_amount
              }
            });
          }
        } catch (smsError) {
          console.error('SMS notification error:', smsError);
          // Don't fail the payment verification if SMS fails
        }
      }

      console.log(`Payment verification completed for transaction ${transactionId}: ${paymentStatus}`);

      return new Response(JSON.stringify({
        success: true,
        status: paymentStatus,
        transactionId: transactionId,
        data: phonePeResult.data,
        message: isSuccessful ? "Payment verified successfully" : "Payment failed"
      }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 200,
      });
    } else {
      throw new Error(phonePeResult.message || "Payment verification failed");
    }

  } catch (error) {
    console.error("Error verifying PhonePe payment:", error);
    return new Response(JSON.stringify({
      error: "Payment verification failed",
      details: error instanceof Error ? error.message : "Unknown error"
    }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 500,
    });
  }
});