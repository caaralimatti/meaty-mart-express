import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { MapPin, Phone, Mail, User, ArrowRight, MapIcon } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { usePhoneOTP } from '@/hooks/usePhoneOTP';
import { useCustomerAuth, CustomerData } from '@/hooks/useCustomerAuth';

interface CustomerOnboardingProps {
  onComplete: () => void;
}

declare global {
  interface Window {
    google: any;
  }
}

export const CustomerOnboarding = ({ onComplete }: CustomerOnboardingProps) => {
  const [step, setStep] = useState<'signup' | 'otp' | 'complete'>('signup');
  const [customerData, setCustomerData] = useState<CustomerData>({
    fullName: '',
    phoneNumber: '',
    email: '',
    latitude: undefined,
    longitude: undefined,
    address: ''
  });
  const [enteredOTP, setEnteredOTP] = useState('');
  const [locationSelected, setLocationSelected] = useState(false);
  const [mapLoaded, setMapLoaded] = useState(false);
  const [google, setGoogle] = useState<any>(null);
  const [manualAddress, setManualAddress] = useState('');
  
  const { toast } = useToast();
  const { otpState, isLoading: otpLoading, sendOTP, verifyOTP } = usePhoneOTP();
  const { registerCustomer, isLoading: registerLoading } = useCustomerAuth();

  useEffect(() => {
    const loadGoogleMaps = async () => {
      try {
        if (window.google && window.google.maps) {
          // Load the Maps library using the new API
          const { Map } = await window.google.maps.importLibrary("maps") as any;
          const { Marker } = await window.google.maps.importLibrary("marker") as any;
          
          setGoogle({
            Map,
            Marker,
            Geocoder: window.google.maps.Geocoder
          });
          setMapLoaded(true);
        }
      } catch (error) {
        console.error('Error loading Google Maps:', error);
      }
    };

    // Check if Google Maps is available
    const checkGoogleMaps = () => {
      if (window.google && window.google.maps && window.google.maps.importLibrary) {
        loadGoogleMaps();
      } else {
        // Keep checking until Google Maps is loaded
        setTimeout(checkGoogleMaps, 100);
      }
    };

    checkGoogleMaps();
  }, []);

  const initializeMap = () => {
    if (!google || !mapLoaded) return;

    const map = new google.Map(document.getElementById('customer-map'), {
      center: { lat: 12.9716, lng: 77.5946 }, // Bangalore center
      zoom: 12
    });

    let marker: any = null;

    map.addListener('click', (event: any) => {
      const lat = event.latLng.lat();
      const lng = event.latLng.lng();

      // Remove existing marker
      if (marker) {
        marker.setMap(null);
      }

      // Add new marker
      marker = new google.Marker({
        position: { lat, lng },
        map: map,
        title: 'Your Location'
      });

      // Reverse geocode to get address
      const geocoder = new google.Geocoder();
      geocoder.geocode({ location: { lat, lng } }, (results: any, status: any) => {
        if (status === 'OK' && results[0]) {
          const address = results[0].formatted_address;
          setCustomerData(prev => ({
            ...prev,
            latitude: lat,
            longitude: lng,
            address: address
          }));
          setLocationSelected(true);
          toast({
            title: "Location Selected!",
            description: "Your delivery location has been set.",
          });
        }
      });
    });
  };

  useEffect(() => {
    if (mapLoaded && google) {
      initializeMap();
    }
  }, [mapLoaded, google]);

  const handleSendOTP = async () => {
    if (!customerData.fullName || !customerData.phoneNumber) {
      toast({
        title: "Missing Information",
        description: "Please fill in your name and phone number",
        variant: "destructive",
      });
      return;
    }

    if (!locationSelected && !manualAddress) {
      toast({
        title: "Address Required",
        description: "Please enter your address or select location on the map",
        variant: "destructive",
      });
      return;
    }

    // Use manual address if provided, otherwise use map address
    const finalAddress = manualAddress || customerData.address;
    setCustomerData(prev => ({ ...prev, address: finalAddress }));

    const result = await sendOTP(customerData.phoneNumber);
    if (result.success) {
      setStep('otp');
      toast({
        title: "OTP Sent!",
        description: "Please check your phone for the verification code",
      });
    }
  };

  const handleVerifyOTP = async () => {
    if (!enteredOTP) {
      toast({
        title: "OTP Required",
        description: "Please enter the verification code",
        variant: "destructive",
      });
      return;
    }

    const result = await verifyOTP(enteredOTP);
    if (result.success) {
      // Register customer with final address
      const finalCustomerData = {
        ...customerData,
        address: manualAddress || customerData.address
      };
      
      const registerResult = await registerCustomer(finalCustomerData);
      if (registerResult.success) {
        setStep('complete');
        setTimeout(() => {
          onComplete();
        }, 2000);
      }
    }
  };

  const renderSignupForm = () => (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <User className="w-5 h-5" />
          Join Meaty Mart Express
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="fullName">Full Name *</Label>
            <Input
              id="fullName"
              placeholder="Enter your full name"
              value={customerData.fullName}
              onChange={(e) => setCustomerData(prev => ({ ...prev, fullName: e.target.value }))}
              className="mt-1"
            />
          </div>
          <div>
            <Label htmlFor="phoneNumber">Phone Number *</Label>
            <Input
              id="phoneNumber"
              type="tel"
              placeholder="+91 9876543210"
              value={customerData.phoneNumber}
              onChange={(e) => setCustomerData(prev => ({ ...prev, phoneNumber: e.target.value }))}
              className="mt-1"
            />
          </div>
        </div>

        <div>
          <Label htmlFor="email">Email (Optional)</Label>
          <Input
            id="email"
            type="email"
            placeholder="your@email.com"
            value={customerData.email}
            onChange={(e) => setCustomerData(prev => ({ ...prev, email: e.target.value }))}
            className="mt-1"
          />
        </div>

        <div>
          <Label htmlFor="address">Address *</Label>
          <Input
            id="address"
            placeholder="Enter your delivery address"
            value={manualAddress}
            onChange={(e) => setManualAddress(e.target.value)}
            className="mt-1"
          />
        </div>

        <div>
          <Label className="flex items-center gap-2">
            <MapPin className="w-4 h-4" />
            Select Your Location (Optional)
          </Label>
          <p className="text-sm text-gray-600 mt-1">You can also click on the map to select your location</p>
          <div className="mt-2 space-y-2">
            <div
              id="customer-map"
              className="w-full h-64 rounded-lg border border-gray-300"
              style={{ minHeight: '256px' }}
            />
            {!mapLoaded && (
              <div className="w-full h-64 bg-gray-100 rounded-lg flex items-center justify-center border border-gray-300">
                <div className="text-center">
                  <MapIcon className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                  <p className="text-gray-500">Loading Google Maps...</p>
                </div>
              </div>
            )}
            {(manualAddress || customerData.address) && (
              <div className="p-3 bg-emerald-50 rounded-lg border border-emerald-200">
                <p className="text-sm text-emerald-800">
                  <MapPin className="w-4 h-4 inline mr-1" />
                  Address: {manualAddress || customerData.address}
                </p>
              </div>
            )}
          </div>
        </div>

        <Button
          onClick={handleSendOTP}
          disabled={otpLoading}
          className="w-full"
        >
          {otpLoading ? (
            "Sending OTP..."
          ) : (
            <>
              Send Verification Code
              <ArrowRight className="w-4 h-4 ml-2" />
            </>
          )}
        </Button>
      </CardContent>
    </Card>
  );

  const renderOTPForm = () => (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Phone className="w-5 h-5" />
          Verify Your Phone
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-sm text-gray-600">
          We've sent a verification code to {customerData.phoneNumber}
        </p>
        
        <div>
          <Label htmlFor="otp">Enter 6-digit code</Label>
          <Input
            id="otp"
            type="text"
            maxLength={6}
            placeholder="123456"
            value={enteredOTP}
            onChange={(e) => setEnteredOTP(e.target.value.replace(/\D/g, ''))}
            className="mt-1 text-center text-lg tracking-wider"
          />
        </div>

        <Button
          onClick={handleVerifyOTP}
          disabled={registerLoading}
          className="w-full"
        >
          {registerLoading ? "Creating Account..." : "Verify & Complete Registration"}
        </Button>

        <Button
          variant="outline"
          onClick={() => setStep('signup')}
          className="w-full"
        >
          Back to Edit Details
        </Button>
      </CardContent>
    </Card>
  );

  const renderComplete = () => (
    <Card className="w-full max-w-md mx-auto">
      <CardContent className="pt-6">
        <div className="text-center">
          <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <User className="w-8 h-8 text-emerald-600" />
          </div>
          <h2 className="text-2xl font-bold mb-2">Welcome to Meaty Mart!</h2>
          <p className="text-gray-600">
            Your account has been created successfully. 
            Redirecting you to the marketplace...
          </p>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-emerald-100 p-4 flex items-center justify-center">
      <div className="w-full max-w-4xl">
        {step === 'signup' && renderSignupForm()}
        {step === 'otp' && renderOTPForm()}
        {step === 'complete' && renderComplete()}
      </div>
    </div>
  );
};
