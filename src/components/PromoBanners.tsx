
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ChevronLeft, ChevronRight, Gift, Clock, Star } from "lucide-react";

const PromoBanners = () => {
  const [currentBanner, setCurrentBanner] = useState(0);
  
  const banners = [
    {
      id: 1,
      title: "New User Special",
      subtitle: "Get 20% OFF on your first order",
      code: "WELCOME20",
      bgColor: "from-green-600 to-green-700",
      icon: Gift,
      cta: "Order Now"
    },
    {
      id: 2,
      title: "Express Delivery",
      subtitle: "Free 30-min delivery on orders above ₹500",
      code: "FAST30",
      bgColor: "from-blue-600 to-blue-700",
      icon: Clock,
      cta: "Shop Now"
    },
    {
      id: 3,
      title: "Premium Quality",
      subtitle: "Fresh goat meat with 100% quality guarantee",
      code: "FRESH100",
      bgColor: "from-red-600 to-red-700",
      icon: Star,
      cta: "Explore"
    }
  ];

  const nextBanner = () => {
    setCurrentBanner((prev) => (prev + 1) % banners.length);
  };

  const prevBanner = () => {
    setCurrentBanner((prev) => (prev - 1 + banners.length) % banners.length);
  };

  const currentBannerData = banners[currentBanner];
  const IconComponent = currentBannerData.icon;

  return (
    <div className="relative mb-6">
      <Card className={`bg-gradient-to-r ${currentBannerData.bgColor} text-white overflow-hidden`}>
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <div className="flex items-center space-x-2 mb-2">
                <IconComponent className="w-6 h-6" />
                <h3 className="text-xl font-bold">{currentBannerData.title}</h3>
              </div>
              <p className="text-white/90 mb-3">{currentBannerData.subtitle}</p>
              <div className="flex items-center space-x-3">
                <Badge className="bg-white text-gray-800 hover:bg-gray-100">
                  Code: {currentBannerData.code}
                </Badge>
                <Button 
                  variant="outline" 
                  className="bg-white/20 border-white text-white hover:bg-white hover:text-gray-800"
                >
                  {currentBannerData.cta}
                </Button>
              </div>
            </div>
            <div className="hidden md:block">
              <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center">
                <IconComponent className="w-10 h-10" />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Navigation Arrows */}
      <Button
        variant="outline"
        size="sm"
        onClick={prevBanner}
        className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white"
      >
        <ChevronLeft className="w-4 h-4" />
      </Button>
      <Button
        variant="outline"
        size="sm"
        onClick={nextBanner}
        className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white"
      >
        <ChevronRight className="w-4 h-4" />
      </Button>

      {/* Dots Indicator */}
      <div className="flex justify-center space-x-2 mt-3">
        {banners.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentBanner(index)}
            className={`w-2 h-2 rounded-full transition-colors ${
              index === currentBanner ? 'bg-red-600' : 'bg-gray-300'
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default PromoBanners;
