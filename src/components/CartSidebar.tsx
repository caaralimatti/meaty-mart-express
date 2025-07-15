import { useState } from "react";
import { toast } from "sonner";
import CartHeader from "@/components/CartHeader";
import CartItemComponent from "@/components/CartItem";
import EmptyCart from "@/components/EmptyCart";
import DeliveryOptions from "@/components/DeliveryOptions";
import BillSummary from "@/components/BillSummary";
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
const CartSidebar = ({
  isOpen,
  onClose,
  items,
  setItems
}: CartSidebarProps) => {
  const [deliveryType, setDeliveryType] = useState<"express" | "scheduled">("express");
  if (!isOpen) return null;
  const updateQuantity = (id: number, change: number) => {
    setItems(items.map(item => {
      if (item.id === id) {
        const newQuantity = Math.max(0, item.quantity + change);
        return newQuantity === 0 ? null : {
          ...item,
          quantity: newQuantity
        };
      }
      return item;
    }).filter(Boolean) as CartItem[]);
  };
  const removeItem = (id: number) => {
    setItems(items.filter(item => item.id !== id));
    toast.success("Item removed from cart");
  };
  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const deliveryFee = deliveryType === "express" ? 25 : 0;
  const total = subtotal + deliveryFee;
  const handleCheckout = () => {
    if (items.length === 0) {
      toast.error("Your cart is empty");
      return;
    }
    toast.success("Proceeding to checkout...");
  };
  return <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-end z-50">
      <div className="w-full max-w-md bg-white h-full flex flex-col">
        <CartHeader onClose={onClose} />

        <div className="flex-1 overflow-y-auto p-4 bg-inherit">
          {items.length === 0 ? <EmptyCart onContinueShopping={onClose} /> : <div className="space-y-4">
              {items.map(item => <CartItemComponent key={item.id} item={item} onUpdateQuantity={updateQuantity} onRemove={removeItem} />)}
            </div>}
        </div>

        {items.length > 0 && <div className="border-t p-4 space-y-4 bg-charcoal-black">
            <DeliveryOptions deliveryType={deliveryType} onDeliveryTypeChange={setDeliveryType} />
            
            <BillSummary subtotal={subtotal} deliveryFee={deliveryFee} total={total} onCheckout={handleCheckout} />
          </div>}
      </div>
    </div>;
};
export default CartSidebar;