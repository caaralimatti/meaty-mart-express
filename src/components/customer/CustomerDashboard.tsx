import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, User, MapPin, Clock, CreditCard, Gift, Package, Star } from "lucide-react";
import ProfileSettings from "@/components/ProfileSettings";

interface CustomerDashboardProps {
  onBackToShopping: () => void;
}

const CustomerDashboard = ({ onBackToShopping }: CustomerDashboardProps) => {
  const [activeTab, setActiveTab] = useState<"overview" | "profile" | "orders" | "loyalty">("overview");

  // Mock data
  const customerData = {
    name: "John Doe",
    loyaltyPoints: 250,
    totalOrders: 12,
    savedMoney: 850,
    recentOrders: [
      { id: "1", item: "Goat Leg Piece", date: "2 days ago", amount: 450, status: "Delivered" },
      { id: "2", item: "Goat Shoulder", date: "1 week ago", amount: 680, status: "Delivered" },
      { id: "3", item: "Goat Ribs", date: "2 weeks ago", amount: 320, status: "Delivered" }
    ]
  };

  if (activeTab === "profile") {
    return (
      <div className="min-h-screen bg-gray-50 p-4">
        <div className="max-w-4xl mx-auto">
          <Button 
            variant="ghost" 
            onClick={() => setActiveTab("overview")}
            className="mb-4"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Dashboard
          </Button>
          <ProfileSettings onClose={() => setActiveTab("overview")} />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Button 
              variant="ghost" 
              onClick={onBackToShopping}
              className="text-red-600"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Shopping
            </Button>
            <h1 className="text-2xl font-bold text-gray-800">My Dashboard</h1>
            <div></div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto p-4">
        {/* Tab Navigation */}
        <div className="flex space-x-2 mb-6 bg-white rounded-lg p-2 shadow-sm">
          {[
            { id: "overview", label: "Overview", icon: User },
            { id: "profile", label: "Profile", icon: User },
            { id: "orders", label: "Orders", icon: Package },
            { id: "loyalty", label: "Rewards", icon: Gift }
          ].map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => setActiveTab(id as any)}
              className={`flex items-center space-x-2 px-4 py-2 rounded-md flex-1 justify-center transition-colors ${
                activeTab === id 
                  ? "bg-red-600 text-white" 
                  : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{label}</span>
            </button>
          ))}
        </div>

        {/* Overview Tab */}
        {activeTab === "overview" && (
          <div className="space-y-6">
            {/* Welcome Card */}
            <Card className="bg-gradient-to-r from-red-600 to-orange-500 text-white">
              <CardContent className="p-6">
                <h2 className="text-2xl font-bold mb-2">Welcome back, {customerData.name}! 👋</h2>
                <p className="opacity-90">Ready for some fresh goat meat?</p>
              </CardContent>
            </Card>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card>
                <CardContent className="p-6 text-center">
                  <Gift className="w-8 h-8 text-orange-600 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-orange-600">{customerData.loyaltyPoints}</div>
                  <div className="text-gray-600">Loyalty Points</div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-6 text-center">
                  <Package className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-blue-600">{customerData.totalOrders}</div>
                  <div className="text-gray-600">Total Orders</div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-6 text-center">
                  <Star className="w-8 h-8 text-green-600 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-green-600">₹{customerData.savedMoney}</div>
                  <div className="text-gray-600">Money Saved</div>
                </CardContent>
              </Card>
            </div>

            {/* Recent Orders */}
            <Card>
              <CardHeader>
                <CardTitle>Recent Orders</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {customerData.recentOrders.map((order) => (
                    <div key={order.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div>
                        <div className="font-medium">{order.item}</div>
                        <div className="text-sm text-gray-500">{order.date}</div>
                      </div>
                      <div className="text-right">
                        <div className="font-semibold">₹{order.amount}</div>
                        <div className="text-sm text-green-600">{order.status}</div>
                      </div>
                    </div>
                  ))}
                </div>
                <Button variant="outline" className="w-full mt-4">
                  View All Orders
                </Button>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Other tabs content can be added here */}
        {activeTab === "orders" && (
          <Card>
            <CardHeader>
              <CardTitle>Order History</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">Your complete order history will appear here.</p>
            </CardContent>
          </Card>
        )}

        {activeTab === "loyalty" && (
          <Card>
            <CardHeader>
              <CardTitle>Loyalty Program</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center space-y-4">
                <div className="text-4xl font-bold text-orange-600">{customerData.loyaltyPoints}</div>
                <p className="text-gray-600">Points Available</p>
                <Button className="bg-orange-600 hover:bg-orange-700">
                  Redeem Points
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default CustomerDashboard;
