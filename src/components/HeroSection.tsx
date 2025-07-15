import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, MapPin } from "lucide-react";
interface HeroSectionProps {
  searchQuery: string;
  onSearchChange: (value: string) => void;
}
const HeroSection = ({
  searchQuery,
  onSearchChange
}: HeroSectionProps) => {
  return <section className="container mx-auto px-4 py-6">
      <div className="text-center mb-6">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">
          Fresh Goat Meat Delivered in 30 Minutes
        </h2>
        <p className="text-gray-600">Premium quality, hygienically processed, farm-fresh goat meat</p>
      </div>

      {/* Location & Search */}
      <div className="max-w-2xl mx-auto mb-6">
        <div className="flex items-center space-x-2 mb-4">
          <MapPin className="w-5 h-5 text-red-600" />
          <span className="text-sm text-gray-600">Delivering to: </span>
          <span className="font-semibold text-gray-800">Hubli, Karnataka</span>
          <Button variant="link" className="text-red-600 p-0 h-auto">Change</Button>
        </div>
        
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <Input placeholder="Search for goat meat cuts..." value={searchQuery} onChange={e => onSearchChange(e.target.value)} className="pl-10 py-3 text-lg border-red-200 focus:border-red-400 bg-lime-100" />
        </div>
      </div>
    </section>;
};
export default HeroSection;