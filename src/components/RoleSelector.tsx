
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ShoppingCart, Store, Clock } from "lucide-react";
import { UserRole } from "@/hooks/useUserRole";

interface RoleSelectorProps {
  onRoleSelect: (role: UserRole) => void;
}

const RoleSelector = ({ onRoleSelect }: RoleSelectorProps) => {
  return (
    <div className="min-h-screen bg-charcoal-black flex items-center justify-center p-4">
      <div className="max-w-5xl w-full">
        {/* Header with Logo */}
        <div className="text-center mb-12">
          <div className="mb-6 flex justify-center">
            <div className="w-24 h-24 sm:w-32 sm:h-32 relative">
              <img 
                src="/lovable-uploads/8f9753cb-0f1b-4875-8ffd-8cf77fcf2eff.png" 
                alt="QuickGoat Logo" 
                className="w-full h-full object-contain filter brightness-0 invert"
              />
            </div>
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-off-white mb-4">
            Quick<span className="text-vibrant-orange">Goat</span>
          </h1>
          <p className="text-lg sm:text-xl text-off-white/80 mb-2">Premium Meat & Livestock Platform</p>
          <p className="text-sm sm:text-base text-off-white/60">Choose your experience to get started</p>
        </div>

        <div className="flex flex-col lg:flex-row gap-6 justify-center items-center">
          {/* Customer Card */}
          <Card 
            className="relative w-full lg:w-96 h-[450px] rounded-2xl shadow-2xl bg-dark-slate border-dark-slate hover:border-vibrant-orange/30 cursor-pointer hover:shadow-vibrant-orange/10 transition-all duration-300 overflow-hidden group hover:scale-105"
            onClick={() => onRoleSelect('customer')}
          >
            <CardContent className="p-6 h-full flex flex-col">
              <div className="flex-1">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-2xl sm:text-3xl font-bold text-off-white">CUSTOMER</h3>
                  <ShoppingCart className="w-8 h-8 text-vibrant-orange" />
                </div>
                <p className="text-sm text-off-white/60 mb-4 uppercase tracking-wide">Fresh Delivery Specials</p>
                <p className="text-2xl sm:text-3xl font-bold text-vibrant-orange mb-6">FLAT ₹200 OFF</p>
                <p className="text-base text-off-white/80 mb-6">Premium quality goat meat delivered fresh to your doorstep in just 30 minutes</p>
                
                <div className="space-y-3 mb-6">
                  <div className="flex items-center space-x-2 text-sm text-off-white/70">
                    <div className="w-2 h-2 bg-vibrant-orange rounded-full"></div>
                    <span>Fresh, premium quality meat</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm text-off-white/70">
                    <div className="w-2 h-2 bg-vibrant-orange rounded-full"></div>
                    <span>30-minute delivery guarantee</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm text-off-white/70">
                    <div className="w-2 h-2 bg-vibrant-orange rounded-full"></div>
                    <span>Competitive pricing</span>
                  </div>
                </div>
              </div>
              
              {/* Image Section */}
              <div className="relative mt-auto">
                <div className="w-full h-32 bg-gradient-to-r from-vibrant-orange/20 to-vibrant-orange/10 rounded-lg flex items-center justify-center mb-6 border border-vibrant-orange/20">
                  <ShoppingCart className="w-16 h-16 text-vibrant-orange" />
                </div>
                
                <div className="absolute top-2 right-2">
                  <Badge className="bg-vibrant-orange text-charcoal-black flex items-center space-x-1 font-semibold">
                    <Clock className="w-3 h-3" />
                    <span>30 min</span>
                  </Badge>
                </div>
              </div>
              
              <Button 
                className="w-full bg-vibrant-orange hover:bg-vibrant-orange/90 text-charcoal-black font-bold text-lg h-12 transition-all duration-300"
                onClick={(e) => {
                  e.stopPropagation();
                  onRoleSelect('customer');
                }}
              >
                Start Shopping
              </Button>
            </CardContent>
          </Card>

          {/* Seller Card */}
          <Card 
            className="relative w-full lg:w-96 h-[450px] rounded-2xl shadow-2xl bg-dark-slate border-dark-slate hover:border-vibrant-orange/30 cursor-pointer hover:shadow-vibrant-orange/10 transition-all duration-300 overflow-hidden group hover:scale-105"
            onClick={() => onRoleSelect('seller')}
          >
            <CardContent className="p-6 h-full flex flex-col">
              <div className="flex-1">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-2xl sm:text-3xl font-bold text-off-white">SELLER</h3>
                  <Store className="w-8 h-8 text-vibrant-orange" />
                </div>
                <p className="text-sm text-off-white/60 mb-4 uppercase tracking-wide">Business Growth Platform</p>
                <p className="text-2xl sm:text-3xl font-bold text-vibrant-orange mb-6">GROW YOUR BUSINESS</p>
                <p className="text-base text-off-white/80 mb-6">Advanced analytics, inventory management, and business tools to scale your meat & livestock business</p>
                
                <div className="space-y-3 mb-6">
                  <div className="flex items-center space-x-2 text-sm text-off-white/70">
                    <div className="w-2 h-2 bg-vibrant-orange rounded-full"></div>
                    <span>Real-time analytics dashboard</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm text-off-white/70">
                    <div className="w-2 h-2 bg-vibrant-orange rounded-full"></div>
                    <span>Inventory management tools</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm text-off-white/70">
                    <div className="w-2 h-2 bg-vibrant-orange rounded-full"></div>
                    <span>Integrated payment system</span>
                  </div>
                </div>
              </div>
              
              {/* Image Section */}
              <div className="relative mt-auto">
                <div className="w-full h-32 bg-gradient-to-r from-vibrant-orange/20 to-vibrant-orange/10 rounded-lg flex items-center justify-center mb-6 border border-vibrant-orange/20">
                  <Store className="w-16 h-16 text-vibrant-orange" />
                </div>
                
                <div className="absolute top-2 right-2">
                  <Badge className="bg-vibrant-orange text-charcoal-black flex items-center space-x-1 font-semibold">
                    <span>⚡</span>
                    <span>Pro Tools</span>
                  </Badge>
                </div>
              </div>
              
              <Button 
                className="w-full bg-vibrant-orange hover:bg-vibrant-orange/90 text-charcoal-black font-bold text-lg h-12 transition-all duration-300"
                onClick={(e) => {
                  e.stopPropagation();
                  onRoleSelect('seller');
                }}
              >
                Access Dashboard
              </Button>
            </CardContent>
          </Card>
        </div>

        <div className="text-center mt-12">
          <p className="text-sm text-off-white/50">
            Join thousands of satisfied customers and successful sellers on QuickGoat
          </p>
        </div>
      </div>
    </div>
  );
};

export default RoleSelector;
