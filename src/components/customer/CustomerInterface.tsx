
import { useState } from "react";
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import FiltersSection from "@/components/FiltersSection";
import ProductsGrid from "@/components/ProductsGrid";
import CartSidebar from "@/components/CartSidebar";
import ModalsContainer from "@/components/ModalsContainer";
import TrustBanner from "@/components/TrustBanner";
import PromoBanners from "@/components/PromoBanners";
import OdooSync from "@/components/OdooSync";
import Footer from "@/components/Footer";
import { useModalStates } from "@/hooks/useModalStates";
import { useProducts } from "@/hooks/useProducts";
import { useOnboarding } from "@/hooks/useOnboarding";

interface CustomerInterfaceProps {
  onSwitchRole: () => void;
}

const CustomerInterface = ({ onSwitchRole }: CustomerInterfaceProps) => {
  const { resetOnboarding } = useOnboarding();
  const [searchQuery, setSearchQuery] = useState("");
  const [cartItems, setCartItems] = useState<any[]>([]);
  const [wishlistItems, setWishlistItems] = useState<number[]>([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [selectedProductForReview, setSelectedProductForReview] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("all");
  
  const [filters, setFilters] = useState({
    priceRange: [0, 1000] as [number, number],
    categories: [] as string[],
    boneType: [] as string[],
    freshness: [] as string[],
    rating: 0,
    inStock: false,
    fastDelivery: false
  });

  const { modals, handlers } = useModalStates();

  // Extract modal states
  const {
    isAuthOpen,
    isCartOpen,
    isNotificationOpen,
    isTrackingOpen,
    isWishlistOpen,
    isProfileOpen,
    isReviewsOpen,
    isSchedulerOpen,
    isRecipesOpen,
    isFiltersOpen
  } = modals;

  // Extract handlers
  const {
    setIsAuthOpen,
    setIsCartOpen,
    setIsNotificationOpen,
    setIsTrackingOpen,
    setIsWishlistOpen,
    setIsProfileOpen,
    setIsReviewsOpen,
    setIsSchedulerOpen,
    setIsRecipesOpen,
    setIsFiltersOpen
  } = handlers;

  const { products, isLoading } = useProducts();

  const filteredProducts = products?.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = selectedFilter === "all" || product.category === selectedFilter;
    return matchesSearch && matchesFilter;
  }) || [];

  const addToCart = (product: any) => {
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

  const toggleWishlist = (productId: number) => {
    setWishlistItems(prev => 
      prev.includes(productId) 
        ? prev.filter(id => id !== productId)
        : [...prev, productId]
    );
  };

  const totalCartItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const notificationCount = 3;

  const handleLogin = () => {
    setIsLoggedIn(true);
    setIsAuthOpen(false);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    resetOnboarding();
    window.location.reload();
  };

  const handleScheduleDelivery = (date: string, time: string) => {
    console.log("Delivery scheduled for:", date, time);
  };

  const handleApplyFilters = (newFilters: typeof filters) => {
    setFilters(newFilters);
  };

  const handleOpenReviews = (productName: string) => {
    setSelectedProductForReview(productName);
    setIsReviewsOpen(true);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading fresh goat meat...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
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
        onLogout={handleLogout}
      />
      
      <TrustBanner />
      
      <HeroSection 
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
      />
      
      <PromoBanners />
      
      <OdooSync 
        isOpen={false}
        onClose={() => {}}
        products={products || []}
        onProductsSync={() => {}}
      />
      
      <FiltersSection 
        selectedFilter={selectedFilter}
        onFilterChange={setSelectedFilter}
        onFiltersOpen={() => setIsFiltersOpen(true)}
        onRecipesOpen={() => setIsRecipesOpen(true)}
        onSchedulerOpen={() => setIsSchedulerOpen(true)}
      />
      
      <ProductsGrid
        products={filteredProducts}
        wishlistItems={wishlistItems}
        onAddToCart={addToCart}
        onToggleWishlist={toggleWishlist}
        onOpenReviews={handleOpenReviews}
        onOpenNutrition={() => {}}
      />

      <CartSidebar
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        setItems={setCartItems}
      />

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
        onLogin={handleLogin}
      />
      
      <Footer />
    </div>
  );
};

export default CustomerInterface;
