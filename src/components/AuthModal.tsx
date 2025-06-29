
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Phone, ArrowRight } from "lucide-react";
import { toast } from "sonner";
import { useSellerAuth } from "@/hooks/useSellerAuth";

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  userType?: 'seller' | 'customer';
}

const AuthModal = ({ isOpen, onClose, userType = 'customer' }: AuthModalProps) => {
  const { loginSeller, isLoading } = useSellerAuth();
  const [step, setStep] = useState<"phone" | "otp">("phone");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [otp, setOtp] = useState("");

  if (!isOpen) return null;

  const handleSendOTP = async () => {
    if (!phoneNumber || phoneNumber.length !== 10) {
      toast.error("Please enter a valid 10-digit mobile number");
      return;
    }
    
    setStep("otp");
    toast.success("OTP sent to your mobile number");
  };

  const handleVerifyOTP = async () => {
    if (!otp || otp.length !== 4) {
      toast.error("Please enter a valid 4-digit OTP");
      return;
    }
    
    if (userType === 'seller') {
      // Use seller login flow
      await loginSeller(phoneNumber, () => {
        onClose();
        // Reset state
        setStep("phone");
        setPhoneNumber("");
        setOtp("");
      });
    } else {
      // Customer login flow (existing)
      toast.success("Login successful! Welcome to QuickGoat");
      onClose();
      // Reset state
      setStep("phone");
      setPhoneNumber("");
      setOtp("");
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-md mx-auto shadow-lg">
        <CardHeader className="text-center px-4 sm:px-6 py-4 sm:py-6">
          <CardTitle className="text-xl sm:text-2xl text-red-700">
            {step === "phone" ? `Login to QuickGoat ${userType === 'seller' ? 'Seller' : ''}` : "Verify OTP"}
          </CardTitle>
          <p className="text-sm sm:text-base text-gray-600 mt-2">
            {step === "phone" 
              ? "Enter your mobile number to get started" 
              : `We've sent an OTP to +91 ${phoneNumber}`
            }
          </p>
        </CardHeader>
        
        <CardContent className="space-y-4 px-4 sm:px-6 pb-4 sm:pb-6">
          {step === "phone" ? (
            <>
              <div className="space-y-2">
                <Label htmlFor="phone" className="text-sm font-medium">Mobile Number</Label>
                <div className="flex">
                  <div className="flex items-center px-3 border border-r-0 border-gray-300 rounded-l-md bg-gray-50">
                    <Phone className="w-4 h-4 text-gray-500" />
                    <span className="ml-2 text-sm font-medium">+91</span>
                  </div>
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="Enter 10-digit mobile number"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value.replace(/\D/g, '').slice(0, 10))}
                    className="rounded-l-none h-10 sm:h-11"
                    maxLength={10}
                  />
                </div>
              </div>
              
              <Button 
                onClick={handleSendOTP}
                disabled={isLoading || phoneNumber.length !== 10}
                className="w-full bg-red-600 hover:bg-red-700 h-11 sm:h-12 text-base font-medium"
              >
                {isLoading ? "Sending OTP..." : (
                  <>
                    Send OTP
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </>
                )}
              </Button>
            </>
          ) : (
            <>
              <div className="space-y-2">
                <Label htmlFor="otp" className="text-sm font-medium">Enter OTP</Label>
                <Input
                  id="otp"
                  type="text"
                  placeholder="Enter 4-digit OTP"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 4))}
                  className="text-center text-lg sm:text-2xl tracking-wider h-12 sm:h-14"
                  maxLength={4}
                />
              </div>
              
              <Button 
                onClick={handleVerifyOTP}
                disabled={isLoading || otp.length !== 4}
                className="w-full bg-red-600 hover:bg-red-700 h-11 sm:h-12 text-base font-medium"
              >
                {isLoading ? "Verifying..." : "Verify & Login"}
              </Button>
              
              <Button 
                variant="link" 
                onClick={() => setStep("phone")}
                className="w-full text-red-600 text-sm"
              >
                Change Mobile Number
              </Button>
            </>
          )}
          
          <Button 
            variant="outline" 
            onClick={onClose}
            className="w-full h-10 sm:h-11"
          >
            Cancel
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default AuthModal;
