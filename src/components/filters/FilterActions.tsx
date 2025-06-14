
import { Button } from "@/components/ui/button";
import { RotateCcw } from "lucide-react";

interface FilterActionsProps {
  onReset: () => void;
  onApply: () => void;
}

const FilterActions = ({ onReset, onApply }: FilterActionsProps) => {
  return (
    <div className="p-4 border-t flex space-x-2">
      <Button variant="outline" onClick={onReset} className="flex-1">
        <RotateCcw className="w-4 h-4 mr-2" />
        Reset
      </Button>
      <Button onClick={onApply} className="flex-1 bg-red-600 hover:bg-red-700">
        Apply Filters
      </Button>
    </div>
  );
};

export default FilterActions;
