
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

  const createSellerProfile = async (userId: string, authData: SellerAuthData) => {
    const sellerName = authData.type === 'Individual' 
      ? `${authData.firstName} ${authData.lastName || ''}`.trim()
      : authData.entityFullName;

    console.log('Creating seller profile for user:', userId);

    if (!userId) {
      throw new Error('User ID is required to create seller profile');
    }

    const { error: sellerError } = await supabase
      .from('sellers')
      .insert({
        user_id: userId,
        seller_name: sellerName,
        seller_type: authData.typeOfSeller,
        contact_email: authData.email,
        contact_phone: authData.mobileNumber,
        user_type: 'seller'
      });

    if (sellerError) {
      console.error('Seller profile creation error:', sellerError);
      throw sellerError;
    }
    
    console.log('Seller profile created successfully');
  };

  const registerSeller = async (authData: SellerAuthData, onSuccess: () => void) => {
    try {
      setIsLoading(true);
      
      // Create a simple email based on phone number (no email confirmation needed)
      const email = authData.email || `${authData.mobileNumber}@quickgoat.com`;
      const password = authData.mobileNumber; // Use phone as password for simplicity
      
      console.log('Starting seller registration for:', email);
      
      // First, try to sign up without email confirmation
      const { data: authResult, error: authError } = await supabase.auth.signUp({
        email: email,
        password: password,
        options: {
          data: {
            phone: authData.mobileNumber,
            user_type: 'seller',
            full_name: authData.type === 'Individual' 
              ? `${authData.firstName} ${authData.lastName || ''}`.trim()
              : authData.entityFullName
          },
          emailRedirectTo: undefined // Disable email confirmation
        }
      });

      if (authError) {
        console.error('Auth error:', authError);
        
        // If user already exists, try to sign in
        if (authError.message.includes('already registered') || authError.message.includes('already been registered')) {
          console.log('User exists, trying to sign in...');
          
          const { data: signInData, error: signInError } = await supabase.auth.signInWithPassword({
            email: email,
            password: password
          });

          if (signInError) {
            console.error('Sign in error:', signInError);
            throw signInError;
          }
          
          if (signInData.user) {
            // Check if seller profile exists
            const { data: seller } = await supabase
              .from('sellers')
              .select('*')
              .eq('user_id', signInData.user.id)
              .single();

            if (!seller) {
              await createSellerProfile(signInData.user.id, authData);
            }
            
            toast.success('Registration completed! Welcome to QuickGoat Seller Portal');
            setTimeout(() => {
              onSuccess();
            }, 500);
            return;
          }
        } else {
          throw authError;
        }
      }

      if (authResult?.user) {
        console.log('User created successfully:', authResult.user.id);
        
        // Create seller profile immediately
        await createSellerProfile(authResult.user.id, authData);
        
        toast.success('Registration successful! Welcome to QuickGoat Seller Portal');
        setTimeout(() => {
          onSuccess();
        }, 1000);
      } else {
        throw new Error('User creation failed - no user object returned');
      }
      
    } catch (error: any) {
      console.error('Registration error:', error);
      
      // Handle specific error cases
      if (error.message?.includes('rate limit')) {
        toast.error('Too many registration attempts. Please wait a few minutes and try again.');
      } else {
        toast.error(error.message || 'Registration failed. Please try again.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const loginSeller = async (phoneNumber: string, onSuccess: () => void) => {
    try {
      setIsLoading(true);
      
      const email = `${phoneNumber}@quickgoat.com`;
      console.log('Attempting seller login for:', email);
      
      const { data: authUser, error: authError } = await supabase.auth.signInWithPassword({
        email: email,
        password: phoneNumber
      });

      if (authError) {
        console.error('Login error:', authError);
        throw authError;
      }

      if (authUser.user) {
        // Check if user is a seller
        const { data: seller, error: sellerError } = await supabase
          .from('sellers')
          .select('*')
          .eq('user_id', authUser.user.id)
          .single();

        if (sellerError && sellerError.code !== 'PGRST116') {
          console.error('Error fetching seller:', sellerError);
          throw sellerError;
        }

        if (!seller) {
          toast.error('Seller account not found. Please register first.');
          await supabase.auth.signOut();
          return;
        }

        console.log('Seller login successful');
        toast.success('Login successful! Welcome back to QuickGoat');
        setTimeout(() => {
          onSuccess();
        }, 500);
      }
    } catch (error: any) {
      console.error('Login error:', error);
      
      if (error.message?.includes('Invalid login credentials')) {
        toast.error('Phone number not found. Please register first or check your phone number.');
      } else {
        toast.error('Login failed. Please check your credentials or register first.');
      }
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
