
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Bell, X, Check, Package, Gift, AlertTriangle } from "lucide-react";
import { toast } from "sonner";

interface Notification {
  id: number;
  type: "order" | "promotion" | "alert" | "delivery";
  title: string;
  message: string;
  time: string;
  read: boolean;
  icon: any;
}

interface NotificationCenterProps {
  isOpen: boolean;
  onClose: () => void;
}

const NotificationCenter = ({ isOpen, onClose }: NotificationCenterProps) => {
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: 1,
      type: "order",
      title: "Order Confirmed",
      message: "Your order #QG001 has been confirmed and is being prepared",
      time: "2 min ago",
      read: false,
      icon: Package
    },
    {
      id: 2,
      type: "promotion",
      title: "New Offer Available",
      message: "Get 25% off on premium cuts. Use code FRESH25",
      time: "1 hour ago",
      read: false,
      icon: Gift
    },
    {
      id: 3,
      type: "delivery",
      title: "Delivery Partner Assigned",
      message: "Ravi is on the way with your order. ETA: 15 minutes",
      time: "10 min ago",
      read: true,
      icon: Package
    }
  ]);

  const markAsRead = (id: number) => {
    setNotifications(prev => 
      prev.map(notif => 
        notif.id === id ? { ...notif, read: true } : notif
      )
    );
  };

  const markAllAsRead = () => {
    setNotifications(prev => 
      prev.map(notif => ({ ...notif, read: true }))
    );
    toast.success("All notifications marked as read");
  };

  const deleteNotification = (id: number) => {
    setNotifications(prev => prev.filter(notif => notif.id !== id));
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-md max-h-[80vh] overflow-hidden bg-gradient-to-br from-emerald-50 to-green-100 border-emerald-200 shadow-xl">
        <CardHeader className="flex flex-row items-center justify-between bg-gradient-to-r from-emerald-500 to-green-600 text-white border-b border-emerald-300">
          <div className="flex items-center space-x-2">
            <Bell className="w-5 h-5 text-white" />
            <CardTitle className="text-xl font-semibold">Notifications</CardTitle>
            {unreadCount > 0 && (
              <Badge className="bg-red-600 text-white border-red-700 animate-pulse">
                {unreadCount}
              </Badge>
            )}
          </div>
          <Button variant="ghost" onClick={onClose} className="text-white hover:bg-white/20 transition-all duration-300">
            <X className="w-5 h-5" />
          </Button>
        </CardHeader>
        
        <CardContent className="p-0 bg-gradient-to-br from-emerald-50 to-green-100">
          {unreadCount > 0 && (
            <div className="p-4 border-b border-emerald-200">
              <Button 
                variant="outline" 
                size="sm" 
                onClick={markAllAsRead}
                className="w-full border-emerald-300 text-emerald-700 hover:bg-emerald-100 transition-all duration-300"
              >
                <Check className="w-4 h-4 mr-2" />
                Mark All as Read
              </Button>
            </div>
          )}
          
          <div className="max-h-[50vh] overflow-y-auto">
            {notifications.length === 0 ? (
              <div className="p-6 text-center text-emerald-500">
                <Bell className="w-12 h-12 mx-auto mb-2 text-emerald-300" />
                <p>No notifications</p>
              </div>
            ) : (
              notifications.map((notification) => {
                const IconComponent = notification.icon;
                return (
                  <div
                    key={notification.id}
                    className={`p-4 border-b border-emerald-100 hover:bg-emerald-100 transition-all duration-300 ${
                      !notification.read ? 'bg-red-50 border-l-4 border-l-red-600' : 'bg-white/50'
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex items-start space-x-3 flex-1">
                        <div className={`p-2 rounded-full transition-all duration-300 ${
                          notification.type === 'order' ? 'bg-emerald-100 text-emerald-600' :
                          notification.type === 'promotion' ? 'bg-green-100 text-green-600' :
                          notification.type === 'alert' ? 'bg-red-100 text-red-600' :
                          'bg-emerald-100 text-emerald-600'
                        }`}>
                          <IconComponent className="w-4 h-4" />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-semibold text-sm text-emerald-900">{notification.title}</h4>
                          <p className="text-sm text-emerald-700 mt-1">{notification.message}</p>
                          <p className="text-xs text-emerald-500 mt-2">{notification.time}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-1">
                        {!notification.read && (
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => markAsRead(notification.id)}
                            className="text-emerald-600 hover:bg-emerald-100 transition-all duration-300"
                          >
                            <Check className="w-4 h-4" />
                          </Button>
                        )}
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => deleteNotification(notification.id)}
                          className="text-emerald-600 hover:bg-emerald-100 transition-all duration-300"
                        >
                          <X className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default NotificationCenter;
