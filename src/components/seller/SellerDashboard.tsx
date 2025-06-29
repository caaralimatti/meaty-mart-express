
import { useState, useEffect } from "react";
import { useSellerData } from "@/hooks/useSellerData";
import SellerLoginPrompt from "./SellerLoginPrompt";
import SellerRegistrationForm from "./SellerRegistrationForm";
import AuthModal from "@/components/AuthModal";
import MeatShopManagement from "./MeatShopManagement";
import LivestockManagement from "./LivestockManagement";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface SellerDashboardProps {
  onBackToMain: () => void;
}

const SellerDashboard = ({ onBackToMain }: SellerDashboardProps) => {
  const [currentView, setCurrentView] = useState<'prompt' | 'registration' | 'dashboard'>('prompt');
  const [showAuthModal, setShowAuthModal] = useState(false);
  const { sellerProfile, loading, updateShopStatus, refreshSellerData } = useSellerData();

  // Automatically switch to dashboard when seller profile is available
  useEffect(() => {
    console.log('SellerDashboard effect - sellerProfile:', !!sellerProfile, 'loading:', loading, 'currentView:', currentView);
    
    if (!loading && sellerProfile && currentView !== 'dashboard') {
      console.log('Switching to dashboard view');
      setCurrentView('dashboard');
    } else if (!loading && !sellerProfile && currentView === 'dashboard') {
      console.log('No seller profile, switching to prompt');
      setCurrentView('prompt');
    }
  }, [sellerProfile, loading, currentView]);

  const handleShowRegistration = () => {
    console.log('Showing registration form');
    setCurrentView('registration');
  };

  const handleShowLogin = () => {
    console.log('Showing login modal');
    setShowAuthModal(true);
  };

  const handleBackToPrompt = () => {
    console.log('Going back to prompt');
    setCurrentView('prompt');
  };

  const handleAuthModalClose = () => {
    console.log('Auth modal closed');
    setShowAuthModal(false);
    // Force refresh seller data after login
    setTimeout(() => {
      refreshSellerData();
    }, 500);
  };

  const handleRegistrationSuccess = () => {
    console.log('Registration successful, refreshing data');
    // Force refresh seller data and switch to dashboard
    setTimeout(() => {
      refreshSellerData();
      setCurrentView('dashboard');
    }, 1000);
  };

  const handleRegistrationCancel = () => {
    console.log('Registration cancelled');
    onBackToMain();
  };

  // Show loading while checking seller profile
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-red-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading seller dashboard...</p>
        </div>
      </div>
    );
  }

  // Show dashboard if we have a seller profile
  if (sellerProfile && currentView === 'dashboard') {
    return (
      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <header className="bg-white border-b border-gray-200 px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button
                onClick={onBackToMain}
                className="text-gray-600 hover:text-gray-800"
              >
                ← Back to Main
              </button>
              <h1 className="text-2xl font-bold text-gray-800">Seller Dashboard 📊</h1>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-gray-600">Welcome back, {sellerProfile.seller_name}!</span>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="p-6">
          <div className="max-w-7xl mx-auto">
            {/* Conditional rendering based on seller type */}
            {sellerProfile.seller_type === 'Meat' && (
              <MeatShopManagement 
                sellerProfile={sellerProfile}
                onStatusToggle={(status) => updateShopStatus('meat', status)}
              />
            )}

            {sellerProfile.seller_type === 'Livestock' && (
              <LivestockManagement 
                sellerProfile={sellerProfile}
                onStatusToggle={(status) => updateShopStatus('livestock', status)}
              />
            )}

            {sellerProfile.seller_type === 'Both' && (
              <Tabs defaultValue="meat" className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="meat">Meat Shop</TabsTrigger>
                  <TabsTrigger value="livestock">Livestock</TabsTrigger>
                </TabsList>
                
                <TabsContent value="meat" className="mt-6">
                  <MeatShopManagement 
                    sellerProfile={sellerProfile}
                    onStatusToggle={(status) => updateShopStatus('meat', status)}
                  />
                </TabsContent>
                
                <TabsContent value="livestock" className="mt-6">
                  <LivestockManagement 
                    sellerProfile={sellerProfile}
                    onStatusToggle={(status) => updateShopStatus('livestock', status)}
                  />
                </TabsContent>
              </Tabs>
            )}
          </div>
        </main>
      </div>
    );
  }

  // Show registration form
  if (currentView === 'registration') {
    return (
      <>
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-blue-100 flex items-center justify-center p-4">
          <SellerRegistrationForm 
            onBack={handleBackToPrompt}
            onLoginLink={handleShowLogin}
            onSuccess={handleRegistrationSuccess}
            onCancel={handleRegistrationCancel}
          />
        </div>
        <AuthModal 
          isOpen={showAuthModal}
          onClose={handleAuthModalClose}
          userType="seller"
        />
      </>
    );
  }

  // Default to showing the login prompt
  return (
    <>
      <SellerLoginPrompt 
        onShowRegistration={handleShowRegistration}
        onShowLogin={handleShowLogin}
      />
      <AuthModal 
        isOpen={showAuthModal}
        onClose={handleAuthModalClose}
        userType="seller"
      />
    </>
  );
};

export default SellerDashboard;
