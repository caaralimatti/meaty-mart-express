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
  return <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-green-100">
      {/* Header */}
      <div className="bg-card shadow-lg border-b border-border p-4">
        <div className="container mx-auto flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Welcome back, Rajesh! 👋</h1>
            <p className="text-muted-foreground">Your premium shopping experience awaits</p>
          </div>
          <Button onClick={onBackToShopping} className="bg-primary text-primary-foreground hover:bg-primary/90 shadow-lg">
            Continue Shopping
          </Button>
        </div>
      </div>

      <div className="container mx-auto p-6 space-y-6">
        {/* Flash Sale Banner - Urgency Psychology */}
        <Card className="bg-gradient-to-r from-emerald-600 to-green-700 text-white border border-emerald-500 shadow-lg transition-all duration-300">
          <CardContent className="p-6">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="text-2xl font-bold mb-2 text-white">⚡ FLASH SALE ENDING SOON!</h3>
                <p className="text-emerald-100">Up to 40% OFF on premium cuts - Limited time only!</p>
              </div>
              <div className="text-center">
                <div className="text-3xl font-mono font-bold text-red-600 bg-red-50 px-4 py-2 rounded-lg border-2 border-red-200 animate-pulse">{formatTime(timeRemaining)}</div>
                <p className="text-sm text-red-600 mt-1 font-medium">Time left</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid md:grid-cols-3 gap-6">
          {/* Loyalty Points - Gamification */}
          <Card className="col-span-1 bg-gradient-to-br from-emerald-700 to-green-800 shadow-lg">
            <CardHeader className="bg-gradient-to-r from-emerald-800 to-green-900 rounded-t-lg">
              <CardTitle className="flex items-center space-x-2 text-white">
                <Gift className="w-5 h-5 text-emerald-100" />
                <span>Loyalty Rewards</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 bg-gradient-to-br from-emerald-700 to-green-800 text-white p-6">
              <div>
                <div className="flex justify-between mb-2">
                  <span className="font-semibold text-lg text-white">{loyaltyPoints} Points</span>
                  <Badge className="bg-emerald-100 text-emerald-800 border-emerald-200">Gold Member</Badge>
                </div>
                <Progress value={progressPercentage} className="h-3 bg-emerald-900" />
                <p className="text-sm text-emerald-100 mt-2">
                  {nextRewardPoints - loyaltyPoints} points to next reward!
                </p>
              </div>
              
              <div className="space-y-2">
                <Button className="w-full bg-emerald-100 text-emerald-800 hover:bg-emerald-200 font-medium" size="sm">
                  Redeem 500 Points (₹50 OFF)
                </Button>
                <Button variant="outline" className="w-full border-emerald-200 text-emerald-100 hover:bg-emerald-100 hover:text-emerald-800" size="sm">
                  View All Rewards
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Quick Stats */}
          <Card className="col-span-2 bg-gradient-to-br from-emerald-50 to-green-50 border-emerald-200 shadow-lg">
            <CardHeader className="bg-gradient-to-r from-emerald-500 to-green-600 text-white rounded-t-lg">
              <CardTitle className="text-white">Your Shopping Stats</CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                <div className="text-center p-3 bg-emerald-100 rounded-lg">
                  <div className="text-2xl font-bold text-emerald-700">₹12,450</div>
                  <p className="text-sm text-emerald-600">Total Saved</p>
                </div>
                <div className="text-center p-3 bg-green-100 rounded-lg">
                  <div className="text-2xl font-bold text-green-700">47</div>
                  <p className="text-sm text-green-600">Orders Placed</p>
                </div>
                <div className="text-center p-3 bg-emerald-100 rounded-lg">
                  <div className="text-2xl font-bold text-emerald-700">4.9⭐</div>
                  <p className="text-sm text-emerald-600">Avg Rating</p>
                </div>
                <div className="text-center p-3 bg-green-100 rounded-lg">
                  <div className="text-2xl font-bold text-green-700">18 min</div>
                  <p className="text-sm text-green-600">Avg Delivery</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Personalized Recommendations - AI Psychology */}
        <Card className="bg-gradient-to-br from-emerald-50 to-green-50 border-emerald-200 shadow-lg">
          <CardHeader className="bg-gradient-to-r from-emerald-500 to-green-600 text-white rounded-t-lg">
            <CardTitle className="flex items-center space-x-2 text-white">
              <TrendingUp className="w-5 h-5 text-emerald-100" />
              <span>Handpicked Just for You</span>
              <Badge className="bg-emerald-100 text-emerald-800">AI Powered</Badge>
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
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
            }].map((product, index) => <Card key={index} className="border-emerald-200 hover:border-emerald-400 transition-all duration-300 cursor-pointer bg-gradient-to-br from-white to-emerald-50 shadow-md hover:shadow-lg">
                  <CardContent className="p-4">
                    <Badge className={`mb-2 ${product.badge === "Low Stock" ? "bg-red-50 text-red-600 border-red-200" : "bg-emerald-100 text-emerald-700 border-emerald-200"}`}>{product.badge}</Badge>
                    <h4 className="font-semibold mb-2 text-emerald-900">{product.name}</h4>
                    <div className="flex items-center space-x-2 mb-3">
                      <span className="text-lg font-bold text-emerald-700">₹{product.price}</span>
                      <span className="text-sm text-emerald-500 line-through">₹{product.originalPrice}</span>
                      <Badge className="text-xs bg-emerald-600 text-white border-0">{product.saving}</Badge>
                    </div>
                    <Button className="w-full bg-emerald-600 hover:bg-emerald-700 text-white transition-colors duration-200 shadow-sm" size="sm">
                      Add to Cart
                    </Button>
                  </CardContent>
                </Card>)}
            </div>
          </CardContent>
        </Card>

        {/* Social Proof & Reviews */}
        <div className="grid md:grid-cols-2 gap-6">
          <Card className="bg-gradient-to-br from-emerald-50 to-green-50 border-emerald-200 shadow-lg">
            <CardHeader className="bg-gradient-to-r from-emerald-500 to-green-600 text-white rounded-t-lg">
              <CardTitle className="flex items-center space-x-2 text-white">
                <Star className="w-5 h-5 text-emerald-100" />
                <span>Recent Reviews</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 p-6">
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
            }].map((review, index) => <div key={index} className="border-l-4 border-emerald-400 pl-4 bg-white p-3 rounded-r-lg">
                  <div className="flex items-center space-x-2 mb-1">
                    <span className="font-semibold text-emerald-800">{review.name}</span>
                    <div className="flex">
                      {Array.from({
                    length: review.rating
                  }).map((_, i) => <Star key={i} className="w-3 h-3 fill-emerald-500 text-emerald-500" />)}
                    </div>
                    <span className="text-xs text-emerald-600">{review.time}</span>
                  </div>
                  <p className="text-sm text-emerald-700">"{review.comment}"</p>
                </div>)}
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card className="bg-gradient-to-br from-emerald-50 to-green-50 border-emerald-200 shadow-lg">
            <CardHeader className="bg-gradient-to-r from-emerald-500 to-green-600 text-white rounded-t-lg">
              <CardTitle className="text-white">Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 p-6">
              <Button className="w-full justify-start bg-gradient-to-r from-emerald-600 to-green-700 hover:from-emerald-700 hover:to-green-800 text-white">
                <Heart className="w-4 h-4 mr-2" />
                View Wishlist (8 items)
              </Button>
              <Button className="w-full justify-start bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 text-white">
                <Clock className="w-4 h-4 mr-2" />
                Reorder Last Purchase
              </Button>
              <Button className="w-full justify-start bg-gradient-to-r from-emerald-700 to-green-800 hover:from-emerald-800 hover:to-green-900 text-white">
                <MapPin className="w-4 h-4 mr-2" />
                Track Active Orders
              </Button>
              <Button className="w-full justify-start bg-gradient-to-r from-green-600 to-emerald-700 hover:from-green-700 hover:to-emerald-800 text-white">
                <Phone className="w-4 h-4 mr-2" />
                Contact Support (24/7)
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Scarcity Psychology - Stock Alert */}
        <Card className="border-red-200 bg-gradient-to-r from-red-50 to-orange-50 shadow-lg transition-all duration-300">
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <Zap className="w-6 h-6 text-red-600" />
              <div>
                <p className="font-semibold text-red-600">⚠️ Running Low on Your Favorites!</p>
                <p className="text-sm text-red-500">Premium Mutton Curry Cut - Only 3 kg left in stock. Order now to avoid disappointment!</p>
              </div>
              <Button className="bg-red-600 hover:bg-red-700 text-white ml-auto shadow-md transition-all duration-300">
                Order Now
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>;
};
export default CustomerDashboard;