
import { useState } from 'react';
import { toast } from 'sonner';

interface OTPState {
  phoneNumber: string;
  otpSent: boolean;
  otpVerified: boolean;
  generatedOTP: string;
}

export const usePhoneOTP = () => {
  const [otpState, setOtpState] = useState<OTPState>({
    phoneNumber: '',
    otpSent: false,
    otpVerified: false,
    generatedOTP: ''
  });
  const [isLoading, setIsLoading] = useState(false);

  const sendOTP = async (phoneNumber: string) => {
    setIsLoading(true);
    try {
      // Generate a random 4-digit OTP
      const otp = Math.floor(1000 + Math.random() * 9000).toString();
      
      // In a real app, you would send this OTP via SMS service
      // For demo purposes, we'll just store it and show it in the console
      console.log(`OTP for ${phoneNumber}: ${otp}`);
      
      setOtpState({
        phoneNumber,
        otpSent: true,
        otpVerified: false,
        generatedOTP: otp
      });
      
      toast.success(`OTP sent to ${phoneNumber}. Check console for demo OTP: ${otp}`);
      return { success: true };
    } catch (error) {
      console.error('Error sending OTP:', error);
      toast.error('Failed to send OTP. Please try again.');
      return { success: false, error };
    } finally {
      setIsLoading(false);
    }
  };

  const verifyOTP = async (enteredOTP: string) => {
    setIsLoading(true);
    try {
      if (enteredOTP === otpState.generatedOTP) {
        setOtpState(prev => ({
          ...prev,
          otpVerified: true
        }));
        toast.success('OTP verified successfully!');
        return { success: true };
      } else {
        toast.error('Invalid OTP. Please try again.');
        return { success: false, error: 'Invalid OTP' };
      }
    } catch (error) {
      console.error('Error verifying OTP:', error);
      toast.error('Failed to verify OTP. Please try again.');
      return { success: false, error };
    } finally {
      setIsLoading(false);
    }
  };

  const resetOTP = () => {
    setOtpState({
      phoneNumber: '',
      otpSent: false,
      otpVerified: false,
      generatedOTP: ''
    });
  };

  return {
    otpState,
    isLoading,
    sendOTP,
    verifyOTP,
    resetOTP
  };
};
