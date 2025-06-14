
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft, CreditCard } from "lucide-react";
import { toast } from "sonner";
import { detectAreaByPincode } from "@/utils/pincodeAreas";
import AddressForm from "./AddressForm";
import PaymentMethodSelector from "./PaymentMethodSelector";

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
    
    if (value.length === 6) {
      setIsLoading(true);
      const detectedArea = await detectAreaByPincode(value);
      setArea(detectedArea);
      setIsLoading(false);
      
      if (detectedArea !== 'Area not found') {
        toast.success("Area detected successfully! Service available in your area.");
      } else {
        toast.error("Service not available in this area. Please try another pincode.");
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
      toast.error("Service not available in this area. Please try a different pincode.");
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
            <AddressForm
              address={address}
              onAddressChange={setAddress}
              pincode={pincode}
              onPincodeChange={handlePincodeChange}
              area={area}
              isLoading={isLoading}
            />

            <PaymentMethodSelector
              paymentMethod={paymentMethod}
              onPaymentMethodChange={setPaymentMethod}
            />

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
