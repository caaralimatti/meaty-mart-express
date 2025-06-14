
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ShoppingCart, Clock, Truck, Shield } from "lucide-react";

interface WelcomeScreenProps {
  onNext: () => void;
}

const WelcomeScreen = ({ onNext }: WelcomeScreenProps) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-orange-50 to-red-100 flex items-center justify-center p-4">
      <Card className="w-full max-w-md mx-auto shadow-lg">
        <CardContent className="p-8 text-center">
          <div className="w-16 h-16 bg-gradient-to-r from-red-600 to-orange-600 rounded-full flex items-center justify-center mx-auto mb-6">
            <span className="text-white font-bold text-2xl">Q</span>
          </div>
          
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Welcome to QuickGoat!</h1>
          <p className="text-gray-600 mb-8">Premium goat meat delivered fresh to your doorstep</p>
          
          <div className="space-y-4 mb-8">
            <div className="flex items-center space-x-3 text-left">
              <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
                <Clock className="w-5 h-5 text-red-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-800">30-Minute Delivery</h3>
                <p className="text-sm text-gray-600">Fresh meat delivered super fast</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-3 text-left">
              <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center">
                <Shield className="w-5 h-5 text-orange-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-800">Premium Quality</h3>
                <p className="text-sm text-gray-600">Farm-fresh, halal certified</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-3 text-left">
              <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
                <Truck className="w-5 h-5 text-red-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-800">Free Delivery</h3>
                <p className="text-sm text-gray-600">On orders above ₹500</p>
              </div>
            </div>
          </div>
          
          <Button 
            onClick={onNext}
            className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-3"
          >
            Get Started
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default WelcomeScreen;
