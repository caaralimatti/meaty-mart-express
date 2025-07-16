
import { useState } from 'react';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';

interface OTPState {
  phoneNumber: string;
  otpSent: boolean;
  otpVerified: boolean;
  sellerExists: boolean | null;
}

export const usePhoneOTP = () => {
  const [otpState, setOtpState] = useState<OTPState>({
    phoneNumber: '',
    otpSent: false,
    otpVerified: false,
    sellerExists: null
  });
  const [isLoading, setIsLoading] = useState(false);

  const checkSellerExists = async (phoneNumber: string) => {
    try {
      const { data, error } = await supabase
        .from('sellers')
        .select('id')
        .eq('contact_phone', phoneNumber)
        .single();

      if (error && error.code !== 'PGRST116') {
        console.error('Error checking seller:', error);
        return false;
      }

      return !!data;
    } catch (error) {
      console.error('Error checking seller existence:', error);
      return false;
    }
  };

  const sendOTP = async (phoneNumber: string) => {
    setIsLoading(true);
    try {
      // Check if seller exists
      const exists = await checkSellerExists(phoneNumber);
      
      // Send OTP via Fast2SMS
      const { data, error } = await supabase.functions.invoke('fast2sms-otp', {
        body: { 
          action: 'send', 
          phoneNumber: phoneNumber 
        }
      });

      if (error) {
        console.error('Error sending OTP:', error);
        toast.error('Failed to send OTP. Please try again.');
        return { success: false, error };
      }

      if (!data.success) {
        toast.error(data.error || 'Failed to send OTP. Please try again.');
        return { success: false, error: data.error };
      }

      setOtpState({
        phoneNumber,
        otpSent: true,
        otpVerified: false,
        sellerExists: exists
      });

      // Show success message with demo OTP (remove in production)
      toast.success(`OTP sent to ${phoneNumber}. Demo OTP: ${data.otp}`);
      return { success: true, sellerExists: exists };
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
      const { data, error } = await supabase.functions.invoke('fast2sms-otp', {
        body: { 
          action: 'verify', 
          phoneNumber: otpState.phoneNumber, 
          otp: enteredOTP 
        }
      });

      if (error) {
        console.error('Error verifying OTP:', error);
        toast.error('Failed to verify OTP. Please try again.');
        return { success: false, error };
      }

      if (!data.success) {
        toast.error(data.error || 'Invalid OTP. Please try again.');
        return { success: false, error: data.error };
      }

      setOtpState(prev => ({
        ...prev,
        otpVerified: true
      }));

      toast.success('OTP verified successfully!');
      return { success: true, sellerExists: otpState.sellerExists };
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
      sellerExists: null
    });
  };

  return {
    otpState,
    isLoading,
    sendOTP,
    verifyOTP,
    resetOTP,
    checkSellerExists
  };
};
