import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { ArrowLeft } from "lucide-react";
import { toast } from "sonner";
import { useSellerAuth } from "@/hooks/useSellerAuth";

interface SellerRegistrationFormProps {
  onBack: () => void;
  onLoginLink: () => void;
  onSuccess?: () => void;
  onCancel?: () => void;
}

const SellerRegistrationForm = ({ onBack, onLoginLink, onSuccess, onCancel }: SellerRegistrationFormProps) => {
  const { registerSeller, isLoading } = useSellerAuth();
  
  const [type, setType] = useState<string>("");
  const [typeOfSeller, setTypeOfSeller] = useState<string>("");
  const [showOTPForm, setShowOTPForm] = useState(false);
  const [otp, setOtp] = useState("");
  const [formData, setFormData] = useState<any>(null);
  
  // Individual fields
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [address, setAddress] = useState("");
  const [pincode, setPincode] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [aadhaarNumber, setAadhaarNumber] = useState("");
  const [email, setEmail] = useState("");
  
  // Registered entity fields
  const [entityFullName, setEntityFullName] = useState("");
  const [registeredAddress, setRegisteredAddress] = useState("");
  const [gstin, setGstin] = useState("");

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleRegister = async () => {
    // Validation
    if (!type || !typeOfSeller) {
      toast.error("Please fill in all required fields");
      return;
    }

    if (type === "Individual") {
      if (!firstName || !address || !pincode || !mobileNumber || !aadhaarNumber) {
        toast.error("Please fill in all required fields for Individual registration");
        return;
      }
    } else if (type === "Registered") {
      if (!entityFullName || !registeredAddress || !pincode || !mobileNumber) {
        toast.error("Please fill in all required fields for Registered entity");
        return;
      }
    }

    if (!mobileNumber || mobileNumber.length !== 10) {
      toast.error("Please enter a valid 10-digit mobile number");
      return;
    }

    if (email && !validateEmail(email)) {
      toast.error("Please enter a valid email address");
      return;
    }

    // Store form data for OTP verification
    const authData = {
      type: type as 'Individual' | 'Registered',
      typeOfSeller: typeOfSeller as 'Meat' | 'Livestock' | 'Both',
      firstName,
      lastName,
      entityFullName,
      address: type === 'Individual' ? address : registeredAddress,
      registeredAddress,
      pincode,
      mobileNumber,
      aadhaarNumber,
      gstin,
      email
    };

    setFormData(authData);
    setShowOTPForm(true);
    toast.success("OTP sent to your mobile number");
  };

  const handleVerifyOTP = async () => {
    if (!otp || otp.length !== 4) {
      toast.error("Please enter a valid 4-digit OTP");
      return;
    }
    
    if (!formData) {
      toast.error("Registration data not found. Please try again.");
      return;
    }
    
    // Simulate OTP verification (in real app, verify with SMS service)
    // For demo purposes, accept any 4-digit OTP
    console.log('OTP verified, proceeding with registration...');
    
    await registerSeller(formData, () => {
      if (onSuccess) {
        onSuccess();
      }
    });
  };

  const handleCancelOTP = () => {
    if (onCancel) {
      onCancel();
    } else {
      setShowOTPForm(false);
      setFormData(null);
      setOtp("");
    }
  };

  if (showOTPForm) {
    return (
      <Card className="w-full max-w-md mx-auto">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl text-red-700">Verify OTP</CardTitle>
          <p className="text-gray-600">
            We've sent an OTP to +91 {mobileNumber}
          </p>
        </CardHeader>
        
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="otp">Enter OTP</Label>
            <Input
              id="otp"
              type="text"
              placeholder="Enter 4-digit OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 4))}
              className="text-center text-2xl tracking-wider"
              maxLength={4}
            />
          </div>
          
          <Button 
            onClick={handleVerifyOTP}
            disabled={isLoading || otp.length !== 4}
            className="w-full bg-red-600 hover:bg-red-700"
          >
            {isLoading ? "Verifying..." : "Verify & Complete Registration"}
          </Button>
          
          <Button 
            variant="link" 
            onClick={() => {
              setShowOTPForm(false);
              setFormData(null);
              setOtp("");
            }}
            className="w-full text-red-600"
          >
            Change Mobile Number
          </Button>

          <Button 
            variant="outline" 
            onClick={handleCancelOTP}
            className="w-full"
          >
            Cancel
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <div className="flex items-center mb-4">
          <Button
            variant="outline"
            size="sm"
            onClick={onBack}
            className="mr-3"
          >
            <ArrowLeft className="w-4 h-4" />
          </Button>
          <CardTitle className="text-2xl text-red-700">Seller Registration Form</CardTitle>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-6">
        {/* Type Selection */}
        <div className="space-y-3">
          <Label className="text-base font-medium">Type *</Label>
          <RadioGroup value={type} onValueChange={setType}>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="Individual" id="individual" />
              <Label htmlFor="individual">Individual</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="Registered" id="registered" />
              <Label htmlFor="registered">Registered</Label>
            </div>
          </RadioGroup>
        </div>

        {/* Type of Seller - Always visible */}
        <div className="space-y-3">
          <Label className="text-base font-medium">Type of Seller *</Label>
          <RadioGroup value={typeOfSeller} onValueChange={setTypeOfSeller}>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="Meat" id="meat" />
              <Label htmlFor="meat">Meat</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="Livestock" id="livestock" />
              <Label htmlFor="livestock">Livestock</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="Both" id="both" />
              <Label htmlFor="both">Both</Label>
            </div>
          </RadioGroup>
        </div>

        {/* Conditional Fields Based on Type */}
        {type === "Individual" && (
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="firstName">First Name *</Label>
                <Input
                  id="firstName"
                  type="text"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="lastName">Last Name</Label>
                <Input
                  id="lastName"
                  type="text"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  className="mt-1"
                />
              </div>
            </div>
            
            <div>
              <Label htmlFor="address">Address *</Label>
              <Input
                id="address"
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="mt-1"
              />
            </div>

            <div>
              <Label htmlFor="pincode">Pincode *</Label>
              <Input
                id="pincode"
                type="text"
                value={pincode}
                onChange={(e) => setPincode(e.target.value.replace(/\D/g, '').slice(0, 6))}
                className="mt-1"
                maxLength={6}
                placeholder="Enter 6-digit pincode"
              />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="mobileNumber">Mobile Number *</Label>
                <Input
                  id="mobileNumber"
                  type="tel"
                  value={mobileNumber}
                  onChange={(e) => setMobileNumber(e.target.value.replace(/\D/g, '').slice(0, 10))}
                  className="mt-1"
                  maxLength={10}
                />
              </div>
              <div>
                <Label htmlFor="aadhaarNumber">Aadhaar Number *</Label>
                <Input
                  id="aadhaarNumber"
                  type="text"
                  value={aadhaarNumber}
                  onChange={(e) => setAadhaarNumber(e.target.value.slice(0, 12))}
                  className="mt-1"
                  maxLength={12}
                  placeholder="Enter 12-digit Aadhaar number"
                />
              </div>
            </div>
            
            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1"
                placeholder="example@email.com"
              />
            </div>
          </div>
        )}

        {type === "Registered" && (
          <div className="space-y-4">
            <div>
              <Label htmlFor="entityFullName">Entity Full Name *</Label>
              <Input
                id="entityFullName"
                type="text"
                value={entityFullName}
                onChange={(e) => setEntityFullName(e.target.value)}
                className="mt-1"
              />
            </div>
            
            <div>
              <Label htmlFor="registeredAddress">Registered Address *</Label>
              <Input
                id="registeredAddress"
                type="text"
                value={registeredAddress}
                onChange={(e) => setRegisteredAddress(e.target.value)}
                className="mt-1"
              />
            </div>

            <div>
              <Label htmlFor="pincodeReg">Pincode *</Label>
              <Input
                id="pincodeReg"
                type="text"
                value={pincode}
                onChange={(e) => setPincode(e.target.value.replace(/\D/g, '').slice(0, 6))}
                className="mt-1"
                maxLength={6}
                placeholder="Enter 6-digit pincode"
              />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="gstin">GSTIN (if applicable)</Label>
                <Input
                  id="gstin"
                  type="text"
                  value={gstin}
                  onChange={(e) => setGstin(e.target.value)}
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="mobileNumberReg">Mobile Number *</Label>
                <Input
                  id="mobileNumberReg"
                  type="tel"
                  value={mobileNumber}
                  onChange={(e) => setMobileNumber(e.target.value.replace(/\D/g, '').slice(0, 10))}
                  className="mt-1"
                  maxLength={10}
                />
              </div>
            </div>
            
            <div>
              <Label htmlFor="emailReg">Email</Label>
              <Input
                id="emailReg"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1"
                placeholder="example@email.com"
              />
            </div>
          </div>
        )}

        {/* Registration Actions */}
        {type && (
          <div className="space-y-4 pt-4">
            <p className="text-sm text-center text-gray-600">
              Already Registered?{" "}
              <button
                onClick={onLoginLink}
                className="text-red-600 hover:text-red-700 underline"
              >
                Login Here
              </button>
            </p>
            
            <Button
              onClick={handleRegister}
              disabled={isLoading}
              className="w-full bg-red-600 hover:bg-red-700"
            >
              {isLoading ? "Processing..." : "Register"}
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default SellerRegistrationForm;
