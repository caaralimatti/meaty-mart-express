import { useState, useEffect } from 'react';
import { locationService } from '@/services/locationService';
import { useToast } from '@/hooks/use-toast';

export interface LocationData {
  address: string;
  lat: number;
  lng: number;
}

export const useLocation = () => {
  const [currentLocation, setCurrentLocation] = useState<LocationData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  // Load saved location from localStorage on mount
  useEffect(() => {
    const savedLocation = localStorage.getItem('customerLocation');
    if (savedLocation) {
      try {
        const parsed = JSON.parse(savedLocation);
        setCurrentLocation(parsed);
      } catch (error) {
        console.error('Error parsing saved location:', error);
      }
    }
  }, []);

  const getCurrentPosition = (): Promise<GeolocationPosition> => {
    return new Promise((resolve, reject) => {
      if (!navigator.geolocation) {
        reject(new Error('Geolocation is not supported by this browser'));
        return;
      }

      navigator.geolocation.getCurrentPosition(
        resolve,
        reject,
        {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 300000
        }
      );
    });
  };

  const detectLocation = async (): Promise<LocationData | null> => {
    setIsLoading(true);
    setError(null);

    try {
      const position = await getCurrentPosition();
      const { latitude, longitude } = position.coords;
      
      const address = await locationService.reverseGeocode(latitude, longitude);
      
      if (address) {
        const locationData: LocationData = {
          address,
          lat: latitude,
          lng: longitude
        };
        
        setCurrentLocation(locationData);
        localStorage.setItem('customerLocation', JSON.stringify(locationData));
        
        return locationData;
      }
      
      return null;
    } catch (error: any) {
      const errorMessage = error.message || 'Failed to detect location';
      setError(errorMessage);
      
      toast({
        title: "Location Error",
        description: errorMessage,
        variant: "destructive",
      });
      
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  const geocodeAddress = async (address: string): Promise<LocationData | null> => {
    if (!address.trim()) return null;
    
    setIsLoading(true);
    setError(null);

    try {
      const coordinates = await locationService.geocodeAddress(address);
      
      if (coordinates) {
        const locationData: LocationData = {
          address: address.trim(),
          lat: coordinates.lat,
          lng: coordinates.lng
        };
        
        setCurrentLocation(locationData);
        localStorage.setItem('customerLocation', JSON.stringify(locationData));
        
        return locationData;
      }
      
      return null;
    } catch (error: any) {
      const errorMessage = error.message || 'Failed to geocode address';
      setError(errorMessage);
      
      toast({
        title: "Geocoding Error",
        description: errorMessage,
        variant: "destructive",
      });
      
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  const updateLocation = (location: LocationData) => {
    setCurrentLocation(location);
    localStorage.setItem('customerLocation', JSON.stringify(location));
  };

  const clearLocation = () => {
    setCurrentLocation(null);
    localStorage.removeItem('customerLocation');
  };

  return {
    currentLocation,
    isLoading,
    error,
    detectLocation,
    geocodeAddress,
    updateLocation,
    clearLocation
  };
};