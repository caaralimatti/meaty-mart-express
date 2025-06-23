
import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

export interface SellerAuthData {
  type: 'Individual' | 'Registered';
  typeOfSeller: 'Meat' | 'Livestock' | 'Both';
  firstName?: string;
  lastName?: string;
  entityFullName?: string;
  address?: string;
  registeredAddress?: string;
  pincode: string;
  mobileNumber: string;
  aadhaarNumber?: string;
  gstin?: string;
  email?: string;
}

export const useSellerAuth = () => {
  const [isLoading, setIsLoading] = useState(false);

  const registerSeller = async (authData: SellerAuthData, onSuccess: () => void) => {
    try {
      setIsLoading(true);
      
      // First, authenticate the user with Supabase
      const { data: authUser, error: authError } = await supabase.auth.signUp({
        email: authData.email || `${authData.mobileNumber}@quickgoat.com`,
        password: authData.mobileNumber, // Using mobile as password for now
        options: {
          data: {
            phone: authData.mobileNumber,
            user_type: 'seller'
          }
        }
      });

      if (authError) throw authError;

      if (authUser.user) {
        // Create seller profile
        const sellerName = authData.type === 'Individual' 
          ? `${authData.firstName} ${authData.lastName || ''}`
          : authData.entityFullName;

        const { error: sellerError } = await supabase
          .from('sellers')
          .insert({
            user_id: authUser.user.id,
            seller_name: sellerName,
            seller_type: authData.typeOfSeller,
            contact_email: authData.email,
            contact_phone: authData.mobileNumber,
            user_type: 'seller'
          });

        if (sellerError) throw sellerError;

        toast.success('Registration successful! Welcome to QuickGoat Seller Portal');
        onSuccess();
      }
    } catch (error) {
      console.error('Registration error:', error);
      toast.error('Registration failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const loginSeller = async (phoneNumber: string, onSuccess: () => void) => {
    try {
      setIsLoading(true);
      
      // Try to sign in with phone number as email and password
      const { data: authUser, error: authError } = await supabase.auth.signInWithPassword({
        email: `${phoneNumber}@quickgoat.com`,
        password: phoneNumber
      });

      if (authError) throw authError;

      if (authUser.user) {
        // Check if user is a seller
        const { data: seller, error: sellerError } = await supabase
          .from('sellers')
          .select('*')
          .eq('user_id', authUser.user.id)
          .single();

        if (sellerError || !seller) {
          toast.error('Seller account not found. Please register first.');
          await supabase.auth.signOut();
          return;
        }

        toast.success('Login successful! Welcome back to QuickGoat');
        onSuccess();
      }
    } catch (error) {
      console.error('Login error:', error);
      toast.error('Login failed. Please check your credentials.');
    } finally {
      setIsLoading(false);
    }
  };

  return {
    registerSeller,
    loginSeller,
    isLoading
  };
};
