
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { MapPin, Clock, Truck, CreditCard, Smartphone, Banknote } from "lucide-react";
import { toast } from "sonner";

interface DeliveryPreferencesProps {
  onComplete: (data: {
    address: string;
    pincode: string;
    landmark: string;
    deliveryType: string;
    paymentPreference: string;
  }) => void;
  onBack: () => void;
}

const DeliveryPreferences = ({ onComplete, onBack }: DeliveryPreferencesProps) => {
  const [address, setAddress] = useState("");
  const [pincode, setPincode] = useState("");
  const [landmark, setLandmark] = useState("");
  const [deliveryType, setDeliveryType] = useState("instant");
  const [paymentPreference, setPaymentPreference] = useState("upi");
  const [isLoading, setIsLoading] = useState(false);

  const handlePincodeChange = (value: string) => {
    const numericValue = value.replace(/\D/g, '').slice(0, 6);
    setPincode(numericValue);
    
    // Auto-detect area from pincode (mock)
    if (numericValue.length === 6) {
      toast.success("Area detected successfully!");
    }
  };

  const handleComplete = async () => {
    if (!address.trim() || !pincode || pincode.length !== 6) {
      toast.error("Please fill in all required fields");
      return;
    }

    setIsLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsLoading(false);

    onComplete({
      address: address.trim(),
      pincode,
      landmark: landmark.trim(),
      deliveryType,
      paymentPreference
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-orange-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl text-red-700">Delivery Preferences</CardTitle>
          <p className="text-gray-600">Set up your delivery and payment options</p>
        </CardHeader>
        
        <CardContent className="space-y-6">
          {/* Address Section */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2 text-red-700 font-semibold">
              <MapPin className="w-4 h-4" />
              <span>Delivery Address</span>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="address">Full Address *</Label>
              <Input
                id="address"
                type="text"
                placeholder="House/Flat No, Street, Area"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="border-red-200 focus:border-red-400"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-2">
                <Label htmlFor="pincode">Pin Code *</Label>
                <Input
                  id="pincode"
                  type="text"
                  placeholder="560001"
                  value={pincode}
                  onChange={(e) => handlePincodeChange(e.target.value)}
                  className="border-red-200 focus:border-red-400"
                  maxLength={6}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="landmark">Landmark</Label>
                <Input
                  id="landmark"
                  type="text"
                  placeholder="Near..."
                  value={landmark}
                  onChange={(e) => setLandmark(e.target.value)}
                  className="border-red-200 focus:border-red-400"
                />
              </div>
            </div>
          </div>

          {/* Delivery Type */}
          <div className="space-y-3">
            <div className="flex items-center space-x-2 text-red-700 font-semibold">
              <Truck className="w-4 h-4" />
              <span>Delivery Preference</span>
            </div>
            <RadioGroup value={deliveryType} onValueChange={setDeliveryType}>
              <div className="flex items-center space-x-2 p-3 border rounded-lg hover:bg-red-50 transition-colors">
                <RadioGroupItem value="instant" id="instant" />
                <Label htmlFor="instant" className="flex items-center space-x-3 cursor-pointer flex-1">
                  <Clock className="w-5 h-5 text-red-600" />
                  <div>
                    <div className="font-medium">30-minute instant</div>
                    <div className="text-sm text-gray-500">Express delivery</div>
                  </div>
                </Label>
              </div>
              <div className="flex items-center space-x-2 p-3 border rounded-lg hover:bg-red-50 transition-colors">
                <RadioGroupItem value="scheduled" id="scheduled" />
                <Label htmlFor="scheduled" className="flex items-center space-x-3 cursor-pointer flex-1">
                  <Truck className="w-5 h-5 text-blue-600" />
                  <div>
                    <div className="font-medium">Scheduled</div>
                    <div className="text-sm text-gray-500">Choose your time</div>
                  </div>
                </Label>
              </div>
            </RadioGroup>
          </div>

          {/* Payment Preference */}
          <div className="space-y-3">
            <div className="flex items-center space-x-2 text-red-700 font-semibold">
              <CreditCard className="w-4 h-4" />
              <span>Payment Preference</span>
            </div>
            <RadioGroup value={paymentPreference} onValueChange={setPaymentPreference}>
              <div className="flex items-center space-x-2 p-3 border rounded-lg hover:bg-red-50 transition-colors">
                <RadioGroupItem value="upi" id="upi" />
                <Label htmlFor="upi" className="flex items-center space-x-3 cursor-pointer flex-1">
                  <Smartphone className="w-5 h-5 text-purple-600" />
                  <span className="font-medium">UPI</span>
                </Label>
              </div>
              <div className="flex items-center space-x-2 p-3 border rounded-lg hover:bg-red-50 transition-colors">
                <RadioGroupItem value="cod" id="cod" />
                <Label htmlFor="cod" className="flex items-center space-x-3 cursor-pointer flex-1">
                  <Banknote className="w-5 h-5 text-green-600" />
                  <span className="font-medium">Cash on Delivery</span>
                </Label>
              </div>
              <div className="flex items-center space-x-2 p-3 border rounded-lg hover:bg-red-50 transition-colors">
                <RadioGroupItem value="card" id="card" />
                <Label htmlFor="card" className="flex items-center space-x-3 cursor-pointer flex-1">
                  <CreditCard className="w-5 h-5 text-blue-600" />
                  <span className="font-medium">Debit/Credit Card</span>
                </Label>
              </div>
            </RadioGroup>
          </div>

          <div className="space-y-3">
            <Button 
              onClick={handleComplete}
              disabled={isLoading || !address.trim() || pincode.length !== 6}
              className="w-full bg-red-600 hover:bg-red-700"
            >
              {isLoading ? "Setting up..." : "Complete Setup 🎉"}
            </Button>
            
            <Button 
              variant="outline" 
              onClick={onBack}
              className="w-full"
            >
              Back
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DeliveryPreferences;
