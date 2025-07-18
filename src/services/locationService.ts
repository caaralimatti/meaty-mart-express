import { supabase } from '@/integrations/supabase/client';

// Global variable to track if Google Maps API is loaded
let isGoogleMapsLoaded = false;
let googleMapsPromise: Promise<void> | null = null;

export const locationService = {
  async loadGoogleMapsAPI(): Promise<void> {
    if (isGoogleMapsLoaded) return;
    
    if (googleMapsPromise) {
      return googleMapsPromise;
    }
    
    googleMapsPromise = new Promise<void>((resolve, reject) => {
      // Check if Google Maps is already loaded
      if ((window as any).google && (window as any).google.maps) {
        isGoogleMapsLoaded = true;
        resolve();
        return;
      }
      
      // Create script element
      const script = document.createElement('script');
      script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyADassC7VpWzhXLyqKB0iGISTjVngGlvKI&libraries=places`;
      script.async = true;
      script.defer = true;
      
      script.onload = () => {
        isGoogleMapsLoaded = true;
        resolve();
      };
      
      script.onerror = () => {
        reject(new Error('Failed to load Google Maps API'));
      };
      
      document.head.appendChild(script);
    });
    
    return googleMapsPromise;
  },

  async reverseGeocode(lat: number, lng: number): Promise<string | null> {
    try {
      const { data, error } = await supabase.functions.invoke('get-location-details', {
        body: { lat, lng, type: 'reverse' }
      });
      
      if (error) throw error;
      
      return data?.address || null;
    } catch (error) {
      console.error('Reverse geocoding error:', error);
      
      // Fallback to direct Google Maps API call
      try {
        await this.loadGoogleMapsAPI();
        const geocoder = new (window as any).google.maps.Geocoder();
        
        return new Promise((resolve) => {
          geocoder.geocode({ location: { lat, lng } }, (results: any, status: any) => {
            if (status === 'OK' && results && results[0]) {
              resolve(results[0].formatted_address);
            } else {
              resolve(null);
            }
          });
        });
      } catch (fallbackError) {
        console.error('Fallback geocoding failed:', fallbackError);
        return null;
      }
    }
  },

  async geocodeAddress(address: string): Promise<{ lat: number; lng: number } | null> {
    try {
      const { data, error } = await supabase.functions.invoke('get-location-details', {
        body: { address, type: 'geocode' }
      });
      
      if (error) throw error;
      
      return data?.coordinates || null;
    } catch (error) {
      console.error('Geocoding error:', error);
      
      // Fallback to direct Google Maps API call
      try {
        await this.loadGoogleMapsAPI();
        const geocoder = new (window as any).google.maps.Geocoder();
        
        return new Promise((resolve) => {
          geocoder.geocode({ address }, (results: any, status: any) => {
            if (status === 'OK' && results && results[0]) {
              const location = results[0].geometry.location;
              resolve({
                lat: location.lat(),
                lng: location.lng()
              });
            } else {
              resolve(null);
            }
          });
        });
      } catch (fallbackError) {
        console.error('Fallback geocoding failed:', fallbackError);
        return null;
      }
    }
  },

  async saveCustomerLocation(customerId: string, location: { address: string; lat: number; lng: number }): Promise<boolean> {
    try {
      const { data, error } = await supabase.functions.invoke('save-customer-location', {
        body: {
          customerId,
          address: location.address,
          lat: location.lat,
          lng: location.lng
        }
      });
      
      if (error) throw error;
      
      return true;
    } catch (error) {
      console.error('Error saving customer location:', error);
      return false;
    }
  }
};
