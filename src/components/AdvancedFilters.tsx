
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { Filter, X, RotateCcw } from "lucide-react";

interface FilterOptions {
  priceRange: [number, number];
  categories: string[];
  boneType: string[];
  freshness: string[];
  rating: number;
  inStock: boolean;
  fastDelivery: boolean;
}

interface AdvancedFiltersProps {
  isOpen: boolean;
  onClose: () => void;
  onApplyFilters: (filters: FilterOptions) => void;
  currentFilters: FilterOptions;
}

const AdvancedFilters = ({ isOpen, onClose, onApplyFilters, currentFilters }: AdvancedFiltersProps) => {
  const [filters, setFilters] = useState<FilterOptions>(currentFilters);

  const categories = [
    { id: "curry-cut", label: "Curry Cut" },
    { id: "boneless", label: "Boneless" },
    { id: "marinated", label: "Marinated" },
    { id: "biryani-cut", label: "Biryani Cut" },
    { id: "grilling", label: "Grilling" }
  ];

  const boneTypes = [
    { id: "bone-in", label: "Bone-in" },
    { id: "boneless", label: "Boneless" },
    { id: "mixed", label: "Mixed" }
  ];

  const freshnessLevels = [
    { id: "farm-fresh", label: "Farm Fresh" },
    { id: "premium-cut", label: "Premium Cut" },
    { id: "special-marinade", label: "Special Marinade" },
    { id: "organic", label: "Organic" }
  ];

  const handleApply = () => {
    onApplyFilters(filters);
    onClose();
  };

  const handleReset = () => {
    const resetFilters: FilterOptions = {
      priceRange: [0, 1000],
      categories: [],
      boneType: [],
      freshness: [],
      rating: 0,
      inStock: false,
      fastDelivery: false
    };
    setFilters(resetFilters);
  };

  const handleCategoryChange = (categoryId: string, checked: boolean) => {
    setFilters(prev => ({
      ...prev,
      categories: checked 
        ? [...prev.categories, categoryId]
        : prev.categories.filter(id => id !== categoryId)
    }));
  };

  const handleBoneTypeChange = (boneTypeId: string, checked: boolean) => {
    setFilters(prev => ({
      ...prev,
      boneType: checked 
        ? [...prev.boneType, boneTypeId]
        : prev.boneType.filter(id => id !== boneTypeId)
    }));
  };

  const handleFreshnessChange = (freshnessId: string, checked: boolean) => {
    setFilters(prev => ({
      ...prev,
      freshness: checked 
        ? [...prev.freshness, freshnessId]
        : prev.freshness.filter(id => id !== freshnessId)
    }));
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-md max-h-[90vh] overflow-hidden">
        <CardHeader className="flex flex-row items-center justify-between">
          <div className="flex items-center space-x-2">
            <Filter className="w-5 h-5 text-red-600" />
            <CardTitle className="text-xl text-red-700">Advanced Filters</CardTitle>
          </div>
          <Button variant="ghost" onClick={onClose}>
            <X className="w-5 h-5" />
          </Button>
        </CardHeader>
        
        <CardContent className="p-4 max-h-[70vh] overflow-y-auto space-y-6">
          {/* Price Range */}
          <div>
            <h3 className="font-semibold mb-3">Price Range</h3>
            <Slider
              value={filters.priceRange}
              onValueChange={(value) => setFilters(prev => ({ ...prev, priceRange: value as [number, number] }))}
              max={1000}
              min={0}
              step={50}
              className="mb-2"
            />
            <div className="flex justify-between text-sm text-gray-600">
              <span>₹{filters.priceRange[0]}</span>
              <span>₹{filters.priceRange[1]}</span>
            </div>
          </div>

          {/* Categories */}
          <div>
            <h3 className="font-semibold mb-3">Categories</h3>
            <div className="space-y-2">
              {categories.map((category) => (
                <div key={category.id} className="flex items-center space-x-2">
                  <Checkbox
                    id={category.id}
                    checked={filters.categories.includes(category.id)}
                    onCheckedChange={(checked) => handleCategoryChange(category.id, checked as boolean)}
                  />
                  <label htmlFor={category.id} className="text-sm">{category.label}</label>
                </div>
              ))}
            </div>
          </div>

          {/* Bone Type */}
          <div>
            <h3 className="font-semibold mb-3">Bone Type</h3>
            <div className="space-y-2">
              {boneTypes.map((boneType) => (
                <div key={boneType.id} className="flex items-center space-x-2">
                  <Checkbox
                    id={boneType.id}
                    checked={filters.boneType.includes(boneType.id)}
                    onCheckedChange={(checked) => handleBoneTypeChange(boneType.id, checked as boolean)}
                  />
                  <label htmlFor={boneType.id} className="text-sm">{boneType.label}</label>
                </div>
              ))}
            </div>
          </div>

          {/* Freshness */}
          <div>
            <h3 className="font-semibold mb-3">Freshness Level</h3>
            <div className="space-y-2">
              {freshnessLevels.map((freshness) => (
                <div key={freshness.id} className="flex items-center space-x-2">
                  <Checkbox
                    id={freshness.id}
                    checked={filters.freshness.includes(freshness.id)}
                    onCheckedChange={(checked) => handleFreshnessChange(freshness.id, checked as boolean)}
                  />
                  <label htmlFor={freshness.id} className="text-sm">{freshness.label}</label>
                </div>
              ))}
            </div>
          </div>

          {/* Rating */}
          <div>
            <h3 className="font-semibold mb-3">Minimum Rating</h3>
            <Slider
              value={[filters.rating]}
              onValueChange={(value) => setFilters(prev => ({ ...prev, rating: value[0] }))}
              max={5}
              min={0}
              step={0.5}
              className="mb-2"
            />
            <div className="text-sm text-gray-600 text-center">
              {filters.rating} stars and above
            </div>
          </div>

          {/* Quick Filters */}
          <div>
            <h3 className="font-semibold mb-3">Quick Filters</h3>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="inStock"
                  checked={filters.inStock}
                  onCheckedChange={(checked) => setFilters(prev => ({ ...prev, inStock: checked as boolean }))}
                />
                <label htmlFor="inStock" className="text-sm">In Stock Only</label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="fastDelivery"
                  checked={filters.fastDelivery}
                  onCheckedChange={(checked) => setFilters(prev => ({ ...prev, fastDelivery: checked as boolean }))}
                />
                <label htmlFor="fastDelivery" className="text-sm">30-min Delivery</label>
              </div>
            </div>
          </div>
        </CardContent>

        <div className="p-4 border-t flex space-x-2">
          <Button variant="outline" onClick={handleReset} className="flex-1">
            <RotateCcw className="w-4 h-4 mr-2" />
            Reset
          </Button>
          <Button onClick={handleApply} className="flex-1 bg-red-600 hover:bg-red-700">
            Apply Filters
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default AdvancedFilters;
