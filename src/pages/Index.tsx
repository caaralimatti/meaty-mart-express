import { useState } from "react";
import Header from "@/components/Header";
import TrustBanner from "@/components/TrustBanner";
import HeroSection from "@/components/HeroSection";
import FiltersSection from "@/components/FiltersSection";
import ProductsGrid from "@/components/ProductsGrid";
import Footer from "@/components/Footer";
import ModalsContainer from "@/components/ModalsContainer";
import LiveChatButton from "@/components/LiveChatButton";
import LoyaltyProgram from "@/components/LoyaltyProgram";
import NutritionInfo from "@/components/NutritionInfo";
import BulkOrdering from "@/components/BulkOrdering";
import SubscriptionManager from "@/components/SubscriptionManager";
import QuickReorder from "@/components/QuickReorder";
import ReferralProgram from "@/components/ReferralProgram";
import SocialSharing from "@/components/SocialSharing";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Crown, Utensils, Users, RotateCcw, Share2, Gift, Package2, Star } from "lucide-react";

interface FilterOptions {
  priceRange: [number, number];
  categories: string[];
  boneType: string[];
  freshness: string[];
  rating: number;
  inStock: boolean;
  fastDelivery: boolean;
}

const Index = () => {
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isTrackingOpen, setIsTrackingOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [isReviewsOpen, setIsReviewsOpen] = useState(false);
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const [isLiveChatOpen, setIsLiveChatOpen] = useState(false);
  const [isSchedulerOpen, setIsSchedulerOpen] = useState(false);
  const [isRecipesOpen, setIsRecipesOpen] = useState(false);
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);
  
  const [isLoyaltyOpen, setIsLoyaltyOpen] = useState(false);
  const [isNutritionOpen, setIsNutritionOpen] = useState(false);
  const [isBulkOrderOpen, setIsBulkOrderOpen] = useState(false);
  const [isSubscriptionOpen, setIsSubscriptionOpen] = useState(false);
  const [isQuickReorderOpen, setIsQuickReorderOpen] = useState(false);
  const [isReferralOpen, setIsReferralOpen] = useState(false);
  const [isSocialSharingOpen, setIsSocialSharingOpen] = useState(false);
  
  const [selectedProductForReview, setSelectedProductForReview] = useState("");
  const [selectedProductForNutrition, setSelectedProductForNutrition] = useState("");
  const [cartItems, setCartItems] = useState([]);
  const [wishlistItems, setWishlistItems] = useState([1, 3]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("all");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [notificationCount, setNotificationCount] = useState(3);
  const [filters, setFilters] = useState<FilterOptions>({
    priceRange: [0, 1000],
    categories: [],
    boneType: [],
    freshness: [],
    rating: 0,
    inStock: false,
    fastDelivery: false
  });

  const mockProducts = [
    {
      id: 1,
      name: "Premium Goat Curry Cut",
      weight: "500g",
      price: 420,
      originalPrice: 450,
      image: "/placeholder.svg",
      category: "curry-cut",
      boneIn: true,
      inStock: true,
      rating: 4.5,
      freshness: "Farm Fresh",
    },
    {
      id: 2,
      name: "Boneless Goat Chunks",
      weight: "250g",
      price: 380,
      originalPrice: 400,
      image: "/placeholder.svg",
      category: "boneless",
      boneIn: false,
      inStock: true,
      rating: 4.7,
      freshness: "Premium Cut",
    },
    {
      id: 3,
      name: "Marinated Goat Biryani Cut",
      weight: "1kg",
      price: 850,
      originalPrice: 900,
      image: "/placeholder.svg",
      category: "marinated",
      boneIn: true,
      inStock: false,
      rating: 4.8,
      freshness: "Special Marinade",
    },
  ];

  const addToCart = (product) => {
    setCartItems(prev => {
      const existingItem = prev.find(item => item.id === product.id);
      if (existingItem) {
        return prev.map(item => 
          item.id === product.id 
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const toggleWishlist = (productId) => {
    setWishlistItems(prev => 
      prev.includes(productId) 
        ? prev.filter(id => id !== productId)
        : [...prev, productId]
    );
  };

  const openReviews = (productName) => {
    setSelectedProductForReview(productName);
    setIsReviewsOpen(true);
  };

  const openNutritionInfo = (productName) => {
    setSelectedProductForNutrition(productName);
    setIsNutritionOpen(true);
  };

  const handleScheduleDelivery = (date: string, time: string) => {
    console.log("Delivery scheduled for:", date, time);
  };

  const handleApplyFilters = (newFilters: FilterOptions) => {
    setFilters(newFilters);
  };

  const filteredProducts = mockProducts.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = selectedFilter === "all" || product.category === selectedFilter;
    const matchesPriceRange = product.price >= filters.priceRange[0] && product.price <= filters.priceRange[1];
    const matchesCategory = filters.categories.length === 0 || filters.categories.includes(product.category);
    const matchesRating = product.rating >= filters.rating;
    const matchesStock = !filters.inStock || product.inStock;
    
    return matchesSearch && matchesFilter && matchesPriceRange && matchesCategory && matchesRating && matchesStock;
  });

  const totalCartItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 to-red-50">
      <Header
        isLoggedIn={isLoggedIn}
        notificationCount={notificationCount}
        wishlistItems={wishlistItems}
        totalCartItems={totalCartItems}
        onAuthOpen={() => setIsAuthOpen(true)}
        onNotificationOpen={() => setIsNotificationOpen(true)}
        onTrackingOpen={() => setIsTrackingOpen(true)}
        onWishlistOpen={() => setIsWishlistOpen(true)}
        onProfileOpen={() => setIsProfileOpen(true)}
        onCartOpen={() => setIsCartOpen(true)}
      />

      <TrustBanner />

      <HeroSection
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
      />

      <FiltersSection
        selectedFilter={selectedFilter}
        onFilterChange={setSelectedFilter}
        onFiltersOpen={() => setIsFiltersOpen(true)}
        onRecipesOpen={() => setIsRecipesOpen(true)}
        onSchedulerOpen={() => setIsSchedulerOpen(true)}
      />

      {/* New Feature Buttons */}
      <div className="container mx-auto px-4 mb-6">
        <div className="flex flex-wrap gap-2 justify-center">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setIsLoyaltyOpen(true)}
            className="border-yellow-200 text-yellow-700 hover:bg-yellow-50"
          >
            <Crown className="w-4 h-4 mr-1" />
            Loyalty Points
            <Badge className="ml-1 bg-yellow-500">New</Badge>
          </Button>
          
          <Button
            variant="outline"
            size="sm"
            onClick={() => setIsBulkOrderOpen(true)}
            className="border-blue-200 text-blue-700 hover:bg-blue-50"
          >
            <Users className="w-4 h-4 mr-1" />
            Bulk Orders
          </Button>
          
          <Button
            variant="outline"
            size="sm"
            onClick={() => setIsSubscriptionOpen(true)}
            className="border-purple-200 text-purple-700 hover:bg-purple-50"
          >
            <Package2 className="w-4 h-4 mr-1" />
            Subscriptions
          </Button>
          
          <Button
            variant="outline"
            size="sm"
            onClick={() => setIsQuickReorderOpen(true)}
            className="border-green-200 text-green-700 hover:bg-green-50"
          >
            <RotateCcw className="w-4 h-4 mr-1" />
            Quick Reorder
          </Button>
          
          <Button
            variant="outline"
            size="sm"
            onClick={() => setIsReferralOpen(true)}
            className="border-pink-200 text-pink-700 hover:bg-pink-50"
          >
            <Gift className="w-4 h-4 mr-1" />
            Refer & Earn
          </Button>
          
          <Button
            variant="outline"
            size="sm"
            onClick={() => setIsSocialSharingOpen(true)}
            className="border-indigo-200 text-indigo-700 hover:bg-indigo-50"
          >
            <Share2 className="w-4 h-4 mr-1" />
            Share Experience
          </Button>
        </div>
      </div>

      <ProductsGrid
        products={filteredProducts}
        wishlistItems={wishlistItems}
        onAddToCart={addToCart}
        onToggleWishlist={toggleWishlist}
        onOpenReviews={openReviews}
        onOpenNutrition={openNutritionInfo}
      />

      <Footer />

      <ModalsContainer
        isAuthOpen={isAuthOpen}
        isCartOpen={isCartOpen}
        isProfileOpen={isProfileOpen}
        isTrackingOpen={isTrackingOpen}
        isWishlistOpen={isWishlistOpen}
        isReviewsOpen={isReviewsOpen}
        isNotificationOpen={isNotificationOpen}
        isSchedulerOpen={isSchedulerOpen}
        isRecipesOpen={isRecipesOpen}
        isFiltersOpen={isFiltersOpen}
        selectedProductForReview={selectedProductForReview}
        cartItems={cartItems}
        filters={filters}
        onAuthClose={() => setIsAuthOpen(false)}
        onCartClose={() => setIsCartOpen(false)}
        onProfileClose={() => setIsProfileOpen(false)}
        onTrackingClose={() => setIsTrackingOpen(false)}
        onWishlistClose={() => setIsWishlistOpen(false)}
        onReviewsClose={() => setIsReviewsOpen(false)}
        onNotificationClose={() => setIsNotificationOpen(false)}
        onSchedulerClose={() => setIsSchedulerOpen(false)}
        onRecipesClose={() => setIsRecipesOpen(false)}
        onFiltersClose={() => setIsFiltersOpen(false)}
        onSetCartItems={setCartItems}
        onAddToCart={addToCart}
        onScheduleDelivery={handleScheduleDelivery}
        onApplyFilters={handleApplyFilters}
        onLogin={() => setIsLoggedIn(true)}
      />

      {/* New Feature Modals */}
      <LoyaltyProgram 
        isOpen={isLoyaltyOpen} 
        onClose={() => setIsLoyaltyOpen(false)} 
      />
      
      <NutritionInfo 
        isOpen={isNutritionOpen} 
        onClose={() => setIsNutritionOpen(false)}
        productName={selectedProductForNutrition}
      />
      
      <BulkOrdering 
        isOpen={isBulkOrderOpen} 
        onClose={() => setIsBulkOrderOpen(false)} 
      />
      
      <SubscriptionManager 
        isOpen={isSubscriptionOpen} 
        onClose={() => setIsSubscriptionOpen(false)} 
      />
      
      <QuickReorder 
        isOpen={isQuickReorderOpen} 
        onClose={() => setIsQuickReorderOpen(false)}
        onAddToCart={addToCart}
      />
      
      <ReferralProgram 
        isOpen={isReferralOpen} 
        onClose={() => setIsReferralOpen(false)} 
      />
      
      <SocialSharing 
        isOpen={isSocialSharingOpen} 
        onClose={() => setIsSocialSharingOpen(false)}
        productName={selectedProductForNutrition}
      />

      <LiveChatButton
        isLiveChatOpen={isLiveChatOpen}
        onLiveChatOpen={() => setIsLiveChatOpen(true)}
        onLiveChatClose={() => setIsLiveChatOpen(false)}
      />
    </div>
  );
};

export default Index;
