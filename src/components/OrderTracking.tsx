
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { X, MapPin, Clock, Phone, CheckCircle } from "lucide-react";

interface OrderTrackingProps {
  isOpen: boolean;
  onClose: () => void;
  orderId?: string;
}

const OrderTracking = ({ isOpen, onClose, orderId = "QG001234" }: OrderTrackingProps) => {
  const [orderStatus] = useState({
    id: orderId,
    status: "Out for Delivery",
    estimatedTime: "15 mins",
    deliveryPartner: {
      name: "Ravi Kumar",
      phone: "+91 9876543210",
      rating: 4.8
    },
    items: [
      { name: "Premium Goat Curry Cut", weight: "500g", price: 420, quantity: 1 }
    ],
    timeline: [
      { status: "Order Placed", time: "2:30 PM", completed: true },
      { status: "Order Confirmed", time: "2:32 PM", completed: true },
      { status: "Being Prepared", time: "2:35 PM", completed: true },
      { status: "Out for Delivery", time: "2:45 PM", completed: true, current: true },
      { status: "Delivered", time: "3:00 PM (Expected)", completed: false }
    ]
  });

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-md max-h-[90vh] overflow-hidden bg-gradient-to-br from-white to-emerald-50 border-emerald-200 shadow-xl">
        <CardHeader className="flex flex-row items-center justify-between bg-gradient-to-r from-emerald-500 to-green-600 text-white">
          <CardTitle className="text-xl">Track Order #{orderStatus.id}</CardTitle>
          <Button variant="ghost" onClick={onClose} className="text-white hover:bg-emerald-700 transition-colors duration-200">
            <X className="w-5 h-5" />
          </Button>
        </CardHeader>
        
        <CardContent className="p-4 space-y-4 max-h-[70vh] overflow-y-auto">
          {/* Current Status */}
          <Card className="border-emerald-200 bg-gradient-to-br from-emerald-50 to-green-50 transition-all duration-300">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-semibold text-emerald-800">{orderStatus.status}</h3>
                  <p className="text-sm text-emerald-600">ETA: {orderStatus.estimatedTime}</p>
                </div>
                <div className="w-12 h-12 bg-gradient-to-br from-emerald-600 to-green-600 rounded-full flex items-center justify-center shadow-lg">
                  <MapPin className="w-6 h-6 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Delivery Partner */}
          <Card className="border-emerald-200 bg-gradient-to-br from-white to-emerald-50 transition-all duration-300 hover:border-emerald-400">
            <CardContent className="p-4">
              <h4 className="font-semibold mb-2 text-emerald-900">Delivery Partner</h4>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-emerald-800">{orderStatus.deliveryPartner.name}</p>
                  <div className="flex items-center space-x-1">
                    <span className="text-sm text-emerald-600">⭐ {orderStatus.deliveryPartner.rating}</span>
                  </div>
                </div>
                <Button size="sm" className="bg-emerald-600 hover:bg-emerald-700 text-white transition-colors duration-200 shadow-sm">
                  <Phone className="w-4 h-4 mr-1" />
                  Call
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Order Timeline */}
          <Card className="border-emerald-200 bg-gradient-to-br from-white to-emerald-50 transition-all duration-300 hover:border-emerald-400">
            <CardContent className="p-4">
              <h4 className="font-semibold mb-4 text-emerald-900">Order Timeline</h4>
              <div className="space-y-4">
                {orderStatus.timeline.map((step, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <div className={`w-4 h-4 rounded-full flex-shrink-0 transition-all duration-300 ${
                      step.completed 
                        ? 'bg-emerald-600' 
                        : step.current 
                          ? 'bg-emerald-500 animate-pulse' 
                          : 'bg-emerald-200'
                    }`}>
                      {step.completed && (
                        <CheckCircle className="w-4 h-4 text-white" />
                      )}
                    </div>
                    <div className="flex-1">
                      <p className={`font-medium transition-colors duration-200 ${
                        step.current ? 'text-emerald-700' : step.completed ? 'text-emerald-800' : 'text-emerald-400'
                      }`}>
                        {step.status}
                      </p>
                      <p className={`text-sm transition-colors duration-200 ${
                        step.current ? 'text-emerald-600' : step.completed ? 'text-emerald-600' : 'text-emerald-400'
                      }`}>
                        {step.time}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Order Items */}
          <Card className="border-emerald-200 bg-gradient-to-br from-white to-emerald-50 transition-all duration-300 hover:border-emerald-400">
            <CardContent className="p-4">
              <h4 className="font-semibold mb-2 text-emerald-900">Order Items</h4>
              {orderStatus.items.map((item, index) => (
                <div key={index} className="flex justify-between items-center">
                  <div>
                    <p className="font-medium text-emerald-800">{item.name}</p>
                    <p className="text-sm text-emerald-600">{item.weight} × {item.quantity}</p>
                  </div>
                  <p className="font-semibold text-emerald-700">₹{item.price}</p>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <div className="space-y-2">
            <Button variant="outline" className="w-full border-emerald-200 text-emerald-700 hover:bg-emerald-50 hover:border-emerald-400 transition-all duration-200">
              Need Help?
            </Button>
            <Button variant="outline" className="w-full border-emerald-300 text-emerald-600 hover:bg-emerald-100 hover:border-emerald-500 transition-all duration-200">
              Cancel Order
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default OrderTracking;
