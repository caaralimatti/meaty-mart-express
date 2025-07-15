import React, { useEffect, useRef } from 'react';
import { MapPin } from 'lucide-react';

interface GoogleMapProps {
  latitude?: number;
  longitude?: number;
  zoom?: number;
  height?: string;
  className?: string;
  address?: string;
}

declare global {
  interface Window {
    google: any;
  }
}

const GoogleMap: React.FC<GoogleMapProps> = ({
  latitude = 28.6139, // Default to New Delhi
  longitude = 77.2090,
  zoom = 15,
  height = "h-48",
  className = "",
  address = "Shop/Farm Location"
}) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<any>(null);

  useEffect(() => {
    const initMap = async () => {
      try {
        // Check if Google Maps is available
        if (!window.google) {
          console.error('Google Maps API not loaded');
          return;
        }

        // Request needed libraries
        const { Map } = await window.google.maps.importLibrary("maps");
        const { AdvancedMarkerElement } = await window.google.maps.importLibrary("marker");

        if (!mapRef.current) return;

        // Create map
        const map = new Map(mapRef.current, {
          zoom: zoom,
          center: { lat: latitude, lng: longitude },
          mapId: 'DEMO_MAP_ID', // You can create your own map ID in Google Cloud Console
          styles: [
            {
              featureType: "all",
              elementType: "geometry.fill",
              stylers: [{ color: "#f0fdf4" }] // emerald-50 equivalent
            },
            {
              featureType: "water",
              elementType: "geometry.fill",
              stylers: [{ color: "#10b981" }] // emerald-500 equivalent
            }
          ]
        });

        // Add marker
        const marker = new AdvancedMarkerElement({
          map: map,
          position: { lat: latitude, lng: longitude },
          title: address
        });

        mapInstanceRef.current = map;

      } catch (error) {
        console.error('Error initializing Google Maps:', error);
      }
    };

    // Initialize map when component mounts
    if (window.google) {
      initMap();
    } else {
      // If Google Maps not loaded yet, wait for it
      const checkGoogleMaps = setInterval(() => {
        if (window.google) {
          clearInterval(checkGoogleMaps);
          initMap();
        }
      }, 100);

      // Cleanup interval after 10 seconds
      setTimeout(() => clearInterval(checkGoogleMaps), 10000);
    }
  }, [latitude, longitude, zoom, address]);

  return (
    <div className={`relative w-full ${height} ${className}`}>
      <div
        ref={mapRef}
        className="absolute inset-0 rounded-lg overflow-hidden border border-emerald-200"
      />
      
      {/* Fallback UI when Google Maps is not available */}
      {!window.google && (
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-50 to-emerald-100 rounded-lg flex items-center justify-center border border-emerald-200">
          <div className="text-center">
            <MapPin className="w-8 h-8 text-emerald-600 mx-auto mb-2" />
            <span className="text-emerald-700 text-sm">Loading map...</span>
            <p className="text-emerald-600 text-xs mt-1">
              Google Maps API required
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default GoogleMap;