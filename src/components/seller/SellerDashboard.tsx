import { useState, useEffect } from "react";
import { useSellerData } from "@/hooks/useSellerData";
import SellerOptionsScreen from "./SellerOptionsScreen";
import SellerRegistrationForm from "./SellerRegistrationForm";
import AuthModal from "@/components/AuthModal";
import MeatShopManagement from "./MeatShopManagement";
import LivestockManagement from "./LivestockManagement";
import LovablePrompt from "./LovablePrompt";
import KPISnapshot from "./KPISnapshot";
import LiveOrders from "./LiveOrders";
import OrderStatusOverview from "./OrderStatusOverview";
import TodaysPerformanceChart from "./TodaysPerformanceChart";
import InventoryAlerts from "./InventoryAlerts";
import CustomerInsights from "./CustomerInsights";
import AccountDetails from "./AccountDetails";
import LivestockListingsManager from "./LivestockListingsManager";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Menu, X } from "lucide-react";

interface SellerDashboardProps {
  onBackToMain: () => void;
}

const SellerDashboard = ({ onBackToMain }: SellerDashboardProps) => {
  const [currentView, setCurrentView] = useState<'options' | 'registration' | 'dashboard'>('options');
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { sellerProfile, loading, updateShopStatus, refreshSellerData, logoutSeller } = useSellerData();

  // Automatically switch to dashboard when seller profile is available
  useEffect(() => {
    console.log('SellerDashboard effect - sellerProfile:', !!sellerProfile, 'loading:', loading, 'currentView:', currentView);
    
    if (!loading && sellerProfile && currentView !== 'dashboard') {
      console.log('Switching to dashboard view');
      setCurrentView('dashboard');
      setShowAuthModal(false); // Ensure auth modal is closed
    } else if (!loading && !sellerProfile && currentView === 'dashboard') {
      console.log('No seller profile, switching to options');
      setCurrentView('options');
    }
  }, [sellerProfile, loading, currentView]);

  // Force refresh when modal closes after login
  useEffect(() => {
    if (!showAuthModal && currentView === 'options') {
      console.log('Auth modal closed, refreshing seller data');
      setTimeout(() => {
        refreshSellerData();
      }, 100);
    }
  }, [showAuthModal, currentView, refreshSellerData]);

  const handleShowRegistration = () => {
    console.log('Showing registration form');
    setCurrentView('registration');
  };

  const handleShowLogin = () => {
    console.log('Showing login modal');
    setShowAuthModal(true);
  };

  const handleBackToOptions = () => {
    console.log('Going back to options');
    setCurrentView('options');
  };

  const handleAuthModalClose = () => {
    console.log('Auth modal closed, refreshing data');
    setShowAuthModal(false);
    // Force refresh seller data after login
    setTimeout(() => {
      refreshSellerData();
    }, 200);
  };

  const handleRegistrationSuccess = () => {
    console.log('Registration successful, refreshing data');
    // Force refresh seller data and switch to dashboard
    setTimeout(() => {
      refreshSellerData();
      setCurrentView('dashboard');
    }, 500);
  };

  const handleRegistrationCancel = () => {
    console.log('Registration cancelled');
    onBackToMain();
  };

  const handleLogout = () => {
    logoutSeller();
    setCurrentView('options');
  };

  // Show loading while checking seller profile
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-red-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600 text-sm sm:text-base">Loading seller dashboard...</p>
        </div>
      </div>
    );
  }

  // Show enhanced dashboard if we have a seller profile
  if (sellerProfile && currentView === 'dashboard') {
    return (
      <div className="min-h-screen bg-gray-50">
        {/* Mobile-first Header */}
        <header className="bg-white border-b border-gray-200 sticky top-0 z-40">
          <div className="px-4 py-3 sm:px-6 sm:py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2 sm:space-x-4">
                <button
                  onClick={onBackToMain}
                  className="text-gray-600 hover:text-gray-800 text-sm sm:text-base"
                >
                  ← Back
                </button>
                <h1 className="text-base sm:text-xl lg:text-2xl font-bold text-gray-800">
                  Seller Dashboard 📊
                </h1>
              </div>
              
              {/* Mobile Menu Button */}
              <div className="flex items-center space-x-2">
                <span className="hidden sm:inline text-xs sm:text-sm text-gray-600">
                  Welcome, {sellerProfile.seller_name}!
                </span>
                
                <Button
                  onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                  variant="outline"
                  size="sm"
                  className="sm:hidden h-8 w-8 p-0"
                >
                  {isMobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
                </Button>
                
                <Button
                  onClick={handleLogout}
                  variant="outline"
                  size="sm"
                  className="hidden sm:flex text-red-600 border-red-600 hover:bg-red-50"
                >
                  Logout
                </Button>
              </div>
            </div>
            
            {/* Mobile Welcome Message */}
            <div className="sm:hidden mt-2">
              <span className="text-xs text-gray-600">Welcome, {sellerProfile.seller_name}!</span>
            </div>
            
            {/* Mobile Menu Dropdown */}
            {isMobileMenuOpen && (
              <div className="sm:hidden mt-3 pt-3 border-t border-gray-200">
                <Button
                  onClick={handleLogout}
                  variant="outline"
                  size="sm"
                  className="w-full text-red-600 border-red-600 hover:bg-red-50"
                >
                  Logout
                </Button>
              </div>
            )}
          </div>
        </header>

        {/* Main Content */}
        <main className="p-3 sm:p-6">
          <div className="max-w-7xl mx-auto">
            {/* Lovable Prompt */}
            <div className="mb-4 sm:mb-6">
              <LovablePrompt sellerProfile={sellerProfile} />
            </div>

            {/* Navigation Tabs - Mobile Optimized */}
            <Tabs defaultValue="overview" className="w-full">
              <div className="sticky top-16 sm:top-20 bg-gray-50 z-30 -mx-3 sm:-mx-6 px-3 sm:px-6 pb-4">
                <TabsList className="grid w-full grid-cols-2 sm:grid-cols-4 h-auto">
                  <TabsTrigger value="overview" className="text-xs sm:text-sm p-2 sm:p-3">
                    <span className="hidden sm:inline">Dashboard </span>Overview
                  </TabsTrigger>
                  <TabsTrigger value="account" className="text-xs sm:text-sm p-2 sm:p-3">
                    Account
                  </TabsTrigger>
                  <TabsTrigger value="livestock" className="text-xs sm:text-sm p-2 sm:p-3">
                    Livestock
                  </TabsTrigger>
                  <TabsTrigger value="management" className="text-xs sm:text-sm p-2 sm:p-3">
                    <span className="hidden sm:inline">Shop </span>Mgmt
                  </TabsTrigger>
                </TabsList>
              </div>

              {/* Dashboard Overview Tab */}
              <TabsContent value="overview" className="space-y-4 sm:space-y-6 mt-4">
                <KPISnapshot sellerType={sellerProfile.seller_type} />

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
                  <LiveOrders sellerType={sellerProfile.seller_type} />
                  <OrderStatusOverview sellerType={sellerProfile.seller_type} />
                </div>

                <TodaysPerformanceChart sellerType={sellerProfile.seller_type} />

                <InventoryAlerts sellerType={sellerProfile.seller_type} />

                <Card>
                  <CardHeader>
                    <CardTitle className="text-base sm:text-lg">Monthly Growth & Historical Data</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="h-48 sm:h-64">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={[
                          { month: 'Jan', revenue: 8400, orders: 124 },
                          { month: 'Feb', revenue: 9200, orders: 142 },
                          { month: 'Mar', revenue: 10800, orders: 168 },
                          { month: 'Apr', revenue: 12400, orders: 195 },
                          { month: 'May', revenue: 11600, orders: 178 },
                          { month: 'Jun', revenue: 13200, orders: 210 }
                        ]}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="month" tick={{ fontSize: 12 }} />
                          <YAxis tick={{ fontSize: 12 }} />
                          <Tooltip />
                          <Bar dataKey="revenue" fill="#dc2626" name="Revenue ($)" />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>

                <CustomerInsights sellerType={sellerProfile.seller_type} />
              </TabsContent>

              <TabsContent value="account" className="mt-4">
                <AccountDetails sellerProfile={sellerProfile} />
              </TabsContent>

              <TabsContent value="livestock" className="mt-4">
                <LivestockListingsManager sellerType={sellerProfile.seller_type} />
              </TabsContent>

              <TabsContent value="management" className="mt-4">
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
                    <TabsList className="grid w-full grid-cols-2 mb-4 sm:mb-6">
                      <TabsTrigger value="meat" className="text-sm">Meat Shop</TabsTrigger>
                      <TabsTrigger value="livestock" className="text-sm">Livestock</TabsTrigger>
                    </TabsList>
                    
                    <TabsContent value="meat">
                      <MeatShopManagement 
                        sellerProfile={sellerProfile}
                        onStatusToggle={(status) => updateShopStatus('meat', status)}
                      />
                    </TabsContent>
                    
                    <TabsContent value="livestock">
                      <LivestockManagement 
                        sellerProfile={sellerProfile}
                        onStatusToggle={(status) => updateShopStatus('livestock', status)}
                      />
                    </TabsContent>
                  </Tabs>
                )}
              </TabsContent>
            </Tabs>
          </div>
        </main>
      </div>
    );
  }

  // Show registration form
  if (currentView === 'registration') {
    return (
      <>
        <SellerRegistrationForm 
          onBack={handleBackToOptions}
          onLoginLink={handleShowLogin}
          onSuccess={handleRegistrationSuccess}
          onCancel={handleRegistrationCancel}
        />
        <AuthModal 
          isOpen={showAuthModal}
          onClose={handleAuthModalClose}
          userType="seller"
        />
      </>
    );
  }

  // Default to showing the seller options screen
  return (
    <>
      <SellerOptionsScreen 
        onShowRegistration={handleShowRegistration}
        onShowLogin={handleShowLogin}
        onBack={onBackToMain}
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
