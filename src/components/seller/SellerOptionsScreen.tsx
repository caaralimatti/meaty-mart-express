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
}
const SellerOptionsScreen = ({
  onShowRegistration,
  onShowLogin,
  onBack
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
    // Call the parent's registration handler to switch to dashboard
    onShowRegistration();
  };
  const handleRegistrationCancel = () => {
    setCurrentView('options');
  };

  // Show registration form
  if (currentView === 'registration') {
    return <SellerRegistrationForm onBack={handleBackToOptions} onLoginLink={handleShowLogin} onSuccess={handleRegistrationSuccess} onCancel={handleRegistrationCancel} />;
  }

  // Show options screen
  return <>
      <div className="min-h-screen bg-charcoal-black flex items-center justify-center p-4 bg-lime-200">
        <div className="max-w-4xl w-full">
          {/* Header */}
          <div className="text-center mb-8">
            <button onClick={onBack} className="absolute top-4 left-4 sm:top-6 sm:left-6 text-off-white/70 hover:text-off-white flex items-center space-x-2 transition-colors">
              <ArrowLeft className="w-5 h-5 bg-green-900" />
              <span className="text-sm text-green-900">Back</span>
            </button>
            
            <div className="mb-6 flex justify-center">
              <div className="w-20 h-20 sm:w-24 sm:h-24 relative">
                <img src="/lovable-uploads/8f9753cb-0f1b-4875-8ffd-8cf77fcf2eff.png" alt="QuickGoat Logo" className="w-full h-full object-contain" />
              </div>
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-off-white mb-4 text-green-900">
              Seller <span className="text-vibrant-orange">Portal</span>
            </h1>
            <p className="text-lg text-off-white/80 mb-2 text-green-900">Business Growth Platform</p>
            <p className="text-sm text-off-white/60 text-green-900">Choose an option to get started</p>
          </div>

          {/* Options Cards */}
          <div className="flex flex-col lg:flex-row gap-6 justify-center items-center">
            {/* Registration Card */}
            <Card className="w-full lg:w-80 h-[400px] rounded-2xl shadow-2xl bg-dark-slate border-dark-slate hover:border-vibrant-orange/30 cursor-pointer hover:shadow-vibrant-orange/10 transition-all duration-300 overflow-hidden group hover:scale-105" onClick={handleShowRegistration}>
              <CardHeader className="text-center pb-4 bg-green-900">
                <div className="flex justify-center mb-4">
                  <div className="w-16 h-16 bg-vibrant-orange/10 rounded-full flex items-center justify-center">
                    <UserPlus className="w-8 h-8 text-vibrant-orange" />
                  </div>
                </div>
                <CardTitle className="text-2xl font-bold text-off-white">NEW SELLER</CardTitle>
                <p className="text-sm text-off-white/60">Join our platform</p>
              </CardHeader>
              <CardContent className="px-6 pb-6 flex flex-col h-full bg-green-900">
                <div className="space-y-4 mb-6 flex-1">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-vibrant-orange/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Zap className="w-4 h-4 text-vibrant-orange" />
                    </div>
                    <span className="text-sm text-off-white/80">Quick registration process</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-vibrant-orange/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <BarChart3 className="w-4 h-4 text-vibrant-orange" />
                    </div>
                    <span className="text-sm text-off-white/80">Advanced analytics tools</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-vibrant-orange/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Package className="w-4 h-4 text-vibrant-orange" />
                    </div>
                    <span className="text-sm text-off-white/80">Inventory management</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-vibrant-orange/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Headphones className="w-4 h-4 text-vibrant-orange" />
                    </div>
                    <span className="text-sm text-off-white/80">24/7 support</span>
                  </div>
                </div>
                
                <Button onClick={e => {
                e.stopPropagation();
                handleShowRegistration();
              }} className="w-full bg-vibrant-orange hover:bg-vibrant-orange/90 text-charcoal-black font-bold text-lg h-12 transition-all duration-300 mt-auto">
                  Register Now
                </Button>
              </CardContent>
            </Card>

            {/* Login Card */}
            <Card className="w-full lg:w-80 h-[400px] rounded-2xl shadow-2xl bg-dark-slate border-dark-slate hover:border-vibrant-orange/30 cursor-pointer hover:shadow-vibrant-orange/10 transition-all duration-300 overflow-hidden group hover:scale-105" onClick={handleShowLogin}>
              <CardHeader className="text-center pb-4 bg-green-900">
                <div className="flex justify-center mb-4">
                  <div className="w-16 h-16 bg-vibrant-orange/10 rounded-full flex items-center justify-center">
                    <LogIn className="w-8 h-8 text-vibrant-orange" />
                  </div>
                </div>
                <CardTitle className="text-2xl font-bold text-off-white">EXISTING SELLER</CardTitle>
                <p className="text-sm text-off-white/60">Welcome back</p>
              </CardHeader>
              <CardContent className="px-6 pb-6 flex flex-col h-full bg-green-900">
                <div className="space-y-4 mb-6 flex-1">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-vibrant-orange/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Layout className="w-4 h-4 text-vibrant-orange" />
                    </div>
                    <span className="text-sm text-off-white/80">Access your dashboard</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-vibrant-orange/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <FileText className="w-4 h-4 text-vibrant-orange" />
                    </div>
                    <span className="text-sm text-off-white/80">Manage your listings</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-vibrant-orange/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <TrendingUp className="w-4 h-4 text-vibrant-orange" />
                    </div>
                    <span className="text-sm text-off-white/80">View analytics</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-vibrant-orange/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <ShoppingCart className="w-4 h-4 text-vibrant-orange" />
                    </div>
                    <span className="text-sm text-off-white/80">Process orders</span>
                  </div>
                </div>
                
                <Button onClick={e => {
                e.stopPropagation();
                handleShowLogin();
              }} className="w-full bg-vibrant-orange hover:bg-vibrant-orange/90 text-charcoal-black font-bold text-lg h-12 transition-all duration-300 mt-auto">
                  Login
                </Button>
              </CardContent>
            </Card>
          </div>

          <div className="text-center mt-8">
            <p className="text-sm text-off-white/50 text-green-900">
              Join thousands of successful sellers on QuickGoat
            </p>
          </div>
        </div>
      </div>

      {/* Auth Modal for Login */}
      <AuthModal isOpen={showAuthModal} onClose={handleAuthModalClose} userType="seller" />
    </>;
};
export default SellerOptionsScreen;