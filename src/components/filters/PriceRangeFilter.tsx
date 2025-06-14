
import { Slider } from "@/components/ui/slider";

interface PriceRangeFilterProps {
  priceRange: [number, number];
  onPriceRangeChange: (value: [number, number]) => void;
}

const PriceRangeFilter = ({ priceRange, onPriceRangeChange }: PriceRangeFilterProps) => {
  return (
    <div>
      <h3 className="font-semibold mb-3">Price Range</h3>
      <Slider
        value={priceRange}
        onValueChange={(value) => onPriceRangeChange(value as [number, number])}
        max={1000}
        min={0}
        step={50}
        className="mb-2"
      />
      <div className="flex justify-between text-sm text-gray-600">
        <span>₹{priceRange[0]}</span>
        <span>₹{priceRange[1]}</span>
      </div>
    </div>
  );
};

export default PriceRangeFilter;
