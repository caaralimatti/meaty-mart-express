import { Button } from "@/components/ui/button";
import { Filter, ChefHat, Calendar } from "lucide-react";
interface FiltersSectionProps {
  selectedFilter: string;
  onFilterChange: (filter: string) => void;
  onFiltersOpen: () => void;
  onRecipesOpen: () => void;
  onSchedulerOpen: () => void;
}
const FiltersSection = ({
  selectedFilter,
  onFilterChange,
  onFiltersOpen,
  onRecipesOpen,
  onSchedulerOpen
}: FiltersSectionProps) => {
  const filters = [{
    key: "all",
    label: "All Items"
  }, {
    key: "curry-cut",
    label: "Curry Cut"
  }, {
    key: "boneless",
    label: "Boneless"
  }, {
    key: "marinated",
    label: "Marinated"
  }];
  return <div className="container mx-auto px-4">
      <div className="flex flex-wrap gap-2 mb-6 justify-center bg-transparent">
        {filters.map(filter => <Button key={filter.key} variant={selectedFilter === filter.key ? "default" : "outline"} size="sm" onClick={() => onFilterChange(filter.key)} className={selectedFilter === filter.key ? "bg-green-700 text-lime-200 hover:bg-green-600" : "bg-transparent border-green-200 text-green-700 hover:bg-green-50"}>
            {filter.label}
          </Button>)}
        
        {/* New Feature Buttons */}
        <Button variant="outline" size="sm" onClick={onFiltersOpen} className="bg-transparent border-green-200 text-green-700 hover:bg-green-50">
          <Filter className="w-4 h-4 mr-1" />
          Filters
        </Button>
        
        <Button variant="outline" size="sm" onClick={onRecipesOpen} className="bg-transparent border-green-200 text-green-700 hover:bg-green-50">
          <ChefHat className="w-4 h-4 mr-1" />
          Recipes
        </Button>
        
        <Button variant="outline" size="sm" onClick={onSchedulerOpen} className="bg-transparent border-green-200 text-green-700 hover:bg-green-50">
          <Calendar className="w-4 h-4 mr-1" />
          Schedule
        </Button>
      </div>
    </div>;
};
export default FiltersSection;