
import { Button } from "@/components/ui/button";
import { Clock, Truck } from "lucide-react";

interface DeliveryOptionsProps {
  deliveryType: "express" | "scheduled";
  onDeliveryTypeChange: (type: "express" | "scheduled") => void;
}

const DeliveryOptions = ({ deliveryType, onDeliveryTypeChange }: DeliveryOptionsProps) => {
  return (
    <div className="space-y-2">
      <h3 className="font-semibold text-gray-800">Delivery Options</h3>
      <div className="grid grid-cols-2 gap-2">
        <Button
          variant={deliveryType === "express" ? "default" : "outline"}
          onClick={() => onDeliveryTypeChange("express")}
          className={`p-3 h-auto flex flex-col items-center ${
            deliveryType === "express" 
              ? "bg-red-600 hover:bg-red-700 text-white" 
              : "border-red-200 hover:bg-red-50"
          }`}
        >
          <Clock className="w-5 h-5 mb-1" />
          <span className="text-xs">Express</span>
          <span className="text-xs">30 min • ₹25</span>
        </Button>
        <Button
          variant={deliveryType === "scheduled" ? "default" : "outline"}
          onClick={() => onDeliveryTypeChange("scheduled")}
          className={`p-3 h-auto flex flex-col items-center ${
            deliveryType === "scheduled" 
              ? "bg-red-600 hover:bg-red-700 text-white" 
              : "border-red-200 hover:bg-red-50"
          }`}
        >
          <Truck className="w-5 h-5 mb-1" />
          <span className="text-xs">Scheduled</span>
          <span className="text-xs">2-4 hrs • Free</span>
        </Button>
      </div>
    </div>
  );
};

export default DeliveryOptions;
