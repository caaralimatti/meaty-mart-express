
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Crown, Users, RotateCcw, Share2, Gift, Package2 } from "lucide-react";

interface FeatureButtonsProps {
  onLoyaltyOpen: () => void;
  onBulkOrderOpen: () => void;
  onSubscriptionOpen: () => void;
  onQuickReorderOpen: () => void;
  onReferralOpen: () => void;
  onSocialSharingOpen: () => void;
}

const FeatureButtons = ({
  onLoyaltyOpen,
  onBulkOrderOpen,
  onSubscriptionOpen,
  onQuickReorderOpen,
  onReferralOpen,
  onSocialSharingOpen
}: FeatureButtonsProps) => {
  return (
    <div className="container mx-auto px-4 mb-6">
      <div className="flex flex-wrap gap-2 justify-center">
        <Button
          variant="outline"
          size="sm"
          onClick={onLoyaltyOpen}
          className="bg-transparent border-green-200 text-green-700 hover:bg-green-50"
        >
          <Crown className="w-4 h-4 mr-1" />
          Loyalty Points
          <Badge className="ml-1 bg-yellow-500">New</Badge>
        </Button>
        
        <Button
          variant="outline"
          size="sm"
          onClick={onBulkOrderOpen}
          className="bg-transparent border-green-200 text-green-700 hover:bg-green-50"
        >
          <Users className="w-4 h-4 mr-1" />
          Bulk Orders
        </Button>
        
        <Button
          variant="outline"
          size="sm"
          onClick={onSubscriptionOpen}
          className="bg-transparent border-green-200 text-green-700 hover:bg-green-50"
        >
          <Package2 className="w-4 h-4 mr-1" />
          Subscriptions
        </Button>
        
        <Button
          variant="outline"
          size="sm"
          onClick={onQuickReorderOpen}
          className="bg-transparent border-green-200 text-green-700 hover:bg-green-50"
        >
          <RotateCcw className="w-4 h-4 mr-1" />
          Quick Reorder
        </Button>
        
        <Button
          variant="outline"
          size="sm"
          onClick={onReferralOpen}
          className="bg-transparent border-green-200 text-green-700 hover:bg-green-50"
        >
          <Gift className="w-4 h-4 mr-1" />
          Refer & Earn
        </Button>
        
        <Button
          variant="outline"
          size="sm"
          onClick={onSocialSharingOpen}
          className="bg-transparent border-green-200 text-green-700 hover:bg-green-50"
        >
          <Share2 className="w-4 h-4 mr-1" />
          Share Experience
        </Button>
      </div>
    </div>
  );
};

export default FeatureButtons;
