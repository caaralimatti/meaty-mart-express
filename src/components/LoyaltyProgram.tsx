
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { X, Gift, Star, Trophy, Crown } from "lucide-react";
import { toast } from "sonner";

interface LoyaltyProgramProps {
  isOpen: boolean;
  onClose: () => void;
}

const LoyaltyProgram = ({ isOpen, onClose }: LoyaltyProgramProps) => {
  const [currentPoints, setCurrentPoints] = useState(1250);
  const [currentTier, setCurrentTier] = useState("Gold");
  const [nextTierPoints, setNextTierPoints] = useState(500);

  const tiers = [
    { name: "Bronze", minPoints: 0, color: "bg-amber-600", benefits: ["5% cashback", "Free delivery on orders > ₹500"] },
    { name: "Silver", minPoints: 500, color: "bg-gray-400", benefits: ["7% cashback", "Free delivery on all orders", "Priority support"] },
    { name: "Gold", minPoints: 1000, color: "bg-yellow-500", benefits: ["10% cashback", "Express delivery", "Exclusive recipes", "Birthday rewards"] },
    { name: "Platinum", minPoints: 2000, color: "bg-purple-600", benefits: ["15% cashback", "Personal chef consultation", "Premium cuts access", "VIP events"] }
  ];

  const rewards = [
    { name: "Free Premium Cut (500g)", points: 500, icon: Gift },
    { name: "Free Delivery for 1 Month", points: 800, icon: Trophy },
    { name: "Cooking Class Voucher", points: 1200, icon: Star },
    { name: "Chef's Special Box", points: 1500, icon: Crown }
  ];

  const redeemReward = (rewardName: string, pointsCost: number) => {
    if (currentPoints >= pointsCost) {
      setCurrentPoints(prev => prev - pointsCost);
      toast.success(`${rewardName} redeemed successfully!`);
    } else {
      toast.error("Insufficient points for this reward");
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-md max-h-[90vh] overflow-hidden">
        <CardHeader className="flex flex-row items-center justify-between">
          <div className="flex items-center space-x-2">
            <Crown className="w-5 h-5 text-yellow-500" />
            <CardTitle className="text-xl text-red-700">Loyalty Program</CardTitle>
          </div>
          <Button variant="ghost" onClick={onClose}>
            <X className="w-5 h-5" />
          </Button>
        </CardHeader>
        
        <CardContent className="p-4 max-h-[70vh] overflow-y-auto space-y-6">
          {/* Current Status */}
          <div className="text-center">
            <Badge className={`${tiers.find(t => t.name === currentTier)?.color} text-white text-lg px-4 py-2`}>
              {currentTier} Member
            </Badge>
            <div className="mt-4">
              <h3 className="text-2xl font-bold">{currentPoints} Points</h3>
              <p className="text-sm text-gray-600">{nextTierPoints} points to next tier</p>
              <Progress value={(currentPoints % 500) / 5} className="mt-2" />
            </div>
          </div>

          {/* Current Tier Benefits */}
          <div>
            <h3 className="font-semibold mb-3">Your Benefits</h3>
            <div className="space-y-2">
              {tiers.find(t => t.name === currentTier)?.benefits.map((benefit, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <Star className="w-4 h-4 text-yellow-500" />
                  <span className="text-sm">{benefit}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Available Rewards */}
          <div>
            <h3 className="font-semibold mb-3">Redeem Rewards</h3>
            <div className="space-y-3">
              {rewards.map((reward, index) => {
                const IconComponent = reward.icon;
                const canRedeem = currentPoints >= reward.points;
                return (
                  <Card key={index} className={`p-3 ${canRedeem ? 'border-green-200' : 'border-gray-200 opacity-60'}`}>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <IconComponent className="w-5 h-5 text-red-600" />
                        <div>
                          <h4 className="font-medium text-sm">{reward.name}</h4>
                          <p className="text-xs text-gray-600">{reward.points} points</p>
                        </div>
                      </div>
                      <Button
                        size="sm"
                        disabled={!canRedeem}
                        onClick={() => redeemReward(reward.name, reward.points)}
                        className="bg-red-600 hover:bg-red-700"
                      >
                        Redeem
                      </Button>
                    </div>
                  </Card>
                );
              })}
            </div>
          </div>

          {/* Tier Progress */}
          <div>
            <h3 className="font-semibold mb-3">Tier Progress</h3>
            <div className="space-y-2">
              {tiers.map((tier, index) => (
                <div key={tier.name} className="flex items-center space-x-2">
                  <div className={`w-3 h-3 rounded-full ${currentPoints >= tier.minPoints ? tier.color : 'bg-gray-300'}`}></div>
                  <span className={`text-sm ${currentPoints >= tier.minPoints ? 'font-semibold' : 'text-gray-500'}`}>
                    {tier.name} ({tier.minPoints}+ points)
                  </span>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default LoyaltyProgram;
