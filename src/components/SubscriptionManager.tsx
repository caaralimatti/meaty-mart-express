
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { X, Calendar, Package, Edit, Pause, Play } from "lucide-react";
import { toast } from "sonner";

interface SubscriptionManagerProps {
  isOpen: boolean;
  onClose: () => void;
}

const SubscriptionManager = ({ isOpen, onClose }: SubscriptionManagerProps) => {
  const [subscriptions, setSubscriptions] = useState([
    {
      id: 1,
      name: "Weekly Family Pack",
      items: ["1kg Curry Cut", "500g Boneless"],
      frequency: "Weekly",
      nextDelivery: "2024-06-21",
      price: 850,
      active: true
    },
    {
      id: 2,
      name: "Monthly Premium Box",
      items: ["2kg Mixed Cuts", "1kg Marinated"],
      frequency: "Monthly",
      nextDelivery: "2024-07-01",
      price: 2400,
      active: false
    }
  ]);

  const [showAddNew, setShowAddNew] = useState(false);
  const [newSubscription, setNewSubscription] = useState({
    items: "",
    frequency: "",
    startDate: ""
  });

  const subscriptionPlans = [
    {
      name: "Weekly Essentials",
      price: 650,
      items: ["1kg Curry Cut", "500g Boneless"],
      savings: "Save ₹100/month"
    },
    {
      name: "Bi-weekly Premium",
      price: 1200,
      items: ["1.5kg Mixed Cuts", "750g Marinated"],
      savings: "Save ₹200/month"
    },
    {
      name: "Monthly Family Pack",
      price: 2200,
      items: ["3kg Mixed Cuts", "1kg Boneless", "500g Special Cuts"],
      savings: "Save ₹400/month"
    }
  ];

  const toggleSubscription = (id: number) => {
    setSubscriptions(prev => 
      prev.map(sub => 
        sub.id === id ? { ...sub, active: !sub.active } : sub
      )
    );
    const subscription = subscriptions.find(s => s.id === id);
    toast.success(`Subscription ${subscription?.active ? 'paused' : 'resumed'} successfully`);
  };

  const deleteSubscription = (id: number) => {
    setSubscriptions(prev => prev.filter(sub => sub.id !== id));
    toast.success("Subscription cancelled successfully");
  };

  const createSubscription = () => {
    if (!newSubscription.items || !newSubscription.frequency || !newSubscription.startDate) {
      toast.error("Please fill in all fields");
      return;
    }

    const newSub = {
      id: Date.now(),
      name: `Custom ${newSubscription.frequency} Plan`,
      items: [newSubscription.items],
      frequency: newSubscription.frequency,
      nextDelivery: newSubscription.startDate,
      price: 750,
      active: true
    };

    setSubscriptions(prev => [...prev, newSub]);
    setShowAddNew(false);
    setNewSubscription({ items: "", frequency: "", startDate: "" });
    toast.success("Subscription created successfully!");
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-lg max-h-[90vh] overflow-hidden">
        <CardHeader className="flex flex-row items-center justify-between">
          <div className="flex items-center space-x-2">
            <Package className="w-5 h-5 text-purple-600" />
            <CardTitle className="text-xl text-purple-700">My Subscriptions</CardTitle>
          </div>
          <Button variant="ghost" onClick={onClose}>
            <X className="w-5 h-5" />
          </Button>
        </CardHeader>
        
        <CardContent className="p-4 max-h-[70vh] overflow-y-auto space-y-6">
          {/* Active Subscriptions */}
          <div>
            <div className="flex justify-between items-center mb-3">
              <h3 className="font-semibold">Active Subscriptions</h3>
              <Button 
                size="sm" 
                onClick={() => setShowAddNew(true)}
                className="bg-purple-600 hover:bg-purple-700"
              >
                Add New
              </Button>
            </div>

            {subscriptions.length === 0 ? (
              <Card className="border-gray-200">
                <CardContent className="p-6 text-center">
                  <Package className="w-12 h-12 mx-auto mb-2 text-gray-300" />
                  <p className="text-gray-500">No active subscriptions</p>
                  <Button 
                    className="mt-3 bg-purple-600 hover:bg-purple-700" 
                    onClick={() => setShowAddNew(true)}
                  >
                    Create Your First Subscription
                  </Button>
                </CardContent>
              </Card>
            ) : (
              <div className="space-y-3">
                {subscriptions.map((subscription) => (
                  <Card key={subscription.id} className={`border-2 ${subscription.active ? 'border-green-200 bg-green-50' : 'border-gray-200 bg-gray-50'}`}>
                    <CardContent className="p-4">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h4 className="font-semibold">{subscription.name}</h4>
                          <div className="flex items-center space-x-2 mt-1">
                            <Badge className={subscription.active ? "bg-green-600" : "bg-gray-500"}>
                              {subscription.active ? "Active" : "Paused"}
                            </Badge>
                            <Badge variant="outline">{subscription.frequency}</Badge>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="font-bold text-lg">₹{subscription.price}</div>
                          <div className="text-xs text-gray-600">per delivery</div>
                        </div>
                      </div>

                      <div className="mb-3">
                        <p className="text-sm text-gray-600">Items:</p>
                        <ul className="text-sm">
                          {subscription.items.map((item, index) => (
                            <li key={index}>• {item}</li>
                          ))}
                        </ul>
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2 text-sm">
                          <Calendar className="w-4 h-4" />
                          <span>Next: {new Date(subscription.nextDelivery).toLocaleDateString()}</span>
                        </div>
                        
                        <div className="flex items-center space-x-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => toggleSubscription(subscription.id)}
                          >
                            {subscription.active ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => deleteSubscription(subscription.id)}
                          >
                            <X className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>

          {/* Add New Subscription Form */}
          {showAddNew && (
            <Card className="border-purple-200">
              <CardHeader>
                <CardTitle className="text-lg">Create New Subscription</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label>Select Plan</Label>
                  <div className="grid gap-2 mt-2">
                    {subscriptionPlans.map((plan, index) => (
                      <Card key={index} className="cursor-pointer hover:border-purple-300" onClick={() => setNewSubscription(prev => ({ ...prev, items: plan.items.join(", ") }))}>
                        <CardContent className="p-3">
                          <div className="flex justify-between items-start">
                            <div>
                              <h4 className="font-medium">{plan.name}</h4>
                              <p className="text-sm text-gray-600">{plan.items.join(", ")}</p>
                            </div>
                            <div className="text-right">
                              <div className="font-bold">₹{plan.price}</div>
                              <div className="text-xs text-green-600">{plan.savings}</div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>

                <div>
                  <Label>Frequency</Label>
                  <Select value={newSubscription.frequency} onValueChange={(value) => setNewSubscription(prev => ({ ...prev, frequency: value }))}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select frequency" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Weekly">Weekly</SelectItem>
                      <SelectItem value="Bi-weekly">Bi-weekly</SelectItem>
                      <SelectItem value="Monthly">Monthly</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label>Start Date</Label>
                  <input
                    type="date"
                    className="w-full p-2 border rounded-md"
                    value={newSubscription.startDate}
                    onChange={(e) => setNewSubscription(prev => ({ ...prev, startDate: e.target.value }))}
                    min={new Date().toISOString().split('T')[0]}
                  />
                </div>

                <div className="flex space-x-2">
                  <Button variant="outline" onClick={() => setShowAddNew(false)} className="flex-1">
                    Cancel
                  </Button>
                  <Button onClick={createSubscription} className="flex-1 bg-purple-600 hover:bg-purple-700">
                    Create Subscription
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Subscription Benefits */}
          <Card className="border-blue-200 bg-blue-50">
            <CardContent className="p-4">
              <h4 className="font-semibold text-blue-700 mb-2">Subscription Benefits</h4>
              <ul className="text-sm space-y-1 text-gray-700">
                <li>• Save up to 25% on regular prices</li>
                <li>• Free delivery on all orders</li>
                <li>• Priority customer support</li>
                <li>• Flexible pause/resume anytime</li>
                <li>• Early access to new products</li>
              </ul>
            </CardContent>
          </Card>
        </CardContent>
      </Card>
    </div>
  );
};

export default SubscriptionManager;
