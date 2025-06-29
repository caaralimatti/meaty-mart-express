
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

export interface SellerProfile {
  id: string;
  user_id: string;
  seller_name: string;
  seller_type: 'Meat' | 'Livestock' | 'Both';
  contact_email?: string;
  contact_phone?: string;
  meat_shop_status: boolean;
  livestock_status: boolean;
  created_at: string;
  updated_at: string;
}

export const useSellerData = () => {
  const [sellerProfile, setSellerProfile] = useState<SellerProfile | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchSellerData = async () => {
    try {
      console.log('Fetching seller data...');
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session?.user) {
        console.log('No authenticated user found');
        setSellerProfile(null);
        setLoading(false);
        return;
      }

      console.log('User authenticated, fetching seller profile for:', session.user.id);

      const { data: seller, error } = await supabase
        .from('sellers')
        .select('*')
        .eq('user_id', session.user.id)
        .single();

      if (error && error.code !== 'PGRST116') {
        console.error('Error fetching seller profile:', error);
        throw error;
      }

      if (seller) {
        console.log('Seller profile found:', seller);
        setSellerProfile(seller as SellerProfile);
      } else {
        console.log('No seller profile found');
        setSellerProfile(null);
      }
    } catch (error: any) {
      console.error('Error in fetchSellerData:', error);
      toast.error('Failed to load seller profile');
      setSellerProfile(null);
    } finally {
      setLoading(false);
    }
  };

  const refreshSellerData = async () => {
    setLoading(true);
    await fetchSellerData();
  };

  useEffect(() => {
    fetchSellerData();

    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      console.log('Auth state changed:', event, 'Session exists:', !!session);
      
      if (event === 'SIGNED_IN' || event === 'TOKEN_REFRESHED') {
        // Delay to ensure everything is ready
        setTimeout(() => {
          fetchSellerData();
        }, 1000);
      } else if (event === 'SIGNED_OUT') {
        setSellerProfile(null);
        setLoading(false);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const updateShopStatus = async (shopType: 'meat' | 'livestock', status: boolean) => {
    if (!sellerProfile) return;

    try {
      const updateField = shopType === 'meat' ? 'meat_shop_status' : 'livestock_status';
      
      const { error } = await supabase
        .from('sellers')
        .update({ [updateField]: status })
        .eq('id', sellerProfile.id);

      if (error) throw error;

      setSellerProfile(prev => prev ? {
        ...prev,
        [updateField]: status
      } : null);

      toast.success(`${shopType === 'meat' ? 'Meat shop' : 'Livestock'} status updated successfully`);
    } catch (error: any) {
      console.error('Error updating shop status:', error);
      toast.error('Failed to update shop status');
    }
  };

  return {
    sellerProfile,
    loading,
    updateShopStatus,
    refreshSellerData
  };
};
