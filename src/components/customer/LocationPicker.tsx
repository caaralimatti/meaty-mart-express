import { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { MapPin, Navigation, Search, Save, X } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { locationService } from '@/services/locationService';

interface LocationPickerProps {
  isOpen: boolean;
  onClose: () => void;
  onLocationSelect: (location: { address: string; lat: number; lng: number }) => void;
  currentLocation?: { address: string; lat?: number; lng?: number };
}

export const LocationPicker = ({ isOpen, onClose, onLocationSelect, currentLocation }: LocationPickerProps) => {
  const [address, setAddress] = useState(currentLocation?.address || '');
  const [coordinates, setCoordinates] = useState<{ lat: number; lng: number } | null>(
    currentLocation?.lat && currentLocation?.lng 
      ? { lat: currentLocation.lat, lng: currentLocation.lng }
      : null
  );
  const [isLoadingGPS, setIsLoadingGPS] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isMapLoaded, setIsMapLoaded] = useState(false);
  const mapRef = useRef<HTMLDivElement>(null);
  const googleMapRef = useRef<any>(null);
  const markerRef = useRef<any>(null);
  const autocompleteRef = useRef<any>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  
  const { toast } = useToast();

  useEffect(() => {
    if (isOpen) {
      initializeGoogleMaps();
    }
  }, [isOpen]);

  useEffect(() => {
    if (coordinates && googleMapRef.current && isMapLoaded) {
      updateMapLocation(coordinates.lat, coordinates.lng);
    }
  }, [coordinates, isMapLoaded]);

  const initializeGoogleMaps = async () => {
    try {
      // Wait for Google Maps to load
      await locationService.loadGoogleMapsAPI();
      
      if (mapRef.current && (window as any).google) {
        // Use modern API pattern
        const { Map } = await (window as any).google.maps.importLibrary("maps");
        const { AdvancedMarkerElement } = await (window as any).google.maps.importLibrary("marker");
        const { Autocomplete } = await (window as any).google.maps.importLibrary("places");
        
        const defaultLocation = coordinates || { lat: 15.3647, lng: 75.1240 }; // Hubli, Karnataka
        
        googleMapRef.current = new Map(mapRef.current, {
          center: defaultLocation,
          zoom: 13,
          mapId: 'DEMO_MAP_ID',
          mapTypeControl: false,
          streetViewControl: false,
          fullscreenControl: false,
        });

        // Add marker using AdvancedMarkerElement
        markerRef.current = new AdvancedMarkerElement({
          map: googleMapRef.current,
          position: defaultLocation,
          title: 'Delivery Location'
        });

        // Listen for marker drag events
        markerRef.current.addListener('dragstart', () => {
          // Marker drag started
        });

        markerRef.current.addListener('dragend', async (event: any) => {
          const position = markerRef.current.position;
          const lat = position.lat;
          const lng = position.lng;
          setCoordinates({ lat, lng });
          
          // Reverse geocode to get address
          const addressResult = await locationService.reverseGeocode(lat, lng);
          if (addressResult) {
            setAddress(addressResult);
          }
        });

        // Add click listener to map
        googleMapRef.current.addListener('click', async (event: any) => {
          const lat = event.latLng.lat();
          const lng = event.latLng.lng();
          setCoordinates({ lat, lng });
          
          if (markerRef.current) {
            markerRef.current.position = { lat, lng };
          }
          
          // Reverse geocode to get address
          const addressResult = await locationService.reverseGeocode(lat, lng);
          if (addressResult) {
            setAddress(addressResult);
          }
        });

        // Initialize autocomplete
        if (inputRef.current) {
          autocompleteRef.current = new Autocomplete(inputRef.current, {
            types: ['address'],
            componentRestrictions: { country: 'IN' }
          });

          autocompleteRef.current.addListener('place_changed', () => {
            const place = autocompleteRef.current?.getPlace();
            if (place?.geometry?.location) {
              const lat = place.geometry.location.lat();
              const lng = place.geometry.location.lng();
              setCoordinates({ lat, lng });
              setAddress(place.formatted_address || '');
              
              if (markerRef.current) {
                markerRef.current.position = { lat, lng };
              }
              
              googleMapRef.current?.setCenter({ lat, lng });
            }
          });
        }

        setIsMapLoaded(true);
      }
    } catch (error) {
      console.error('Error initializing Google Maps:', error);
      toast({
        title: "Maps Error",
        description: "Failed to load Google Maps. Please try again.",
        variant: "destructive",
      });
    }
  };

  const updateMapLocation = (lat: number, lng: number) => {
    if (googleMapRef.current) {
      googleMapRef.current.setCenter({ lat, lng });
      
      if (markerRef.current) {
        markerRef.current.position = { lat, lng };
      }
    }
  };

  const handleUseCurrentLocation = () => {
    if (!navigator.geolocation) {
      toast({
        title: "Location Not Available",
        description: "Your browser doesn't support geolocation.",
        variant: "destructive",
      });
      return;
    }

    setIsLoadingGPS(true);
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        setCoordinates({ lat: latitude, lng: longitude });
        
        // Reverse geocode to get address
        const addressResult = await locationService.reverseGeocode(latitude, longitude);
        if (addressResult) {
          setAddress(addressResult);
        }
        
        setIsLoadingGPS(false);
        
        toast({
          title: "Location Found",
          description: "Your current location has been set.",
        });
      },
      (error) => {
        setIsLoadingGPS(false);
        toast({
          title: "Location Error",
          description: "Unable to get your current location. Please enter manually.",
          variant: "destructive",
        });
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 300000
      }
    );
  };

  const handleSaveLocation = async () => {
    if (!address.trim()) {
      toast({
        title: "Address Required",
        description: "Please enter or select a delivery address.",
        variant: "destructive",
      });
      return;
    }

    setIsSaving(true);
    try {
      onLocationSelect({
        address: address.trim(),
        lat: coordinates?.lat || 0,
        lng: coordinates?.lng || 0
      });
      
      toast({
        title: "Location Saved",
        description: "Your delivery location has been updated.",
      });
      
      onClose();
    } catch (error) {
      toast({
        title: "Save Error",
        description: "Failed to save location. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSaving(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-4xl max-h-[90vh] overflow-hidden">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <MapPin className="w-5 h-5 text-emerald-600" />
            Set Delivery Location
          </CardTitle>
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={onClose}
            className="h-8 w-8 p-0"
          >
            <X className="w-4 h-4" />
          </Button>
        </CardHeader>
        
        <CardContent className="space-y-4">
          {/* Address Input */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Delivery Address</label>
            <div className="flex gap-2">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <Input
                  ref={inputRef}
                  placeholder="Enter your delivery address"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="pl-10 border-emerald-200 focus:border-emerald-400"
                />
              </div>
              <Button
                onClick={handleUseCurrentLocation}
                disabled={isLoadingGPS}
                variant="outline"
                className="border-emerald-200 text-emerald-700 hover:bg-emerald-50"
              >
                <Navigation className="w-4 h-4 mr-2" />
                {isLoadingGPS ? 'Getting Location...' : 'Use GPS'}
              </Button>
            </div>
          </div>

          {/* Map */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Pin Location on Map</label>
            <div 
              ref={mapRef}
              className="w-full h-96 rounded-lg border-2 border-emerald-200 bg-gray-100 flex items-center justify-center"
            >
              {!isMapLoaded && (
                <div className="text-center text-gray-500">
                  <MapPin className="w-8 h-8 mx-auto mb-2" />
                  <p>Loading map...</p>
                </div>
              )}
            </div>
            <p className="text-xs text-gray-600">
              Click on the map or drag the marker to set your precise delivery location
            </p>
          </div>

          {/* Coordinates Display */}
          {coordinates && (
            <div className="text-sm text-gray-600">
              <span className="font-medium">Coordinates:</span> {coordinates.lat.toFixed(6)}, {coordinates.lng.toFixed(6)}
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex gap-2 justify-end pt-4">
            <Button
              variant="outline"
              onClick={onClose}
              disabled={isSaving}
            >
              Cancel
            </Button>
            <Button
              onClick={handleSaveLocation}
              disabled={isSaving || !address.trim()}
              className="bg-emerald-600 hover:bg-emerald-700"
            >
              <Save className="w-4 h-4 mr-2" />
              {isSaving ? 'Saving...' : 'Save Location'}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
