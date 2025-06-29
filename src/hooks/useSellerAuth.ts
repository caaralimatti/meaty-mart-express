
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

  const createSellerDirectly = async (authData: SellerAuthData) => {
    const sellerName = authData.type === 'Individual' 
      ? `${authData.firstName} ${authData.lastName || ''}`.trim()
      : authData.entityFullName;

    console.log('Creating seller profile directly without Supabase auth');

    // Check if seller already exists by phone number
    const { data: existingSeller, error: checkError } = await supabase
      .from('sellers')
      .select('*')
      .eq('contact_phone', authData.mobileNumber)
      .single();

    if (checkError && checkError.code !== 'PGRST116') {
      console.error('Error checking existing seller:', checkError);
      throw checkError;
    }

    if (existingSeller) {
      console.log('Seller already exists, returning existing profile');
      return existingSeller;
    }

    // Create new seller using a dummy user_id since we're not using Supabase auth
    const dummyUserId = crypto.randomUUID();
    
    const { data: newSeller, error: sellerError } = await supabase
      .from('sellers')
      .insert({
        user_id: dummyUserId,
        seller_name: sellerName,
        seller_type: authData.typeOfSeller,
        contact_email: authData.email,
        contact_phone: authData.mobileNumber,
        user_type: 'seller',
        meat_shop_status: authData.typeOfSeller === 'Meat' || authData.typeOfSeller === 'Both',
        livestock_status: authData.typeOfSeller === 'Livestock' || authData.typeOfSeller === 'Both'
      })
      .select()
      .single();

    if (sellerError) {
      console.error('Seller profile creation error:', sellerError);
      throw sellerError;
    }
    
    console.log('Seller profile created successfully:', newSeller);
    return newSeller;
  };

  const registerSeller = async (authData: SellerAuthData, onSuccess: () => void) => {
    try {
      setIsLoading(true);
      console.log('Starting phone-only seller registration for:', authData.mobileNumber);
      
      // Create seller profile directly without Supabase auth
      const sellerProfile = await createSellerDirectly(authData);
      
      // Store seller session in localStorage for our custom session management
      const customSession = {
        seller: sellerProfile,
        phone: authData.mobileNumber,
        loginTime: new Date().toISOString(),
        additionalData: {
          type: authData.type,
          address: authData.address || authData.registeredAddress,
          pincode: authData.pincode,
          aadhaarNumber: authData.aadhaarNumber,
          gstin: authData.gstin
        }
      };
      
      localStorage.setItem('quickgoat_seller_session', JSON.stringify(customSession));
      
      toast.success('Registration successful! Welcome to QuickGoat Seller Portal');
      setTimeout(() => {
        onSuccess();
      }, 500);
      
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
      console.log('Attempting seller login for phone:', phoneNumber);
      
      // Find seller by phone number
      const { data: seller, error: sellerError } = await supabase
        .from('sellers')
        .select('*')
        .eq('contact_phone', phoneNumber)
        .single();

      if (sellerError || !seller) {
        console.error('Login error - seller not found:', sellerError);
        toast.error('Phone number not found. Please register first.');
        return;
      }

      // Create custom session
      const customSession = {
        seller: seller,
        phone: phoneNumber,
        loginTime: new Date().toISOString()
      };
      
      localStorage.setItem('quickgoat_seller_session', JSON.stringify(customSession));
      
      console.log('Seller login successful');
      toast.success('Login successful! Welcome back to QuickGoat');
      setTimeout(() => {
        onSuccess();
      }, 500);
      
    } catch (error: any) {
      console.error('Login error:', error);
      toast.error('Login failed. Please try again.');
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
