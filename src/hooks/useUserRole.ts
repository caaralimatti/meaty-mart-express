
import { useState, useEffect } from 'react';

export type UserRole = 'customer' | 'seller' | null;

export const useUserRole = () => {
  const [userRole, setUserRole] = useState<UserRole>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Mock user data - in real app this would come from authentication
  useEffect(() => {
    const storedRole = localStorage.getItem('userRole') as UserRole;
    const storedLoginStatus = localStorage.getItem('isLoggedIn') === 'true';
    
    if (storedRole && storedLoginStatus) {
      setUserRole(storedRole);
      setIsLoggedIn(true);
    }
  }, []);

  const login = (role: UserRole) => {
    setUserRole(role);
    setIsLoggedIn(true);
    localStorage.setItem('userRole', role || '');
    localStorage.setItem('isLoggedIn', 'true');
  };

  const logout = () => {
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
