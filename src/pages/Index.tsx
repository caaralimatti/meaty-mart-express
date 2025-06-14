
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Search, MapPin, Clock, Shield, Star, Phone } from "lucide-react";
import ProductCard from "@/components/ProductCard";
import CartSidebar from "@/components/CartSidebar";
import AuthModal from "@/components/AuthModal";

const Index = () => {
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("all");

  const mockProducts = [
    {
      id: 1,
      name: "Premium Goat Curry Cut",
      weight: "500g",
      price: 420,
      originalPrice: 450,
      image: "/placeholder.svg",
      category: "curry-cut",
      boneIn: true,
      inStock: true,
      rating: 4.5,
      freshness: "Farm Fresh",
    },
    {
      id: 2,
      name: "Boneless Goat Chunks",
      weight: "250g",
      price: 380,
      originalPrice: 400,
      image: "/placeholder.svg",
      category: "boneless",
      boneIn: false,
      inStock: true,
      rating: 4.7,
      freshness: "Premium Cut",
    },
    {
      id: 3,
      name: "Marinated Goat Biryani Cut",
      weight: "1kg",
      price: 850,
      originalPrice: 900,
      image: "/placeholder.svg",
      category: "marinated",
      boneIn: true,
      inStock: false,
      rating: 4.8,
      freshness: "Special Marinade",
    },
  ];

  const addToCart = (product) => {
    setCartItems(prev => {
      const existingItem = prev.find(item => item.id === product.id);
      if (existingItem) {
        return prev.map(item => 
          item.id === product.id 
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const filteredProducts = mockProducts.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = selectedFilter === "all" || product.category === selectedFilter;
    return matchesSearch && matchesFilter;
  });

  const totalCartItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 to-red-50">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white shadow-md border-b-2 border-red-100">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-gradient-to-r from-red-600 to-orange-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">Q</span>
              </div>
              <div>
                <h1 className="text-xl font-bold text-red-800">QuickGoat</h1>
                <p className="text-xs text-gray-600">Farm to Fork in 30 mins</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setIsAuthOpen(true)}
                className="border-red-200 text-red-700 hover:bg-red-50"
              >
                <Phone className="w-4 h-4 mr-1" />
                Login
              </Button>
              
              <Button
                variant="outline"
                size="sm"
                onClick={() => setIsCartOpen(true)}
                className="relative border-red-200 text-red-700 hover:bg-red-50"
              >
                Cart ({totalCartItems})
                {totalCartItems > 0 && (
                  <Badge className="absolute -top-2 -right-2 bg-red-600 text-white text-xs px-1">
                    {totalCartItems}
                  </Badge>
                )}
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Trust Banner */}
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

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-6">
        <div className="text-center mb-6">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">
            Fresh Goat Meat Delivered in 30 Minutes
          </h2>
          <p className="text-gray-600">Premium quality, hygienically processed, farm-fresh goat meat</p>
        </div>

        {/* Location & Search */}
        <div className="max-w-2xl mx-auto mb-6">
          <div className="flex items-center space-x-2 mb-4">
            <MapPin className="w-5 h-5 text-red-600" />
            <span className="text-sm text-gray-600">Delivering to: </span>
            <span className="font-semibold text-gray-800">Hubli, Karnataka</span>
            <Button variant="link" className="text-red-600 p-0 h-auto">Change</Button>
          </div>
          
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <Input
              placeholder="Search for goat meat cuts..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 py-3 text-lg border-red-200 focus:border-red-400"
            />
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-2 mb-6 justify-center">
          {[
            { key: "all", label: "All Items" },
            { key: "curry-cut", label: "Curry Cut" },
            { key: "boneless", label: "Boneless" },
            { key: "marinated", label: "Marinated" },
          ].map((filter) => (
            <Button
              key={filter.key}
              variant={selectedFilter === filter.key ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedFilter(filter.key)}
              className={selectedFilter === filter.key 
                ? "bg-red-600 hover:bg-red-700" 
                : "border-red-200 text-red-700 hover:bg-red-50"
              }
            >
              {filter.label}
            </Button>
          ))}
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onAddToCart={addToCart}
            />
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No products found matching your search.</p>
          </div>
        )}
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8 mt-12">
        <div className="container mx-auto px-4 text-center">
          <div className="mb-4">
            <h3 className="text-xl font-bold mb-2">QuickGoat</h3>
            <p className="text-gray-300">Premium goat meat delivery in Tier 2 & 3 cities</p>
          </div>
          <div className="flex justify-center space-x-6 text-sm">
            <span>📞 Customer Support: 1800-XXX-XXXX</span>
            <span>🕐 Available: 6 AM - 10 PM</span>
          </div>
        </div>
      </footer>

      {/* Modals */}
      <AuthModal isOpen={isAuthOpen} onClose={() => setIsAuthOpen(false)} />
      <CartSidebar 
        isOpen={isCartOpen} 
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        setItems={setCartItems}
      />
    </div>
  );
};

export default Index;
