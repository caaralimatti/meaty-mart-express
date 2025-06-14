
import { Button } from "@/components/ui/button";
import { Shield, Clock, Truck } from "lucide-react";

interface WelcomeScreenProps {
  onGetStarted: () => void;
}

const WelcomeScreen = ({ onGetStarted }: WelcomeScreenProps) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-red-600 via-orange-500 to-red-700 flex flex-col items-center justify-center p-4 text-white relative overflow-hidden">
      {/* Background Animation Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-white/10 rounded-full animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-white/10 rounded-full animate-pulse delay-1000"></div>
      </div>
      
      <div className="relative z-10 text-center max-w-md mx-auto">
        {/* Main Logo/Brand */}
        <div className="mb-8">
          <h1 className="text-5xl font-bold mb-2">QuickGoat</h1>
          <p className="text-xl opacity-90">Fresh • Fast • Hygienic</p>
        </div>

        {/* Hero Image Placeholder */}
        <div className="w-64 h-64 mx-auto mb-8 bg-white/20 rounded-3xl flex items-center justify-center backdrop-blur-sm">
          <div className="text-6xl">🥩</div>
        </div>

        {/* Key Features */}
        <div className="space-y-4 mb-8">
          <div className="flex items-center space-x-3 bg-white/10 rounded-xl p-3 backdrop-blur-sm">
            <Shield className="w-6 h-6 text-green-300" />
            <span className="text-left">
              <strong>FSSAI Certified</strong> Cold Chain
            </span>
          </div>
          
          <div className="flex items-center space-x-3 bg-white/10 rounded-xl p-3 backdrop-blur-sm">
            <Clock className="w-6 h-6 text-blue-300" />
            <span className="text-left">
              <strong>30-Minute</strong> Express Delivery
            </span>
          </div>
          
          <div className="flex items-center space-x-3 bg-white/10 rounded-xl p-3 backdrop-blur-sm">
            <Truck className="w-6 h-6 text-yellow-300" />
            <span className="text-left">
              <strong>Hygienic</strong> Goat Meat
            </span>
          </div>
        </div>

        {/* CTA Button */}
        <Button 
          onClick={onGetStarted}
          size="lg"
          className="w-full bg-white text-red-600 hover:bg-gray-100 font-bold py-4 text-lg rounded-xl shadow-2xl transform hover:scale-105 transition-all duration-200"
        >
          Get Started 🚀
        </Button>

        {/* Trust Badge */}
        <p className="text-sm opacity-70 mt-4">
          Trusted by 10,000+ customers in Karnataka
        </p>
      </div>
    </div>
  );
};

export default WelcomeScreen;
