import { Button } from "@/components/ui/button";
interface EmptyCartProps {
  onContinueShopping: () => void;
}
const EmptyCart = ({
  onContinueShopping
}: EmptyCartProps) => {
  return <div className="text-center py-12">
      <p className="text-gray-500 mb-4">Your cart is empty</p>
      <Button onClick={onContinueShopping} className="text-slate-50 bg-red-600 hover:bg-red-500">
        Continue Shopping
      </Button>
    </div>;
};
export default EmptyCart;