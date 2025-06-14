
import { useUserRole } from "@/hooks/useUserRole";
import { useOnboarding } from "@/hooks/useOnboarding";
import OnboardingFlow from "@/components/onboarding/OnboardingFlow";
import RoleSelector from "@/components/RoleSelector";
import EnhancedCustomerInterface from "@/components/customer/EnhancedCustomerInterface";
import SellerDashboard from "@/components/seller/SellerDashboard";

const Index = () => {
  const { userRole, isLoggedIn, login, logout, switchRole } = useUserRole();
  const { isOnboardingComplete, isLoading, completeOnboarding } = useOnboarding();

  // Show loading state while checking onboarding status
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  // Show onboarding if not completed
  if (!isOnboardingComplete) {
    return (
      <OnboardingFlow 
        onComplete={() => {
          completeOnboarding();
          login('customer'); // Default to customer after onboarding
        }} 
      />
    );
  }

  const handleRoleSelect = (role: 'customer' | 'seller' | null) => {
    login(role);
  };

  const handleSwitchRole = () => {
    const newRole = userRole === 'customer' ? 'seller' : 'customer';
    switchRole(newRole);
  };

  const handleBackToMain = () => {
    logout();
  };

  if (!isLoggedIn || !userRole) {
    return <RoleSelector onRoleSelect={handleRoleSelect} />;
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
