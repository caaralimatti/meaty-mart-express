import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Bell, Phone, Package, Heart, User } from "lucide-react";
interface HeaderProps {
  isLoggedIn: boolean;
  notificationCount: number;
  wishlistItems: number[];
  totalCartItems: number;
  onAuthOpen: () => void;
  onNotificationOpen: () => void;
  onTrackingOpen: () => void;
  onWishlistOpen: () => void;
  onProfileOpen: () => void;
  onCartOpen: () => void;
}
const Header = ({
  isLoggedIn,
  notificationCount,
  wishlistItems,
  totalCartItems,
  onAuthOpen,
  onNotificationOpen,
  onTrackingOpen,
  onWishlistOpen,
  onProfileOpen,
  onCartOpen
}: HeaderProps) => {
  return <header className="sticky top-0 z-50 bg-gradient-to-r from-emerald-50 to-green-100 shadow-lg border-b-2 border-emerald-200">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-gradient-to-r from-emerald-600 to-green-600 rounded-lg flex items-center justify-center shadow-md">
              <span className="text-white font-bold text-lg">G
            </span>
            </div>
            <div>
              <h1 className="text-xl font-bold text-emerald-800">GoatGoat</h1>
              <p className="text-xs text-emerald-600">Farm to Fork in 30 mins</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-3 bg-transparent">
            {/* Notifications */}
            <Button variant="outline" size="sm" onClick={onNotificationOpen} className="relative border-emerald-200 hover:bg-emerald-50 text-emerald-700 hover:border-emerald-400 transition-all duration-300">
              <Bell className="w-4 h-4" />
              {notificationCount > 0 && <Badge className="absolute -top-2 -right-2 bg-red-600 text-white text-xs px-1 animate-pulse border-red-700">
                  {notificationCount}
                </Badge>}
            </Button>

            {!isLoggedIn ? <Button variant="outline" size="sm" onClick={onAuthOpen} className="border-emerald-200 hover:bg-emerald-50 text-emerald-700 hover:border-emerald-400 transition-all duration-300">
                <Phone className="w-4 h-4 mr-1" />
                Login
              </Button> : <>
                <Button variant="outline" size="sm" onClick={onTrackingOpen} className="border-emerald-200 text-emerald-700 hover:bg-emerald-50 hover:border-emerald-400 transition-all duration-300">
                  <Package className="w-4 h-4 mr-1" />
                  Track
                </Button>
                
                <Button variant="outline" size="sm" onClick={onWishlistOpen} className="relative border-emerald-200 text-emerald-700 hover:bg-emerald-50 hover:border-emerald-400 transition-all duration-300">
                  <Heart className="w-4 h-4 mr-1" />
                  Wishlist
                  {wishlistItems.length > 0 && <Badge className="absolute -top-2 -right-2 bg-red-600 text-white text-xs px-1 animate-pulse border-red-700">
                      {wishlistItems.length}
                    </Badge>}
                </Button>
                
                <Button variant="outline" size="sm" onClick={onProfileOpen} className="border-emerald-200 text-emerald-700 hover:bg-emerald-50 hover:border-emerald-400 transition-all duration-300">
                  <User className="w-4 h-4 mr-1" />
                  Profile
                </Button>
              </>}
            
            <Button variant="outline" size="sm" onClick={onCartOpen} className="relative border-emerald-200 hover:bg-emerald-50 text-emerald-700 hover:border-emerald-400 transition-all duration-300">
              Cart ({totalCartItems})
              {totalCartItems > 0 && <Badge className="absolute -top-2 -right-2 bg-red-600 text-white text-xs px-1 animate-pulse border-red-700">
                  {totalCartItems}
                </Badge>}
            </Button>
          </div>
        </div>
      </div>
    </header>;
};
export default Header;