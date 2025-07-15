import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { ArrowLeft } from "lucide-react";
import { toast } from "sonner";
import { useSellerAuth } from "@/hooks/useSellerAuth";
import { usePhoneOTP } from "@/hooks/usePhoneOTP";
interface SellerRegistrationFormProps {
  onBack: () => void;
  onLoginLink: () => void;
  onSuccess?: () => void;
  onCancel?: () => void;
}
const SellerRegistrationForm = ({
  onBack,
  onLoginLink,
  onSuccess,
  onCancel
}: SellerRegistrationFormProps) => {
  const {
    registerSeller,
    isLoading
  } = useSellerAuth();
  const {
    otpState,
    isLoading: otpLoading,
    sendOTP,
    verifyOTP,
    resetOTP
  } = usePhoneOTP();
  const [type, setType] = useState<string>("");
  const [typeOfSeller, setTypeOfSeller] = useState<string>("");
  const [otp, setOtp] = useState("");
  const [formData, setFormData] = useState<any>(null);

  // Individual fields
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
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
      if (!firstName || !address || !city || !pincode || !mobileNumber || !aadhaarNumber) {
        toast.error("Please fill in all required fields for Individual registration");
        return;
      }
    } else if (type === "Registered") {
      if (!entityFullName || !registeredAddress || !city || !pincode || !mobileNumber) {
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
      city,
      pincode,
      mobileNumber,
      aadhaarNumber,
      gstin,
      email
    };
    setFormData(authData);

    // Send OTP
    const result = await sendOTP(mobileNumber);
    if (!result.success) {
      setFormData(null);
    }
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

    // Verify OTP
    const result = await verifyOTP(otp);
    if (result.success) {
      // Proceed with registration using Supabase auth
      await registerSeller(formData, () => {
        if (onSuccess) {
          onSuccess();
        }
      });
    }
  };
  const handleCancelOTP = () => {
    if (onCancel) {
      onCancel();
    } else {
      resetOTP();
      setFormData(null);
      setOtp("");
    }
  };
  if (otpState.otpSent && !otpState.otpVerified) {
    return <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-green-100 flex items-center justify-center p-4">
        <Card className="w-full max-w-md mx-auto bg-gradient-to-br from-white to-emerald-50 backdrop-blur-sm shadow-lg border border-emerald-200">
          <CardHeader className="text-center px-4 py-6 bg-gradient-to-r from-emerald-500 to-green-600 text-white rounded-t-lg">
            <CardTitle className="text-xl sm:text-2xl">Verify OTP</CardTitle>
            <p className="text-sm sm:text-base text-emerald-100 mt-2">
              We've sent an OTP to +91 {otpState.phoneNumber}
            </p>
            <p className="text-xs sm:text-sm text-emerald-200 mt-2">
              Demo OTP: Check browser console for the OTP
            </p>
          </CardHeader>
          
          <CardContent className="space-y-4 px-4 pb-6">
            <div className="space-y-2">
              <Label htmlFor="otp" className="text-sm font-medium text-emerald-900">Enter OTP</Label>
              <Input 
                id="otp" 
                type="text" 
                placeholder="Enter 4-digit OTP" 
                value={otp} 
                onChange={e => setOtp(e.target.value.replace(/\D/g, '').slice(0, 4))} 
                className="text-center text-lg sm:text-2xl tracking-wider h-12 sm:h-14 border-emerald-200 focus:border-emerald-400 focus:ring-emerald-400 transition-all duration-300" 
                maxLength={4} 
              />
            </div>
            
            <Button 
              onClick={handleVerifyOTP} 
              disabled={isLoading || otpLoading || otp.length !== 4} 
              className="w-full bg-emerald-600 hover:bg-emerald-700 h-12 text-base font-medium text-white shadow-lg hover:shadow-xl transition-all duration-300"
            >
              {isLoading ? "Registering..." : "Verify & Complete Registration"}
            </Button>
            
            <Button 
              variant="link" 
              onClick={() => {
                resetOTP();
                setFormData(null);
                setOtp("");
              }} 
              className="w-full text-emerald-600 hover:text-emerald-700 text-sm transition-all duration-300"
            >
              Change Mobile Number
            </Button>

            <Button 
              variant="outline" 
              onClick={handleCancelOTP} 
              className="w-full h-10 border-emerald-200 text-emerald-700 hover:bg-emerald-50 hover:border-emerald-400 transition-all duration-300"
            >
              Cancel
            </Button>
          </CardContent>
        </Card>
      </div>;
  }
  return <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-green-100 flex items-center justify-center p-3 sm:p-4">
      <Card className="w-full max-w-2xl mx-auto bg-gradient-to-br from-white to-emerald-50 backdrop-blur-sm shadow-lg border border-emerald-200">
        <CardHeader className="px-4 sm:px-6 py-4 sm:py-6 bg-gradient-to-r from-emerald-500 to-green-600 text-white rounded-t-lg">
          <div className="flex items-center mb-4">
            <Button 
              variant="outline" 
              size="sm" 
              onClick={onBack} 
              className="mr-3 h-8 w-8 p-0 sm:h-10 sm:w-auto sm:px-3 bg-white/20 border-white/30 text-white hover:bg-white/30 hover:border-white/50 backdrop-blur-sm transition-all duration-300"
            >
              <ArrowLeft className="w-4 h-4" />
              <span className="hidden sm:ml-2 sm:inline">Back</span>
            </Button>
            <CardTitle className="text-lg sm:text-2xl">Seller Registration</CardTitle>
          </div>
        </CardHeader>
        
        <CardContent className="space-y-6 px-4 sm:px-6 pb-6">
          {/* Type Selection */}
          <div className="space-y-3">
            <Label className="text-base font-medium text-emerald-900">Type *</Label>
            <RadioGroup value={type} onValueChange={setType} className="grid grid-cols-2 gap-4">
              <div className="flex items-center space-x-2 border border-emerald-200 rounded-lg p-3 hover:bg-emerald-50 hover:border-emerald-400 transition-all duration-300 bg-white/60 backdrop-blur-sm">
                <RadioGroupItem value="Individual" id="individual" className="border-emerald-400 text-emerald-600" />
                <Label htmlFor="individual" className="font-normal cursor-pointer text-emerald-800">Individual</Label>
              </div>
              <div className="flex items-center space-x-2 border border-emerald-200 rounded-lg p-3 hover:bg-emerald-50 hover:border-emerald-400 transition-all duration-300 bg-white/60 backdrop-blur-sm">
                <RadioGroupItem value="Registered" id="registered" className="border-emerald-400 text-emerald-600" />
                <Label htmlFor="registered" className="font-normal cursor-pointer text-emerald-800">Registered</Label>
              </div>
            </RadioGroup>
          </div>

          {/* Type of Seller - Always visible */}
          <div className="space-y-3">
            <Label className="text-base font-medium text-emerald-900">Type of Seller *</Label>
            <RadioGroup value={typeOfSeller} onValueChange={setTypeOfSeller} className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="flex items-center space-x-2 border border-emerald-200 rounded-lg p-3 hover:bg-emerald-50 hover:border-emerald-400 transition-all duration-300 bg-white/60 backdrop-blur-sm">
                <RadioGroupItem value="Meat" id="meat" className="border-emerald-400 text-emerald-600" />
                <Label htmlFor="meat" className="font-normal cursor-pointer text-emerald-800">Meat</Label>
              </div>
              <div className="flex items-center space-x-2 border border-emerald-200 rounded-lg p-3 hover:bg-emerald-50 hover:border-emerald-400 transition-all duration-300 bg-white/60 backdrop-blur-sm">
                <RadioGroupItem value="Livestock" id="livestock" className="border-emerald-400 text-emerald-600" />
                <Label htmlFor="livestock" className="font-normal cursor-pointer text-emerald-800">Livestock</Label>
              </div>
              <div className="flex items-center space-x-2 border border-emerald-200 rounded-lg p-3 hover:bg-emerald-50 hover:border-emerald-400 transition-all duration-300 bg-white/60 backdrop-blur-sm">
                <RadioGroupItem value="Both" id="both" className="border-emerald-400 text-emerald-600" />
                <Label htmlFor="both" className="font-normal cursor-pointer text-emerald-800">Both</Label>
              </div>
            </RadioGroup>
          </div>

          {/* Conditional Fields Based on Type */}
          {type === "Individual" && <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="firstName" className="text-sm font-medium text-emerald-900">First Name *</Label>
                  <Input 
                    id="firstName" 
                    type="text" 
                    value={firstName} 
                    onChange={e => setFirstName(e.target.value)} 
                    className="mt-1 h-10 bg-white/80 border-emerald-200 text-emerald-900 placeholder:text-emerald-500 focus:border-emerald-400 focus:ring-emerald-400 focus:bg-white transition-all duration-300" 
                    placeholder="Enter first name" 
                  />
                </div>
                <div>
                  <Label htmlFor="lastName" className="text-sm font-medium text-emerald-900">Last Name</Label>
                  <Input 
                    id="lastName" 
                    type="text" 
                    value={lastName} 
                    onChange={e => setLastName(e.target.value)} 
                    className="mt-1 h-10 bg-white/80 border-emerald-200 text-emerald-900 placeholder:text-emerald-500 focus:border-emerald-400 focus:ring-emerald-400 focus:bg-white transition-all duration-300" 
                    placeholder="Enter last name" 
                  />
                </div>
              </div>
              
              <div>
                <Label htmlFor="address" className="text-sm font-medium text-emerald-900">Address *</Label>
                <Input 
                  id="address" 
                  type="text" 
                  value={address} 
                  onChange={e => setAddress(e.target.value)} 
                  className="mt-1 h-10 bg-white/80 border-emerald-200 text-emerald-900 placeholder:text-emerald-500 focus:border-emerald-400 focus:ring-emerald-400 focus:bg-white transition-all duration-300" 
                  placeholder="Enter your address" 
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="city" className="text-sm font-medium text-emerald-900">City *</Label>
                  <Input 
                    id="city" 
                    type="text" 
                    value={city} 
                    onChange={e => setCity(e.target.value)} 
                    className="mt-1 h-10 bg-white/80 border-emerald-200 text-emerald-900 placeholder:text-emerald-500 focus:border-emerald-400 focus:ring-emerald-400 focus:bg-white transition-all duration-300" 
                    placeholder="Enter city" 
                  />
                </div>
                <div>
                  <Label htmlFor="pincode" className="text-sm font-medium text-emerald-900">Pincode *</Label>
                  <Input 
                    id="pincode" 
                    type="text" 
                    value={pincode} 
                    onChange={e => setPincode(e.target.value.replace(/\D/g, '').slice(0, 6))} 
                    className="mt-1 h-10 bg-white/80 border-emerald-200 text-emerald-900 placeholder:text-emerald-500 focus:border-emerald-400 focus:ring-emerald-400 focus:bg-white transition-all duration-300" 
                    maxLength={6} 
                    placeholder="6-digit pincode" 
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="mobileNumber" className="text-sm font-medium text-emerald-900">Mobile Number *</Label>
                  <Input 
                    id="mobileNumber" 
                    type="tel" 
                    value={mobileNumber} 
                    onChange={e => setMobileNumber(e.target.value.replace(/\D/g, '').slice(0, 10))} 
                    className="mt-1 h-10 bg-white/80 border-emerald-200 text-emerald-900 placeholder:text-emerald-500 focus:border-emerald-400 focus:ring-emerald-400 focus:bg-white transition-all duration-300" 
                    maxLength={10} 
                    placeholder="10-digit mobile number" 
                  />
                </div>
                <div>
                  <Label htmlFor="aadhaarNumber" className="text-sm font-medium text-emerald-900">Aadhaar Number *</Label>
                  <Input 
                    id="aadhaarNumber" 
                    type="text" 
                    value={aadhaarNumber} 
                    onChange={e => setAadhaarNumber(e.target.value.slice(0, 12))} 
                    className="mt-1 h-10 bg-white/80 border-emerald-200 text-emerald-900 placeholder:text-emerald-500 focus:border-emerald-400 focus:ring-emerald-400 focus:bg-white transition-all duration-300" 
                    maxLength={12} 
                    placeholder="12-digit Aadhaar" 
                  />
                </div>
              </div>
              
              <div>
                <Label htmlFor="email" className="text-sm font-medium text-emerald-900">Email</Label>
                <Input 
                  id="email" 
                  type="email" 
                  value={email} 
                  onChange={e => setEmail(e.target.value)} 
                  className="mt-1 h-10 bg-white/80 border-emerald-200 text-emerald-900 placeholder:text-emerald-500 focus:border-emerald-400 focus:ring-emerald-400 focus:bg-white transition-all duration-300" 
                  placeholder="example@email.com" 
                />
              </div>
            </div>}

          {type === "Registered" && <div className="space-y-4">
              <div>
                <Label htmlFor="entityFullName" className="text-sm font-medium text-emerald-900">Entity Full Name *</Label>
                <Input 
                  id="entityFullName" 
                  type="text" 
                  value={entityFullName} 
                  onChange={e => setEntityFullName(e.target.value)} 
                  className="mt-1 h-10 bg-white/80 border-emerald-200 text-emerald-900 placeholder:text-emerald-500 focus:border-emerald-400 focus:ring-emerald-400 focus:bg-white transition-all duration-300" 
                  placeholder="Enter company/entity name" 
                />
              </div>
              
              <div>
                <Label htmlFor="registeredAddress" className="text-sm font-medium text-emerald-900">Registered Address *</Label>
                <Input 
                  id="registeredAddress" 
                  type="text" 
                  value={registeredAddress} 
                  onChange={e => setRegisteredAddress(e.target.value)} 
                  className="mt-1 h-10 bg-white/80 border-emerald-200 text-emerald-900 placeholder:text-emerald-500 focus:border-emerald-400 focus:ring-emerald-400 focus:bg-white transition-all duration-300" 
                  placeholder="Enter registered address" 
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="cityReg" className="text-sm font-medium text-emerald-900">City *</Label>
                  <Input 
                    id="cityReg" 
                    type="text" 
                    value={city} 
                    onChange={e => setCity(e.target.value)} 
                    className="mt-1 h-10 bg-white/80 border-emerald-200 text-emerald-900 placeholder:text-emerald-500 focus:border-emerald-400 focus:ring-emerald-400 focus:bg-white transition-all duration-300" 
                    placeholder="Enter city" 
                  />
                </div>
                <div>
                  <Label htmlFor="pincodeReg" className="text-sm font-medium text-emerald-900">Pincode *</Label>
                  <Input 
                    id="pincodeReg" 
                    type="text" 
                    value={pincode} 
                    onChange={e => setPincode(e.target.value.replace(/\D/g, '').slice(0, 6))} 
                    className="mt-1 h-10 bg-white/80 border-emerald-200 text-emerald-900 placeholder:text-emerald-500 focus:border-emerald-400 focus:ring-emerald-400 focus:bg-white transition-all duration-300" 
                    maxLength={6} 
                    placeholder="6-digit pincode" 
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="gstin" className="text-sm font-medium text-emerald-900">GSTIN (if applicable)</Label>
                  <Input 
                    id="gstin" 
                    type="text" 
                    value={gstin} 
                    onChange={e => setGstin(e.target.value)} 
                    className="mt-1 h-10 bg-white/80 border-emerald-200 text-emerald-900 placeholder:text-emerald-500 focus:border-emerald-400 focus:ring-emerald-400 focus:bg-white transition-all duration-300" 
                    placeholder="Enter GSTIN" 
                  />
                </div>
                <div>
                  <Label htmlFor="mobileNumberReg" className="text-sm font-medium text-emerald-900">Mobile Number *</Label>
                  <Input 
                    id="mobileNumberReg" 
                    type="tel" 
                    value={mobileNumber} 
                    onChange={e => setMobileNumber(e.target.value.replace(/\D/g, '').slice(0, 10))} 
                    className="mt-1 h-10 bg-white/80 border-emerald-200 text-emerald-900 placeholder:text-emerald-500 focus:border-emerald-400 focus:ring-emerald-400 focus:bg-white transition-all duration-300" 
                    maxLength={10} 
                    placeholder="10-digit mobile" 
                  />
                </div>
              </div>
              
              <div>
                <Label htmlFor="emailReg" className="text-sm font-medium text-emerald-900">Email</Label>
                <Input 
                  id="emailReg" 
                  type="email" 
                  value={email} 
                  onChange={e => setEmail(e.target.value)} 
                  className="mt-1 h-10 bg-white/80 border-emerald-200 text-emerald-900 placeholder:text-emerald-500 focus:border-emerald-400 focus:ring-emerald-400 focus:bg-white transition-all duration-300" 
                  placeholder="example@email.com" 
                />
              </div>
            </div>}

          {/* Registration Actions */}
          {type && <div className="space-y-4 pt-4">
              <p className="text-sm text-center text-emerald-700">
                Already Registered?{" "}
                <button 
                  onClick={onLoginLink} 
                  className="text-emerald-600 hover:text-emerald-800 underline font-medium transition-all duration-300"
                >
                  Login Here
                </button>
              </p>
              
              <Button 
                onClick={handleRegister} 
                disabled={isLoading || otpLoading} 
                className="w-full bg-emerald-600 hover:bg-emerald-700 h-12 text-base font-medium text-white shadow-lg hover:shadow-xl transition-all duration-300"
              >
                {otpLoading ? "Sending OTP..." : "Send OTP"}
              </Button>
            </div>}
        </CardContent>
      </Card>
    </div>;
};
export default SellerRegistrationForm;