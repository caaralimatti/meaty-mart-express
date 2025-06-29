
import { useState, useEffect } from "react";
import { useSellerData } from "@/hooks/useSellerData";
import SellerLoginPrompt from "./SellerLoginPrompt";
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

interface SellerDashboardProps {
  onBackToMain: () => void;
}

const SellerDashboard = ({ onBackToMain }: SellerDashboardProps) => {
  const [currentView, setCurrentView] = useState<'prompt' | 'registration' | 'dashboard'>('prompt');
  const [showAuthModal, setShowAuthModal] = useState(false);
  const { sellerProfile, loading, updateShopStatus, refreshSellerData, logoutSeller } = useSellerData();

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
    }, 500);
  };

  const handleRegistrationCancel = () => {
    console.log('Registration cancelled');
    onBackToMain();
  };

  const handleLogout = () => {
    logoutSeller();
    setCurrentView('prompt');
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

  // Show enhanced dashboard if we have a seller profile
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
              <Button
                onClick={handleLogout}
                variant="outline"
                size="sm"
                className="text-red-600 border-red-600 hover:bg-red-50"
              >
                Logout
              </Button>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="p-6">
          <div className="max-w-7xl mx-auto">
            {/* Lovable Prompt */}
            <LovablePrompt sellerProfile={sellerProfile} />

            {/* Navigation Tabs */}
            <Tabs defaultValue="overview" className="w-full">
              <TabsList className="grid w-full grid-cols-4 mb-6">
                <TabsTrigger value="overview">Dashboard Overview</TabsTrigger>
                <TabsTrigger value="account">Account Details</TabsTrigger>
                <TabsTrigger value="livestock">Livestock Listings</TabsTrigger>
                <TabsTrigger value="management">Shop Management</TabsTrigger>
              </TabsList>

              {/* Dashboard Overview Tab */}
              <TabsContent value="overview" className="space-y-6">
                {/* KPI Snapshot */}
                <KPISnapshot sellerType={sellerProfile.seller_type} />

                {/* Live Orders and Order Status */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <LiveOrders sellerType={sellerProfile.seller_type} />
                  <OrderStatusOverview sellerType={sellerProfile.seller_type} />
                </div>

                {/* Today's Performance Chart */}
                <TodaysPerformanceChart sellerType={sellerProfile.seller_type} />

                {/* Inventory Alerts */}
                <InventoryAlerts sellerType={sellerProfile.seller_type} />

                {/* Growth Chart */}
                <Card>
                  <CardHeader>
                    <CardTitle>Monthly Growth & Historical Data</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="h-64">
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
                          <XAxis dataKey="month" />
                          <YAxis />
                          <Tooltip />
                          <Bar dataKey="revenue" fill="#dc2626" name="Revenue ($)" />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>

                {/* Customer Insights */}
                <CustomerInsights sellerType={sellerProfile.seller_type} />
              </TabsContent>

              {/* Account Details Tab */}
              <TabsContent value="account">
                <AccountDetails sellerProfile={sellerProfile} />
              </TabsContent>

              {/* Livestock Listings Tab */}
              <TabsContent value="livestock">
                <LivestockListingsManager sellerType={sellerProfile.seller_type} />
              </TabsContent>

              {/* Shop Management Tab */}
              <TabsContent value="management">
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
                      <TabsTrigger value="meat">Meat Shop Management</TabsTrigger>
                      <TabsTrigger value="livestock">Livestock Management</TabsTrigger>
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
