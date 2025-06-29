
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
              <svg
                viewBox="0 0 100 100"
                className="w-full h-full text-vibrant-orange"
                fill="currentColor"
              >
                {/* Goat Head */}
                <ellipse cx="50" cy="40" rx="25" ry="20" />
                
                {/* Horns */}
                <path d="M30 25 L25 15 L35 20 Z" />
                <path d="M70 25 L75 15 L65 20 Z" />
                
                {/* Eyes */}
                <circle cx="42" cy="38" r="3" fill="#1A1D21" />
                <circle cx="58" cy="38" r="3" fill="#1A1D21" />
                
                {/* Nose */}
                <ellipse cx="50" cy="45" rx="4" ry="2" fill="#1A1D21" />
                
                {/* Beard */}
                <path d="M50 55 Q48 65 45 70 Q50 72 55 70 Q52 65 50 55 Z" />
                
                {/* Body */}
                <ellipse cx="50" cy="70" rx="15" ry="12" />
                
                {/* Legs */}
                <rect x="38" y="78" width="4" height="12" rx="2" />
                <rect x="48" y="78" width="4" height="12" rx="2" />
                <rect x="58" y="78" width="4" height="12" rx="2" />
              </svg>
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
              
              {/* Image Section with Badge */}
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
            <CardContent className="p-6 h-full flex flex-col justify-center text-center">
              <div className="flex-1 flex flex-col justify-center">
                <div className="flex items-center justify-center mb-6">
                  <Store className="w-12 h-12 text-vibrant-orange mr-4" />
                  <h3 className="text-3xl sm:text-4xl font-bold text-off-white">SELLER</h3>
                </div>
                <p className="text-sm text-off-white/60 mb-4 uppercase tracking-wide">Business Growth Platform</p>
                <p className="text-2xl sm:text-3xl font-bold text-vibrant-orange mb-8">GROW YOUR BUSINESS</p>
                
                <div className="space-y-4 mb-8">
                  <div className="flex items-center justify-center space-x-2 text-sm text-off-white/70">
                    <div className="w-2 h-2 bg-vibrant-orange rounded-full"></div>
                    <span>Real-time analytics dashboard</span>
                  </div>
                  <div className="flex items-center justify-center space-x-2 text-sm text-off-white/70">
                    <div className="w-2 h-2 bg-vibrant-orange rounded-full"></div>
                    <span>Inventory management tools</span>
                  </div>
                  <div className="flex items-center justify-center space-x-2 text-sm text-off-white/70">
                    <div className="w-2 h-2 bg-vibrant-orange rounded-full"></div>
                    <span>Integrated payment system</span>
                  </div>
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
