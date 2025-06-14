
import AuthModal from "@/components/AuthModal";
import CartSidebar from "@/components/CartSidebar";
import UserProfile from "@/components/UserProfile";
import OrderTracking from "@/components/OrderTracking";
import WishlistModal from "@/components/WishlistModal";
import ProductReviews from "@/components/ProductReviews";
import NotificationCenter from "@/components/NotificationCenter";
import DeliveryScheduler from "@/components/DeliveryScheduler";
import RecipeSuggestions from "@/components/RecipeSuggestions";
import AdvancedFilters from "@/components/AdvancedFilters";

interface FilterOptions {
  priceRange: [number, number];
  categories: string[];
  boneType: string[];
  freshness: string[];
  rating: number;
  inStock: boolean;
  fastDelivery: boolean;
}

interface Product {
  id: number;
  name: string;
  weight: string;
  price: number;
  originalPrice: number;
  image: string;
  category: string;
  boneIn: boolean;
  inStock: boolean;
  rating: number;
  freshness: string;
}

interface ModalsContainerProps {
  isAuthOpen: boolean;
  isCartOpen: boolean;
  isProfileOpen: boolean;
  isTrackingOpen: boolean;
  isWishlistOpen: boolean;
  isReviewsOpen: boolean;
  isNotificationOpen: boolean;
  isSchedulerOpen: boolean;
  isRecipesOpen: boolean;
  isFiltersOpen: boolean;
  selectedProductForReview: string;
  cartItems: any[];
  filters: FilterOptions;
  onAuthClose: () => void;
  onCartClose: () => void;
  onProfileClose: () => void;
  onTrackingClose: () => void;
  onWishlistClose: () => void;
  onReviewsClose: () => void;
  onNotificationClose: () => void;
  onSchedulerClose: () => void;
  onRecipesClose: () => void;
  onFiltersClose: () => void;
  onSetCartItems: (items: any[]) => void;
  onAddToCart: (product: Product) => void;
  onScheduleDelivery: (date: string, time: string) => void;
  onApplyFilters: (filters: FilterOptions) => void;
  onLogin: () => void;
}

const ModalsContainer = ({
  isAuthOpen,
  isCartOpen,
  isProfileOpen,
  isTrackingOpen,
  isWishlistOpen,
  isReviewsOpen,
  isNotificationOpen,
  isSchedulerOpen,
  isRecipesOpen,
  isFiltersOpen,
  selectedProductForReview,
  cartItems,
  filters,
  onAuthClose,
  onCartClose,
  onProfileClose,
  onTrackingClose,
  onWishlistClose,
  onReviewsClose,
  onNotificationClose,
  onSchedulerClose,
  onRecipesClose,
  onFiltersClose,
  onSetCartItems,
  onAddToCart,
  onScheduleDelivery,
  onApplyFilters,
  onLogin
}: ModalsContainerProps) => {
  return (
    <>
      <AuthModal 
        isOpen={isAuthOpen} 
        onClose={() => {
          onAuthClose();
          onLogin();
        }} 
      />
      <CartSidebar 
        isOpen={isCartOpen} 
        onClose={onCartClose}
        items={cartItems}
        setItems={onSetCartItems}
      />
      <UserProfile
        isOpen={isProfileOpen}
        onClose={onProfileClose}
      />
      <OrderTracking
        isOpen={isTrackingOpen}
        onClose={onTrackingClose}
      />
      <WishlistModal
        isOpen={isWishlistOpen}
        onClose={onWishlistClose}
        onAddToCart={onAddToCart}
      />
      <ProductReviews
        isOpen={isReviewsOpen}
        onClose={onReviewsClose}
        productName={selectedProductForReview}
      />
      <NotificationCenter
        isOpen={isNotificationOpen}
        onClose={onNotificationClose}
      />
      <DeliveryScheduler
        isOpen={isSchedulerOpen}
        onClose={onSchedulerClose}
        onSchedule={onScheduleDelivery}
      />
      <RecipeSuggestions
        isOpen={isRecipesOpen}
        onClose={onRecipesClose}
        selectedCuts={filters.categories}
      />
      <AdvancedFilters
        isOpen={isFiltersOpen}
        onClose={onFiltersClose}
        onApplyFilters={onApplyFilters}
        currentFilters={filters}
      />
    </>
  );
};

export default ModalsContainer;
