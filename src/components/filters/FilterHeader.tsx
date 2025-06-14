
import { Button } from "@/components/ui/button";
import { CardHeader, CardTitle } from "@/components/ui/card";
import { Filter, X } from "lucide-react";

interface FilterHeaderProps {
  onClose: () => void;
}

const FilterHeader = ({ onClose }: FilterHeaderProps) => {
  return (
    <CardHeader className="flex flex-row items-center justify-between">
      <div className="flex items-center space-x-2">
        <Filter className="w-5 h-5 text-red-600" />
        <CardTitle className="text-xl text-red-700">Advanced Filters</CardTitle>
      </div>
      <Button variant="ghost" onClick={onClose}>
        <X className="w-5 h-5" />
      </Button>
    </CardHeader>
  );
};

export default FilterHeader;
