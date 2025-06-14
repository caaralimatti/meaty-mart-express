
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Phone, ArrowRight, MessageCircle } from "lucide-react";
import { toast } from "sonner";

interface PhoneAuthProps {
  onAuthSuccess: () => void;
  onBack: () => void;
}

const PhoneAuth = ({ onAuthSuccess, onBack }: PhoneAuthProps) => {
  const [step, setStep] = useState<"phone" | "otp">("phone");
  const [countryCode, setCountryCode] = useState("+91");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [otp, setOtp] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSendOTP = async () => {
    if (!phoneNumber || phoneNumber.length !== 10) {
      toast.error("Please enter a valid 10-digit mobile number");
      return;
    }
    
    setIsLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsLoading(false);
    setStep("otp");
    toast.success("OTP sent to your mobile number");
  };

  const handleVerifyOTP = async () => {
    if (!otp || otp.length !== 6) {
      toast.error("Please enter a valid 6-digit OTP");
      return;
    }
    
    setIsLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsLoading(false);
    toast.success("Phone verified successfully!");
    onAuthSuccess();
  };

  const handleWhatsAppLogin = () => {
    toast.info("WhatsApp login coming soon!");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-orange-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl text-red-700">
            {step === "phone" ? "Enter Your Mobile Number" : "Verify OTP"}
          </CardTitle>
          <p className="text-gray-600">
            {step === "phone" 
              ? "We'll send you a verification code" 
              : `Code sent to ${countryCode} ${phoneNumber}`
            }
          </p>
        </CardHeader>
        
        <CardContent className="space-y-4">
          {step === "phone" ? (
            <>
              <div className="space-y-2">
                <Label htmlFor="phone">Mobile Number</Label>
                <div className="flex space-x-2">
                  <select 
                    value={countryCode}
                    onChange={(e) => setCountryCode(e.target.value)}
                    className="flex h-10 w-20 rounded-md border border-input bg-background px-3 py-2 text-sm"
                  >
                    <option value="+91">🇮🇳 +91</option>
                    <option value="+1">🇺🇸 +1</option>
                    <option value="+44">🇬🇧 +44</option>
                  </select>
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="Enter mobile number"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value.replace(/\D/g, '').slice(0, 10))}
                    className="flex-1"
                    maxLength={10}
                  />
                </div>
              </div>
              
              <Button 
                onClick={handleSendOTP}
                disabled={isLoading || phoneNumber.length !== 10}
                className="w-full bg-red-600 hover:bg-red-700"
              >
                {isLoading ? "Sending OTP..." : (
                  <>
                    Send OTP
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </>
                )}
              </Button>

              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-background px-2 text-muted-foreground">Or</span>
                </div>
              </div>

              <Button 
                variant="outline"
                onClick={handleWhatsAppLogin}
                className="w-full border-green-500 text-green-600 hover:bg-green-50"
              >
                <MessageCircle className="w-4 h-4 mr-2" />
                Continue with WhatsApp
              </Button>
            </>
          ) : (
            <>
              <div className="space-y-2">
                <Label htmlFor="otp">Enter 6-digit OTP</Label>
                <Input
                  id="otp"
                  type="text"
                  placeholder="000000"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))}
                  className="text-center text-2xl tracking-wider"
                  maxLength={6}
                />
              </div>
              
              <Button 
                onClick={handleVerifyOTP}
                disabled={isLoading || otp.length !== 6}
                className="w-full bg-red-600 hover:bg-red-700"
              >
                {isLoading ? "Verifying..." : "Verify & Continue"}
              </Button>
              
              <Button 
                variant="link" 
                onClick={() => setStep("phone")}
                className="w-full text-red-600"
              >
                Change Mobile Number
              </Button>
            </>
          )}
          
          <Button 
            variant="outline" 
            onClick={onBack}
            className="w-full"
          >
            Back
          </Button>

          <div className="text-xs text-center text-gray-500 space-y-1">
            <p>By continuing, you agree to our</p>
            <div className="space-x-2">
              <a href="#" className="text-red-600 underline">Terms & Conditions</a>
              <span>and</span>
              <a href="#" className="text-red-600 underline">Privacy Policy</a>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PhoneAuth;
