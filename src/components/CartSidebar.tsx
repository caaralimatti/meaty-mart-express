
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { X, Plus, Minus, Clock, Truck } from "lucide-react";
import { toast } from "sonner";

interface CartItem {
  id: number;
  name: string;
  weight: string;
  price: number;
  quantity: number;
  image: string;
}

interface CartSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  setItems: (items: CartItem[]) => void;
}

const CartSidebar = ({ isOpen, onClose, items, setItems }: CartSidebarProps) => {
  const [deliveryType, setDeliveryType] = useState<"express" | "scheduled">("express");

  if (!isOpen) return null;

  const updateQuantity = (id: number, change: number) => {
    setItems(items.map(item => {
      if (item.id === id) {
        const newQuantity = Math.max(0, item.quantity + change);
        return newQuantity === 0 ? null : { ...item, quantity: newQuantity };
      }
      return item;
    }).filter(Boolean) as CartItem[]);
  };

  const removeItem = (id: number) => {
    setItems(items.filter(item => item.id !== id));
    toast.success("Item removed from cart");
  };

  const subtotal = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const deliveryFee = deliveryType === "express" ? 25 : 0;
  const total = subtotal + deliveryFee;

  const handleCheckout = () => {
    if (items.length === 0) {
      toast.error("Your cart is empty");
      return;
    }
    toast.success("Proceeding to checkout...");
    // Here you would integrate with payment gateway
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-end z-50">
      <div className="w-full max-w-md bg-white h-full flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-xl font-bold text-gray-800">Your Cart</h2>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="w-5 h-5" />
          </Button>
        </div>

        {/* Cart Items */}
        <div className="flex-1 overflow-y-auto p-4">
          {items.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500 mb-4">Your cart is empty</p>
              <Button onClick={onClose} className="bg-red-600 hover:bg-red-700">
                Continue Shopping
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              {items.map((item) => (
                <Card key={item.id} className="border-red-100">
                  <CardContent className="p-3">
                    <div className="flex items-center space-x-3">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-16 h-16 object-cover rounded"
                      />
                      <div className="flex-1">
                        <h3 className="font-semibold text-sm">{item.name}</h3>
                        <p className="text-xs text-gray-600">{item.weight}</p>
                        <p className="text-sm font-bold text-red-600">₹{item.price}</p>
                      </div>
                      <div className="flex flex-col items-end space-y-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => removeItem(item.id)}
                          className="text-red-500 hover:text-red-700 p-1 h-auto"
                        >
                          <X className="w-4 h-4" />
                        </Button>
                        <div className="flex items-center space-x-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => updateQuantity(item.id, -1)}
                            className="w-8 h-8 p-0"
                          >
                            <Minus className="w-3 h-3" />
                          </Button>
                          <span className="w-8 text-center font-semibold">{item.quantity}</span>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => updateQuantity(item.id, 1)}
                            className="w-8 h-8 p-0"
                          >
                            <Plus className="w-3 h-3" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>

        {/* Delivery Options & Checkout */}
        {items.length > 0 && (
          <div className="border-t p-4 space-y-4">
            {/* Delivery Type Selection */}
            <div className="space-y-2">
              <h3 className="font-semibold text-gray-800">Delivery Options</h3>
              <div className="grid grid-cols-2 gap-2">
                <Button
                  variant={deliveryType === "express" ? "default" : "outline"}
                  onClick={() => setDeliveryType("express")}
                  className={`p-3 h-auto flex flex-col items-center ${
                    deliveryType === "express" 
                      ? "bg-red-600 hover:bg-red-700" 
                      : "border-red-200 hover:bg-red-50"
                  }`}
                >
                  <Clock className="w-5 h-5 mb-1" />
                  <span className="text-xs">Express</span>
                  <span className="text-xs">30 min • ₹25</span>
                </Button>
                <Button
                  variant={deliveryType === "scheduled" ? "default" : "outline"}
                  onClick={() => setDeliveryType("scheduled")}
                  className={`p-3 h-auto flex flex-col items-center ${
                    deliveryType === "scheduled" 
                      ? "bg-red-600 hover:bg-red-700" 
                      : "border-red-200 hover:bg-red-50"
                  }`}
                >
                  <Truck className="w-5 h-5 mb-1" />
                  <span className="text-xs">Scheduled</span>
                  <span className="text-xs">2-4 hrs • Free</span>
                </Button>
              </div>
            </div>

            <Separator />

            {/* Bill Summary */}
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Subtotal</span>
                <span>₹{subtotal}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Delivery Fee</span>
                <span>{deliveryFee === 0 ? "Free" : `₹${deliveryFee}`}</span>
              </div>
              <Separator />
              <div className="flex justify-between font-bold text-lg">
                <span>Total</span>
                <span>₹{total}</span>
              </div>
            </div>

            <Button
              onClick={handleCheckout}
              className="w-full bg-red-600 hover:bg-red-700 py-3"
            >
              Proceed to Checkout • ₹{total}
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartSidebar;
