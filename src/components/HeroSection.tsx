import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, MapPin } from "lucide-react";
import { useLocation } from "@/hooks/useLocation";
import { LocationPicker } from "./customer/LocationPicker";
import { useState } from "react";

interface HeroSectionProps {
  searchQuery: string;
  onSearchChange: (value: string) => void;
}
const HeroSection = ({
  searchQuery,
  onSearchChange
}: HeroSectionProps) => {
  const { currentLocation, updateLocation } = useLocation();
  const [isLocationPickerOpen, setIsLocationPickerOpen] = useState(false);

  const handleLocationSelect = (location: { address: string; lat: number; lng: number }) => {
    updateLocation(location);
    setIsLocationPickerOpen(false);
  };

  return (
    <>
      <section className="container mx-auto px-4 py-6">
        <div className="text-center mb-6">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">
            Fresh Goat Meat Delivered in 30 Minutes
          </h2>
          <p className="text-gray-600">Premium quality, hygienically processed, farm-fresh goat meat</p>
        </div>

        {/* Location & Search */}
        <div className="max-w-2xl mx-auto mb-6">
          <div className="flex items-center space-x-2 mb-4">
            <MapPin className="w-5 h-5 text-emerald-600" />
            <span className="text-sm text-gray-600">Delivering to: </span>
            <span className="font-semibold text-gray-800">
              {currentLocation?.address || "Hubli, Karnataka"}
            </span>
            <Button 
              variant="link" 
              className="text-emerald-600 p-0 h-auto hover:text-emerald-700"
              onClick={() => setIsLocationPickerOpen(true)}
            >
              Change
            </Button>
          </div>
          
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <Input placeholder="Search for goat meat cuts..." value={searchQuery} onChange={e => onSearchChange(e.target.value)} className="pl-10 py-3 text-lg border-red-200 focus:border-red-400 bg-lime-100" />
          </div>
        </div>
      </section>

      <LocationPicker
        isOpen={isLocationPickerOpen}
        onClose={() => setIsLocationPickerOpen(false)}
        onLocationSelect={handleLocationSelect}
        currentLocation={currentLocation}
      />
    </>
  );
};
export default HeroSection;