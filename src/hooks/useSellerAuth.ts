
import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { odooService } from '@/services/odooService';
import { toast } from 'sonner';

export interface SellerAuthData {
  type: 'Individual' | 'Registered';
  typeOfSeller: 'Meat' | 'Livestock' | 'Both';
  firstName?: string;
  lastName?: string;
  entityFullName?: string;
  address?: string;
  registeredAddress?: string;
  city?: string;
  pincode: string;
  mobileNumber: string;
  aadhaarNumber?: string;
  gstin?: string;
  email?: string;
}

export const useSellerAuth = () => {
  const [isLoading, setIsLoading] = useState(false);

  const loadOdooConfiguration = () => {
    try {
      const savedConfig = localStorage.getItem('odooConfig');
      if (savedConfig) {
        const parsedConfig = JSON.parse(savedConfig);
        return {
          serverUrl: parsedConfig.serverUrl || 'https://goatgoat.xyz/',
          database: parsedConfig.database || 'staging',
          username: parsedConfig.username || 'admin',
          password: parsedConfig.password || 'admin'
        };
      }
    } catch (error) {
      console.error('Error loading Odoo configuration:', error);
    }
    
    // Return default configuration if no saved config or error
    return {
      serverUrl: 'https://goatgoat.xyz/',
      database: 'staging',
      username: 'admin',
      password: 'admin'
    };
  };

  const createOdooCustomerAndApproval = async (authData: SellerAuthData, sellerId: string) => {
    try {
      console.log('Starting Odoo authentication and customer creation...');
      
      // Load and set dynamic Odoo configuration
      const odooConfig = loadOdooConfiguration();
      console.log('Using Odoo configuration:', { 
        serverUrl: odooConfig.serverUrl, 
        database: odooConfig.database, 
        username: odooConfig.username 
      });
      
      odooService.setConfig(odooConfig);
      
      const isAuthenticated = await odooService.authenticate();
      if (!isAuthenticated) {
        throw new Error('Failed to authenticate with Odoo - check Configuration Status');
      }
      
      console.log('Odoo authentication successful, creating customer...');
      
      const customerData = {
        company_type: authData.type === 'Individual' ? 'person' : 'company',
        name: authData.type === 'Individual' 
          ? `${authData.firstName} ${authData.lastName || ''}`.trim()
          : authData.entityFullName,
        phone: authData.mobileNumber,
        email: authData.email || '',
        street: authData.address || authData.registeredAddress,
        zip: authData.pincode,
        city: authData.city || '',
        is_company: authData.type === 'Registered',
        supplier_rank: 1,
        customer_rank: 0,
      };
      
      console.log('Creating Odoo customer with data:', customerData);
      
      const odooCustomerId = await odooService.createCustomer(customerData);
      
      if (odooCustomerId) {
        // Create seller approval record with unique webhook ID
        const webhookId = `seller_${sellerId}_${Date.now()}`;
        
        const { error: approvalError } = await supabase
          .from('seller_approvals')
          .insert({
            seller_id: sellerId,
            odoo_partner_id: odooCustomerId,
            webhook_id: webhookId,
            submitted_at: new Date().toISOString()
          });

        if (approvalError) {
          console.error('Error creating seller approval record:', approvalError);
        } else {
          console.log('Seller approval record created with webhook ID:', webhookId);
        }
        
        toast.success('Registration submitted for approval!');
        return odooCustomerId;
      } else {
        console.warn('Failed to create Odoo customer');
        toast.warning('Registration successful locally, but pending Odoo integration');
        return null;
      }
    } catch (error: any) {
      console.error('Odoo integration error:', error);
      toast.warning(`Registration successful locally: ${error.message}`);
      return null;
    }
  };

  const createSellerDirectly = async (authData: SellerAuthData, odooCustomerId?: number | null) => {
    const sellerName = authData.type === 'Individual' 
      ? `${authData.firstName} ${authData.lastName || ''}`.trim()
      : authData.entityFullName;

    console.log('Creating seller profile directly without Supabase auth');

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

    const sellerData = {
      seller_name: sellerName,
      seller_type: authData.typeOfSeller,
      contact_email: authData.email,
      contact_phone: authData.mobileNumber,
      user_type: 'seller' as 'seller',
      meat_shop_status: authData.typeOfSeller === 'Meat' || authData.typeOfSeller === 'Both',
      livestock_status: authData.typeOfSeller === 'Livestock' || authData.typeOfSeller === 'Both',
      approval_status: 'pending' as 'pending'
    };

    const { data: newSeller, error: sellerError } = await supabase
      .from('sellers')
      .insert(sellerData)
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
      
      const sellerProfile = await createSellerDirectly(authData);
      
      // Create Odoo customer and approval record
      await createOdooCustomerAndApproval(authData, sellerProfile.id);
      
      const customSession = {
        seller: sellerProfile,
        phone: authData.mobileNumber,
        loginTime: new Date().toISOString(),
        additionalData: {
          type: authData.type,
          address: authData.address || authData.registeredAddress,
          city: authData.city,
          pincode: authData.pincode,
          aadhaarNumber: authData.aadhaarNumber,
          gstin: authData.gstin
        }
      };
      
      localStorage.setItem('quickgoat_seller_session', JSON.stringify(customSession));
      
      toast.success('Registration successful! Redirecting to dashboard...');
      setTimeout(() => {
        onSuccess();
      }, 1500);
      
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

      const customSession = {
        seller: seller,
        phone: phoneNumber,
        loginTime: new Date().toISOString()
      };
      
      localStorage.setItem('quickgoat_seller_session', JSON.stringify(customSession));
      
      console.log('Seller login successful');
      toast.success('Login successful! Redirecting to dashboard...');
      setTimeout(() => {
        onSuccess();
      }, 1500);
      
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
