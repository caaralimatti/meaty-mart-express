
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

export interface SellerProfile {
  id: string;
  seller_name: string;
  seller_type: 'Meat' | 'Livestock' | 'Both';
  contact_email?: string;
  contact_phone?: string;
  meat_shop_status: boolean;
  livestock_status: boolean;
}

export const useSellerData = () => {
  const [sellerProfile, setSellerProfile] = useState<SellerProfile | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchSellerProfile = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data, error } = await supabase
        .from('sellers')
        .select('*')
        .eq('user_id', user.id)
        .single();

      if (error && error.code !== 'PGRST116') {
        throw error;
      }

      setSellerProfile(data);
    } catch (error) {
      console.error('Error fetching seller profile:', error);
      toast.error('Failed to load seller profile');
    } finally {
      setLoading(false);
    }
  };

  const updateShopStatus = async (type: 'meat' | 'livestock', status: boolean) => {
    if (!sellerProfile) return;

    try {
      const updateField = type === 'meat' ? 'meat_shop_status' : 'livestock_status';
      
      const { error } = await supabase
        .from('sellers')
        .update({ [updateField]: status })
        .eq('id', sellerProfile.id);

      if (error) throw error;

      setSellerProfile(prev => prev ? {
        ...prev,
        [updateField]: status
      } : null);

      toast.success(`${type === 'meat' ? 'Meat shop' : 'Livestock'} status updated`);
    } catch (error) {
      console.error('Error updating shop status:', error);
      toast.error('Failed to update shop status');
    }
  };

  useEffect(() => {
    fetchSellerProfile();
  }, []);

  return {
    sellerProfile,
    loading,
    updateShopStatus,
    refetch: fetchSellerProfile
  };
};
