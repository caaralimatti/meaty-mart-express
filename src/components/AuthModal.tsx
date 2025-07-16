
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Phone, ArrowRight } from "lucide-react";
import { toast } from "sonner";
import { useSellerAuth } from "@/hooks/useSellerAuth";
import { usePhoneOTP } from "@/hooks/usePhoneOTP";

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  userType?: 'seller' | 'customer';
  onRegisterRedirect?: () => void;
}

const AuthModal = ({ isOpen, onClose, userType = 'customer', onRegisterRedirect }: AuthModalProps) => {
  const { loginSeller, isLoading: authLoading } = useSellerAuth();
  const { otpState, isLoading: otpLoading, sendOTP, verifyOTP, resetOTP } = usePhoneOTP();
  const [step, setStep] = useState<"phone" | "otp" | "register-prompt">("phone");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [otp, setOtp] = useState("");

  const isLoading = authLoading || otpLoading;

  if (!isOpen) return null;

  const handleSendOTP = async () => {
    if (!phoneNumber || phoneNumber.length !== 10) {
      toast.error("Please enter a valid 10-digit mobile number");
      return;
    }
    
    const result = await sendOTP(phoneNumber);
    if (result.success) {
      if (userType === 'seller' && !result.sellerExists) {
        // Show registration prompt for new sellers
        setStep("register-prompt");
      } else {
        setStep("otp");
      }
    }
  };

  const handleVerifyOTP = async () => {
    if (!otp || otp.length !== 4) {
      toast.error("Please enter a valid 4-digit OTP");
      return;
    }
    
    const result = await verifyOTP(otp);
    if (result.success) {
      if (userType === 'seller') {
        // Use seller login flow with proper success callback
        await loginSeller(phoneNumber, () => {
          console.log('Login successful, closing modal and resetting state');
          // Reset modal state first
          setStep("phone");
          setPhoneNumber("");
          setOtp("");
          resetOTP();
          // Close modal
          onClose();
        });
      } else {
        // Customer login flow (existing)
        toast.success("Login successful! Welcome to QuickGoat");
        onClose();
        // Reset state
        setStep("phone");
        setPhoneNumber("");
        setOtp("");
        resetOTP();
      }
    }
  };

  const handleRegisterRedirect = () => {
    if (onRegisterRedirect) {
      onRegisterRedirect();
    }
    onClose();
    resetOTP();
    setStep("phone");
    setPhoneNumber("");
    setOtp("");
  };

  const handleBack = () => {
    if (step === "register-prompt") {
      setStep("phone");
    } else {
      setStep("phone");
      setOtp("");
    }
  };

  return (
    <div className="fixed inset-0 bg-emerald-900/90 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-md mx-auto bg-gradient-to-br from-white to-emerald-50 backdrop-blur-sm shadow-2xl border border-emerald-200">
        <CardHeader className="text-center px-4 sm:px-6 py-4 sm:py-6 bg-gradient-to-r from-emerald-500 to-green-600 text-white rounded-t-lg">
          {/* Logo */}
          <div className="mb-4 flex justify-center">
            <div className="w-16 h-16 relative">
              <img 
                src="/lovable-uploads/8f9753cb-0f1b-4875-8ffd-8cf77fcf2eff.png" 
                alt="QuickGoat Logo" 
                className="w-full h-full object-contain"
                onError={(e) => {
                  console.error('Logo failed to load:', e);
                  // Fallback to a simple text logo
                  e.currentTarget.style.display = 'none';
                }}
                onLoad={() => console.log('Logo loaded successfully')}
              />
              {/* Fallback text logo */}
              <div className="absolute inset-0 flex items-center justify-center text-white font-bold text-lg">
                QG
              </div>
            </div>
          </div>
          
          <CardTitle className="text-xl sm:text-2xl text-white">
            {step === "phone" ? (
              <>
                Login to Quick<span className="text-emerald-100">Goat</span>
                {userType === 'seller' && <span className="text-emerald-100"> Seller</span>}
              </>
            ) : (
              "Verify OTP"
            )}
          </CardTitle>
          <p className="text-sm sm:text-base text-emerald-100 mt-2">
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
                <Label htmlFor="phone" className="text-sm font-medium text-emerald-900">Mobile Number</Label>
                <div className="flex">
                  <div className="flex items-center px-3 border border-r-0 border-emerald-200 rounded-l-md bg-white/80">
                    <Phone className="w-4 h-4 text-emerald-600" />
                    <span className="ml-2 text-sm font-medium text-emerald-800">+91</span>
                  </div>
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="Enter 10-digit mobile number"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value.replace(/\D/g, '').slice(0, 10))}
                    className="rounded-l-none h-10 sm:h-11 bg-white/80 border-emerald-200 text-emerald-900 placeholder:text-emerald-500 focus:border-emerald-400 focus:ring-emerald-400 focus:bg-white transition-all duration-300"
                    maxLength={10}
                  />
                </div>
              </div>
              
              <Button 
                onClick={handleSendOTP}
                disabled={isLoading || phoneNumber.length !== 10}
                className="w-full bg-emerald-600 hover:bg-emerald-700 text-white h-11 sm:h-12 text-base font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
              >
                {isLoading ? "Sending OTP..." : (
                  <>
                    Send OTP
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </>
                )}
              </Button>
            </>
          ) : step === "register-prompt" ? (
            <>
              <div className="text-center space-y-4">
                <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                  <h3 className="text-lg font-semibold text-amber-800 mb-2">Seller Not Registered</h3>
                  <p className="text-sm text-amber-700 mb-3">
                    No seller account found with this phone number ({phoneNumber})
                  </p>
                  <p className="text-sm text-amber-800 font-medium">
                    Would you like to create a new seller account?
                  </p>
                </div>
                
                <div className="space-y-3">
                  <Button 
                    onClick={handleRegisterRedirect}
                    className="w-full bg-emerald-600 hover:bg-emerald-700 text-white h-11 sm:h-12 text-base font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
                  >
                    Create Seller Account
                  </Button>
                  
                  <Button 
                    variant="outline" 
                    onClick={handleBack}
                    className="w-full h-10 sm:h-11 border-emerald-200 text-emerald-700 hover:bg-emerald-50 hover:border-emerald-400 transition-all duration-300"
                  >
                    Back to Phone Number
                  </Button>
                </div>
              </div>
            </>
          ) : (
            <>
              <div className="space-y-2">
                <Label htmlFor="otp" className="text-sm font-medium text-emerald-900">Enter OTP</Label>
                <Input
                  id="otp"
                  type="text"
                  placeholder="Enter 4-digit OTP"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 4))}
                  className="text-center text-lg sm:text-2xl tracking-wider h-12 sm:h-14 bg-white/80 border-emerald-200 text-emerald-900 placeholder:text-emerald-500 focus:border-emerald-400 focus:ring-emerald-400 focus:bg-white transition-all duration-300"
                  maxLength={4}
                />
              </div>
              
              <Button 
                onClick={handleVerifyOTP}
                disabled={isLoading || otp.length !== 4}
                className="w-full bg-emerald-600 hover:bg-emerald-700 text-white h-11 sm:h-12 text-base font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
              >
                {isLoading ? "Verifying..." : "Verify & Login"}
              </Button>
              
              <Button 
                variant="link" 
                onClick={handleBack}
                className="w-full text-emerald-600 hover:text-emerald-800 text-sm transition-all duration-300"
              >
                Change Mobile Number
              </Button>
            </>
          )}
          
          <Button 
            variant="outline" 
            onClick={onClose}
            className="w-full h-10 sm:h-11 border-emerald-200 text-emerald-700 hover:bg-emerald-50 hover:border-emerald-400 transition-all duration-300"
          >
            Cancel
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default AuthModal;
