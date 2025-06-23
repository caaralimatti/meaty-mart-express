
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
      
      // Create email from mobile number if no email provided
      const email = authData.email || `${authData.mobileNumber}@quickgoat.seller`;
      
      // First, try to sign up the user
      const { data: authUser, error: authError } = await supabase.auth.signUp({
        email: email,
        password: authData.mobileNumber, // Using mobile as password for simplicity
        options: {
          data: {
            phone: authData.mobileNumber,
            user_type: 'seller',
            full_name: authData.type === 'Individual' 
              ? `${authData.firstName} ${authData.lastName || ''}`
              : authData.entityFullName
          }
        }
      });

      if (authError) {
        // If user already exists, try to sign in instead
        if (authError.message.includes('already registered')) {
          const { data: signInData, error: signInError } = await supabase.auth.signInWithPassword({
            email: email,
            password: authData.mobileNumber
          });

          if (signInError) throw signInError;
          
          // Check if seller profile exists
          if (signInData.user) {
            const { data: seller } = await supabase
              .from('sellers')
              .select('*')
              .eq('user_id', signInData.user.id)
              .single();

            if (seller) {
              toast.success('Login successful! Welcome back to QuickGoat');
              onSuccess();
              return;
            }
          }
        } else {
          throw authError;
        }
      }

      const user = authUser?.user || authUser?.user;
      if (user) {
        // Create seller profile
        const sellerName = authData.type === 'Individual' 
          ? `${authData.firstName} ${authData.lastName || ''}`.trim()
          : authData.entityFullName;

        const { error: sellerError } = await supabase
          .from('sellers')
          .insert({
            user_id: user.id,
            seller_name: sellerName,
            seller_type: authData.typeOfSeller,
            contact_email: authData.email,
            contact_phone: authData.mobileNumber,
            user_type: 'seller'
          });

        if (sellerError) {
          console.error('Seller profile creation error:', sellerError);
          // If seller profile already exists, that's okay
          if (!sellerError.message.includes('duplicate key')) {
            throw sellerError;
          }
        }

        toast.success('Registration successful! Welcome to QuickGoat Seller Portal');
        onSuccess();
      }
    } catch (error: any) {
      console.error('Registration error:', error);
      toast.error(error.message || 'Registration failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const loginSeller = async (phoneNumber: string, onSuccess: () => void) => {
    try {
      setIsLoading(true);
      
      // Try to sign in with phone number as email and password
      const email = `${phoneNumber}@quickgoat.seller`;
      const { data: authUser, error: authError } = await supabase.auth.signInWithPassword({
        email: email,
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
    } catch (error: any) {
      console.error('Login error:', error);
      toast.error('Login failed. Please check your credentials or register first.');
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
