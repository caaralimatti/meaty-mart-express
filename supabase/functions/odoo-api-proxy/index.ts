
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

    const ODOO_URL = Deno.env.get('ODOO_URL')
    if (!ODOO_URL) {
      throw new Error('Odoo URL is not configured in Supabase secrets.')
    }
    
    // For authentication calls, inject credentials from secrets
    if (odoo_endpoint === '/web/session/authenticate') {
        const ODOO_DB = Deno.env.get('ODOO_DB')
        const ODOO_USERNAME = Deno.env.get('ODOO_USERNAME')
        const ODOO_PASSWORD = Deno.env.get('ODOO_PASSWORD')

        if (!ODOO_DB || !ODOO_USERNAME || !ODOO_PASSWORD) {
            throw new Error('Odoo credentials for auth are not configured in Supabase secrets.')
        }
        
        if (data && data.params) {
            data.params.db = ODOO_DB;
            data.params.login = ODOO_USERNAME;
            data.params.password = ODOO_PASSWORD;
        }
    }

    const odooUrl = `${ODOO_URL}${odoo_endpoint}`;
    
    const headers: Record<string, string> = {
        'Content-Type': 'application/json',
    };

    if (session_id) {
        headers['Cookie'] = `session_id=${session_id}`;
    }

    const requestOptions: RequestInit = {
        method: 'POST',
        headers,
        body: JSON.stringify(data),
    };
    
    const odooResponse = await fetch(odooUrl, requestOptions);
    const odooResponseData = await odooResponse.json();

    if (odooResponseData.error) {
         console.error(`Odoo API Error for endpoint ${odoo_endpoint}:`, odooResponseData.error);
    }

    return new Response(JSON.stringify(odooResponseData), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: odooResponse.status,
    })
  } catch (error) {
    console.error('Proxy Error:', error.message);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })
  }
})
