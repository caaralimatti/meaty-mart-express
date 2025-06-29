
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
    <div className="fixed inset-0 bg-charcoal-black/90 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-md mx-auto shadow-2xl bg-dark-slate border-vibrant-orange/20">
        <CardHeader className="text-center px-4 sm:px-6 py-4 sm:py-6 border-b border-vibrant-orange/10">
          {/* Logo */}
          <div className="mb-4 flex justify-center">
            <div className="w-16 h-16 relative">
              <img 
                src="/lovable-uploads/8f9753cb-0f1b-4875-8ffd-8cf77fcf2eff.png" 
                alt="QuickGoat Logo" 
                className="w-full h-full object-contain filter brightness-0 invert"
              />
            </div>
          </div>
          
          <CardTitle className="text-xl sm:text-2xl text-off-white">
            {step === "phone" ? (
              <>
                Login to Quick<span className="text-vibrant-orange">Goat</span>
                {userType === 'seller' && <span className="text-vibrant-orange"> Seller</span>}
              </>
            ) : (
              "Verify OTP"
            )}
          </CardTitle>
          <p className="text-sm sm:text-base text-off-white/70 mt-2">
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
                <Label htmlFor="phone" className="text-sm font-medium text-off-white">Mobile Number</Label>
                <div className="flex">
                  <div className="flex items-center px-3 border border-r-0 border-vibrant-orange/30 rounded-l-md bg-charcoal-black">
                    <Phone className="w-4 h-4 text-vibrant-orange" />
                    <span className="ml-2 text-sm font-medium text-off-white">+91</span>
                  </div>
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="Enter 10-digit mobile number"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value.replace(/\D/g, '').slice(0, 10))}
                    className="rounded-l-none h-10 sm:h-11 bg-charcoal-black border-vibrant-orange/30 text-off-white placeholder:text-off-white/50 focus:border-vibrant-orange"
                    maxLength={10}
                  />
                </div>
              </div>
              
              <Button 
                onClick={handleSendOTP}
                disabled={isLoading || phoneNumber.length !== 10}
                className="w-full bg-vibrant-orange hover:bg-vibrant-orange/90 text-charcoal-black h-11 sm:h-12 text-base font-semibold"
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
                <Label htmlFor="otp" className="text-sm font-medium text-off-white">Enter OTP</Label>
                <Input
                  id="otp"
                  type="text"
                  placeholder="Enter 4-digit OTP"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 4))}
                  className="text-center text-lg sm:text-2xl tracking-wider h-12 sm:h-14 bg-charcoal-black border-vibrant-orange/30 text-off-white placeholder:text-off-white/50 focus:border-vibrant-orange"
                  maxLength={4}
                />
              </div>
              
              <Button 
                onClick={handleVerifyOTP}
                disabled={isLoading || otp.length !== 4}
                className="w-full bg-vibrant-orange hover:bg-vibrant-orange/90 text-charcoal-black h-11 sm:h-12 text-base font-semibold"
              >
                {isLoading ? "Verifying..." : "Verify & Login"}
              </Button>
              
              <Button 
                variant="link" 
                onClick={() => setStep("phone")}
                className="w-full text-vibrant-orange hover:text-vibrant-orange/80 text-sm"
              >
                Change Mobile Number
              </Button>
            </>
          )}
          
          <Button 
            variant="outline" 
            onClick={onClose}
            className="w-full h-10 sm:h-11 border-vibrant-orange/30 text-off-white hover:bg-vibrant-orange/10 hover:text-off-white"
          >
            Cancel
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default AuthModal;
