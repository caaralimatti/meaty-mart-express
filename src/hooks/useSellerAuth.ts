
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
      
      const email = authData.email || `${authData.mobileNumber}@quickgoat.com`;
      
      console.log('Starting seller registration for:', email);
      
      const { data: authResult, error: authError } = await supabase.auth.signUp({
        email: email,
        password: authData.mobileNumber,
        options: {
          data: {
            phone: authData.mobileNumber,
            user_type: 'seller',
            full_name: authData.type === 'Individual' 
              ? `${authData.firstName} ${authData.lastName || ''}`.trim()
              : authData.entityFullName
          }
        }
      });

      if (authError) {
        console.error('Auth error:', authError);
        
        if (authError.message.includes('already registered') || authError.message.includes('already been registered')) {
          console.log('User exists, trying to sign in...');
          
          const { data: signInData, error: signInError } = await supabase.auth.signInWithPassword({
            email: email,
            password: authData.mobileNumber
          });

          if (signInError) {
            console.error('Sign in error:', signInError);
            throw signInError;
          }
          
          if (signInData.user) {
            // Wait for session to be established
            await new Promise(resolve => setTimeout(resolve, 1500));
            
            const { data: seller, error: sellerFetchError } = await supabase
              .from('sellers')
              .select('*')
              .eq('user_id', signInData.user.id)
              .single();

            if (sellerFetchError && sellerFetchError.code !== 'PGRST116') {
              console.error('Error fetching seller profile:', sellerFetchError);
              // If seller profile doesn't exist, create it
              await createSellerProfile(signInData.user.id, authData);
            }

            if (!seller) {
              await createSellerProfile(signInData.user.id, authData);
            }
            
            toast.success('Registration completed! Welcome to QuickGoat Seller Portal');
            // Add small delay before calling onSuccess to ensure state is updated
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
        
        // Wait for authentication session to be fully established
        let sessionEstablished = false;
        let attempts = 0;
        const maxAttempts = 15;
        
        while (!sessionEstablished && attempts < maxAttempts) {
          await new Promise(resolve => setTimeout(resolve, 1000));
          
          const { data: { session }, error: sessionError } = await supabase.auth.getSession();
          
          if (!sessionError && session && session.user.id === authResult.user.id) {
            sessionEstablished = true;
            console.log('Session established successfully');
            break;
          }
          
          attempts++;
          console.log(`Waiting for session... attempt ${attempts}/${maxAttempts}`);
        }
        
        console.log('Creating seller profile...');
        await createSellerProfile(authResult.user.id, authData);
        
        toast.success('Registration successful! Welcome to QuickGoat Seller Portal');
        // Add delay before calling onSuccess to ensure everything is ready
        setTimeout(() => {
          onSuccess();
        }, 1000);
      } else {
        throw new Error('User creation failed - no user object returned');
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
        // Wait for session to be established
        await new Promise(resolve => setTimeout(resolve, 1500));
        
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
        // Add delay before calling onSuccess
        setTimeout(() => {
          onSuccess();
        }, 500);
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
