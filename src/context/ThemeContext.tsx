import React, { createContext, useContext } from 'react';

interface ThemeContextType {
  colors: {
    primary: string;
    primaryForeground: string;
    secondary: string;
    secondaryForeground: string;
    background: string;
    foreground: string;
    card: string;
    cardForeground: string;
    muted: string;
    mutedForeground: string;
    border: string;
    destructive: string;
    destructiveForeground: string;
    accent: string;
    accentForeground: string;
  };
}

const defaultTheme: ThemeContextType = {
  colors: {
    primary: '#059669',
    primaryForeground: '#ffffff',
    secondary: '#f1f5f9',
    secondaryForeground: '#0f172a',
    background: '#ffffff',
    foreground: '#0f172a',
    card: '#ffffff',
    cardForeground: '#0f172a',
    muted: '#f1f5f9',
    mutedForeground: '#64748b',
    border: '#e2e8f0',
    destructive: '#ef4444',
    destructiveForeground: '#ffffff',
    accent: '#f1f5f9',
    accentForeground: '#0f172a',
  },
};

const ThemeContext = createContext<ThemeContextType>(defaultTheme);

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return <ThemeContext.Provider value={defaultTheme}>{children}</ThemeContext.Provider>;
};