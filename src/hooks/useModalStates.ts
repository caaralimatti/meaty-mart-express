
import { useState } from "react";

export const useModalStates = () => {
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
  const [isOdooConfigOpen, setIsOdooConfigOpen] = useState(false);
  const [isOdooSyncOpen, setIsOdooSyncOpen] = useState(false);

  return {
    modals: {
      isAuthOpen,
      isCartOpen,
      isProfileOpen,
      isTrackingOpen,
      isWishlistOpen,
      isReviewsOpen,
      isNotificationOpen,
      isLiveChatOpen,
      isSchedulerOpen,
      isRecipesOpen,
      isFiltersOpen,
      isLoyaltyOpen,
      isNutritionOpen,
      isBulkOrderOpen,
      isSubscriptionOpen,
      isQuickReorderOpen,
      isReferralOpen,
      isSocialSharingOpen,
      isOdooConfigOpen,
      isOdooSyncOpen,
    },
    handlers: {
      setIsAuthOpen,
      setIsCartOpen,
      setIsProfileOpen,
      setIsTrackingOpen,
      setIsWishlistOpen,
      setIsReviewsOpen,
      setIsNotificationOpen,
      setIsLiveChatOpen,
      setIsSchedulerOpen,
      setIsRecipesOpen,
      setIsFiltersOpen,
      setIsLoyaltyOpen,
      setIsNutritionOpen,
      setIsBulkOrderOpen,
      setIsSubscriptionOpen,
      setIsQuickReorderOpen,
      setIsReferralOpen,
      setIsSocialSharingOpen,
      setIsOdooConfigOpen,
      setIsOdooSyncOpen,
    }
  };
};
