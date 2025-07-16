import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { User, Phone, ArrowRight, LogIn } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { usePhoneOTP } from '@/hooks/usePhoneOTP';
import { useCustomerAuth } from '@/hooks/useCustomerAuth';

interface CustomerAuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export const CustomerAuthModal = ({ isOpen, onClose, onSuccess }: CustomerAuthModalProps) => {
  const [loginPhone, setLoginPhone] = useState('');
  const [loginOTP, setLoginOTP] = useState('');
  const [loginStep, setLoginStep] = useState<'phone' | 'otp'>('phone');
  const [showRegistration, setShowRegistration] = useState(false);
  
  const { toast } = useToast();
  const { otpState, isLoading: otpLoading, sendOTP, verifyOTP } = usePhoneOTP();
  const { loginCustomer, isLoading: loginLoading } = useCustomerAuth();

  const handleSendLoginOTP = async () => {
    if (!loginPhone) {
      toast({
        title: "Phone Required",
        description: "Please enter your phone number",
        variant: "destructive",
      });
      return;
    }

    const result = await sendOTP(loginPhone);
    if (result.success) {
      if (result.sellerExists) {
        // This is a seller, not a customer
        toast({
          title: "Account Type Mismatch",
          description: "This phone number is registered as a seller. Please use seller login.",
          variant: "destructive",
        });
        return;
      }
      
      setLoginStep('otp');
      toast({
        title: "OTP Sent!",
        description: "Please check your phone for the verification code",
      });
    }
  };

  const handleVerifyLoginOTP = async () => {
    if (!loginOTP) {
      toast({
        title: "OTP Required",
        description: "Please enter the verification code",
        variant: "destructive",
      });
      return;
    }

    const result = await verifyOTP(loginOTP);
    if (result.success) {
      const loginResult = await loginCustomer(loginPhone);
      if (loginResult.success) {
        onSuccess();
        onClose();
        // Reset form
        setLoginPhone('');
        setLoginOTP('');
        setLoginStep('phone');
      }
    }
  };

  const handleRegistrationRedirect = () => {
    setShowRegistration(true);
  };

  const handleRegistrationComplete = () => {
    setShowRegistration(false);
    onSuccess();
    onClose();
  };

  const resetForm = () => {
    setLoginPhone('');
    setLoginOTP('');
    setLoginStep('phone');
    setShowRegistration(false);
  };

  return (
    <>
      <Dialog open={isOpen && !showRegistration} onOpenChange={(open) => {
        if (!open) {
          resetForm();
          onClose();
        }
      }}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <User className="w-5 h-5" />
              Customer Login
            </DialogTitle>
          </DialogHeader>
          
          <div className="space-y-4">
            <Tabs defaultValue="login" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="login">Login</TabsTrigger>
                <TabsTrigger value="register">Register</TabsTrigger>
              </TabsList>
              
              <TabsContent value="login" className="space-y-4">
                {loginStep === 'phone' ? (
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Enter Phone Number</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <Label htmlFor="loginPhone">Phone Number</Label>
                        <Input
                          id="loginPhone"
                          type="tel"
                          placeholder="+91 9876543210"
                          value={loginPhone}
                          onChange={(e) => setLoginPhone(e.target.value)}
                          className="mt-1"
                        />
                      </div>
                      
                      <Button
                        onClick={handleSendLoginOTP}
                        disabled={otpLoading}
                        className="w-full"
                      >
                        {otpLoading ? (
                          "Sending OTP..."
                        ) : (
                          <>
                            Send OTP
                            <ArrowRight className="w-4 h-4 ml-2" />
                          </>
                        )}
                      </Button>
                    </CardContent>
                  </Card>
                ) : (
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Verify OTP</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <p className="text-sm text-gray-600">
                        Enter the 6-digit code sent to {loginPhone}
                      </p>
                      
                      <div>
                        <Label htmlFor="loginOTP">OTP Code</Label>
                        <Input
                          id="loginOTP"
                          type="text"
                          maxLength={6}
                          placeholder="123456"
                          value={loginOTP}
                          onChange={(e) => setLoginOTP(e.target.value.replace(/\D/g, ''))}
                          className="mt-1 text-center text-lg tracking-wider"
                        />
                      </div>
                      
                      <Button
                        onClick={handleVerifyLoginOTP}
                        disabled={loginLoading}
                        className="w-full"
                      >
                        {loginLoading ? (
                          "Verifying..."
                        ) : (
                          <>
                            Verify & Login
                            <LogIn className="w-4 h-4 ml-2" />
                          </>
                        )}
                      </Button>
                      
                      <Button
                        variant="outline"
                        onClick={() => setLoginStep('phone')}
                        className="w-full"
                      >
                        Back to Phone Number
                      </Button>
                    </CardContent>
                  </Card>
                )}
              </TabsContent>
              
              <TabsContent value="register" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">New Customer?</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-600 mb-4">
                      Create your account to access premium meat products and livestock from verified sellers.
                    </p>
                    
                    <Button
                      onClick={handleRegistrationRedirect}
                      className="w-full"
                    >
                      Complete Registration
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </DialogContent>
      </Dialog>

      {showRegistration && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-50">
          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4">
              <div className="w-full max-w-4xl">
                <div className="bg-white rounded-lg shadow-xl">
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-6">
                      <h2 className="text-2xl font-bold">Customer Registration</h2>
                      <Button
                        variant="ghost"
                        onClick={() => setShowRegistration(false)}
                        className="h-8 w-8 p-0"
                      >
                        ×
                      </Button>
                    </div>
                    
                    <div className="bg-emerald-50 rounded-lg p-6">
                      <p className="text-center text-gray-600 mb-4">
                        Complete your registration to access our marketplace
                      </p>
                      
                      <div className="space-y-4">
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <Phone className="w-4 h-4" />
                          Phone verification with OTP
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <User className="w-4 h-4" />
                          Basic information collection
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                          </svg>
                          Location mapping with Google Maps
                        </div>
                      </div>
                      
                      <div className="mt-6 text-center">
                        <p className="text-sm text-gray-500">
                          Click anywhere outside or press the × button to close this dialog
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};