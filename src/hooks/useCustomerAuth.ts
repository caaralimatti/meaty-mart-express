import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export interface CustomerData {
  fullName: string;
  phoneNumber: string;
  email?: string;
  latitude?: number;
  longitude?: number;
  address?: string;
}

export const useCustomerAuth = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const registerCustomer = async (customerData: CustomerData): Promise<{ success: boolean; error?: string }> => {
    setIsLoading(true);
    
    try {
      // Generate a unique customer ID
      const customerId = crypto.randomUUID();
      
      // Create customer profile directly (no auth user needed)
      const { error: profileError } = await supabase
        .from('customers')
        .insert({
          id: customerId,
          user_id: null, // No auth user
          full_name: customerData.fullName,
          phone_number: customerData.phoneNumber,
          email: customerData.email,
          location_latitude: customerData.latitude,
          location_longitude: customerData.longitude,
          address: customerData.address
        });

      if (profileError) throw profileError;

      // Create customer in Odoo
      try {
        const { data: odooData, error: odooError } = await supabase.functions.invoke('create-odoo-customer', {
          body: {
            name: customerData.fullName,
            phone: customerData.phoneNumber,
            email: customerData.email,
            address: customerData.address,
            customer_id: customerId
          }
        });

        if (odooError) {
          console.error('Odoo customer creation failed:', odooError);
          // Don't fail the registration if Odoo sync fails
        }
      } catch (odooError) {
        console.error('Odoo integration error:', odooError);
      }

      // Store customer session
      localStorage.setItem('meaty_mart_customer_session', JSON.stringify({
        customerId: customerId,
        phoneNumber: customerData.phoneNumber,
        fullName: customerData.fullName,
        timestamp: new Date().toISOString()
      }));

      toast({
        title: "Registration Successful!",
        description: "Welcome to Meaty Mart Express",
      });

      return { success: true };
    } catch (error: any) {
      console.error('Customer registration error:', error);
      toast({
        title: "Registration Failed",
        description: error.message || "Please try again later",
        variant: "destructive",
      });
      return { success: false, error: error.message };
    } finally {
      setIsLoading(false);
    }
  };

  const loginCustomer = async (phoneNumber: string): Promise<{ success: boolean; error?: string }> => {
    setIsLoading(true);
    
    try {
      // Check if customer exists
      const { data: customer, error: customerError } = await supabase
        .from('customers')
        .select('*')
        .eq('phone_number', phoneNumber)
        .single();

      if (customerError || !customer) {
        throw new Error('Customer not found. Please register first.');
      }

      // Create session
      localStorage.setItem('meaty_mart_customer_session', JSON.stringify({
        customerId: customer.id,
        phoneNumber: customer.phone_number,
        fullName: customer.full_name,
        timestamp: new Date().toISOString()
      }));

      toast({
        title: "Login Successful!",
        description: `Welcome back, ${customer.full_name}`,
      });

      return { success: true };
    } catch (error: any) {
      console.error('Customer login error:', error);
      toast({
        title: "Login Failed",
        description: error.message || "Please try again later",
        variant: "destructive",
      });
      return { success: false, error: error.message };
    } finally {
      setIsLoading(false);
    }
  };

  return {
    registerCustomer,
    loginCustomer,
    isLoading
  };
};