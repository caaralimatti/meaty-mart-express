
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
      <Card className="w-full max-w-md max-h-[90vh] overflow-hidden">
        <CardHeader className="flex flex-row items-center justify-between bg-red-600 text-white">
          <CardTitle className="text-xl">Track Order #{orderStatus.id}</CardTitle>
          <Button variant="ghost" onClick={onClose} className="text-white hover:bg-red-700">
            <X className="w-5 h-5" />
          </Button>
        </CardHeader>
        
        <CardContent className="p-4 space-y-4 max-h-[70vh] overflow-y-auto">
          {/* Current Status */}
          <Card className="border-red-200 bg-red-50">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-semibold text-red-800">{orderStatus.status}</h3>
                  <p className="text-sm text-red-600">ETA: {orderStatus.estimatedTime}</p>
                </div>
                <div className="w-12 h-12 bg-red-600 rounded-full flex items-center justify-center">
                  <MapPin className="w-6 h-6 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Delivery Partner */}
          <Card>
            <CardContent className="p-4">
              <h4 className="font-semibold mb-2">Delivery Partner</h4>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">{orderStatus.deliveryPartner.name}</p>
                  <div className="flex items-center space-x-1">
                    <span className="text-sm text-gray-600">⭐ {orderStatus.deliveryPartner.rating}</span>
                  </div>
                </div>
                <Button size="sm" className="bg-green-600 hover:bg-green-700">
                  <Phone className="w-4 h-4 mr-1" />
                  Call
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Order Timeline */}
          <Card>
            <CardContent className="p-4">
              <h4 className="font-semibold mb-4">Order Timeline</h4>
              <div className="space-y-4">
                {orderStatus.timeline.map((step, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <div className={`w-4 h-4 rounded-full flex-shrink-0 ${
                      step.completed 
                        ? 'bg-green-600' 
                        : step.current 
                          ? 'bg-red-600 animate-pulse' 
                          : 'bg-gray-300'
                    }`}>
                      {step.completed && (
                        <CheckCircle className="w-4 h-4 text-white" />
                      )}
                    </div>
                    <div className="flex-1">
                      <p className={`font-medium ${
                        step.current ? 'text-red-600' : step.completed ? 'text-gray-800' : 'text-gray-400'
                      }`}>
                        {step.status}
                      </p>
                      <p className={`text-sm ${
                        step.current ? 'text-red-500' : step.completed ? 'text-gray-600' : 'text-gray-400'
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
          <Card>
            <CardContent className="p-4">
              <h4 className="font-semibold mb-2">Order Items</h4>
              {orderStatus.items.map((item, index) => (
                <div key={index} className="flex justify-between items-center">
                  <div>
                    <p className="font-medium">{item.name}</p>
                    <p className="text-sm text-gray-600">{item.weight} × {item.quantity}</p>
                  </div>
                  <p className="font-semibold text-red-600">₹{item.price}</p>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <div className="space-y-2">
            <Button variant="outline" className="w-full">
              Need Help?
            </Button>
            <Button variant="outline" className="w-full border-red-200 text-red-600">
              Cancel Order
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default OrderTracking;
