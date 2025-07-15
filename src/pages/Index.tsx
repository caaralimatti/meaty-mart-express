
import { useState, useEffect } from "react";
import { useUserRole } from "@/hooks/useUserRole";
import { useOnboarding } from "@/hooks/useOnboarding";
import LoadingScreen from "@/components/LoadingScreen";
import RoleSelector from "@/components/RoleSelector";
import EnhancedCustomerInterface from "@/components/customer/EnhancedCustomerInterface";
import SellerDashboard from "@/components/seller/SellerDashboard";
import OnboardingFlow from "@/components/onboarding/OnboardingFlow";

const Index = () => {
  const [showLoading, setShowLoading] = useState(true);
  const { userRole, isLoggedIn, login, logout, switchRole } = useUserRole();
  const { isOnboardingComplete, isLoading, completeOnboarding } = useOnboarding();

  const handleLoadingComplete = () => {
    setShowLoading(false);
  };

  const handleRoleSelect = (role: 'customer' | 'seller' | null) => {
    login(role);
  };

  const handleSwitchRole = () => {
    const newRole = userRole === 'customer' ? 'seller' : 'customer';
    switchRole(newRole);
  };

  // Updated to go back to RoleSelector instead of loading screen
  const handleBackToMain = () => {
    logout();
  };

  // Show loading screen first
  if (showLoading) {
    return <LoadingScreen onComplete={handleLoadingComplete} />;
  }

  // Show loading while checking onboarding status
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-green-100 flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-emerald-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-emerald-700 font-medium">Loading...</p>
        </div>
      </div>
    );
  }

  if (!isLoggedIn || !userRole) {
    return <RoleSelector onRoleSelect={handleRoleSelect} />;
  }

  // Show onboarding flow for first-time customers only
  if (userRole === 'customer' && !isOnboardingComplete) {
    return <OnboardingFlow onComplete={completeOnboarding} />;
  }

  if (userRole === 'customer') {
    return <EnhancedCustomerInterface onSwitchRole={handleSwitchRole} />;
  }

  if (userRole === 'seller') {
    return <SellerDashboard onBackToMain={handleBackToMain} />;
  }

  return <RoleSelector onRoleSelect={handleRoleSelect} />;
};

export default Index;
