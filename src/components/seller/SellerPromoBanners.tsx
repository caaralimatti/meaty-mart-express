
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ChevronLeft, ChevronRight, TrendingUp, Users, Package, BarChart3 } from "lucide-react";

const SellerPromoBanners = () => {
  const [currentBanner, setCurrentBanner] = useState(0);
  
  const banners = [
    {
      id: 1,
      title: "BOOST YOUR SALES",
      subtitle: "Analytics Dashboard Upgrade",
      description: "Get 30% more insights with our premium analytics",
      bgColor: "from-blue-600 to-indigo-700",
      icon: BarChart3,
      cta: "Upgrade Now",
      badge: "LIMITED TIME"
    },
    {
      id: 2,
      title: "CUSTOMER ACQUISITION",
      subtitle: "Reach More Buyers",
      description: "Expand your reach with our marketing tools",
      bgColor: "from-green-600 to-emerald-700",
      icon: Users,
      cta: "Get Started",
      badge: "NEW FEATURE"
    },
    {
      id: 3,
      title: "INVENTORY MANAGEMENT",
      subtitle: "Smart Stock Control",
      description: "Never run out of stock with AI predictions",
      bgColor: "from-purple-600 to-violet-700",
      icon: Package,
      cta: "Learn More",
      badge: "AI POWERED"
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
                <Badge className="bg-white/20 text-white border-white/30">
                  {currentBannerData.badge}
                </Badge>
              </div>
              <h3 className="text-2xl font-bold mb-1">{currentBannerData.title}</h3>
              <p className="text-lg font-semibold text-white/90 mb-2">{currentBannerData.subtitle}</p>
              <p className="text-white/80 mb-4">{currentBannerData.description}</p>
              <Button 
                variant="outline" 
                className="bg-white/20 border-white text-white hover:bg-white hover:text-gray-800"
              >
                {currentBannerData.cta}
              </Button>
            </div>
            <div className="hidden md:block ml-6">
              <div className="w-24 h-24 bg-white/20 rounded-full flex items-center justify-center">
                <IconComponent className="w-12 h-12" />
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
              index === currentBanner ? 'bg-blue-600' : 'bg-gray-300'
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default SellerPromoBanners;
