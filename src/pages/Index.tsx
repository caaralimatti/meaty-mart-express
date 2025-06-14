
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
import { useModalStates } from "@/hooks/useModalStates";
import { useAppState } from "@/hooks/useAppState";
import { useProducts } from "@/hooks/useProducts";

const Index = () => {
  const { modals, handlers: modalHandlers } = useModalStates();
  const { state, handlers: stateHandlers } = useAppState();
  const { mockProducts, addToCart, toggleWishlist, filterProducts } = useProducts();

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
    // In a real implementation, you might want to update the products state
    // or trigger a refresh of the product data
  };

  const filteredProducts = filterProducts(
    mockProducts,
    state.searchQuery,
    state.selectedFilter,
    state.filters
  );

  const totalCartItems = state.cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 to-red-50">
      <Header
        isLoggedIn={state.isLoggedIn}
        notificationCount={state.notificationCount}
        wishlistItems={state.wishlistItems}
        totalCartItems={totalCartItems}
        onAuthOpen={() => modalHandlers.setIsAuthOpen(true)}
        onNotificationOpen={() => modalHandlers.setIsNotificationOpen(true)}
        onTrackingOpen={() => modalHandlers.setIsTrackingOpen(true)}
        onWishlistOpen={() => modalHandlers.setIsWishlistOpen(true)}
        onProfileOpen={() => modalHandlers.setIsProfileOpen(true)}
        onCartOpen={() => modalHandlers.setIsCartOpen(true)}
      />

      <TrustBanner />

      <HeroSection
        searchQuery={state.searchQuery}
        onSearchChange={stateHandlers.setSearchQuery}
      />

      <div className="container mx-auto px-4">
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
        onReviewsClose={() => modalHandlers.setIsReviewsClose(false)}
        onNotificationClose={() => modalHandlers.setIsNotificationClose(false)}
        onSchedulerClose={() => modalHandlers.setIsSchedulerClose(false)}
        onRecipesClose={() => modalHandlers.setIsRecipesClose(false)}
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

export default Index;
