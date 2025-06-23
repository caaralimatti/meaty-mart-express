
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

export type UserRole = 'customer' | 'seller' | null;

export const useUserRole = () => {
  const [userRole, setUserRole] = useState<UserRole>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Check for existing session
    const checkSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (session?.user) {
        setIsLoggedIn(true);
        
        // Check if user is a seller
        const { data: seller } = await supabase
          .from('sellers')
          .select('user_type')
          .eq('user_id', session.user.id)
          .single();
        
        if (seller) {
          setUserRole('seller');
        } else {
          setUserRole('customer');
        }
      } else {
        // Fallback to localStorage for mock data
        const storedRole = localStorage.getItem('userRole') as UserRole;
        const storedLoginStatus = localStorage.getItem('isLoggedIn') === 'true';
        
        if (storedRole && storedLoginStatus) {
          setUserRole(storedRole);
          setIsLoggedIn(true);
        }
      }
    };

    checkSession();

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (session?.user) {
        setIsLoggedIn(true);
        
        // Check if user is a seller
        const { data: seller } = await supabase
          .from('sellers')
          .select('user_type')
          .eq('user_id', session.user.id)
          .single();
        
        if (seller) {
          setUserRole('seller');
          localStorage.setItem('userRole', 'seller');
        } else {
          setUserRole('customer');
          localStorage.setItem('userRole', 'customer');
        }
        localStorage.setItem('isLoggedIn', 'true');
      } else {
        setUserRole(null);
        setIsLoggedIn(false);
        localStorage.removeItem('userRole');
        localStorage.removeItem('isLoggedIn');
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const login = (role: UserRole) => {
    setUserRole(role);
    setIsLoggedIn(true);
    localStorage.setItem('userRole', role || '');
    localStorage.setItem('isLoggedIn', 'true');
  };

  const logout = async () => {
    await supabase.auth.signOut();
    setUserRole(null);
    setIsLoggedIn(false);
    localStorage.removeItem('userRole');
    localStorage.removeItem('isLoggedIn');
  };

  const switchRole = (newRole: UserRole) => {
    setUserRole(newRole);
    localStorage.setItem('userRole', newRole || '');
  };

  return {
    userRole,
    isLoggedIn,
    login,
    logout,
    switchRole
  };
};
