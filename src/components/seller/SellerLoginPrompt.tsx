
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Store } from "lucide-react";

interface SellerLoginPromptProps {
  onShowRegistration: () => void;
  onShowLogin: () => void;
}

const SellerLoginPrompt = ({ onShowRegistration, onShowLogin }: SellerLoginPromptProps) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-blue-100 flex items-center justify-center p-4">
      <Card className="w-full max-w-sm mx-auto shadow-lg">
        <CardContent className="p-6">
          <div className="mb-6">
            <h2 className="text-xl font-bold text-gray-800 mb-1">SELLER</h2>
            <p className="text-gray-600 text-sm mb-4">BUSINESS GROWTH OFFERS</p>
            
            <p className="text-gray-700 text-sm mb-6">
              Advanced analytics and inventory management tools
            </p>

            <div className="bg-gradient-to-r from-blue-100 to-purple-100 rounded-lg p-4 mb-6 text-center">
              <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center mx-auto mb-2">
                <Store className="w-6 h-6 text-white" />
              </div>
              <span className="bg-orange-500 text-white px-2 py-1 rounded text-xs font-semibold">
                Pro Tools
              </span>
            </div>
          </div>

          <div className="space-y-3">
            <Button
              onClick={onShowRegistration}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold"
              size="lg"
            >
              Register as Seller
            </Button>
            
            <div className="text-center">
              <button
                onClick={onShowLogin}
                className="text-blue-600 hover:text-blue-700 text-sm underline"
              >
                Already a user? Login
              </button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SellerLoginPrompt;
