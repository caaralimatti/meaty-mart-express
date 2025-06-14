
import { Checkbox } from "@/components/ui/checkbox";

interface QuickFiltersProps {
  inStock: boolean;
  fastDelivery: boolean;
  onInStockChange: (checked: boolean) => void;
  onFastDeliveryChange: (checked: boolean) => void;
}

const QuickFilters = ({ inStock, fastDelivery, onInStockChange, onFastDeliveryChange }: QuickFiltersProps) => {
  return (
    <div>
      <h3 className="font-semibold mb-3">Quick Filters</h3>
      <div className="space-y-2">
        <div className="flex items-center space-x-2">
          <Checkbox
            id="inStock"
            checked={inStock}
            onCheckedChange={(checked) => onInStockChange(checked as boolean)}
          />
          <label htmlFor="inStock" className="text-sm">In Stock Only</label>
        </div>
        <div className="flex items-center space-x-2">
          <Checkbox
            id="fastDelivery"
            checked={fastDelivery}
            onCheckedChange={(checked) => onFastDeliveryChange(checked as boolean)}
          />
          <label htmlFor="fastDelivery" className="text-sm">30-min Delivery</label>
        </div>
      </div>
    </div>
  );
};

export default QuickFilters;
