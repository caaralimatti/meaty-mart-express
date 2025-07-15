import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ShoppingCart, Store } from "lucide-react";
import { UserRole } from "@/hooks/useUserRole";

interface RoleSelectorProps {
  onRoleSelect: (role: UserRole) => void;
}

const RoleSelector = ({ onRoleSelect }: RoleSelectorProps) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-green-100 flex items-center justify-center p-4">
      <div className="max-w-5xl w-full">
        {/* Header with Logo */}
        <div className="text-center mb-12">
          <div className="mb-6 flex justify-center">
            <div className="w-24 h-24 sm:w-32 sm:h-32 relative p-4 bg-white/20 backdrop-blur-sm rounded-2xl border border-white/30 shadow-lg">
              <img 
                src="/lovable-uploads/8f9753cb-0f1b-4875-8ffd-8cf77fcf2eff.png" 
                alt="QuickGoat Logo" 
                className="w-full h-full object-contain drop-shadow-lg" 
              />
            </div>
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-emerald-900 mb-4">
            GoatGoat<span className="text-emerald-600">Goat</span>
          </h1>
          <p className="text-lg sm:text-xl text-emerald-700 mb-2 font-medium">Premium Meat & Livestock Platform</p>
          <p className="text-sm sm:text-base text-emerald-600">Choose your experience to get started</p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8 justify-center items-center">
          {/* Customer Card */}
          <Card className="relative w-full lg:w-96 h-[400px] rounded-2xl bg-gradient-to-br from-white to-emerald-50 border border-emerald-200 hover:border-emerald-400 cursor-pointer hover:shadow-[0_20px_40px_-10px_rgba(5,150,105,0.3)] transition-all duration-300 overflow-hidden group hover:scale-[1.02] backdrop-blur-sm" onClick={() => onRoleSelect('customer')}>
            <CardContent className="p-8 h-full flex flex-col justify-center text-center relative">
              {/* Glass morphism overlay */}
              <div className="absolute inset-0 bg-white/40 backdrop-blur-sm rounded-2xl border border-white/20"></div>
              
              <div className="relative z-10">
                <div className="flex-1 flex flex-col justify-center">
                  <div className="flex items-center justify-center mb-6">
                    <div className="p-3 bg-emerald-100 rounded-full mr-4 shadow-lg">
                      <ShoppingCart className="w-8 h-8 text-emerald-700" />
                    </div>
                    <h3 className="text-2xl sm:text-3xl font-bold text-emerald-900">CUSTOMER</h3>
                  </div>
                  
                  <div className="space-y-4 mb-8">
                    <div className="flex items-center justify-center space-x-3 text-sm text-emerald-700">
                      <div className="w-2 h-2 bg-emerald-500 rounded-full shadow-sm"></div>
                      <span className="font-medium">Fresh, premium quality meat</span>
                    </div>
                    <div className="flex items-center justify-center space-x-3 text-sm text-emerald-700">
                      <div className="w-2 h-2 bg-emerald-500 rounded-full shadow-sm"></div>
                      <span className="font-medium">30-minute delivery guarantee</span>
                    </div>
                    <div className="flex items-center justify-center space-x-3 text-sm text-emerald-700">
                      <div className="w-2 h-2 bg-emerald-500 rounded-full shadow-sm"></div>
                      <span className="font-medium">Competitive pricing</span>
                    </div>
                  </div>
                </div>
                
                <Button 
                  className="w-full bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-700 hover:to-green-700 text-white font-bold text-lg h-12 transition-all duration-300 shadow-lg hover:shadow-[0_10px_20px_-5px_rgba(5,150,105,0.4)] border-0" 
                  onClick={e => {
                    e.stopPropagation();
                    onRoleSelect('customer');
                  }}
                >
                  Start Shopping
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Seller Card */}
          <Card className="relative w-full lg:w-96 h-[400px] rounded-2xl bg-gradient-to-br from-emerald-700 to-green-800 border border-emerald-600 hover:border-emerald-500 cursor-pointer hover:shadow-[0_20px_40px_-10px_rgba(5,150,105,0.5)] transition-all duration-300 overflow-hidden group hover:scale-[1.02] backdrop-blur-sm" onClick={() => onRoleSelect('seller')}>
            <CardContent className="p-8 h-full flex flex-col justify-center text-center relative">
              {/* Glass morphism overlay for premium section */}
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-800/20 to-green-900/20 backdrop-blur-sm rounded-2xl border border-white/10"></div>
              
              <div className="relative z-10">
                <div className="flex-1 flex flex-col justify-center">
                  <div className="flex items-center justify-center mb-6">
                    <div className="p-3 bg-white/20 rounded-full mr-4 shadow-lg backdrop-blur-sm border border-white/30">
                      <Store className="w-12 h-12 text-white" />
                    </div>
                    <h3 className="text-3xl sm:text-4xl font-bold text-white">SELLER</h3>
                  </div>
                  <p className="text-sm text-emerald-100 mb-4 uppercase tracking-wide font-medium">Business Growth Platform</p>
                  <p className="text-2xl sm:text-3xl font-bold text-white mb-8 drop-shadow-sm">GROW YOUR BUSINESS</p>
                </div>
                
                <Button 
                  className="w-full bg-white/20 hover:bg-white/30 text-white font-bold text-lg h-12 transition-all duration-300 shadow-lg hover:shadow-[0_10px_20px_-5px_rgba(255,255,255,0.2)] backdrop-blur-sm border border-white/30 hover:border-white/50" 
                  onClick={e => {
                    e.stopPropagation();
                    onRoleSelect('seller');
                  }}
                >
                  Access Dashboard
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="text-center mt-12">
          <p className="text-sm text-emerald-600 font-medium">
            Join thousands of satisfied customers and successful sellers on QuickGoat
          </p>
        </div>
      </div>
    </div>
  );
};

export default RoleSelector;