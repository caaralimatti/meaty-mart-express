
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { X, RotateCcw, Plus, Clock, Star } from "lucide-react";
import { toast } from "sonner";

interface QuickReorderProps {
  isOpen: boolean;
  onClose: () => void;
  onAddToCart: (product: any) => void;
}

const QuickReorder = ({ isOpen, onClose, onAddToCart }: QuickReorderProps) => {
  const [orderHistory] = useState([
    {
      id: 1,
      date: "2024-06-10",
      items: [
        { name: "Premium Goat Curry Cut", weight: "500g", price: 420, image: "/placeholder.svg" },
        { name: "Boneless Goat Chunks", weight: "250g", price: 380, image: "/placeholder.svg" }
      ],
      total: 800,
      rating: 5
    },
    {
      id: 2,
      date: "2024-06-03",
      items: [
        { name: "Marinated Goat Biryani Cut", weight: "1kg", price: 850, image: "/placeholder.svg" }
      ],
      total: 850,
      rating: 4
    },
    {
      id: 3,
      date: "2024-05-28",
      items: [
        { name: "Premium Goat Curry Cut", weight: "500g", price: 420, image: "/placeholder.svg" },
        { name: "Marinated Goat Biryani Cut", weight: "500g", price: 425, image: "/placeholder.svg" }
      ],
      total: 845,
      rating: 5
    }
  ]);

  const [favoriteItems] = useState([
    { name: "Premium Goat Curry Cut", weight: "500g", price: 420, image: "/placeholder.svg", orderCount: 8 },
    { name: "Boneless Goat Chunks", weight: "250g", price: 380, image: "/placeholder.svg", orderCount: 5 },
    { name: "Marinated Goat Biryani Cut", weight: "1kg", price: 850, image: "/placeholder.svg", orderCount: 3 }
  ]);

  const reorderEntireOrder = (order: typeof orderHistory[0]) => {
    order.items.forEach(item => {
      onAddToCart({
        id: Date.now() + Math.random(),
        name: item.name,
        weight: item.weight,
        price: item.price,
        image: item.image,
        category: "reorder",
        boneIn: true,
        inStock: true,
        rating: 4.5,
        freshness: "Farm Fresh"
      });
    });
    toast.success(`${order.items.length} items added to cart from previous order`);
  };

  const addSingleItemToCart = (item: any) => {
    onAddToCart({
      id: Date.now() + Math.random(),
      name: item.name,
      weight: item.weight,
      price: item.price,
      image: item.image,
      category: "reorder",
      boneIn: true,
      inStock: true,
      rating: 4.5,
      freshness: "Farm Fresh"
    });
    toast.success(`${item.name} added to cart`);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-lg max-h-[90vh] overflow-hidden">
        <CardHeader className="flex flex-row items-center justify-between">
          <div className="flex items-center space-x-2">
            <RotateCcw className="w-5 h-5 text-green-600" />
            <CardTitle className="text-xl text-green-700">Quick Reorder</CardTitle>
          </div>
          <Button variant="ghost" onClick={onClose}>
            <X className="w-5 h-5" />
          </Button>
        </CardHeader>
        
        <CardContent className="p-4 max-h-[70vh] overflow-y-auto space-y-6">
          {/* Favorite Items */}
          <div>
            <h3 className="font-semibold mb-3 flex items-center">
              <Star className="w-4 h-4 mr-2 text-yellow-500" />
              Your Favorites
            </h3>
            <div className="space-y-2">
              {favoriteItems.map((item, index) => (
                <Card key={index} className="border-yellow-200 bg-yellow-50">
                  <CardContent className="p-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <img src={item.image} alt={item.name} className="w-12 h-12 object-cover rounded" />
                        <div>
                          <h4 className="font-medium text-sm">{item.name}</h4>
                          <p className="text-xs text-gray-600">{item.weight} • ₹{item.price}</p>
                          <Badge variant="secondary" className="text-xs mt-1">
                            Ordered {item.orderCount} times
                          </Badge>
                        </div>
                      </div>
                      <Button
                        size="sm"
                        onClick={() => addSingleItemToCart(item)}
                        className="bg-green-600 hover:bg-green-700"
                      >
                        <Plus className="w-4 h-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Recent Orders */}
          <div>
            <h3 className="font-semibold mb-3 flex items-center">
              <Clock className="w-4 h-4 mr-2 text-blue-500" />
              Recent Orders
            </h3>
            <div className="space-y-3">
              {orderHistory.map((order) => (
                <Card key={order.id} className="border-blue-200">
                  <CardContent className="p-4">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <p className="text-sm text-gray-600">
                          {new Date(order.date).toLocaleDateString('en-IN', { 
                            day: 'numeric', 
                            month: 'short', 
                            year: 'numeric' 
                          })}
                        </p>
                        <div className="flex items-center space-x-1 mt-1">
                          {Array.from({ length: order.rating }).map((_, i) => (
                            <Star key={i} className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                          ))}
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-bold">₹{order.total}</div>
                        <Button
                          size="sm"
                          onClick={() => reorderEntireOrder(order)}
                          className="mt-1 bg-blue-600 hover:bg-blue-700"
                        >
                          Reorder All
                        </Button>
                      </div>
                    </div>

                    <div className="space-y-2">
                      {order.items.map((item, itemIndex) => (
                        <div key={itemIndex} className="flex items-center justify-between py-2 border-t border-gray-100">
                          <div className="flex items-center space-x-2">
                            <img src={item.image} alt={item.name} className="w-8 h-8 object-cover rounded" />
                            <div>
                              <p className="text-sm font-medium">{item.name}</p>
                              <p className="text-xs text-gray-600">{item.weight} • ₹{item.price}</p>
                            </div>
                          </div>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => addSingleItemToCart(item)}
                          >
                            <Plus className="w-4 h-4" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Quick Actions */}
          <Card className="border-green-200 bg-green-50">
            <CardContent className="p-4">
              <h4 className="font-semibold text-green-700 mb-2">Quick Actions</h4>
              <div className="grid grid-cols-2 gap-2">
                <Button variant="outline" size="sm" onClick={() => {
                  favoriteItems.slice(0, 2).forEach(item => addSingleItemToCart(item));
                  toast.success("Top 2 favorites added to cart");
                }}>
                  Add Top Favorites
                </Button>
                <Button variant="outline" size="sm" onClick={() => {
                  if (orderHistory.length > 0) {
                    reorderEntireOrder(orderHistory[0]);
                  }
                }}>
                  Repeat Last Order
                </Button>
              </div>
            </CardContent>
          </Card>
        </CardContent>
      </Card>
    </div>
  );
};

export default QuickReorder;
