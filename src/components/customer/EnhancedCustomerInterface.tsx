
import Header from "@/components/Header";
import TrustBanner from "@/components/TrustBanner";
import HeroSection from "@/components/HeroSection";
import FiltersSection from "@/components/FiltersSection";
import ProductsGrid from "@/components/ProductsGrid";
import Footer from "@/components/Footer";
import ModalsContainer from "@/components/ModalsContainer";
import LiveChatButton from "@/components/LiveChatButton";
import FeatureButtons from "@/components/FeatureButtons";
import FeatureModals from "@/components/FeatureModals";
import OdooControlPanel from "@/components/OdooControlPanel";
import OdooSync from "@/components/OdooSync";
import CustomerDashboard from "./CustomerDashboard";
import PromoBanners from "@/components/PromoBanners";
import { useModalStates } from "@/hooks/useModalStates";
import { useAppState } from "@/hooks/useAppState";
import { useProducts } from "@/hooks/useProducts";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { User } from "lucide-react";

interface EnhancedCustomerInterfaceProps {
  onSwitchRole: () => void;
}

const EnhancedCustomerInterface = ({ onSwitchRole }: EnhancedCustomerInterfaceProps) => {
  const { modals, handlers: modalHandlers } = useModalStates();
  const { state, handlers: stateHandlers } = useAppState();
  const { mockProducts, addToCart, toggleWishlist, filterProducts } = useProducts();
  const [showDashboard, setShowDashboard] = useState(false);

  const handleAddToCart = (product: any) => {
    addToCart(product, state.cartItems, stateHandlers.setCartItems);
  };

  const handleToggleWishlist = (productId: number) => {
    toggleWishlist(productId, state.wishlistItems, stateHandlers.setWishlistItems);
  };

  const openReviews = (productName: string) => {
    stateHandlers.setSelectedProductForReview(productName);
    modalHandlers.setIsReviewsOpen(true);
  };

  const openNutritionInfo = (productName: string) => {
    stateHandlers.setSelectedProductForNutrition(productName);
    modalHandlers.setIsNutritionOpen(true);
  };

  const handleScheduleDelivery = (date: string, time: string) => {
    console.log("Delivery scheduled for:", date, time);
  };

  const handleApplyFilters = (newFilters: any) => {
    stateHandlers.setFilters(newFilters);
  };

  const handleProductsSync = (syncedProducts: any[]) => {
    console.log("Products synced with Odoo:", syncedProducts);
  };

  const filteredProducts = filterProducts(
    mockProducts,
    state.searchQuery,
    state.selectedFilter,
    state.filters
  );

  const totalCartItems = state.cartItems.reduce((sum, item) => sum + item.quantity, 0);

  if (showDashboard) {
    return <CustomerDashboard onBackToShopping={() => setShowDashboard(false)} />;
  }

  return (
    <div className="min-h-screen bg-background">
      <Header
        isLoggedIn={state.isLoggedIn}
        notificationCount={state.notificationCount}
        wishlistItems={state.wishlistItems}
        totalCartItems={totalCartItems}
        onAuthOpen={() => modalHandlers.setIsAuthOpen(true)}
        onNotificationOpen={() => modalHandlers.setIsNotificationOpen(true)}
        onTrackingOpen={() => modalHandlers.setIsTrackingOpen(true)}
        onWishlistOpen={() => modalHandlers.setIsWishlistOpen(true)}
        onProfileOpen={() => setShowDashboard(true)}
        onCartOpen={() => modalHandlers.setIsCartOpen(true)}
      />

      {/* Role Switch Button */}
      <div className="bg-card border-b border-border p-2">
        <div className="container mx-auto flex justify-end">
          <Button 
            variant="outline" 
            size="sm" 
            onClick={onSwitchRole}
            className="border-primary/30 text-primary hover:bg-primary/10"
          >
            <User className="w-4 h-4 mr-1" />
            Switch to Seller
          </Button>
        </div>
      </div>

      <TrustBanner />

      <HeroSection
        searchQuery={state.searchQuery}
        onSearchChange={stateHandlers.setSearchQuery}
      />

      <div className="container mx-auto px-4">
        <PromoBanners />
        
        <OdooControlPanel
          onSyncOpen={() => modalHandlers.setIsOdooSyncOpen(true)}
        />
      </div>

      <FiltersSection
        selectedFilter={state.selectedFilter}
        onFilterChange={stateHandlers.setSelectedFilter}
        onFiltersOpen={() => modalHandlers.setIsFiltersOpen(true)}
        onRecipesOpen={() => modalHandlers.setIsRecipesOpen(true)}
        onSchedulerOpen={() => modalHandlers.setIsSchedulerOpen(true)}
      />

      <FeatureButtons
        onLoyaltyOpen={() => modalHandlers.setIsLoyaltyOpen(true)}
        onBulkOrderOpen={() => modalHandlers.setIsBulkOrderOpen(true)}
        onSubscriptionOpen={() => modalHandlers.setIsSubscriptionOpen(true)}
        onQuickReorderOpen={() => modalHandlers.setIsQuickReorderOpen(true)}
        onReferralOpen={() => modalHandlers.setIsReferralOpen(true)}
        onSocialSharingOpen={() => modalHandlers.setIsSocialSharingOpen(true)}
      />

      <ProductsGrid
        products={filteredProducts}
        wishlistItems={state.wishlistItems}
        onAddToCart={handleAddToCart}
        onToggleWishlist={handleToggleWishlist}
        onOpenReviews={openReviews}
        onOpenNutrition={openNutritionInfo}
      />

      <Footer />

      <ModalsContainer
        isAuthOpen={modals.isAuthOpen}
        isCartOpen={modals.isCartOpen}
        isProfileOpen={modals.isProfileOpen}
        isTrackingOpen={modals.isTrackingOpen}
        isWishlistOpen={modals.isWishlistOpen}
        isReviewsOpen={modals.isReviewsOpen}
        isNotificationOpen={modals.isNotificationOpen}
        isSchedulerOpen={modals.isSchedulerOpen}
        isRecipesOpen={modals.isRecipesOpen}
        isFiltersOpen={modals.isFiltersOpen}
        selectedProductForReview={state.selectedProductForReview}
        cartItems={state.cartItems}
        filters={state.filters}
        onAuthClose={() => modalHandlers.setIsAuthOpen(false)}
        onCartClose={() => modalHandlers.setIsCartOpen(false)}
        onProfileClose={() => modalHandlers.setIsProfileOpen(false)}
        onTrackingClose={() => modalHandlers.setIsTrackingOpen(false)}
        onWishlistClose={() => modalHandlers.setIsWishlistOpen(false)}
        onReviewsClose={() => modalHandlers.setIsReviewsOpen(false)}
        onNotificationClose={() => modalHandlers.setIsNotificationOpen(false)}
        onSchedulerClose={() => modalHandlers.setIsSchedulerOpen(false)}
        onRecipesClose={() => modalHandlers.setIsRecipesOpen(false)}
        onFiltersClose={() => modalHandlers.setIsFiltersOpen(false)}
        onSetCartItems={stateHandlers.setCartItems}
        onAddToCart={handleAddToCart}
        onScheduleDelivery={handleScheduleDelivery}
        onApplyFilters={handleApplyFilters}
        onLogin={() => stateHandlers.setIsLoggedIn(true)}
      />

      <FeatureModals
        isLoyaltyOpen={modals.isLoyaltyOpen}
        isNutritionOpen={modals.isNutritionOpen}
        isBulkOrderOpen={modals.isBulkOrderOpen}
        isSubscriptionOpen={modals.isSubscriptionOpen}
        isQuickReorderOpen={modals.isQuickReorderOpen}
        isReferralOpen={modals.isReferralOpen}
        isSocialSharingOpen={modals.isSocialSharingOpen}
        selectedProductForNutrition={state.selectedProductForNutrition}
        onLoyaltyClose={() => modalHandlers.setIsLoyaltyOpen(false)}
        onNutritionClose={() => modalHandlers.setIsNutritionOpen(false)}
        onBulkOrderClose={() => modalHandlers.setIsBulkOrderOpen(false)}
        onSubscriptionClose={() => modalHandlers.setIsSubscriptionOpen(false)}
        onQuickReorderClose={() => modalHandlers.setIsQuickReorderOpen(false)}
        onReferralClose={() => modalHandlers.setIsReferralOpen(false)}
        onSocialSharingClose={() => modalHandlers.setIsSocialSharingOpen(false)}
        onAddToCart={handleAddToCart}
      />

      <OdooSync
        isOpen={modals.isOdooSyncOpen}
        onClose={() => modalHandlers.setIsOdooSyncOpen(false)}
        products={filteredProducts}
        onProductsSync={handleProductsSync}
      />

      <LiveChatButton
        isLiveChatOpen={modals.isLiveChatOpen}
        onLiveChatOpen={() => modalHandlers.setIsLiveChatOpen(true)}
        onLiveChatClose={() => modalHandlers.setIsLiveChatOpen(false)}
      />
    </div>
  );
};

export default EnhancedCustomerInterface;
