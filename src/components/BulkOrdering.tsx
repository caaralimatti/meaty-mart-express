
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { X, Users, Calculator, Clock, Phone } from "lucide-react";
import { toast } from "sonner";

interface BulkOrderingProps {
  isOpen: boolean;
  onClose: () => void;
}

const BulkOrdering = ({ isOpen, onClose }: BulkOrderingProps) => {
  const [orderType, setOrderType] = useState("");
  const [quantity, setQuantity] = useState("");
  const [eventDate, setEventDate] = useState("");
  const [guestCount, setGuestCount] = useState("");
  const [specialRequests, setSpecialRequests] = useState("");
  const [contactInfo, setContactInfo] = useState("");

  const bulkPackages = [
    {
      name: "Wedding Package",
      description: "Complete goat meat selection for 100-500 guests",
      minOrder: "25kg",
      discount: "15%",
      includes: ["Curry cuts", "Biryani cuts", "Marinated pieces", "Free chef consultation"]
    },
    {
      name: "Restaurant Package",
      description: "Weekly/Monthly supply for restaurants",
      minOrder: "50kg",
      discount: "20%",
      includes: ["Mixed cuts", "Custom portions", "Scheduled delivery", "Quality guarantee"]
    },
    {
      name: "Event Catering",
      description: "Corporate events, parties, celebrations",
      minOrder: "15kg",
      discount: "12%",
      includes: ["Event-specific cuts", "Timed delivery", "Setup assistance", "Serving utensils"]
    }
  ];

  const calculateEstimate = () => {
    if (!quantity || !orderType) {
      toast.error("Please select package and enter quantity");
      return;
    }
    
    const basePrice = 600; // per kg
    const qty = parseInt(quantity);
    const discount = orderType === "Restaurant Package" ? 0.20 : orderType === "Wedding Package" ? 0.15 : 0.12;
    const total = qty * basePrice * (1 - discount);
    
    toast.success(`Estimated cost: ₹${total.toLocaleString()} (${Math.round(discount * 100)}% discount applied)`);
  };

  const submitBulkOrder = () => {
    if (!orderType || !quantity || !eventDate || !contactInfo) {
      toast.error("Please fill in all required fields");
      return;
    }
    
    toast.success("Bulk order request submitted! Our team will contact you within 2 hours.");
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-lg max-h-[90vh] overflow-hidden">
        <CardHeader className="flex flex-row items-center justify-between">
          <div className="flex items-center space-x-2">
            <Users className="w-5 h-5 text-blue-600" />
            <CardTitle className="text-xl text-blue-700">Bulk Ordering</CardTitle>
          </div>
          <Button variant="ghost" onClick={onClose}>
            <X className="w-5 h-5" />
          </Button>
        </CardHeader>
        
        <CardContent className="p-4 max-h-[70vh] overflow-y-auto space-y-6">
          {/* Package Selection */}
          <div>
            <Label className="text-base font-semibold">Select Package Type</Label>
            <div className="grid gap-3 mt-2">
              {bulkPackages.map((pkg, index) => (
                <Card 
                  key={index} 
                  className={`cursor-pointer transition-all ${orderType === pkg.name ? 'border-blue-500 bg-blue-50' : 'border-gray-200'}`}
                  onClick={() => setOrderType(pkg.name)}
                >
                  <CardContent className="p-3">
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="font-semibold">{pkg.name}</h4>
                      <Badge className="bg-green-600">{pkg.discount} OFF</Badge>
                    </div>
                    <p className="text-sm text-gray-600 mb-2">{pkg.description}</p>
                    <p className="text-xs text-blue-600">Min order: {pkg.minOrder}</p>
                    <div className="flex flex-wrap gap-1 mt-2">
                      {pkg.includes.map((item, idx) => (
                        <Badge key={idx} variant="secondary" className="text-xs">{item}</Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Order Details */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="quantity">Quantity (kg) *</Label>
              <Input
                id="quantity"
                type="number"
                placeholder="e.g., 25"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="guests">Guest Count</Label>
              <Input
                id="guests"
                type="number"
                placeholder="e.g., 150"
                value={guestCount}
                onChange={(e) => setGuestCount(e.target.value)}
              />
            </div>
          </div>

          <div>
            <Label htmlFor="eventDate">Event/Delivery Date *</Label>
            <Input
              id="eventDate"
              type="date"
              value={eventDate}
              onChange={(e) => setEventDate(e.target.value)}
              min={new Date().toISOString().split('T')[0]}
            />
          </div>

          <div>
            <Label htmlFor="contact">Contact Information *</Label>
            <Input
              id="contact"
              placeholder="Phone number or email"
              value={contactInfo}
              onChange={(e) => setContactInfo(e.target.value)}
            />
          </div>

          <div>
            <Label htmlFor="requests">Special Requests</Label>
            <Textarea
              id="requests"
              placeholder="Specific cuts, marination preferences, delivery instructions..."
              value={specialRequests}
              onChange={(e) => setSpecialRequests(e.target.value)}
              rows={3}
            />
          </div>

          {/* Price Calculator */}
          <Card className="border-green-200 bg-green-50">
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-semibold flex items-center">
                  <Calculator className="w-4 h-4 mr-2" />
                  Price Estimate
                </h4>
                <Button variant="outline" size="sm" onClick={calculateEstimate}>
                  Calculate
                </Button>
              </div>
              <div className="space-y-1 text-sm">
                <div className="flex justify-between">
                  <span>Base price:</span>
                  <span>₹600/kg</span>
                </div>
                <div className="flex justify-between text-green-600">
                  <span>Bulk discount:</span>
                  <span>Up to 20% OFF</span>
                </div>
                <div className="flex justify-between text-blue-600">
                  <span>Free delivery:</span>
                  <span>Orders above ₹10,000</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Contact Information */}
          <Card className="border-orange-200 bg-orange-50">
            <CardContent className="p-4">
              <div className="flex items-center space-x-2 mb-2">
                <Phone className="w-4 h-4 text-orange-600" />
                <h4 className="font-semibold text-orange-700">Need Help?</h4>
              </div>
              <p className="text-sm text-gray-600">
                Call our bulk order specialist: <strong>1800-BULK-GOAT</strong>
              </p>
              <p className="text-xs text-gray-500 mt-1">
                Available 24/7 for consultation and custom requirements
              </p>
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <div className="flex space-x-2">
            <Button variant="outline" onClick={onClose} className="flex-1">
              Cancel
            </Button>
            <Button onClick={submitBulkOrder} className="flex-1 bg-blue-600 hover:bg-blue-700">
              Submit Request
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default BulkOrdering;
