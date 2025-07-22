import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'app.lovable.644c2e1030194c7192156da48c44665f',
  appName: 'meaty-mart-express',
  webDir: 'dist',
  server: {
    url: 'https://644c2e10-3019-4c71-9215-6da48c44665f.lovableproject.com?forceHideBadge=true',
    cleartext: true
  },
  plugins: {
    SplashScreen: {
      launchShowDuration: 2000,
      backgroundColor: "#059669",
      showSpinner: false
    }
  }
};

export default config;