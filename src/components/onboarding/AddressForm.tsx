
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { MapPin } from "lucide-react";

interface AddressFormProps {
  address: string;
  onAddressChange: (address: string) => void;
  pincode: string;
  onPincodeChange: (pincode: string) => void;
  area: string;
  isLoading: boolean;
}

const AddressForm = ({ 
  address, 
  onAddressChange, 
  pincode, 
  onPincodeChange, 
  area, 
  isLoading 
}: AddressFormProps) => {
  return (
    <>
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
            onChange={(e) => onAddressChange(e.target.value)}
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
          onChange={(e) => onPincodeChange(e.target.value.replace(/\D/g, '').slice(0, 6))}
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
    </>
  );
};

export default AddressForm;
