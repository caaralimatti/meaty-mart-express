
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ShoppingCart, Store, Users, TrendingUp } from "lucide-react";
import { UserRole } from "@/hooks/useUserRole";

interface RoleSelectorProps {
  onRoleSelect: (role: UserRole) => void;
}

const RoleSelector = ({ onRoleSelect }: RoleSelectorProps) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-orange-50 to-yellow-50 flex items-center justify-center p-4">
      <div className="max-w-4xl w-full">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">Welcome to QuickGoat</h1>
          <p className="text-lg text-gray-600">Choose your experience</p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Customer Interface */}
          <Card className="hover:shadow-xl transition-all duration-300 border-2 hover:border-red-300 cursor-pointer group"
                onClick={() => onRoleSelect('customer')}>
            <CardHeader className="text-center pb-4">
              <div className="w-16 h-16 bg-gradient-to-r from-red-500 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                <ShoppingCart className="w-8 h-8 text-white" />
              </div>
              <CardTitle className="text-2xl text-gray-800">I'm a Customer</CardTitle>
              <Badge className="bg-red-100 text-red-700 hover:bg-red-200">Premium Shopping Experience</Badge>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-sm">✨ Personalized recommendations</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-sm">🚀 Express 30-min delivery</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-sm">💰 Exclusive deals & discounts</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-sm">🎁 Loyalty rewards program</span>
                </div>
              </div>
              <Button className="w-full bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-700 hover:to-orange-700 text-white font-semibold py-3">
                Start Shopping Now
              </Button>
            </CardContent>
          </Card>

          {/* Seller Interface */}
          <Card className="hover:shadow-xl transition-all duration-300 border-2 hover:border-blue-300 cursor-pointer group"
                onClick={() => onRoleSelect('seller')}>
            <CardHeader className="text-center pb-4">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                <Store className="w-8 h-8 text-white" />
              </div>
              <CardTitle className="text-2xl text-gray-800">I'm a Seller</CardTitle>
              <Badge className="bg-blue-100 text-blue-700 hover:bg-blue-200">Business Dashboard</Badge>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <span className="text-sm">📊 Advanced analytics & insights</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <span className="text-sm">🎯 Smart inventory management</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <span className="text-sm">💼 Order & customer management</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <span className="text-sm">📈 Revenue optimization tools</span>
                </div>
              </div>
              <Button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-3">
                Access Dashboard
              </Button>
            </CardContent>
          </Card>
        </div>

        <div className="text-center mt-8">
          <div className="flex items-center justify-center space-x-8 text-sm text-gray-600">
            <div className="flex items-center space-x-2">
              <Users className="w-4 h-4" />
              <span>10,000+ Happy Customers</span>
            </div>
            <div className="flex items-center space-x-2">
              <TrendingUp className="w-4 h-4" />
              <span>99.9% Uptime</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoleSelector;
