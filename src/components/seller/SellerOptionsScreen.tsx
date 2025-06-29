
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Store, UserPlus, LogIn, ArrowLeft } from "lucide-react";

interface SellerOptionsScreenProps {
  onShowRegistration: () => void;
  onShowLogin: () => void;
  onBack: () => void;
}

const SellerOptionsScreen = ({ onShowRegistration, onShowLogin, onBack }: SellerOptionsScreenProps) => {
  return (
    <div className="min-h-screen bg-charcoal-black flex items-center justify-center p-4">
      <div className="max-w-4xl w-full">
        {/* Header */}
        <div className="text-center mb-8">
          <button
            onClick={onBack}
            className="absolute top-4 left-4 sm:top-6 sm:left-6 text-off-white/70 hover:text-off-white flex items-center space-x-2 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span className="text-sm">Back</span>
          </button>
          
          <div className="mb-6 flex justify-center">
            <div className="w-20 h-20 sm:w-24 sm:h-24 relative">
              <img
                src="/lovable-uploads/8f9753cb-0f1b-4875-8ffd-8cf77fcf2eff.png"
                alt="QuickGoat Logo"
                className="w-full h-full object-contain"
              />
            </div>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-off-white mb-4">
            Seller <span className="text-vibrant-orange">Portal</span>
          </h1>
          <p className="text-lg text-off-white/80 mb-2">Business Growth Platform</p>
          <p className="text-sm text-off-white/60">Choose an option to get started</p>
        </div>

        {/* Options Cards */}
        <div className="flex flex-col lg:flex-row gap-6 justify-center items-center">
          {/* Registration Card */}
          <Card className="w-full lg:w-80 h-[350px] rounded-2xl shadow-2xl bg-dark-slate border-dark-slate hover:border-vibrant-orange/30 cursor-pointer hover:shadow-vibrant-orange/10 transition-all duration-300 overflow-hidden group hover:scale-105">
            <CardHeader className="text-center pb-4">
              <div className="flex justify-center mb-4">
                <div className="w-16 h-16 bg-vibrant-orange/10 rounded-full flex items-center justify-center">
                  <UserPlus className="w-8 h-8 text-vibrant-orange" />
                </div>
              </div>
              <CardTitle className="text-2xl font-bold text-off-white">NEW SELLER</CardTitle>
              <p className="text-sm text-off-white/60">Join our platform</p>
            </CardHeader>
            <CardContent className="px-6 pb-6 flex flex-col h-full">
              <div className="space-y-2 mb-6 flex-1">
                <div className="text-sm text-off-white/70">Quick registration process</div>
                <div className="text-sm text-off-white/70">Advanced analytics tools</div>
                <div className="text-sm text-off-white/70">Inventory management</div>
                <div className="text-sm text-off-white/70">24/7 support</div>
              </div>
              
              <Button 
                onClick={onShowRegistration}
                className="w-full bg-vibrant-orange hover:bg-vibrant-orange/90 text-charcoal-black font-bold text-lg h-12 transition-all duration-300 mt-auto"
              >
                Register Now
              </Button>
            </CardContent>
          </Card>

          {/* Login Card */}
          <Card className="w-full lg:w-80 h-[350px] rounded-2xl shadow-2xl bg-dark-slate border-dark-slate hover:border-vibrant-orange/30 cursor-pointer hover:shadow-vibrant-orange/10 transition-all duration-300 overflow-hidden group hover:scale-105">
            <CardHeader className="text-center pb-4">
              <div className="flex justify-center mb-4">
                <div className="w-16 h-16 bg-vibrant-orange/10 rounded-full flex items-center justify-center">
                  <LogIn className="w-8 h-8 text-vibrant-orange" />
                </div>
              </div>
              <CardTitle className="text-2xl font-bold text-off-white">EXISTING SELLER</CardTitle>
              <p className="text-sm text-off-white/60">Welcome back</p>
            </CardHeader>
            <CardContent className="px-6 pb-6 flex flex-col h-full">
              <div className="space-y-2 mb-6 flex-1">
                <div className="text-sm text-off-white/70">Access your dashboard</div>
                <div className="text-sm text-off-white/70">Manage your listings</div>
                <div className="text-sm text-off-white/70">View analytics</div>
                <div className="text-sm text-off-white/70">Process orders</div>
              </div>
              
              <Button 
                onClick={onShowLogin}
                className="w-full bg-vibrant-orange hover:bg-vibrant-orange/90 text-charcoal-black font-bold text-lg h-12 transition-all duration-300 mt-auto"
              >
                Login
              </Button>
            </CardContent>
          </Card>
        </div>

        <div className="text-center mt-8">
          <p className="text-sm text-off-white/50">
            Join thousands of successful sellers on QuickGoat
          </p>
        </div>
      </div>
    </div>
  );
};

export default SellerOptionsScreen;
