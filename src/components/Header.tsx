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
  return <header className="sticky top-0 z-50 bg-gradient-to-r from-white to-emerald-50 shadow-lg border-b border-emerald-200/30 backdrop-blur-sm">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-gradient-to-r from-emerald-500 to-green-600 rounded-xl flex items-center justify-center shadow-md">
              <span className="text-white font-bold text-lg">G
            </span>
            </div>
            <div>
              <h1 className="text-xl font-bold text-emerald-800">GoatGoat</h1>
              <p className="text-xs text-emerald-600">Farm to Fork in 30 mins</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            {/* Notifications */}
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={onNotificationOpen} 
              className="relative bg-white/80 hover:bg-emerald-50 text-emerald-700 border border-emerald-200/50 hover:border-emerald-300 rounded-xl shadow-sm hover:shadow-md transition-all duration-300"
            >
              <Bell className="w-4 h-4" />
              {notificationCount > 0 && <Badge className="absolute -top-1 -right-1 bg-red-600 text-white text-xs px-1.5 py-0.5 rounded-full animate-pulse border-2 border-white shadow-sm">
                  {notificationCount}
                </Badge>}
            </Button>

            {!isLoggedIn ? <Button 
                variant="ghost" 
                size="sm" 
                onClick={onAuthOpen} 
                className="bg-white/80 hover:bg-emerald-50 text-emerald-700 border border-emerald-200/50 hover:border-emerald-300 rounded-xl shadow-sm hover:shadow-md transition-all duration-300"
              >
                <Phone className="w-4 h-4 mr-1" />
                Login
              </Button> : <>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={onTrackingOpen} 
                  className="bg-white/80 hover:bg-emerald-50 text-emerald-700 border border-emerald-200/50 hover:border-emerald-300 rounded-xl shadow-sm hover:shadow-md transition-all duration-300"
                >
                  <Package className="w-4 h-4 mr-1" />
                  <span className="hidden sm:inline">Track</span>
                </Button>
                
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={onWishlistOpen} 
                  className="relative bg-white/80 hover:bg-emerald-50 text-emerald-700 border border-emerald-200/50 hover:border-emerald-300 rounded-xl shadow-sm hover:shadow-md transition-all duration-300"
                >
                  <Heart className="w-4 h-4 mr-1" />
                  <span className="hidden sm:inline">Wishlist</span>
                  {wishlistItems.length > 0 && <Badge className="absolute -top-1 -right-1 bg-red-600 text-white text-xs px-1.5 py-0.5 rounded-full animate-pulse border-2 border-white shadow-sm">
                      {wishlistItems.length}
                    </Badge>}
                </Button>
                
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={onProfileOpen} 
                  className="bg-white/80 hover:bg-emerald-50 text-emerald-700 border border-emerald-200/50 hover:border-emerald-300 rounded-xl shadow-sm hover:shadow-md transition-all duration-300"
                >
                  <User className="w-4 h-4 mr-1" />
                  <span className="hidden sm:inline">Profile</span>
                </Button>
              </>}
            
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={onCartOpen} 
              className="relative bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 text-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 px-4"
            >
              <span className="font-medium">Cart ({totalCartItems})</span>
              {totalCartItems > 0 && <Badge className="absolute -top-1 -right-1 bg-red-600 text-white text-xs px-1.5 py-0.5 rounded-full animate-pulse border-2 border-white shadow-sm">
                  {totalCartItems}
                </Badge>}
            </Button>
          </div>
        </div>
      </div>
    </header>;
};
export default Header;