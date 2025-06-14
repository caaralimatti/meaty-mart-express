
import { Slider } from "@/components/ui/slider";

interface RatingFilterProps {
  rating: number;
  onRatingChange: (rating: number) => void;
}

const RatingFilter = ({ rating, onRatingChange }: RatingFilterProps) => {
  return (
    <div>
      <h3 className="font-semibold mb-3">Minimum Rating</h3>
      <Slider
        value={[rating]}
        onValueChange={(value) => onRatingChange(value[0])}
        max={5}
        min={0}
        step={0.5}
        className="mb-2"
      />
      <div className="text-sm text-gray-600 text-center">
        {rating} stars and above
      </div>
    </div>
  );
};

export default RatingFilter;
