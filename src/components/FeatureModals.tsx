
import LoyaltyProgram from "@/components/LoyaltyProgram";
import NutritionInfo from "@/components/NutritionInfo";
import BulkOrdering from "@/components/BulkOrdering";
import SubscriptionManager from "@/components/SubscriptionManager";
import QuickReorder from "@/components/QuickReorder";
import ReferralProgram from "@/components/ReferralProgram";
import SocialSharing from "@/components/SocialSharing";

interface FeatureModalsProps {
  isLoyaltyOpen: boolean;
  isNutritionOpen: boolean;
  isBulkOrderOpen: boolean;
  isSubscriptionOpen: boolean;
  isQuickReorderOpen: boolean;
  isReferralOpen: boolean;
  isSocialSharingOpen: boolean;
  selectedProductForNutrition: string;
  onLoyaltyClose: () => void;
  onNutritionClose: () => void;
  onBulkOrderClose: () => void;
  onSubscriptionClose: () => void;
  onQuickReorderClose: () => void;
  onReferralClose: () => void;
  onSocialSharingClose: () => void;
  onAddToCart: (product: any) => void;
}

const FeatureModals = ({
  isLoyaltyOpen,
  isNutritionOpen,
  isBulkOrderOpen,
  isSubscriptionOpen,
  isQuickReorderOpen,
  isReferralOpen,
  isSocialSharingOpen,
  selectedProductForNutrition,
  onLoyaltyClose,
  onNutritionClose,
  onBulkOrderClose,
  onSubscriptionClose,
  onQuickReorderClose,
  onReferralClose,
  onSocialSharingClose,
  onAddToCart
}: FeatureModalsProps) => {
  return (
    <>
      <LoyaltyProgram 
        isOpen={isLoyaltyOpen} 
        onClose={onLoyaltyClose} 
      />
      
      <NutritionInfo 
        isOpen={isNutritionOpen} 
        onClose={onNutritionClose}
        productName={selectedProductForNutrition}
      />
      
      <BulkOrdering 
        isOpen={isBulkOrderOpen} 
        onClose={onBulkOrderClose} 
      />
      
      <SubscriptionManager 
        isOpen={isSubscriptionOpen} 
        onClose={onSubscriptionClose} 
      />
      
      <QuickReorder 
        isOpen={isQuickReorderOpen} 
        onClose={onQuickReorderClose}
        onAddToCart={onAddToCart}
      />
      
      <ReferralProgram 
        isOpen={isReferralOpen} 
        onClose={onReferralClose} 
      />
      
      <SocialSharing 
        isOpen={isSocialSharingOpen} 
        onClose={onSocialSharingClose}
        productName={selectedProductForNutrition}
      />
    </>
  );
};

export default FeatureModals;
