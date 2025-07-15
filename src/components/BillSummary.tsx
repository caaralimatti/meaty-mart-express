import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
interface BillSummaryProps {
  subtotal: number;
  deliveryFee: number;
  total: number;
  onCheckout: () => void;
}
const BillSummary = ({
  subtotal,
  deliveryFee,
  total,
  onCheckout
}: BillSummaryProps) => {
  return <div className="space-y-4">
      <Separator />
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
      <Button onClick={onCheckout} className="w-full py-3 bg-green-500 hover:bg-green-400 rounded-lg">
        Proceed to Checkout • ₹{total}
      </Button>
    </div>;
};
export default BillSummary;