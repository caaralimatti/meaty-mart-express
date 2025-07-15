import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Clock, Zap, Star, Gift, TrendingUp, Heart, ShoppingCart, MapPin, Phone } from "lucide-react";
interface CustomerDashboardProps {
  onBackToShopping: () => void;
}
const CustomerDashboard = ({
  onBackToShopping
}: CustomerDashboardProps) => {
  const [loyaltyPoints, setLoyaltyPoints] = useState(1250);
  const [timeRemaining, setTimeRemaining] = useState(23 * 60 + 45); // 23:45 in minutes

  // Countdown timer for flash sale
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeRemaining(prev => prev > 0 ? prev - 1 : 0);
    }, 60000); // Update every minute

    return () => clearInterval(timer);
  }, []);
  const formatTime = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}:${mins.toString().padStart(2, '0')}`;
  };
  const nextRewardPoints = 2000;
  const progressPercentage = loyaltyPoints / nextRewardPoints * 100;
  return <div className="min-h-screen bg-lime-100">
      {/* Header */}
      <div className="bg-card shadow-lg border-b border-border p-4">
        <div className="container mx-auto flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Welcome back, Rajesh! 👋</h1>
            <p className="text-muted-foreground">Your premium shopping experience awaits</p>
          </div>
          <Button onClick={onBackToShopping} className="bg-primary text-primary-foreground hover:bg-primary/90">
            Continue Shopping
          </Button>
        </div>
      </div>

      <div className="container mx-auto p-6 space-y-6">
        {/* Flash Sale Banner - Urgency Psychology */}
        <Card className="bg-gradient-to-r from-primary/20 to-primary/10 text-foreground border border-primary/20 shadow-lg">
          <CardContent className="p-6">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="text-2xl font-bold mb-2 text-lime-900">⚡ FLASH SALE ENDING SOON!</h3>
                <p className="text-lime-700">Up to 40% OFF on premium cuts - Limited time only!</p>
              </div>
              <div className="text-center">
                <div className="text-3xl font-mono font-bold text-primary bg-transparent">{formatTime(timeRemaining)}</div>
                <p className="text-sm text-lime-900">Time left</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid md:grid-cols-3 gap-6">
          {/* Loyalty Points - Gamification */}
          <Card className="col-span-1 bg-lime-900">
            <CardHeader className="bg-lime-800">
              <CardTitle className="flex items-center space-x-2">
                <Gift className="w-5 h-5 text-primary" />
                <span>Loyalty Rewards</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 bg-lime-800">
              <div>
                <div className="flex justify-between mb-2">
                  <span className="font-semibold text-lg text-foreground">{loyaltyPoints} Points</span>
                  <Badge className="bg-primary/20 text-primary">Gold Member</Badge>
                </div>
                <Progress value={progressPercentage} className="h-3" />
                <p className="text-sm text-muted-foreground mt-2">
                  {nextRewardPoints - loyaltyPoints} points to next reward!
                </p>
              </div>
              
              <div className="space-y-2">
                <Button className="w-full bg-primary text-primary-foreground hover:bg-primary/90" size="sm">
                  Redeem 500 Points (₹50 OFF)
                </Button>
                <Button variant="outline" className="w-full" size="sm">
                  View All Rewards
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Quick Stats */}
          <Card className="col-span-2">
            <CardHeader>
              <CardTitle>Your Shopping Stats</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">₹12,450</div>
                  <p className="text-sm text-muted-foreground">Total Saved</p>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">47</div>
                  <p className="text-sm text-muted-foreground">Orders Placed</p>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">4.9⭐</div>
                  <p className="text-sm text-muted-foreground">Avg Rating</p>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">18 min</div>
                  <p className="text-sm text-muted-foreground">Avg Delivery</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Personalized Recommendations - AI Psychology */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <TrendingUp className="w-5 h-5 text-primary" />
              <span>Handpicked Just for You</span>
              <Badge className="bg-primary/20 text-primary">AI Powered</Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-4">
              {[{
              name: "Premium Mutton Curry Cut",
              price: 620,
              originalPrice: 780,
              saving: "21% OFF",
              badge: "Most Ordered"
            }, {
              name: "Fresh Goat Liver",
              price: 280,
              originalPrice: 350,
              saving: "20% OFF",
              badge: "Low Stock"
            }, {
              name: "Boneless Mutton Chunks",
              price: 720,
              originalPrice: 900,
              saving: "20% OFF",
              badge: "Trending"
            }].map((product, index) => <Card key={index} className="border-red-100 hover:border-red-300 transition-colors cursor-pointer">
                  <CardContent className="p-4">
                    <Badge className="mb-2 bg-green-100 text-green-700">{product.badge}</Badge>
                    <h4 className="font-semibold mb-2">{product.name}</h4>
                    <div className="flex items-center space-x-2 mb-3">
                      <span className="text-lg font-bold text-red-600">₹{product.price}</span>
                      <span className="text-sm text-gray-500 line-through">₹{product.originalPrice}</span>
                      <Badge variant="destructive" className="text-xs">{product.saving}</Badge>
                    </div>
                    <Button className="w-full bg-red-600 hover:bg-red-700" size="sm">
                      Add to Cart
                    </Button>
                  </CardContent>
                </Card>)}
            </div>
          </CardContent>
        </Card>

        {/* Social Proof & Reviews */}
        <div className="grid md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Star className="w-5 h-5 text-yellow-500" />
                <span>Recent Reviews</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {[{
              name: "Priya S.",
              rating: 5,
              comment: "Amazing quality! Delivered in 25 minutes.",
              time: "2 hours ago"
            }, {
              name: "Amit K.",
              rating: 5,
              comment: "Fresh and perfectly cut. Highly recommend!",
              time: "5 hours ago"
            }, {
              name: "Sneha M.",
              rating: 4,
              comment: "Good quality, will order again.",
              time: "1 day ago"
            }].map((review, index) => <div key={index} className="border-l-4 border-yellow-400 pl-4">
                  <div className="flex items-center space-x-2 mb-1">
                    <span className="font-semibold">{review.name}</span>
                    <div className="flex">
                      {Array.from({
                    length: review.rating
                  }).map((_, i) => <Star key={i} className="w-3 h-3 fill-yellow-400 text-yellow-400" />)}
                    </div>
                    <span className="text-xs text-gray-500">{review.time}</span>
                  </div>
                  <p className="text-sm text-gray-700">"{review.comment}"</p>
                </div>)}
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button className="w-full justify-start bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800">
                <Heart className="w-4 h-4 mr-2" />
                View Wishlist (8 items)
              </Button>
              <Button className="w-full justify-start bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800">
                <Clock className="w-4 h-4 mr-2" />
                Reorder Last Purchase
              </Button>
              <Button className="w-full justify-start bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800">
                <MapPin className="w-4 h-4 mr-2" />
                Track Active Orders
              </Button>
              <Button className="w-full justify-start bg-gradient-to-r from-orange-600 to-orange-700 hover:from-orange-700 hover:to-orange-800">
                <Phone className="w-4 h-4 mr-2" />
                Contact Support (24/7)
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Scarcity Psychology - Stock Alert */}
        <Card className="border-orange-200 bg-orange-50">
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <Zap className="w-6 h-6 text-orange-600" />
              <div>
                <p className="font-semibold text-orange-800">⚠️ Running Low on Your Favorites!</p>
                <p className="text-sm text-orange-700">Premium Mutton Curry Cut - Only 3 kg left in stock. Order now to avoid disappointment!</p>
              </div>
              <Button className="bg-orange-600 hover:bg-orange-700 ml-auto">
                Order Now
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>;
};
export default CustomerDashboard;