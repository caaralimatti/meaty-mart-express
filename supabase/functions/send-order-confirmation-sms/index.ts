import { serve } from "https://deno.land/std@0.190.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface SMSRequest {
  phoneNumber: string;
  orderNumber: string;
  customerName: string;
  amount: number;
}

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { phoneNumber, orderNumber, customerName, amount }: SMSRequest = await req.json();

    if (!phoneNumber || !orderNumber || !customerName || !amount) {
      return new Response(JSON.stringify({ error: "Missing required fields" }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 400,
      });
    }

    // Get Fast2SMS API key from environment
    const apiKey = Deno.env.get("FAST2SMS_API_KEY");
    if (!apiKey) {
      return new Response(JSON.stringify({ error: "Fast2SMS API key not configured" }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 500,
      });
    }

    // Clean phone number (remove +91 if present)
    const cleanPhoneNumber = phoneNumber.replace(/^\+91/, '');

    // Create SMS message
    const message = `Dear ${customerName}, your Meaty Mart order ${orderNumber} worth ₹${amount.toFixed(2)} has been confirmed! We'll notify you when it's ready for delivery. Thank you for choosing us!`;

    // Send SMS using Fast2SMS
    const smsResponse = await fetch("https://www.fast2sms.com/dev/bulkV2", {
      method: "POST",
      headers: {
        "Authorization": apiKey,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        route: "v3",
        sender_id: "MEATYMART",
        message: message,
        language: "english",
        flash: 0,
        numbers: cleanPhoneNumber,
      }),
    });

    if (!smsResponse.ok) {
      const errorText = await smsResponse.text();
      console.error("Fast2SMS API error:", errorText);
      throw new Error(`Fast2SMS API error: ${smsResponse.status}`);
    }

    const smsResult = await smsResponse.json();

    if (smsResult.return) {
      console.log(`Order confirmation SMS sent successfully to ${cleanPhoneNumber} for order ${orderNumber}`);
      
      return new Response(JSON.stringify({
        success: true,
        message: "Order confirmation SMS sent successfully",
        smsId: smsResult.message_id,
        orderNumber: orderNumber
      }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 200,
      });
    } else {
      throw new Error(smsResult.message || "SMS sending failed");
    }

  } catch (error) {
    console.error("Error sending order confirmation SMS:", error);
    return new Response(JSON.stringify({
      error: "SMS sending failed",
      details: error instanceof Error ? error.message : "Unknown error"
    }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 500,
    });
  }
});