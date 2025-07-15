
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Store } from "lucide-react";

interface SellerLoginPromptProps {
  onShowRegistration: () => void;
  onShowLogin: () => void;
}

const SellerLoginPrompt = ({ onShowRegistration, onShowLogin }: SellerLoginPromptProps) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-green-100 flex items-center justify-center p-4">
      <Card className="w-full max-w-sm mx-auto bg-gradient-to-br from-white to-emerald-50 backdrop-blur-sm shadow-lg border border-emerald-200">
        <CardContent className="p-6">
          <div className="mb-6">
            <h2 className="text-xl font-bold text-emerald-900 mb-1">SELLER</h2>
            <p className="text-emerald-700 text-sm mb-4">BUSINESS GROWTH OFFERS</p>
            
            <p className="text-emerald-800 text-sm mb-6">
              Advanced analytics and inventory management tools
            </p>

            <div className="bg-gradient-to-r from-emerald-100 to-green-100 rounded-lg p-4 mb-6 text-center border border-emerald-200/50 backdrop-blur-sm">
              <div className="w-12 h-12 bg-gradient-to-r from-emerald-500 to-green-600 rounded-lg flex items-center justify-center mx-auto mb-2 shadow-lg">
                <Store className="w-6 h-6 text-white" />
              </div>
              <span className="bg-emerald-600 text-white px-2 py-1 rounded text-xs font-semibold shadow-sm">
                Pro Tools
              </span>
            </div>
          </div>

          <div className="space-y-3">
            <Button
              onClick={onShowRegistration}
              className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
              size="lg"
            >
              Register as Seller
            </Button>
            
            <div className="text-center">
              <button
                onClick={onShowLogin}
                className="text-emerald-600 hover:text-emerald-800 text-sm underline transition-all duration-300"
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
