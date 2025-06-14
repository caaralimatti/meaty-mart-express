
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowLeft, MapPin, CreditCard } from "lucide-react";
import { toast } from "sonner";

interface DeliveryPreferencesProps {
  onComplete: (data: any) => void;
  onBack: () => void;
}

const DeliveryPreferences = ({ onComplete, onBack }: DeliveryPreferencesProps) => {
  const [address, setAddress] = useState('');
  const [pincode, setPincode] = useState('');
  const [area, setArea] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handlePincodeChange = async (value: string) => {
    setPincode(value);
    
    // Auto-detect area based on pincode (simulated)
    if (value.length === 6) {
      setIsLoading(true);
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock area detection
      const mockAreas: { [key: string]: string } = {
        '110001': 'Connaught Place, New Delhi',
        '400001': 'Fort, Mumbai',
        '560001': 'Bangalore City, Bangalore',
        '600001': 'George Town, Chennai',
        '700001': 'BBD Bagh, Kolkata'
      };
      
      const detectedArea = mockAreas[value] || 'Area not found';
      setArea(detectedArea);
      setIsLoading(false);
      
      if (detectedArea !== 'Area not found') {
        toast.success("Area detected automatically!");
      } else {
        toast.error("Service not available in this area");
      }
    } else {
      setArea('');
    }
  };

  const handleComplete = () => {
    if (!address.trim()) {
      toast.error("Please enter your address");
      return;
    }
    
    if (!pincode || pincode.length !== 6) {
      toast.error("Please enter a valid 6-digit pincode");
      return;
    }
    
    if (!area || area === 'Area not found') {
      toast.error("Service not available in this area");
      return;
    }
    
    if (!paymentMethod) {
      toast.error("Please select a payment method");
      return;
    }

    const data = {
      address: address.trim(),
      pincode,
      area,
      paymentMethod
    };

    onComplete(data);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-orange-50 to-red-100 flex items-center justify-center p-4">
      <Card className="w-full max-w-md mx-auto shadow-lg">
        <CardContent className="p-8">
          <div className="flex items-center mb-6">
            <Button
              variant="outline"
              size="sm"
              onClick={onBack}
              className="mr-3"
            >
              <ArrowLeft className="w-4 h-4" />
            </Button>
            <div className="flex-1 text-center">
              <h2 className="text-2xl font-bold text-gray-800">Delivery Setup</h2>
              <p className="text-sm text-gray-600">Step 4 of 4</p>
            </div>
          </div>

          <div className="space-y-6">
            {/* Address Input */}
            <div>
              <Label htmlFor="address">Delivery Address *</Label>
              <div className="relative mt-2">
                <MapPin className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                <Input
                  id="address"
                  type="text"
                  placeholder="Enter your complete address"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            {/* Pincode Input */}
            <div>
              <Label htmlFor="pincode">Pincode *</Label>
              <Input
                id="pincode"
                type="text"
                placeholder="Enter 6-digit pincode"
                value={pincode}
                onChange={(e) => handlePincodeChange(e.target.value.replace(/\D/g, '').slice(0, 6))}
                className="mt-2"
              />
              {isLoading && (
                <p className="text-sm text-gray-500 mt-1">Detecting area...</p>
              )}
            </div>

            {/* Auto-detected Area */}
            {area && (
              <div>
                <Label>Detected Area</Label>
                <div className={`mt-2 p-3 rounded-md border ${
                  area === 'Area not found' 
                    ? 'bg-red-50 border-red-200 text-red-700' 
                    : 'bg-green-50 border-green-200 text-green-700'
                }`}>
                  {area}
                </div>
              </div>
            )}

            {/* Payment Method Selection */}
            <div>
              <Label htmlFor="payment">Preferred Payment Method *</Label>
              <Select value={paymentMethod} onValueChange={setPaymentMethod}>
                <SelectTrigger className="mt-2">
                  <SelectValue placeholder="Select payment method" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="cod">Cash on Delivery</SelectItem>
                  <SelectItem value="upi">UPI Payment</SelectItem>
                  <SelectItem value="card">Credit/Debit Card</SelectItem>
                  <SelectItem value="wallet">Digital Wallet</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Button
              onClick={handleComplete}
              disabled={!area || area === 'Area not found' || isLoading}
              className="w-full bg-red-600 hover:bg-red-700"
            >
              <CreditCard className="w-4 h-4 mr-2" />
              Complete Setup
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DeliveryPreferences;
