
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
  const [cartItems, setCartItems] = useState<{[key: number]: number}>({});
  const [wishlistItems, setWishlistItems] = useState<number[]>([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [selectedProductForReviews, setSelectedProductForReviews] = useState("");
  const [selectedProductForNutrition, setSelectedProductForNutrition] = useState("");
  const [selectedFilters, setSelectedFilters] = useState({
    category: "all",
    boneType: "all",
    priceRange: [0, 1000] as [number, number],
    freshness: "all",
    rating: 0
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
    isNutritionOpen
  } = modals;

  // Extract handlers and create helper functions
  const {
    setIsAuthOpen,
    setIsCartOpen,
    setIsNotificationOpen,
    setIsTrackingOpen,
    setIsWishlistOpen,
    setIsProfileOpen,
    setIsReviewsOpen,
    setIsNutritionOpen
  } = handlers;

  // Create helper functions for opening/closing modals
  const openAuth = () => setIsAuthOpen(true);
  const closeAuth = () => setIsAuthOpen(false);
  const openCart = () => setIsCartOpen(true);
  const closeCart = () => setIsCartOpen(false);
  const openNotification = () => setIsNotificationOpen(true);
  const closeNotification = () => setIsNotificationOpen(false);
  const openTracking = () => setIsTrackingOpen(true);
  const closeTracking = () => setIsTrackingOpen(false);
  const openWishlist = () => setIsWishlistOpen(true);
  const closeWishlist = () => setIsWishlistOpen(false);
  const openProfile = () => setIsProfileOpen(true);
  const closeProfile = () => setIsProfileOpen(false);
  const openReviews = (productName: string) => {
    setSelectedProductForReviews(productName);
    setIsReviewsOpen(true);
  };
  const closeReviews = () => setIsReviewsOpen(false);
  const openNutrition = (productName: string) => {
    setSelectedProductForNutrition(productName);
    setIsNutritionOpen(true);
  };
  const closeNutrition = () => setIsNutritionOpen(false);

  const { products, isLoading } = useProducts();

  const filteredProducts = products?.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedFilters.category === "all" || product.category === selectedFilters.category;
    const matchesBoneType = selectedFilters.boneType === "all" || 
      (selectedFilters.boneType === "bone-in" && product.boneIn) ||
      (selectedFilters.boneType === "boneless" && !product.boneIn);
    const matchesPrice = product.price >= selectedFilters.priceRange[0] && product.price <= selectedFilters.priceRange[1];
    const matchesFreshness = selectedFilters.freshness === "all" || product.freshness === selectedFilters.freshness;
    const matchesRating = product.rating >= selectedFilters.rating;

    return matchesSearch && matchesCategory && matchesBoneType && matchesPrice && matchesFreshness && matchesRating;
  }) || [];

  const addToCart = (product: any) => {
    setCartItems(prev => ({
      ...prev,
      [product.id]: (prev[product.id] || 0) + 1
    }));
  };

  const removeFromCart = (productId: number) => {
    setCartItems(prev => {
      const newItems = { ...prev };
      if (newItems[productId] > 1) {
        newItems[productId]--;
      } else {
        delete newItems[productId];
      }
      return newItems;
    });
  };

  const updateQuantity = (productId: number, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
    } else {
      setCartItems(prev => ({
        ...prev,
        [productId]: quantity
      }));
    }
  };

  const toggleWishlist = (productId: number) => {
    setWishlistItems(prev => 
      prev.includes(productId) 
        ? prev.filter(id => id !== productId)
        : [...prev, productId]
    );
  };

  const clearCart = () => {
    setCartItems({});
  };

  const totalCartItems = Object.values(cartItems).reduce((sum, count) => sum + count, 0);
  const notificationCount = 3;

  const handleLogin = () => {
    setIsLoggedIn(true);
    closeAuth();
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    resetOnboarding();
    window.location.reload();
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
        onAuthOpen={openAuth}
        onNotificationOpen={openNotification}
        onTrackingOpen={openTracking}
        onWishlistOpen={openWishlist}
        onProfileOpen={openProfile}
        onCartOpen={openCart}
        onLogout={handleLogout}
      />
      
      <TrustBanner />
      
      <HeroSection 
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
      />
      
      <PromoBanners />
      
      <OdooSync />
      
      <FiltersSection 
        selectedFilters={selectedFilters}
        onFiltersChange={setSelectedFilters}
      />
      
      <ProductsGrid
        products={filteredProducts}
        wishlistItems={wishlistItems}
        onAddToCart={addToCart}
        onToggleWishlist={toggleWishlist}
        onOpenReviews={openReviews}
        onOpenNutrition={openNutrition}
      />

      <CartSidebar
        isOpen={isCartOpen}
        onClose={closeCart}
        cartItems={cartItems}
        products={products || []}
        onUpdateQuantity={updateQuantity}
        onRemoveItem={removeFromCart}
        onClearCart={clearCart}
      />

      <ModalsContainer
        isAuthOpen={isAuthOpen}
        isNotificationOpen={isNotificationOpen}
        isTrackingOpen={isTrackingOpen}
        isWishlistOpen={isWishlistOpen}
        isProfileOpen={isProfileOpen}
        isReviewsOpen={isReviewsOpen}
        isNutritionOpen={isNutritionOpen}
        selectedProductForReviews={selectedProductForReviews}
        selectedProductForNutrition={selectedProductForNutrition}
        onCloseAuth={closeAuth}
        onCloseNotification={closeNotification}
        onCloseTracking={closeTracking}
        onCloseWishlist={closeWishlist}
        onCloseProfile={closeProfile}
        onCloseReviews={closeReviews}
        onCloseNutrition={closeNutrition}
        onLogin={handleLogin}
        onSwitchRole={onSwitchRole}
        wishlistItems={wishlistItems}
        onToggleWishlist={toggleWishlist}
      />
      
      <Footer />
    </div>
  );
};

export default CustomerInterface;
