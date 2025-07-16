import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface PhonePePaymentRequest {
  orderId: string;
  amount: number;
  customerName: string;
  customerPhone: string;
  customerEmail?: string;
  redirectUrl: string;
  callbackUrl: string;
}

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const {
      orderId,
      amount,
      customerName,
      customerPhone,
      customerEmail,
      redirectUrl,
      callbackUrl
    }: PhonePePaymentRequest = await req.json();

    // Validate required fields
    if (!orderId || !amount || !customerName || !customerPhone) {
      return new Response(JSON.stringify({ error: "Missing required fields" }), {
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

    // Generate unique transaction ID
    const transactionId = `TXN${Date.now()}${Math.random().toString(36).substr(2, 9)}`;

    // Create PhonePe payment request
    const paymentRequest = {
      merchantId: merchantId,
      merchantTransactionId: transactionId,
      merchantUserId: `USER${Date.now()}`,
      amount: Math.round(amount * 100), // Convert to paise
      redirectUrl: redirectUrl,
      redirectMode: "REDIRECT",
      callbackUrl: callbackUrl,
      mobileNumber: customerPhone,
      paymentInstrument: {
        type: "PAY_PAGE"
      }
    };

    // Encode payload
    const payloadString = JSON.stringify(paymentRequest);
    const payloadBase64 = btoa(payloadString);

    // Generate checksum
    const checksumString = payloadBase64 + "/pg/v1/pay" + saltKey;
    const checksum = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(checksumString));
    const checksumHex = Array.from(new Uint8Array(checksum))
      .map(b => b.toString(16).padStart(2, '0'))
      .join('');
    const finalChecksum = checksumHex + "###" + saltIndex;

    // Make request to PhonePe
    const phonePeResponse = await fetch(`${baseUrl}/pg/v1/pay`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-VERIFY": finalChecksum,
        "Accept": "application/json"
      },
      body: JSON.stringify({
        request: payloadBase64
      })
    });

    if (!phonePeResponse.ok) {
      const errorText = await phonePeResponse.text();
      console.error("PhonePe API error:", errorText);
      throw new Error(`PhonePe API error: ${phonePeResponse.status}`);
    }

    const phonePeResult = await phonePeResponse.json();

    if (phonePeResult.success) {
      // Create Supabase client
      const supabase = createClient(
        Deno.env.get("SUPABASE_URL") ?? "",
        Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "",
        { auth: { persistSession: false } }
      );

      // Update order with transaction details
      await supabase
        .from('orders')
        .update({
          gateway_transaction_id: transactionId,
          gateway_response: phonePeResult
        })
        .eq('id', orderId);

      console.log(`PhonePe payment initiated successfully for order ${orderId}`);

      return new Response(JSON.stringify({
        success: true,
        paymentUrl: phonePeResult.data.instrumentResponse.redirectInfo.url,
        transactionId: transactionId,
        message: "Payment initiated successfully"
      }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 200,
      });
    } else {
      throw new Error(phonePeResult.message || "Payment initiation failed");
    }

  } catch (error) {
    console.error("Error creating PhonePe payment:", error);
    return new Response(JSON.stringify({
      error: "Payment initiation failed",
      details: error instanceof Error ? error.message : "Unknown error"
    }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 500,
    });
  }
});