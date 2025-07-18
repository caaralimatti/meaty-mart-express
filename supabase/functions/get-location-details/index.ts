import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const GOOGLE_MAPS_API_KEY = Deno.env.get("GOOGLE_MAPS_API_KEY");

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
    const { lat, lng, address, type } = await req.json();

    if (!GOOGLE_MAPS_API_KEY) {
      console.error("Google Maps API key not found in environment variables");
      return new Response(
        JSON.stringify({ error: "Google Maps API key not configured" }),
        { 
          status: 500,
          headers: { ...corsHeaders, "Content-Type": "application/json" }
        }
      );
    }

    let url = "";
    
    if (type === "reverse") {
      // Reverse geocoding: coordinates to address
      if (!lat || !lng) {
        return new Response(
          JSON.stringify({ error: "Latitude and longitude are required for reverse geocoding" }),
          { 
            status: 400,
            headers: { ...corsHeaders, "Content-Type": "application/json" }
          }
        );
      }
      
      url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${GOOGLE_MAPS_API_KEY}`;
    } else if (type === "geocode") {
      // Geocoding: address to coordinates
      if (!address) {
        return new Response(
          JSON.stringify({ error: "Address is required for geocoding" }),
          { 
            status: 400,
            headers: { ...corsHeaders, "Content-Type": "application/json" }
          }
        );
      }
      
      const encodedAddress = encodeURIComponent(address);
      url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}&key=${GOOGLE_MAPS_API_KEY}`;
    } else {
      return new Response(
        JSON.stringify({ error: "Invalid type. Use 'reverse' or 'geocode'" }),
        { 
          status: 400,
          headers: { ...corsHeaders, "Content-Type": "application/json" }
        }
      );
    }

    console.log(`Making request to Google Maps API: ${url}`);
    
    const response = await fetch(url);
    const data = await response.json();

    if (data.status !== "OK") {
      console.error("Google Maps API error:", data.error_message || data.status);
      return new Response(
        JSON.stringify({ error: data.error_message || "Geocoding failed" }),
        { 
          status: 400,
          headers: { ...corsHeaders, "Content-Type": "application/json" }
        }
      );
    }

    if (!data.results || data.results.length === 0) {
      return new Response(
        JSON.stringify({ error: "No results found" }),
        { 
          status: 404,
          headers: { ...corsHeaders, "Content-Type": "application/json" }
        }
      );
    }

    const result = data.results[0];
    
    if (type === "reverse") {
      // Return the formatted address
      return new Response(
        JSON.stringify({ 
          address: result.formatted_address,
          components: result.address_components 
        }),
        { 
          status: 200,
          headers: { ...corsHeaders, "Content-Type": "application/json" }
        }
      );
    } else {
      // Return the coordinates
      const location = result.geometry.location;
      return new Response(
        JSON.stringify({ 
          coordinates: {
            lat: location.lat,
            lng: location.lng
          },
          formatted_address: result.formatted_address,
          components: result.address_components
        }),
        { 
          status: 200,
          headers: { ...corsHeaders, "Content-Type": "application/json" }
        }
      );
    }

  } catch (error) {
    console.error("Error in get-location-details function:", error);
    return new Response(
      JSON.stringify({ error: "Internal server error" }),
      { 
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" }
      }
    );
  }
});