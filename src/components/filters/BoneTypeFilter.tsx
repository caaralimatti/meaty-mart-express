
import { Checkbox } from "@/components/ui/checkbox";

interface BoneTypeFilterProps {
  selectedBoneTypes: string[];
  onBoneTypeChange: (boneTypeId: string, checked: boolean) => void;
}

const BoneTypeFilter = ({ selectedBoneTypes, onBoneTypeChange }: BoneTypeFilterProps) => {
  const boneTypes = [
    { id: "bone-in", label: "Bone-in" },
    { id: "boneless", label: "Boneless" },
    { id: "mixed", label: "Mixed" }
  ];

  return (
    <div>
      <h3 className="font-semibold mb-3">Bone Type</h3>
      <div className="space-y-2">
        {boneTypes.map((boneType) => (
          <div key={boneType.id} className="flex items-center space-x-2">
            <Checkbox
              id={boneType.id}
              checked={selectedBoneTypes.includes(boneType.id)}
              onCheckedChange={(checked) => onBoneTypeChange(boneType.id, checked as boolean)}
            />
            <label htmlFor={boneType.id} className="text-sm">{boneType.label}</label>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BoneTypeFilter;
