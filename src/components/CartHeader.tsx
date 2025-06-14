
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

interface CartHeaderProps {
  onClose: () => void;
}

const CartHeader = ({ onClose }: CartHeaderProps) => {
  return (
    <div className="flex items-center justify-between p-4 border-b">
      <h2 className="text-xl font-bold text-gray-800">Your Cart</h2>
      <Button variant="ghost" size="sm" onClick={onClose}>
        <X className="w-5 h-5" />
      </Button>
    </div>
  );
};

export default CartHeader;
