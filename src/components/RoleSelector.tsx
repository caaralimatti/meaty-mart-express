import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ShoppingCart, Store } from "lucide-react";
import { UserRole } from "@/hooks/useUserRole";
interface RoleSelectorProps {
  onRoleSelect: (role: UserRole) => void;
}
const RoleSelector = ({
  onRoleSelect
}: RoleSelectorProps) => {
  return <div className="min-h-screen bg-charcoal-black flex items-center justify-center p-4 bg-lime-200">
      <div className="max-w-5xl w-full">
        {/* Header with Logo */}
        <div className="text-center mb-12">
          <div className="mb-6 flex justify-center">
            <div className="w-24 h-24 sm:w-32 sm:h-32 relative">
              <img src="/lovable-uploads/8f9753cb-0f1b-4875-8ffd-8cf77fcf2eff.png" alt="QuickGoat Logo" className="w-full h-full object-contain" />
            </div>
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-off-white mb-4">
            GoatGoat<span className="text-vibrant-orange">Goat</span>
          </h1>
          <p className="text-lg sm:text-xl text-off-white/80 mb-2">Premium Meat & Livestock Platform</p>
          <p className="text-sm sm:text-base text-off-white/60">Choose your experience to get started</p>
        </div>

        <div className="flex flex-col lg:flex-row gap-6 justify-center items-center">
          {/* Customer Card */}
          <Card className="relative w-full lg:w-96 h-[400px] rounded-2xl shadow-2xl bg-dark-slate border-dark-slate hover:border-vibrant-orange/30 cursor-pointer hover:shadow-vibrant-orange/10 transition-all duration-300 overflow-hidden group hover:scale-105" onClick={() => onRoleSelect('customer')}>
            <CardContent className="p-6 h-full flex flex-col justify-center text-center">
              <div className="flex-1 flex flex-col justify-center">
                <div className="flex items-center justify-center mb-6">
                  <ShoppingCart className="w-8 h-8 text-vibrant-orange mr-3" />
                  <h3 className="text-2xl sm:text-3xl font-bold text-off-white">CUSTOMER</h3>
                </div>
                
                <div className="space-y-3 mb-8">
                  <div className="flex items-center justify-center space-x-2 text-sm text-off-white/70">
                    <div className="w-2 h-2 bg-vibrant-orange rounded-full"></div>
                    <span>Fresh, premium quality meat</span>
                  </div>
                  <div className="flex items-center justify-center space-x-2 text-sm text-off-white/70">
                    <div className="w-2 h-2 bg-vibrant-orange rounded-full"></div>
                    <span>30-minute delivery guarantee</span>
                  </div>
                  <div className="flex items-center justify-center space-x-2 text-sm text-off-white/70">
                    <div className="w-2 h-2 bg-vibrant-orange rounded-full"></div>
                    <span>Competitive pricing</span>
                  </div>
                </div>
              </div>
              
              <Button className="w-full bg-vibrant-orange hover:bg-vibrant-orange/90 text-charcoal-black font-bold text-lg h-12 transition-all duration-300" onClick={e => {
              e.stopPropagation();
              onRoleSelect('customer');
            }}>
                Start Shopping
              </Button>
            </CardContent>
          </Card>

          {/* Seller Card - Now directly goes to seller dashboard */}
          <Card className="relative w-full lg:w-96 h-[400px] rounded-2xl shadow-2xl bg-dark-slate border-dark-slate hover:border-vibrant-orange/30 cursor-pointer hover:shadow-vibrant-orange/10 transition-all duration-300 overflow-hidden group hover:scale-105" onClick={() => onRoleSelect('seller')}>
            <CardContent className="p-6 h-full flex flex-col justify-center text-center">
              <div className="flex-1 flex flex-col justify-center">
                <div className="flex items-center justify-center mb-6">
                  <Store className="w-12 h-12 text-vibrant-orange mr-4" />
                  <h3 className="text-3xl sm:text-4xl font-bold text-off-white">SELLER</h3>
                </div>
                <p className="text-sm text-off-white/60 mb-4 uppercase tracking-wide">Business Growth Platform</p>
                <p className="text-2xl sm:text-3xl font-bold text-vibrant-orange mb-8">GROW YOUR BUSINESS</p>
              </div>
              
              <Button className="w-full bg-vibrant-orange hover:bg-vibrant-orange/90 text-charcoal-black font-bold text-lg h-12 transition-all duration-300" onClick={e => {
              e.stopPropagation();
              onRoleSelect('seller');
            }}>
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
    </div>;
};
export default RoleSelector;