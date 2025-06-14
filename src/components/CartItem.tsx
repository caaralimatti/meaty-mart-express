
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { X, Plus, Minus } from "lucide-react";

interface CartItem {
  id: number;
  name: string;
  weight: string;
  price: number;
  quantity: number;
  image: string;
}

interface CartItemProps {
  item: CartItem;
  onUpdateQuantity: (id: number, change: number) => void;
  onRemove: (id: number) => void;
}

const CartItemComponent = ({ item, onUpdateQuantity, onRemove }: CartItemProps) => {
  return (
    <Card className="border-red-100">
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
              onClick={() => onRemove(item.id)}
              className="text-red-500 hover:text-red-700 p-1 h-auto"
            >
              <X className="w-4 h-4" />
            </Button>
            <div className="flex items-center space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => onUpdateQuantity(item.id, -1)}
                className="w-8 h-8 p-0"
              >
                <Minus className="w-3 h-3" />
              </Button>
              <span className="w-8 text-center font-semibold">{item.quantity}</span>
              <Button
                variant="outline"
                size="sm"
                onClick={() => onUpdateQuantity(item.id, 1)}
                className="w-8 h-8 p-0"
              >
                <Plus className="w-3 h-3" />
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CartItemComponent;
