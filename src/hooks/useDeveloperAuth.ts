
import { useState } from 'react';

interface DeveloperSession {
  isAuthenticated: boolean;
  username: string;
  loginTime: string;
}

export const useDeveloperAuth = () => {
  const [session, setSession] = useState<DeveloperSession | null>(() => {
    const stored = localStorage.getItem('quickgoat_dev_session');
    if (stored) {
      const parsed = JSON.parse(stored);
      // Check if session is less than 24 hours old
      const loginTime = new Date(parsed.loginTime);
      const now = new Date();
      const hoursDiff = (now.getTime() - loginTime.getTime()) / (1000 * 60 * 60);
      
      if (hoursDiff < 24) {
        return parsed;
      } else {
        localStorage.removeItem('quickgoat_dev_session');
      }
    }
    return null;
  });

  const login = (username: string, password: string): boolean => {
    // Hardcoded credentials as requested
    if (username === 'developer@goat' && password === 'devteam@goat2025') {
      const newSession: DeveloperSession = {
        isAuthenticated: true,
        username,
        loginTime: new Date().toISOString()
      };
      setSession(newSession);
      localStorage.setItem('quickgoat_dev_session', JSON.stringify(newSession));
      return true;
    }
    return false;
  };

  const logout = () => {
    setSession(null);
    localStorage.removeItem('quickgoat_dev_session');
  };

  return {
    session,
    isAuthenticated: session?.isAuthenticated || false,
    login,
    logout
  };
};
