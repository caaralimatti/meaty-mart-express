
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { X, Share2, Copy, Gift, Users, Trophy } from "lucide-react";
import { toast } from "sonner";

interface ReferralProgramProps {
  isOpen: boolean;
  onClose: () => void;
}

const ReferralProgram = ({ isOpen, onClose }: ReferralProgramProps) => {
  const [referralCode] = useState("GOAT_JOHN_2024");
  const [referralStats] = useState({
    totalReferrals: 12,
    successfulReferrals: 8,
    totalEarnings: 2400,
    pendingRewards: 600
  });

  const [referralHistory] = useState([
    { name: "Sarah M.", date: "2024-06-10", status: "Completed", reward: 300 },
    { name: "Raj K.", date: "2024-06-08", status: "Pending", reward: 300 },
    { name: "Priya S.", date: "2024-06-05", status: "Completed", reward: 300 },
    { name: "Mike D.", date: "2024-06-01", status: "Completed", reward: 300 }
  ]);

  const copyReferralCode = () => {
    navigator.clipboard.writeText(referralCode);
    toast.success("Referral code copied to clipboard!");
  };

  const shareReferral = () => {
    const message = `Hey! I found this amazing fresh goat meat delivery app QuickGoat. Use my code ${referralCode} and get ₹200 off your first order! We both get rewarded 🎉`;
    
    if (navigator.share) {
      navigator.share({
        title: 'QuickGoat Referral',
        text: message,
        url: window.location.origin
      });
    } else {
      navigator.clipboard.writeText(message + ` ${window.location.origin}`);
      toast.success("Referral message copied to clipboard!");
    }
  };

  const rewardTiers = [
    { referrals: 5, reward: "₹500 bonus", icon: Gift, completed: true },
    { referrals: 10, reward: "₹1000 bonus + Free delivery for 3 months", icon: Trophy, completed: false },
    { referrals: 20, reward: "₹2000 bonus + VIP status", icon: Users, completed: false }
  ];

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-lg max-h-[90vh] overflow-hidden">
        <CardHeader className="flex flex-row items-center justify-between">
          <div className="flex items-center space-x-2">
            <Share2 className="w-5 h-5 text-purple-600" />
            <CardTitle className="text-xl text-purple-700">Refer & Earn</CardTitle>
          </div>
          <Button variant="ghost" onClick={onClose}>
            <X className="w-5 h-5" />
          </Button>
        </CardHeader>
        
        <CardContent className="p-4 max-h-[70vh] overflow-y-auto space-y-6">
          {/* Referral Stats */}
          <Card className="border-purple-200 bg-gradient-to-r from-purple-50 to-pink-50">
            <CardContent className="p-4">
              <div className="grid grid-cols-2 gap-4 text-center">
                <div>
                  <div className="text-2xl font-bold text-purple-600">{referralStats.totalReferrals}</div>
                  <div className="text-sm text-gray-600">Total Referrals</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-green-600">₹{referralStats.totalEarnings}</div>
                  <div className="text-sm text-gray-600">Total Earned</div>
                </div>
              </div>
              
              <div className="mt-4 p-3 bg-white rounded-lg">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium">Pending Rewards</span>
                  <span className="text-lg font-bold text-orange-600">₹{referralStats.pendingRewards}</span>
                </div>
                <p className="text-xs text-gray-600">Will be credited after friend's first successful order</p>
              </div>
            </CardContent>
          </Card>

          {/* Referral Code */}
          <div>
            <h3 className="font-semibold mb-3">Your Referral Code</h3>
            <div className="flex space-x-2">
              <Input value={referralCode} readOnly className="font-mono" />
              <Button onClick={copyReferralCode} variant="outline">
                <Copy className="w-4 h-4" />
              </Button>
            </div>
            <Button onClick={shareReferral} className="w-full mt-2 bg-purple-600 hover:bg-purple-700">
              <Share2 className="w-4 h-4 mr-2" />
              Share with Friends
            </Button>
          </div>

          {/* How it Works */}
          <Card className="border-blue-200 bg-blue-50">
            <CardContent className="p-4">
              <h4 className="font-semibold text-blue-700 mb-3">How it Works</h4>
              <div className="space-y-2 text-sm">
                <div className="flex items-start space-x-2">
                  <div className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-xs font-bold">1</div>
                  <div>
                    <strong>Share your code</strong>
                    <p className="text-gray-600">Send your referral code to friends & family</p>
                  </div>
                </div>
                <div className="flex items-start space-x-2">
                  <div className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-xs font-bold">2</div>
                  <div>
                    <strong>Friend gets discount</strong>
                    <p className="text-gray-600">They get ₹200 off their first order</p>
                  </div>
                </div>
                <div className="flex items-start space-x-2">
                  <div className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-xs font-bold">3</div>
                  <div>
                    <strong>You both earn</strong>
                    <p className="text-gray-600">You get ₹300, they get ₹100 cashback</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Reward Tiers */}
          <div>
            <h3 className="font-semibold mb-3">Bonus Rewards</h3>
            <div className="space-y-3">
              {rewardTiers.map((tier, index) => {
                const IconComponent = tier.icon;
                const progress = Math.min((referralStats.successfulReferrals / tier.referrals) * 100, 100);
                
                return (
                  <Card key={index} className={`${tier.completed ? 'border-green-200 bg-green-50' : 'border-gray-200'}`}>
                    <CardContent className="p-3">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center space-x-2">
                          <IconComponent className={`w-5 h-5 ${tier.completed ? 'text-green-600' : 'text-gray-400'}`} />
                          <span className="font-medium">{tier.referrals} Referrals</span>
                          {tier.completed && <Badge className="bg-green-600">Completed</Badge>}
                        </div>
                        <span className="text-sm font-semibold">{tier.reward}</span>
                      </div>
                      <Progress value={progress} className="h-2" />
                      <p className="text-xs text-gray-600 mt-1">
                        {referralStats.successfulReferrals}/{tier.referrals} completed
                      </p>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>

          {/* Referral History */}
          <div>
            <h3 className="font-semibold mb-3">Recent Referrals</h3>
            <div className="space-y-2">
              {referralHistory.map((referral, index) => (
                <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <p className="font-medium">{referral.name}</p>
                    <p className="text-sm text-gray-600">{new Date(referral.date).toLocaleDateString()}</p>
                  </div>
                  <div className="text-right">
                    <Badge className={referral.status === 'Completed' ? 'bg-green-600' : 'bg-orange-500'}>
                      {referral.status}
                    </Badge>
                    <p className="text-sm font-semibold mt-1">₹{referral.reward}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ReferralProgram;
