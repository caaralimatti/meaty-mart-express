import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Store, UserPlus, LogIn, ArrowLeft, Zap, BarChart3, Package, Headphones, Layout, FileText, TrendingUp, ShoppingCart } from "lucide-react";
import SellerRegistrationForm from "./SellerRegistrationForm";
import AuthModal from "@/components/AuthModal";

interface SellerOptionsScreenProps {
  onShowRegistration: () => void;
  onShowLogin: () => void;
  onBack: () => void;
  onRegistrationSuccess?: () => void;
}

const SellerOptionsScreen = ({
  onShowRegistration,
  onShowLogin,
  onBack,
  onRegistrationSuccess
}: SellerOptionsScreenProps) => {
  const [currentView, setCurrentView] = useState<'options' | 'registration'>('options');
  const [showAuthModal, setShowAuthModal] = useState(false);

  const handleShowRegistration = () => {
    console.log('Registration clicked');
    setCurrentView('registration');
  };

  const handleShowLogin = () => {
    console.log('Login clicked');
    setShowAuthModal(true);
  };

  const handleBackToOptions = () => {
    setCurrentView('options');
  };

  const handleAuthModalClose = () => {
    setShowAuthModal(false);
  };

  const handleRegistrationSuccess = () => {
    // Call the parent's registration success handler to switch to dashboard
    onRegistrationSuccess?.();
  };

  const handleRegistrationCancel = () => {
    setCurrentView('options');
  };

  // Show registration form
  if (currentView === 'registration') {
    return <SellerRegistrationForm onBack={handleBackToOptions} onLoginLink={handleShowLogin} onSuccess={handleRegistrationSuccess} onCancel={handleRegistrationCancel} />;
  }

  // Show options screen
  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-green-100 flex items-center justify-center p-4">
        <div className="max-w-4xl w-full">
          {/* Header */}
          <div className="text-center mb-8">
            <button 
              onClick={onBack} 
              className="absolute top-4 left-4 sm:top-6 sm:left-6 text-emerald-700 hover:text-emerald-900 flex items-center space-x-2 transition-all duration-300 bg-white/20 backdrop-blur-sm px-3 py-2 rounded-lg border border-white/30 hover:bg-white/30"
            >
              <ArrowLeft className="w-5 h-5" />
              <span className="text-sm font-medium">Back</span>
            </button>
            
            <div className="mb-6 flex justify-center">
              <div className="w-20 h-20 sm:w-24 sm:h-24 relative p-3 bg-white/20 backdrop-blur-sm rounded-2xl border border-white/30 shadow-lg">
                <img 
                  src="/lovable-uploads/8f9753cb-0f1b-4875-8ffd-8cf77fcf2eff.png" 
                  alt="QuickGoat Logo" 
                  className="w-full h-full object-contain drop-shadow-lg" 
                />
              </div>
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-emerald-900 mb-4">
              Seller <span className="text-emerald-600">Portal</span>
            </h1>
            <p className="text-lg text-emerald-700 mb-2 font-medium">Business Growth Platform</p>
            <p className="text-sm text-emerald-600">Choose an option to get started</p>
          </div>

          {/* Options Cards */}
          <div className="flex flex-col lg:flex-row gap-8 justify-center items-center">
            {/* Registration Card */}
            <Card className="w-full lg:w-80 h-[400px] rounded-2xl bg-gradient-to-br from-white to-emerald-50 border border-emerald-200 hover:border-emerald-400 cursor-pointer hover:shadow-[0_20px_40px_-10px_rgba(5,150,105,0.3)] transition-all duration-300 overflow-hidden group hover:scale-[1.02] backdrop-blur-sm" onClick={handleShowRegistration}>
              <CardHeader className="text-center pb-4 relative">
                {/* Glass morphism overlay */}
                <div className="absolute inset-0 bg-white/40 backdrop-blur-sm rounded-t-2xl border-b border-white/20"></div>
                
                <div className="relative z-10">
                  <div className="flex justify-center mb-4">
                    <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center shadow-lg border border-emerald-200">
                      <UserPlus className="w-8 h-8 text-emerald-700" />
                    </div>
                  </div>
                  <CardTitle className="text-2xl font-bold text-emerald-900">NEW SELLER</CardTitle>
                  <p className="text-sm text-emerald-600 font-medium">Join our platform</p>
                </div>
              </CardHeader>
              <CardContent className="px-6 pb-6 flex flex-col h-full relative">
                {/* Glass morphism overlay */}
                <div className="absolute inset-0 bg-white/30 backdrop-blur-sm rounded-b-2xl border border-white/20"></div>
                
                <div className="relative z-10 flex flex-col h-full">
                  <div className="space-y-4 mb-6 flex-1">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-emerald-100 rounded-lg flex items-center justify-center flex-shrink-0 shadow-sm border border-emerald-200">
                        <Zap className="w-4 h-4 text-emerald-700" />
                      </div>
                      <span className="text-sm text-emerald-700 font-medium">Quick registration process</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-emerald-100 rounded-lg flex items-center justify-center flex-shrink-0 shadow-sm border border-emerald-200">
                        <BarChart3 className="w-4 h-4 text-emerald-700" />
                      </div>
                      <span className="text-sm text-emerald-700 font-medium">Advanced analytics tools</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-emerald-100 rounded-lg flex items-center justify-center flex-shrink-0 shadow-sm border border-emerald-200">
                        <Package className="w-4 h-4 text-emerald-700" />
                      </div>
                      <span className="text-sm text-emerald-700 font-medium">Inventory management</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-emerald-100 rounded-lg flex items-center justify-center flex-shrink-0 shadow-sm border border-emerald-200">
                        <Headphones className="w-4 h-4 text-emerald-700" />
                      </div>
                      <span className="text-sm text-emerald-700 font-medium">24/7 support</span>
                    </div>
                  </div>
                  
                  <Button 
                    onClick={e => {
                      e.stopPropagation();
                      handleShowRegistration();
                    }} 
                    className="w-full bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-700 hover:to-green-700 text-white font-bold text-lg h-12 transition-all duration-300 shadow-lg hover:shadow-[0_10px_20px_-5px_rgba(5,150,105,0.4)] border-0 mt-auto"
                  >
                    Register Now
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Login Card */}
            <Card className="w-full lg:w-80 h-[400px] rounded-2xl bg-gradient-to-br from-emerald-700 to-green-800 border border-emerald-600 hover:border-emerald-500 cursor-pointer hover:shadow-[0_20px_40px_-10px_rgba(5,150,105,0.5)] transition-all duration-300 overflow-hidden group hover:scale-[1.02] backdrop-blur-sm" onClick={handleShowLogin}>
              <CardHeader className="text-center pb-4 relative">
                {/* Glass morphism overlay for premium section */}
                <div className="absolute inset-0 bg-gradient-to-br from-emerald-800/20 to-green-900/20 backdrop-blur-sm rounded-t-2xl border-b border-white/10"></div>
                
                <div className="relative z-10">
                  <div className="flex justify-center mb-4">
                    <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center shadow-lg backdrop-blur-sm border border-white/30">
                      <LogIn className="w-8 h-8 text-white" />
                    </div>
                  </div>
                  <CardTitle className="text-2xl font-bold text-white">EXISTING SELLER</CardTitle>
                  <p className="text-sm text-emerald-100 font-medium">Welcome back</p>
                </div>
              </CardHeader>
              <CardContent className="px-6 pb-6 flex flex-col h-full relative">
                {/* Glass morphism overlay for premium section */}
                <div className="absolute inset-0 bg-gradient-to-br from-emerald-800/20 to-green-900/20 backdrop-blur-sm rounded-b-2xl border border-white/10"></div>
                
                <div className="relative z-10 flex flex-col h-full">
                  <div className="space-y-4 mb-6 flex-1">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center flex-shrink-0 shadow-sm backdrop-blur-sm border border-white/30">
                        <Layout className="w-4 h-4 text-white" />
                      </div>
                      <span className="text-sm text-emerald-100 font-medium">Access your dashboard</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center flex-shrink-0 shadow-sm backdrop-blur-sm border border-white/30">
                        <FileText className="w-4 h-4 text-white" />
                      </div>
                      <span className="text-sm text-emerald-100 font-medium">Manage your listings</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center flex-shrink-0 shadow-sm backdrop-blur-sm border border-white/30">
                        <TrendingUp className="w-4 h-4 text-white" />
                      </div>
                      <span className="text-sm text-emerald-100 font-medium">View analytics</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center flex-shrink-0 shadow-sm backdrop-blur-sm border border-white/30">
                        <ShoppingCart className="w-4 h-4 text-white" />
                      </div>
                      <span className="text-sm text-emerald-100 font-medium">Process orders</span>
                    </div>
                  </div>
                  
                  <Button 
                    onClick={e => {
                      e.stopPropagation();
                      handleShowLogin();
                    }} 
                    className="w-full bg-white/20 hover:bg-white/30 text-white font-bold text-lg h-12 transition-all duration-300 shadow-lg hover:shadow-[0_10px_20px_-5px_rgba(255,255,255,0.2)] backdrop-blur-sm border border-white/30 hover:border-white/50 mt-auto"
                  >
                    Login
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="text-center mt-8">
            <p className="text-sm text-emerald-600 font-medium">
              Join thousands of successful sellers on QuickGoat
            </p>
          </div>
        </div>
      </div>

      {/* Auth Modal for Login */}
      <AuthModal isOpen={showAuthModal} onClose={handleAuthModalClose} userType="seller" />
    </>
  );
};

export default SellerOptionsScreen;