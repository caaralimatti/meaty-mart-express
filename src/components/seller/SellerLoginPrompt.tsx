
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Store, UserPlus, LogIn } from "lucide-react";

interface SellerLoginPromptProps {
  onShowRegistration: () => void;
  onShowLogin: () => void;
}

const SellerLoginPrompt = ({ onShowRegistration, onShowLogin }: SellerLoginPromptProps) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-blue-100 flex items-center justify-center p-4">
      <Card className="w-full max-w-md mx-auto shadow-lg">
        <CardContent className="p-8">
          <div className="text-center mb-8">
            <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Store className="w-10 h-10 text-blue-600" />
            </div>
            <h1 className="text-3xl font-bold text-gray-800 mb-2">Seller Portal</h1>
            <p className="text-gray-600">Join our marketplace and grow your business</p>
          </div>

          <div className="space-y-4">
            <Button
              onClick={onShowRegistration}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3"
              size="lg"
            >
              <UserPlus className="w-5 h-5 mr-2" />
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
