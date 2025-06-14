
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ShoppingCart, Store, Clock, RotateCcw } from "lucide-react";
import { UserRole } from "@/hooks/useUserRole";
import { useOnboarding } from "@/hooks/useOnboarding";

interface RoleSelectorProps {
  onRoleSelect: (role: UserRole) => void;
}

const RoleSelector = ({ onRoleSelect }: RoleSelectorProps) => {
  const { resetOnboarding } = useOnboarding();

  const handleResetOnboarding = () => {
    resetOnboarding();
    window.location.reload();
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="max-w-4xl w-full">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">Welcome to QuickGoat</h1>
          <p className="text-lg text-gray-600">Choose your experience</p>
        </div>

        <div className="flex flex-col md:flex-row gap-4 justify-center items-center">
          {/* Customer Card */}
          <Card 
            className="relative w-full md:w-80 h-96 rounded-2xl shadow-md bg-white cursor-pointer hover:shadow-lg transition-shadow overflow-hidden group"
            onClick={() => onRoleSelect('customer')}
          >
            <CardContent className="p-4 h-full flex flex-col">
              <div className="flex-1">
                <h3 className="text-2xl font-bold text-gray-800 mb-1">CUSTOMER</h3>
                <p className="text-sm text-gray-500 mb-3">FRESH DELIVERY SPECIALS</p>
                <p className="text-xl font-bold text-orange-600 mb-4">FLAT ₹200 OFF</p>
                <p className="text-sm text-gray-600 mb-4">Premium quality goat meat delivered in 30 minutes</p>
              </div>
              
              {/* Image Section */}
              <div className="relative mt-auto">
                <div className="w-full h-32 bg-gradient-to-r from-red-100 to-orange-100 rounded-lg flex items-center justify-center mb-4">
                  <ShoppingCart className="w-16 h-16 text-red-600" />
                </div>
                
                {/* Optional Badge */}
                <div className="absolute bottom-16 left-2">
                  <Badge className="bg-orange-600 text-white flex items-center space-x-1">
                    <Clock className="w-3 h-3" />
                    <span>30 mins</span>
                  </Badge>
                </div>
              </div>
              
              <Button 
                className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold mt-2"
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
            className="relative w-full md:w-80 h-96 rounded-2xl shadow-md bg-white cursor-pointer hover:shadow-lg transition-shadow overflow-hidden group"
            onClick={() => onRoleSelect('seller')}
          >
            <CardContent className="p-4 h-full flex flex-col">
              <div className="flex-1">
                <h3 className="text-2xl font-bold text-gray-800 mb-1">SELLER</h3>
                <p className="text-sm text-gray-500 mb-3">BUSINESS GROWTH OFFERS</p>
                <p className="text-xl font-bold text-orange-600 mb-4">UP TO ₹500 OFF</p>
                <p className="text-sm text-gray-600 mb-4">Advanced analytics and inventory management tools</p>
              </div>
              
              {/* Image Section */}
              <div className="relative mt-auto">
                <div className="w-full h-32 bg-gradient-to-r from-blue-100 to-purple-100 rounded-lg flex items-center justify-center mb-4">
                  <Store className="w-16 h-16 text-blue-600" />
                </div>
                
                {/* Optional Badge */}
                <div className="absolute bottom-16 left-2">
                  <Badge className="bg-orange-600 text-white flex items-center space-x-1">
                    <span>⚡</span>
                    <span>Pro Tools</span>
                  </Badge>
                </div>
              </div>
              
              <Button 
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold mt-2"
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

        <div className="text-center mt-8 space-y-4">
          <p className="text-sm text-gray-500">
            Join thousands of satisfied customers and successful sellers
          </p>
          
          {/* Reset Onboarding Button for Testing */}
          <Button 
            variant="outline" 
            size="sm" 
            onClick={handleResetOnboarding}
            className="text-gray-600 hover:text-gray-800"
          >
            <RotateCcw className="w-3 h-3 mr-1" />
            Reset Onboarding (for testing)
          </Button>
        </div>
      </div>
    </div>
  );
};

export default RoleSelector;
