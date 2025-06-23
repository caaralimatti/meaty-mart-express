import { useState } from "react";
import SellerLoginPrompt from "./SellerLoginPrompt";
import SellerRegistrationForm from "./SellerRegistrationForm";
import AuthModal from "@/components/AuthModal";

interface SellerDashboardProps {
  onBackToMain: () => void;
}

const SellerDashboard = ({ onBackToMain }: SellerDashboardProps) => {
  const [currentView, setCurrentView] = useState<'prompt' | 'registration' | 'dashboard'>('prompt');
  const [showAuthModal, setShowAuthModal] = useState(false);

  const handleShowRegistration = () => {
    setCurrentView('registration');
  };

  const handleShowLogin = () => {
    setShowAuthModal(true);
  };

  const handleBackToPrompt = () => {
    setCurrentView('prompt');
  };

  const handleAuthModalClose = () => {
    setShowAuthModal(false);
    // After successful login, show dashboard
    setCurrentView('dashboard');
  };

  const handleRegistrationSuccess = () => {
    setCurrentView('dashboard');
  };

  const handleRegistrationCancel = () => {
    onBackToMain();
  };

  if (currentView === 'prompt') {
    return (
      <>
        <SellerLoginPrompt 
          onShowRegistration={handleShowRegistration}
          onShowLogin={handleShowLogin}
        />
        <AuthModal 
          isOpen={showAuthModal}
          onClose={handleAuthModalClose}
        />
      </>
    );
  }

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
        />
      </>
    );
  }

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
            <h1 className="text-2xl font-bold text-gray-800">Seller Dashboard</h1>
          </div>
          <div className="flex items-center space-x-4">
            <span className="text-gray-600">Welcome, Seller!</span>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="p-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {/* Stats Cards */}
            <div className="bg-white p-6 rounded-lg shadow-sm border">
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Total Orders</h3>
              <p className="text-3xl font-bold text-blue-600">24</p>
              <p className="text-sm text-gray-500">+12% from last month</p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm border">
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Revenue</h3>
              <p className="text-3xl font-bold text-green-600">₹15,240</p>
              <p className="text-sm text-gray-500">+8% from last month</p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm border">
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Products</h3>
              <p className="text-3xl font-bold text-purple-600">12</p>
              <p className="text-sm text-gray-500">Active listings</p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm border">
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Rating</h3>
              <p className="text-3xl font-bold text-orange-600">4.8</p>
              <p className="text-sm text-gray-500">Based on 45 reviews</p>
            </div>
          </div>

          {/* Recent Orders */}
          <div className="bg-white rounded-lg shadow-sm border p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Recent Orders</h2>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-2">Order ID</th>
                    <th className="text-left py-2">Customer</th>
                    <th className="text-left py-2">Items</th>
                    <th className="text-left py-2">Amount</th>
                    <th className="text-left py-2">Status</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b">
                    <td className="py-2">#ORD001</td>
                    <td className="py-2">John Doe</td>
                    <td className="py-2">Goat Meat - 2kg</td>
                    <td className="py-2">₹1,200</td>
                    <td className="py-2">
                      <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs">
                        Delivered
                      </span>
                    </td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-2">#ORD002</td>
                    <td className="py-2">Jane Smith</td>
                    <td className="py-2">Fresh Mutton - 1.5kg</td>
                    <td className="py-2">₹900</td>
                    <td className="py-2">
                      <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs">
                        Processing
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <td className="py-2">#ORD003</td>
                    <td className="py-2">Mike Johnson</td>
                    <td className="py-2">Goat Liver - 500g</td>
                    <td className="py-2">₹350</td>
                    <td className="py-2">
                      <span className="px-2 py-1 bg-yellow-100 text-yellow-800 rounded-full text-xs">
                        Pending
                      </span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default SellerDashboard;
