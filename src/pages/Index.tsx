
import { useUserRole } from "@/hooks/useUserRole";
import RoleSelector from "@/components/RoleSelector";
import EnhancedCustomerInterface from "@/components/customer/EnhancedCustomerInterface";
import SellerDashboard from "@/components/seller/SellerDashboard";

const Index = () => {
  const { userRole, isLoggedIn, login, logout, switchRole } = useUserRole();

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
