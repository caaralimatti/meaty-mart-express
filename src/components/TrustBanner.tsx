
import { Shield, Clock, Star } from "lucide-react";

const TrustBanner = () => {
  return (
    <div className="bg-gradient-to-r from-green-600 to-green-700 text-white py-2">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-center space-x-6 text-sm">
          <div className="flex items-center space-x-1">
            <Shield className="w-4 h-4" />
            <span>FSSAI Certified</span>
          </div>
          <div className="flex items-center space-x-1">
            <Clock className="w-4 h-4" />
            <span>30-Min Delivery</span>
          </div>
          <div className="flex items-center space-x-1">
            <Star className="w-4 h-4" />
            <span>Cold Chain Protected</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrustBanner;
