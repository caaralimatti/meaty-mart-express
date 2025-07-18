import { supabase } from '@/integrations/supabase/client';

export interface CustomerProfile {
  id: string;
  full_name: string;
  phone_number: string;
  email?: string;
  address?: string;
  business_address?: string;
  business_city?: string;
  business_pincode?: string;
  gstin?: string;
  fssai_license?: string;
  bank_account_number?: string;
  ifsc_code?: string;
  account_holder_name?: string;
  business_logo_url?: string;
  aadhaar_number?: string;
  notification_email?: boolean;
  notification_sms?: boolean;
  notification_push?: boolean;
  created_at: string;
  updated_at: string;
}

export interface CustomerProfileUpdate {
  full_name?: string;
  email?: string;
  address?: string;
  business_address?: string;
  business_city?: string;
  business_pincode?: string;
  gstin?: string;
  fssai_license?: string;
  bank_account_number?: string;
  ifsc_code?: string;
  account_holder_name?: string;
  business_logo_url?: string;
  aadhaar_number?: string;
  notification_email?: boolean;
  notification_sms?: boolean;
  notification_push?: boolean;
}

export const customerService = {
  async getProfile(customerId: string): Promise<CustomerProfile | null> {
    const { data, error } = await supabase
      .from('customers')
      .select('*')
      .eq('id', customerId)
      .single();

    if (error) {
      console.error('Error fetching customer profile:', error);
      return null;
    }

    return data;
  },

  async updateProfile(customerId: string, updates: CustomerProfileUpdate): Promise<{
    success: boolean;
    error?: string;
  }> {
    try {
      // Call the edge function for secure profile updates with audit trail
      const { data, error } = await supabase.functions.invoke('customer-profile-update', {
        body: {
          customerId,
          updates,
          changeReason: 'Profile update by customer'
        }
      });

      if (error) {
        throw error;
      }

      return { success: true };
    } catch (error: any) {
      console.error('Error updating customer profile:', error);
      return {
        success: false,
        error: error.message || 'Failed to update profile'
      };
    }
  },

  async getAuditLog(customerId: string): Promise<any[]> {
    const { data, error } = await supabase
      .from('customer_profile_audit')
      .select('*')
      .eq('customer_id', customerId)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching audit log:', error);
      return [];
    }

    return data || [];
  }
};