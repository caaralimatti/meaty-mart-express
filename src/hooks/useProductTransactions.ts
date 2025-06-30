
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

export interface ProductTransaction {
  id: string;
  meat_product_id: string;
  transaction_type: 'price_change' | 'status_change' | 'inventory_update' | 'sale';
  old_value: any;
  new_value: any;
  change_reason?: string;
  changed_by?: string;
  created_at: string;
}

export const useProductTransactions = (productId?: string) => {
  const [transactions, setTransactions] = useState<ProductTransaction[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchTransactions = async () => {
    if (!productId) return;

    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('product_transactions')
        .select(`
          *,
          sellers!changed_by(seller_name)
        `)
        .eq('meat_product_id', productId)
        .order('created_at', { ascending: false });

      if (error) throw error;
      
      // Type-safe transformation of the data
      const typedTransactions: ProductTransaction[] = (data || []).map(item => ({
        id: item.id,
        meat_product_id: item.meat_product_id,
        transaction_type: item.transaction_type as ProductTransaction['transaction_type'],
        old_value: item.old_value,
        new_value: item.new_value,
        change_reason: item.change_reason,
        changed_by: item.changed_by,
        created_at: item.created_at
      }));
      
      setTransactions(typedTransactions);
    } catch (error: any) {
      console.error('Error fetching transactions:', error);
      toast.error('Failed to load transaction history');
    } finally {
      setLoading(false);
    }
  };

  const addTransaction = async (
    productId: string,
    type: ProductTransaction['transaction_type'],
    oldValue: any,
    newValue: any,
    reason?: string,
    changedBy?: string
  ) => {
    try {
      const { error } = await supabase
        .from('product_transactions')
        .insert({
          meat_product_id: productId,
          transaction_type: type,
          old_value: oldValue,
          new_value: newValue,
          change_reason: reason,
          changed_by: changedBy
        });

      if (error) throw error;
      
      // Refresh transactions
      await fetchTransactions();
      
      toast.success('Transaction recorded successfully');
    } catch (error: any) {
      console.error('Error adding transaction:', error);
      toast.error('Failed to record transaction');
    }
  };

  const updateProductPrice = async (
    productId: string,
    oldPrice: number,
    newPrice: number,
    reason: string,
    sellerId: string
  ) => {
    try {
      // Update product price
      const { error: updateError } = await supabase
        .from('meat_products')
        .update({ price: newPrice })
        .eq('id', productId);

      if (updateError) throw updateError;

      // Record transaction
      await addTransaction(
        productId,
        'price_change',
        { price: oldPrice },
        { price: newPrice },
        reason,
        sellerId
      );

      toast.success('Product price updated successfully');
    } catch (error: any) {
      console.error('Error updating price:', error);
      toast.error('Failed to update product price');
    }
  };

  const toggleProductStatus = async (
    productId: string,
    currentStatus: boolean,
    reason: string,
    sellerId: string
  ) => {
    const newStatus = !currentStatus;
    
    try {
      // Update product status
      const { error: updateError } = await supabase
        .from('meat_products')
        .update({ is_active: newStatus })
        .eq('id', productId);

      if (updateError) throw updateError;

      // Record transaction
      await addTransaction(
        productId,
        'status_change',
        { is_active: currentStatus },
        { is_active: newStatus },
        reason,
        sellerId
      );

      toast.success(`Product ${newStatus ? 'activated' : 'deactivated'} successfully`);
    } catch (error: any) {
      console.error('Error updating status:', error);
      toast.error('Failed to update product status');
    }
  };

  useEffect(() => {
    fetchTransactions();
  }, [productId]);

  return {
    transactions,
    loading,
    fetchTransactions,
    addTransaction,
    updateProductPrice,
    toggleProductStatus
  };
};
