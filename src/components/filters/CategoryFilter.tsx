
import { Checkbox } from "@/components/ui/checkbox";

interface CategoryFilterProps {
  selectedCategories: string[];
  onCategoryChange: (categoryId: string, checked: boolean) => void;
}

const CategoryFilter = ({ selectedCategories, onCategoryChange }: CategoryFilterProps) => {
  const categories = [
    { id: "curry-cut", label: "Curry Cut" },
    { id: "boneless", label: "Boneless" },
    { id: "marinated", label: "Marinated" },
    { id: "biryani-cut", label: "Biryani Cut" },
    { id: "grilling", label: "Grilling" }
  ];

  return (
    <div>
      <h3 className="font-semibold mb-3">Categories</h3>
      <div className="space-y-2">
        {categories.map((category) => (
          <div key={category.id} className="flex items-center space-x-2">
            <Checkbox
              id={category.id}
              checked={selectedCategories.includes(category.id)}
              onCheckedChange={(checked) => onCategoryChange(category.id, checked as boolean)}
            />
            <label htmlFor={category.id} className="text-sm">{category.label}</label>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoryFilter;
