
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface PaymentMethodSelectorProps {
  paymentMethod: string;
  onPaymentMethodChange: (method: string) => void;
}

const PaymentMethodSelector = ({ paymentMethod, onPaymentMethodChange }: PaymentMethodSelectorProps) => {
  return (
    <div>
      <Label htmlFor="payment">Preferred Payment Method *</Label>
      <Select value={paymentMethod} onValueChange={onPaymentMethodChange}>
        <SelectTrigger className="mt-2">
          <SelectValue placeholder="Select payment method" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="cod">Cash on Delivery</SelectItem>
          <SelectItem value="upi">UPI Payment</SelectItem>
          <SelectItem value="card">Credit/Debit Card</SelectItem>
          <SelectItem value="wallet">Digital Wallet</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};

export default PaymentMethodSelector;
