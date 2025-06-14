
import { Checkbox } from "@/components/ui/checkbox";

interface FreshnessFilterProps {
  selectedFreshness: string[];
  onFreshnessChange: (freshnessId: string, checked: boolean) => void;
}

const FreshnessFilter = ({ selectedFreshness, onFreshnessChange }: FreshnessFilterProps) => {
  const freshnessLevels = [
    { id: "farm-fresh", label: "Farm Fresh" },
    { id: "premium-cut", label: "Premium Cut" },
    { id: "special-marinade", label: "Special Marinade" },
    { id: "organic", label: "Organic" }
  ];

  return (
    <div>
      <h3 className="font-semibold mb-3">Freshness Level</h3>
      <div className="space-y-2">
        {freshnessLevels.map((freshness) => (
          <div key={freshness.id} className="flex items-center space-x-2">
            <Checkbox
              id={freshness.id}
              checked={selectedFreshness.includes(freshness.id)}
              onCheckedChange={(checked) => onFreshnessChange(freshness.id, checked as boolean)}
            />
            <label htmlFor={freshness.id} className="text-sm">{freshness.label}</label>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FreshnessFilter;
