
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { X, Heart, ShoppingCart, Star } from "lucide-react";
import { toast } from "sonner";

interface Product {
  id: number;
  name: string;
  weight: string;
  price: number;
  originalPrice: number;
  image: string;
  rating: number;
  inStock: boolean;
}

interface WishlistModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddToCart: (product: Product) => void;
}

const WishlistModal = ({ isOpen, onClose, onAddToCart }: WishlistModalProps) => {
  const [wishlistItems] = useState<Product[]>([
    {
      id: 1,
      name: "Premium Goat Curry Cut",
      weight: "500g",
      price: 420,
      originalPrice: 450,
      image: "/placeholder.svg",
      rating: 4.5,
      inStock: true
    },
    {
      id: 3,
      name: "Marinated Goat Biryani Cut",
      weight: "1kg",
      price: 850,
      originalPrice: 900,
      image: "/placeholder.svg",
      rating: 4.8,
      inStock: false
    }
  ]);

  const removeFromWishlist = (id: number) => {
    toast.success("Item removed from wishlist");
  };

  const moveToCart = (product: Product) => {
    onAddToCart(product);
    removeFromWishlist(product.id);
    toast.success("Item moved to cart");
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-2xl max-h-[90vh] overflow-hidden">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-2xl text-red-700">My Wishlist</CardTitle>
          <Button variant="ghost" onClick={onClose}>
            <X className="w-5 h-5" />
          </Button>
        </CardHeader>
        
        <CardContent className="p-4 max-h-[70vh] overflow-y-auto">
          {wishlistItems.length === 0 ? (
            <div className="text-center py-12">
              <Heart className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500 text-lg mb-4">Your wishlist is empty</p>
              <Button onClick={onClose} className="bg-red-600 hover:bg-red-700">
                Continue Shopping
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {wishlistItems.map((item) => (
                <Card key={item.id} className="border-red-100 hover:shadow-lg transition-shadow">
                  <CardContent className="p-4">
                    <div className="relative mb-3">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-32 object-cover rounded"
                      />
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeFromWishlist(item.id)}
                        className="absolute top-2 right-2 bg-white/80 hover:bg-white text-red-600"
                      >
                        <X className="w-4 h-4" />
                      </Button>
                      {!item.inStock && (
                        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center rounded">
                          <Badge variant="destructive">Out of Stock</Badge>
                        </div>
                      )}
                    </div>
                    
                    <h3 className="font-semibold text-gray-800 mb-2">{item.name}</h3>
                    
                    <div className="flex items-center justify-between mb-2">
                      <Badge variant="outline" className="text-xs">
                        {item.weight}
                      </Badge>
                      <div className="flex items-center space-x-1">
                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        <span className="text-sm text-gray-600">{item.rating}</span>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center space-x-2">
                        <span className="text-lg font-bold text-red-600">₹{item.price}</span>
                        {item.originalPrice > item.price && (
                          <span className="text-sm text-gray-500 line-through">₹{item.originalPrice}</span>
                        )}
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Button 
                        onClick={() => moveToCart(item)}
                        disabled={!item.inStock}
                        className="w-full bg-red-600 hover:bg-red-700 disabled:bg-gray-400"
                      >
                        <ShoppingCart className="w-4 h-4 mr-2" />
                        {item.inStock ? "Move to Cart" : "Out of Stock"}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default WishlistModal;
