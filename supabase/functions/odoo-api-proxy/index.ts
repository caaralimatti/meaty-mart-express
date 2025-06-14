
import { serve } from 'https://deno.land/std@0.177.0/http/server.ts'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const { odoo_endpoint, data, session_id } = await req.json()
    console.log('Proxy request:', { odoo_endpoint, data, session_id })

    const ODOO_URL = Deno.env.get('ODOO_URL')
    const ODOO_DB = Deno.env.get('ODOO_DB')
    const ODOO_USERNAME = Deno.env.get('ODOO_USERNAME')
    const ODOO_PASSWORD = Deno.env.get('ODOO_PASSWORD')

    if (!ODOO_URL) {
      throw new Error('ODOO_URL is not configured in Supabase secrets.')
    }

    if (!ODOO_DB || !ODOO_USERNAME || !ODOO_PASSWORD) {
      throw new Error('Odoo credentials (ODOO_DB, ODOO_USERNAME, ODOO_PASSWORD) are not configured in Supabase secrets.')
    }
    
    // Handle different authentication endpoints
    if (odoo_endpoint === '/web/session/authenticate') {
      console.log('Handling web session authentication')
      if (data && data.params) {
        data.params.db = ODOO_DB;
        data.params.login = ODOO_USERNAME;
        data.params.password = ODOO_PASSWORD;
      }
    } else if (odoo_endpoint === '/xmlrpc/2/common') {
      console.log('Handling XML-RPC common authentication')
      if (data && data.params && data.params.args) {
        data.params.args[0] = ODOO_DB;
        data.params.args[1] = ODOO_USERNAME;
        data.params.args[2] = ODOO_PASSWORD;
      }
    }

    // Construct the full Odoo URL
    let odooUrl = ODOO_URL;
    if (!odooUrl.endsWith('/')) {
      odooUrl += '/';
    }
    odooUrl += odoo_endpoint.startsWith('/') ? odoo_endpoint.substring(1) : odoo_endpoint;
    
    console.log('Making request to:', odooUrl);
    
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      'User-Agent': 'Lovable-Odoo-Integration/1.0',
    };

    // Add session cookie if available
    if (session_id && session_id !== 'authenticated') {
      headers['Cookie'] = `session_id=${session_id}`;
    }

    const requestOptions: RequestInit = {
      method: 'POST',
      headers,
      body: JSON.stringify(data),
    };
    
    console.log('Request options:', requestOptions);
    
    const odooResponse = await fetch(odooUrl, requestOptions);
    console.log('Odoo response status:', odooResponse.status);
    
    let odooResponseData;
    try {
      odooResponseData = await odooResponse.json();
    } catch (parseError) {
      console.error('Failed to parse Odoo response as JSON:', parseError);
      const textResponse = await odooResponse.text();
      console.log('Raw response:', textResponse);
      throw new Error(`Invalid JSON response from Odoo: ${textResponse.substring(0, 200)}`);
    }

    console.log('Odoo response data:', odooResponseData);

    // Check for Odoo errors
    if (odooResponseData.error) {
      console.error(`Odoo API Error for endpoint ${odoo_endpoint}:`, odooResponseData.error);
      // Don't throw here, let the client handle the error
    }

    // Extract session cookies from response headers if present
    const setCookieHeader = odooResponse.headers.get('set-cookie');
    if (setCookieHeader) {
      console.log('Set-Cookie header:', setCookieHeader);
      const sessionMatch = setCookieHeader.match(/session_id=([^;]+)/);
      if (sessionMatch && odooResponseData.result) {
        odooResponseData.result.session_id = sessionMatch[1];
      }
    }

    return new Response(JSON.stringify(odooResponseData), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: odooResponse.status,
    })
  } catch (error) {
    console.error('Proxy Error:', error);
    return new Response(JSON.stringify({ 
      error: { 
        message: error.message,
        type: 'proxy_error',
        details: error.toString()
      } 
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })
  }
})
