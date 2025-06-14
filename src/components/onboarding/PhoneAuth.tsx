
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowLeft, Phone, Shield } from "lucide-react";
import { toast } from "sonner";

interface PhoneAuthProps {
  onNext: () => void;
  onBack: () => void;
}

const PhoneAuth = ({ onNext, onBack }: PhoneAuthProps) => {
  const [step, setStep] = useState<'phone' | 'otp'>('phone');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [otp, setOtp] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSendOTP = async () => {
    if (!phoneNumber || phoneNumber.length !== 10) {
      toast.error("Please enter a valid 10-digit phone number");
      return;
    }
    
    setIsLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsLoading(false);
    setStep('otp');
    toast.success("OTP sent successfully!");
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
    
    // Store phone number for later use
    const onboardingData = JSON.parse(localStorage.getItem('onboardingData') || '{}');
    onboardingData.phoneNumber = phoneNumber;
    localStorage.setItem('onboardingData', JSON.stringify(onboardingData));
    
    toast.success("Phone verified successfully!");
    onNext();
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
              <h2 className="text-2xl font-bold text-gray-800">Verify Phone</h2>
              <p className="text-sm text-gray-600">Step 2 of 4</p>
            </div>
          </div>

          {step === 'phone' ? (
            <div className="space-y-6">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto">
                <Phone className="w-8 h-8 text-red-600" />
              </div>
              
              <div>
                <Label htmlFor="phone">Mobile Number</Label>
                <div className="flex mt-2">
                  <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm">
                    +91
                  </span>
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="Enter 10-digit mobile number"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value.replace(/\D/g, '').slice(0, 10))}
                    className="rounded-l-none"
                  />
                </div>
              </div>
              
              <Button
                onClick={handleSendOTP}
                disabled={isLoading || phoneNumber.length !== 10}
                className="w-full bg-red-600 hover:bg-red-700"
              >
                {isLoading ? "Sending..." : "Send OTP"}
              </Button>
            </div>
          ) : (
            <div className="space-y-6">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                <Shield className="w-8 h-8 text-green-600" />
              </div>
              
              <div className="text-center">
                <p className="text-gray-600 mb-4">
                  OTP sent to +91 {phoneNumber}
                </p>
                <Button
                  variant="link"
                  onClick={() => setStep('phone')}
                  className="text-red-600 text-sm"
                >
                  Change number
                </Button>
              </div>
              
              <div>
                <Label htmlFor="otp">Enter OTP</Label>
                <Input
                  id="otp"
                  type="text"
                  placeholder="Enter 6-digit OTP"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))}
                  className="text-center text-lg tracking-widest mt-2"
                />
              </div>
              
              <Button
                onClick={handleVerifyOTP}
                disabled={isLoading || otp.length !== 6}
                className="w-full bg-red-600 hover:bg-red-700"
              >
                {isLoading ? "Verifying..." : "Verify OTP"}
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default PhoneAuth;
