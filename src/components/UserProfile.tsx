
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { User, MapPin, Star, Gift, History, X } from "lucide-react";
import { toast } from "sonner";

interface UserProfileProps {
  isOpen: boolean;
  onClose: () => void;
}

const UserProfile = ({ isOpen, onClose }: UserProfileProps) => {
  const [activeTab, setActiveTab] = useState<"profile" | "addresses" | "orders" | "loyalty">("profile");
  const [userInfo, setUserInfo] = useState({
    name: "Rajesh Kumar",
    phone: "+91 9876543210",
    email: "rajesh@example.com"
  });

  const [addresses] = useState([
    { id: 1, type: "Home", address: "123 MG Road, Hubli, Karnataka 580001", isDefault: true },
    { id: 2, type: "Office", address: "456 Commercial Street, Hubli, Karnataka 580002", isDefault: false }
  ]);

  const [orders] = useState([
    { id: "QG001", date: "2024-01-15", items: "Premium Goat Curry Cut (500g)", amount: 420, status: "Delivered" },
    { id: "QG002", date: "2024-01-10", items: "Boneless Goat Chunks (250g)", amount: 380, status: "Delivered" },
    { id: "QG003", date: "2024-01-05", items: "Marinated Goat Biryani Cut (1kg)", amount: 850, status: "Cancelled" }
  ]);

  if (!isOpen) return null;

  const loyaltyPoints = 1250;
  const nextRewardAt = 2000;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-4xl max-h-[90vh] overflow-hidden">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-2xl text-red-700">My Profile</CardTitle>
          <Button variant="ghost" onClick={onClose}>
            <X className="w-5 h-5" />
          </Button>
        </CardHeader>
        
        <CardContent className="p-0">
          <div className="flex">
            {/* Sidebar */}
            <div className="w-1/4 bg-gray-50 p-4 space-y-2">
              {[
                { key: "profile", label: "Profile", icon: User },
                { key: "addresses", label: "Addresses", icon: MapPin },
                { key: "orders", label: "Order History", icon: History },
                { key: "loyalty", label: "Loyalty Points", icon: Gift }
              ].map((tab) => (
                <Button
                  key={tab.key}
                  variant={activeTab === tab.key ? "default" : "ghost"}
                  className={`w-full justify-start ${
                    activeTab === tab.key ? "bg-red-600 hover:bg-red-700" : ""
                  }`}
                  onClick={() => setActiveTab(tab.key as any)}
                >
                  <tab.icon className="w-4 h-4 mr-2" />
                  {tab.label}
                </Button>
              ))}
            </div>

            {/* Content */}
            <div className="flex-1 p-6 max-h-[70vh] overflow-y-auto">
              {activeTab === "profile" && (
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Personal Information</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="name">Full Name</Label>
                      <Input
                        id="name"
                        value={userInfo.name}
                        onChange={(e) => setUserInfo(prev => ({...prev, name: e.target.value}))}
                      />
                    </div>
                    <div>
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input
                        id="phone"
                        value={userInfo.phone}
                        disabled
                        className="bg-gray-100"
                      />
                    </div>
                    <div>
                      <Label htmlFor="email">Email (Optional)</Label>
                      <Input
                        id="email"
                        value={userInfo.email}
                        onChange={(e) => setUserInfo(prev => ({...prev, email: e.target.value}))}
                      />
                    </div>
                  </div>
                  <Button className="bg-red-600 hover:bg-red-700">Update Profile</Button>
                </div>
              )}

              {activeTab === "addresses" && (
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <h3 className="text-lg font-semibold">Saved Addresses</h3>
                    <Button className="bg-red-600 hover:bg-red-700">Add New Address</Button>
                  </div>
                  <div className="space-y-3">
                    {addresses.map((address) => (
                      <Card key={address.id} className="border-red-100">
                        <CardContent className="p-4">
                          <div className="flex justify-between items-start">
                            <div>
                              <div className="flex items-center space-x-2 mb-2">
                                <Badge variant={address.isDefault ? "default" : "outline"}>
                                  {address.type}
                                </Badge>
                                {address.isDefault && (
                                  <Badge className="bg-green-600">Default</Badge>
                                )}
                              </div>
                              <p className="text-gray-700">{address.address}</p>
                            </div>
                            <div className="space-x-2">
                              <Button variant="outline" size="sm">Edit</Button>
                              <Button variant="outline" size="sm">Delete</Button>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === "orders" && (
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Order History</h3>
                  <div className="space-y-3">
                    {orders.map((order) => (
                      <Card key={order.id} className="border-red-100">
                        <CardContent className="p-4">
                          <div className="flex justify-between items-start">
                            <div>
                              <div className="flex items-center space-x-2 mb-2">
                                <span className="font-semibold">#{order.id}</span>
                                <Badge 
                                  variant={order.status === "Delivered" ? "default" : 
                                          order.status === "Cancelled" ? "destructive" : "outline"}
                                  className={order.status === "Delivered" ? "bg-green-600" : ""}
                                >
                                  {order.status}
                                </Badge>
                              </div>
                              <p className="text-gray-700">{order.items}</p>
                              <p className="text-sm text-gray-500">{order.date}</p>
                            </div>
                            <div className="text-right">
                              <p className="font-bold text-red-600">₹{order.amount}</p>
                              <div className="space-x-2 mt-2">
                                <Button variant="outline" size="sm">View Details</Button>
                                {order.status === "Delivered" && (
                                  <Button variant="outline" size="sm">Reorder</Button>
                                )}
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === "loyalty" && (
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Loyalty Points</h3>
                  <Card className="bg-gradient-to-r from-red-600 to-orange-600 text-white">
                    <CardContent className="p-6">
                      <div className="flex justify-between items-center">
                        <div>
                          <h4 className="text-2xl font-bold">{loyaltyPoints} Points</h4>
                          <p className="text-red-100">Available Balance</p>
                        </div>
                        <Gift className="w-12 h-12" />
                      </div>
                      <div className="mt-4">
                        <p className="text-sm text-red-100 mb-2">
                          {nextRewardAt - loyaltyPoints} points to next reward
                        </p>
                        <div className="w-full bg-red-700 rounded-full h-2">
                          <div 
                            className="bg-white h-2 rounded-full" 
                            style={{width: `${(loyaltyPoints / nextRewardAt) * 100}%`}}
                          ></div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Card>
                      <CardContent className="p-4 text-center">
                        <h4 className="font-semibold">₹50 Off</h4>
                        <p className="text-sm text-gray-600">500 Points</p>
                        <Button className="mt-2 bg-red-600 hover:bg-red-700" size="sm">
                          Redeem
                        </Button>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardContent className="p-4 text-center">
                        <h4 className="font-semibold">₹100 Off</h4>
                        <p className="text-sm text-gray-600">1000 Points</p>
                        <Button className="mt-2 bg-red-600 hover:bg-red-700" size="sm">
                          Redeem
                        </Button>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default UserProfile;
