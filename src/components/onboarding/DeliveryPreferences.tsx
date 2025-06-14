
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
      
      // Expanded mock areas for better coverage
      const mockAreas: { [key: string]: string } = {
        // Delhi NCR
        '110001': 'Connaught Place, New Delhi',
        '110002': 'Darya Ganj, New Delhi',
        '110003': 'Civil Lines, New Delhi',
        '110016': 'Lajpat Nagar, New Delhi',
        '110017': 'Saket, New Delhi',
        '110019': 'Kalkaji, New Delhi',
        '110025': 'Karol Bagh, New Delhi',
        '110048': 'Vasant Kunj, New Delhi',
        '110062': 'Dwarka, New Delhi',
        '201301': 'Noida Sector 37, Noida',
        '122001': 'Gurgaon City, Gurgaon',
        
        // Mumbai
        '400001': 'Fort, Mumbai',
        '400002': 'Kalbadevi, Mumbai',
        '400007': 'Grant Road, Mumbai',
        '400012': 'Prabhadevi, Mumbai',
        '400016': 'Mahim, Mumbai',
        '400018': 'Worli, Mumbai',
        '400025': 'Prabhadevi, Mumbai',
        '400050': 'Bandra West, Mumbai',
        '400051': 'Bandra East, Mumbai',
        '400070': 'Andheri West, Mumbai',
        
        // Bangalore
        '560001': 'Bangalore City, Bangalore',
        '560002': 'Bangalore Cantonment, Bangalore',
        '560003': 'Malleswaram, Bangalore',
        '560004': 'Rajajinagar, Bangalore',
        '560005': 'Seshadripuram, Bangalore',
        '560008': 'Sadashivanagar, Bangalore',
        '560025': 'Jeevanbheemanagar, Bangalore',
        '560034': 'Jayanagar, Bangalore',
        '560038': 'Jayanagar 8th Block, Bangalore',
        '560095': 'Bommanahalli, Bangalore',
        
        // Chennai
        '600001': 'George Town, Chennai',
        '600002': 'Sowcarpet, Chennai',
        '600003': 'Chintadripet, Chennai',
        '600004': 'Mylapore, Chennai',
        '600006': 'Chepauk, Chennai',
        '600014': 'Nungambakkam, Chennai',
        '600017': 'T. Nagar, Chennai',
        '600028': 'Alwarpet, Chennai',
        '600041': 'Adyar, Chennai',
        '600090': 'Thoraipakkam, Chennai',
        
        // Kolkata
        '700001': 'BBD Bagh, Kolkata',
        '700002': 'Howrah, Kolkata',
        '700003': 'Fairlie Place, Kolkata',
        '700012': 'Bhowanipore, Kolkata',
        '700016': 'Gariahat, Kolkata',
        '700017': 'Alipore, Kolkata',
        '700019': 'New Alipore, Kolkata',
        '700027': 'Ballygunge, Kolkata',
        '700029': 'Ballygunge, Kolkata',
        '700054': 'Lake Town, Kolkata',
        
        // Hyderabad
        '500001': 'Afzal Gunj, Hyderabad',
        '500003': 'Kachiguda, Hyderabad',
        '500004': 'Sultan Bazar, Hyderabad',
        '500016': 'Himayatnagar, Hyderabad',
        '500018': 'Begumpet, Hyderabad',
        '500034': 'Kondapur, Hyderabad',
        '500081': 'Gachibowli, Hyderabad',
        '500084': 'Cyberabad, Hyderabad',
        
        // Pune
        '411001': 'Pune Cantonment, Pune',
        '411002': 'Azad Nagar, Pune',
        '411003': 'Pune University, Pune',
        '411004': 'Deccan Gymkhana, Pune',
        '411005': 'Tilak Road, Pune',
        '411007': 'Aundh, Pune',
        '411038': 'Baner, Pune',
        '411045': 'Hinjewadi, Pune',
        
        // Other major cities
        '382418': 'Gandhinagar, Ahmedabad',
        '380001': 'Ellis Bridge, Ahmedabad',
        '590001': 'Belgaum, Karnataka',
        '590003': 'Tilakwadi, Belgaum',
        '590006': 'Camp, Belgaum',
        '590010': 'Hindwadi, Belgaum',
        '590016': 'Shahapur, Belgaum',
        '682001': 'Ernakulam, Kochi',
        '695001': 'Thiruvananthapuram, Kerala',
        '620001': 'Tiruchirappalli, Tamil Nadu',
        '641001': 'Coimbatore, Tamil Nadu'
      };
      
      const detectedArea = mockAreas[value] || 'Area not found';
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
