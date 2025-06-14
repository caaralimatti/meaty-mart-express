
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Card, CardContent } from "@/components/ui/card";
import { 
  Search, 
  Filter, 
  ShoppingCart, 
  User, 
  Menu,
  MapPin,
  Clock,
  Heart,
  Star,
  Plus,
  Minus,
  LogOut
} from "lucide-react";
import { useOnboarding } from "@/hooks/useOnboarding";

interface EnhancedCustomerInterfaceProps {
  onSwitchRole: () => void;
}

const EnhancedCustomerInterface = ({ onSwitchRole }: EnhancedCustomerInterfaceProps) => {
  const [cartItems, setCartItems] = useState<{[key: number]: number}>({});
  const [wishlist, setWishlist] = useState<number[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const { resetOnboarding } = useOnboarding();

  // Sample products data
  const products = [
    {
      id: 1,
      name: "Fresh Goat Leg",
      price: 899,
      originalPrice: 999,
      weight: "1 kg",
      rating: 4.8,
      reviews: 234,
      image: "🦵",
      discount: "10% OFF",
      freshness: "Farm Fresh",
      delivery: "30 mins"
    },
    {
      id: 2,
      name: "Goat Shoulder",
      price: 749,
      originalPrice: 849,
      weight: "500g",
      rating: 4.7,
      reviews: 189,
      image: "🥩",
      discount: "12% OFF",
      freshness: "Farm Fresh",
      delivery: "30 mins"
    },
    {
      id: 3,
      name: "Goat Ribs",
      price: 649,
      originalPrice: 729,
      weight: "750g",
      rating: 4.9,
      reviews: 156,
      image: "🍖",
      discount: "11% OFF",
      freshness: "Farm Fresh",
      delivery: "30 mins"
    }
  ];

  const addToCart = (productId: number) => {
    setCartItems(prev => ({
      ...prev,
      [productId]: (prev[productId] || 0) + 1
    }));
  };

  const removeFromCart = (productId: number) => {
    setCartItems(prev => {
      const newItems = { ...prev };
      if (newItems[productId] > 1) {
        newItems[productId]--;
      } else {
        delete newItems[productId];
      }
      return newItems;
    });
  };

  const toggleWishlist = (productId: number) => {
    setWishlist(prev => 
      prev.includes(productId) 
        ? prev.filter(id => id !== productId)
        : [...prev, productId]
    );
  };

  const totalCartItems = Object.values(cartItems).reduce((sum, count) => sum + count, 0);

  const handleLogout = () => {
    resetOnboarding();
    window.location.reload(); // This will trigger the onboarding flow again
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-red-100 sticky top-0 z-40">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-red-600 to-orange-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">Q</span>
              </div>
              <div>
                <h1 className="text-lg font-bold text-red-800">QuickGoat</h1>
                <p className="text-xs text-gray-600">30-min delivery</p>
              </div>
            </div>

            {/* Search Bar */}
            <div className="hidden md:flex flex-1 max-w-md mx-4">
              <div className="relative w-full">
                <Search className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                <Input
                  placeholder="Search fresh goat meat..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 border-red-200 focus:border-red-400"
                />
              </div>
            </div>

            {/* Right Actions */}
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="sm" className="relative border-red-200 text-red-700 hover:bg-red-50">
                <Heart className="w-4 h-4" />
                {wishlist.length > 0 && (
                  <Badge className="absolute -top-2 -right-2 bg-red-600 text-white text-xs px-1">
                    {wishlist.length}
                  </Badge>
                )}
              </Button>
              
              <Button variant="outline" size="sm" className="relative border-red-200 text-red-700 hover:bg-red-50">
                <ShoppingCart className="w-4 h-4" />
                {totalCartItems > 0 && (
                  <Badge className="absolute -top-2 -right-2 bg-red-600 text-white text-xs px-1">
                    {totalCartItems}
                  </Badge>
                )}
              </Button>

              {/* Mobile Menu */}
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="outline" size="sm" className="border-red-200 text-red-700 hover:bg-red-50">
                    <Menu className="w-4 h-4" />
                  </Button>
                </SheetTrigger>
                <SheetContent className="w-80">
                  <div className="space-y-4 mt-4">
                    <div className="space-y-2">
                      <Button variant="outline" className="w-full justify-start" onClick={onSwitchRole}>
                        <User className="w-4 h-4 mr-2" />
                        Switch to Seller
                      </Button>
                      <Button variant="outline" className="w-full justify-start text-red-600 hover:text-red-700" onClick={handleLogout}>
                        <LogOut className="w-4 h-4 mr-2" />
                        Logout
                      </Button>
                    </div>
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>

          {/* Mobile Search */}
          <div className="md:hidden mt-3">
            <div className="relative">
              <Search className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
              <Input
                placeholder="Search fresh goat meat..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 border-red-200 focus:border-red-400"
              />
            </div>
          </div>
        </div>
      </header>

      {/* Delivery Banner */}
      <div className="bg-gradient-to-r from-red-600 to-orange-600 text-white py-2">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-center space-x-4 text-sm">
            <div className="flex items-center space-x-1">
              <MapPin className="w-4 h-4" />
              <span>Delivering to Bangalore</span>
            </div>
            <div className="flex items-center space-x-1">
              <Clock className="w-4 h-4" />
              <span>30-min express delivery</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-6">
        {/* Filters */}
        <div className="flex items-center space-x-2 mb-6">
          <Button variant="outline" size="sm" className="border-red-200 text-red-700 hover:bg-red-50">
            <Filter className="w-4 h-4 mr-1" />
            Filters
          </Button>
          <div className="flex space-x-2 overflow-x-auto">
            <Badge variant="secondary" className="whitespace-nowrap">Fresh Cut</Badge>
            <Badge variant="secondary" className="whitespace-nowrap">Best Seller</Badge>
            <Badge variant="secondary" className="whitespace-nowrap">Under ₹500</Badge>
            <Badge variant="secondary" className="whitespace-nowrap">Family Pack</Badge>
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => (
            <Card key={product.id} className="overflow-hidden hover:shadow-lg transition-shadow">
              <CardContent className="p-0">
                {/* Product Image */}
                <div className="relative bg-gray-100 h-48 flex items-center justify-center">
                  <span className="text-6xl">{product.image}</span>
                  <Badge className="absolute top-2 left-2 bg-green-600">{product.freshness}</Badge>
                  <Badge className="absolute top-2 right-2 bg-orange-600">{product.discount}</Badge>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => toggleWishlist(product.id)}
                    className="absolute bottom-2 right-2 p-2"
                  >
                    <Heart className={`w-4 h-4 ${wishlist.includes(product.id) ? 'fill-red-500 text-red-500' : ''}`} />
                  </Button>
                </div>

                {/* Product Info */}
                <div className="p-4">
                  <h3 className="font-semibold text-lg mb-1">{product.name}</h3>
                  <p className="text-sm text-gray-600 mb-2">{product.weight}</p>
                  
                  <div className="flex items-center space-x-1 mb-3">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    <span className="text-sm font-medium">{product.rating}</span>
                    <span className="text-sm text-gray-500">({product.reviews} reviews)</span>
                  </div>

                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center space-x-2">
                      <span className="text-xl font-bold text-red-600">₹{product.price}</span>
                      <span className="text-sm text-gray-500 line-through">₹{product.originalPrice}</span>
                    </div>
                    <div className="flex items-center space-x-1 text-sm text-green-600">
                      <Clock className="w-3 h-3" />
                      <span>{product.delivery}</span>
                    </div>
                  </div>

                  {/* Add to Cart */}
                  {cartItems[product.id] ? (
                    <div className="flex items-center justify-between">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => removeFromCart(product.id)}
                        className="p-2"
                      >
                        <Minus className="w-4 h-4" />
                      </Button>
                      <span className="font-medium">{cartItems[product.id]}</span>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => addToCart(product.id)}
                        className="p-2"
                      >
                        <Plus className="w-4 h-4" />
                      </Button>
                    </div>
                  ) : (
                    <Button
                      onClick={() => addToCart(product.id)}
                      className="w-full bg-red-600 hover:bg-red-700"
                    >
                      Add to Cart
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </main>
    </div>
  );
};

export default EnhancedCustomerInterface;
