
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

export interface SellerProfile {
  id: string;
  user_id?: string;
  seller_name: string;
  seller_type: 'Meat' | 'Livestock' | 'Both';
  contact_email?: string;
  contact_phone?: string;
  meat_shop_status: boolean;
  livestock_status: boolean;
  approval_status: 'pending' | 'approved' | 'rejected';
  approved_at?: string;
  created_at: string;
  updated_at: string;
  metadata?: any;
}

export const useSellerData = () => {
  const [sellerProfile, setSellerProfile] = useState<SellerProfile | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchSellerData = async () => {
    try {
      console.log('Fetching seller data from custom session...');
      
      const sessionData = localStorage.getItem('quickgoat_seller_session');
      if (!sessionData) {
        console.log('No seller session found');
        setSellerProfile(null);
        setLoading(false);
        return;
      }

      const customSession = JSON.parse(sessionData);
      console.log('Custom session found:', customSession);

      const { data: seller, error } = await supabase
        .from('sellers')
        .select('*')
        .eq('id', customSession.seller.id)
        .single();

      if (error && error.code !== 'PGRST116') {
        console.error('Error fetching seller profile:', error);
        throw error;
      }

      if (seller) {
        console.log('Seller profile found:', seller);
        setSellerProfile(seller as SellerProfile);
      } else {
        console.log('Seller profile not found, clearing session');
        localStorage.removeItem('quickgoat_seller_session');
        setSellerProfile(null);
      }
    } catch (error: any) {
      console.error('Error in fetchSellerData:', error);
      toast.error('Failed to load seller profile');
      localStorage.removeItem('quickgoat_seller_session');
      setSellerProfile(null);
    } finally {
      setLoading(false);
    }
  };

  const refreshSellerData = async () => {
    setLoading(true);
    await fetchSellerData();
  };

  const logoutSeller = () => {
    localStorage.removeItem('quickgoat_seller_session');
    setSellerProfile(null);
    console.log('Seller logged out');
  };

  useEffect(() => {
    fetchSellerData();
    
    // Listen for localStorage changes
    const handleStorageChange = () => {
      console.log('Storage changed, refetching seller data');
      fetchSellerData();
    };
    
    window.addEventListener('storage', handleStorageChange);
    
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
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
    refreshSellerData,
    logoutSeller
  };
};
