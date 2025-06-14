
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import FilterHeader from "@/components/filters/FilterHeader";
import PriceRangeFilter from "@/components/filters/PriceRangeFilter";
import CategoryFilter from "@/components/filters/CategoryFilter";
import BoneTypeFilter from "@/components/filters/BoneTypeFilter";
import FreshnessFilter from "@/components/filters/FreshnessFilter";
import RatingFilter from "@/components/filters/RatingFilter";
import QuickFilters from "@/components/filters/QuickFilters";
import FilterActions from "@/components/filters/FilterActions";

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
        <FilterHeader onClose={onClose} />
        
        <CardContent className="p-4 max-h-[70vh] overflow-y-auto space-y-6">
          <PriceRangeFilter
            priceRange={filters.priceRange}
            onPriceRangeChange={(value) => setFilters(prev => ({ ...prev, priceRange: value }))}
          />

          <CategoryFilter
            selectedCategories={filters.categories}
            onCategoryChange={handleCategoryChange}
          />

          <BoneTypeFilter
            selectedBoneTypes={filters.boneType}
            onBoneTypeChange={handleBoneTypeChange}
          />

          <FreshnessFilter
            selectedFreshness={filters.freshness}
            onFreshnessChange={handleFreshnessChange}
          />

          <RatingFilter
            rating={filters.rating}
            onRatingChange={(rating) => setFilters(prev => ({ ...prev, rating }))}
          />

          <QuickFilters
            inStock={filters.inStock}
            fastDelivery={filters.fastDelivery}
            onInStockChange={(checked) => setFilters(prev => ({ ...prev, inStock: checked }))}
            onFastDeliveryChange={(checked) => setFilters(prev => ({ ...prev, fastDelivery: checked }))}
          />
        </CardContent>

        <FilterActions onReset={handleReset} onApply={handleApply} />
      </Card>
    </div>
  );
};

export default AdvancedFilters;
