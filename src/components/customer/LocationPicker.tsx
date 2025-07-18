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
  const [isMapReady, setIsMapReady] = useState(false);
  
  // Refs to hold Google Maps instances - these persist across re-renders
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstance = useRef<any>(null);
  const markerInstance = useRef<any>(null);
  const autocompleteInstance = useRef<any>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  
  const { toast } = useToast();

  // Single useEffect for complete Google Maps lifecycle management
  useEffect(() => {
    // Only initialize if modal is open and map isn't already initialized
    if (!isOpen || mapInstance.current) {
      return;
    }

    let isComponentMounted = true;

    const initializeMap = async () => {
      try {
        console.log('Initializing Google Maps...');
        
        // Load Google Maps API
        await locationService.loadGoogleMapsAPI();
        
        // Check if component is still mounted
        if (!isComponentMounted || !mapRef.current) {
          console.log('Component unmounted during API load');
          return;
        }

        // Find the gmaps-root div inside the React-managed container
        const gmapsRoot = mapRef.current.querySelector('#gmaps-root') as HTMLDivElement;
        if (!gmapsRoot) {
          console.error('gmaps-root container not found');
          return;
        }

        // Import required Google Maps libraries
        const { Map } = await (window as any).google.maps.importLibrary("maps");
        const { AdvancedMarkerElement } = await (window as any).google.maps.importLibrary("marker");
        const { Autocomplete } = await (window as any).google.maps.importLibrary("places");
        
        // Final check if component is still mounted
        if (!isComponentMounted) {
          console.log('Component unmounted during library import');
          return;
        }

        const defaultLocation = coordinates || { lat: 15.3647, lng: 75.1240 }; // Hubli, Karnataka
        
        // Initialize map on the isolated gmaps-root div - React only manages the parent
        mapInstance.current = new Map(gmapsRoot, {
          center: defaultLocation,
          zoom: 13,
          mapId: 'DEMO_MAP_ID',
          mapTypeControl: false,
          streetViewControl: false,
          fullscreenControl: false,
        });

        // Add marker
        markerInstance.current = new AdvancedMarkerElement({
          map: mapInstance.current,
          position: defaultLocation,
          title: 'Delivery Location'
        });

        // Add map click listener
        mapInstance.current.addListener('click', async (event: any) => {
          if (!isComponentMounted) return;
          
          const lat = event.latLng.lat();
          const lng = event.latLng.lng();
          setCoordinates({ lat, lng });
          
          if (markerInstance.current) {
            markerInstance.current.position = { lat, lng };
          }
          
          // Reverse geocode to get address
          const addressResult = await locationService.reverseGeocode(lat, lng);
          if (addressResult && isComponentMounted) {
            setAddress(addressResult);
          }
        });

        // Add marker drag listener
        markerInstance.current.addListener('dragend', async (event: any) => {
          if (!isComponentMounted) return;
          
          const position = markerInstance.current.position;
          const lat = position.lat;
          const lng = position.lng;
          setCoordinates({ lat, lng });
          
          // Reverse geocode to get address
          const addressResult = await locationService.reverseGeocode(lat, lng);
          if (addressResult && isComponentMounted) {
            setAddress(addressResult);
          }
        });

        // Initialize autocomplete
        if (inputRef.current && isComponentMounted) {
          autocompleteInstance.current = new Autocomplete(inputRef.current, {
            types: ['address'],
            componentRestrictions: { country: 'IN' }
          });

          autocompleteInstance.current.addListener('place_changed', () => {
            if (!isComponentMounted) return;
            
            const place = autocompleteInstance.current?.getPlace();
            if (place?.geometry?.location) {
              const lat = place.geometry.location.lat();
              const lng = place.geometry.location.lng();
              setCoordinates({ lat, lng });
              setAddress(place.formatted_address || '');
              
              if (markerInstance.current) {
                markerInstance.current.position = { lat, lng };
              }
              
              mapInstance.current?.setCenter({ lat, lng });
            }
          });
        }

        if (isComponentMounted) {
          setIsMapReady(true);
          console.log('Google Maps initialized successfully');
        }

      } catch (error) {
        console.error('Error initializing Google Maps:', error);
        if (isComponentMounted) {
          toast({
            title: "Maps Error",
            description: "Failed to load Google Maps. Please try again.",
            variant: "destructive",
          });
        }
      }
    };

    initializeMap();

    // Cleanup function - this is the critical fix
    return () => {
      console.log('Cleaning up Google Maps...');
      isComponentMounted = false;

      // Clean up Google Maps instances properly
      if (markerInstance.current) {
        markerInstance.current.map = null;
        markerInstance.current = null;
      }

      if (autocompleteInstance.current) {
        autocompleteInstance.current = null;
      }

      if (mapInstance.current && (window as any).google?.maps?.event) {
        // Remove all event listeners from the map
        (window as any).google.maps.event.clearInstanceListeners(mapInstance.current);
        mapInstance.current = null;
      }

      setIsMapReady(false);
      console.log('Google Maps cleanup complete');
    };
  }, [isOpen]); // Only depend on isOpen

  // Update map when coordinates change
  useEffect(() => {
    if (coordinates && mapInstance.current && isMapReady) {
      mapInstance.current.setCenter(coordinates);
      if (markerInstance.current) {
        markerInstance.current.position = coordinates;
      }
    }
  }, [coordinates, isMapReady]);

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
              className="w-full h-96 rounded-lg border-2 border-emerald-200 bg-gray-100 relative"
            >
              <div id="gmaps-root" className="w-full h-full rounded-lg" />
              {!isMapReady && (
                <div className="absolute inset-0 flex items-center justify-center text-center text-gray-500 bg-gray-100 rounded-lg">
                  <div>
                    <MapPin className="w-8 h-8 mx-auto mb-2" />
                    <p>Loading map...</p>
                  </div>
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
