
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, X, Check } from "lucide-react";
import { toast } from "sonner";

interface TimeSlot {
  id: string;
  time: string;
  available: boolean;
  price: number;
}

interface DeliverySchedulerProps {
  isOpen: boolean;
  onClose: () => void;
  onSchedule: (date: string, time: string) => void;
}

const DeliveryScheduler = ({ isOpen, onClose, onSchedule }: DeliverySchedulerProps) => {
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");

  const today = new Date();
  const dates = Array.from({ length: 7 }, (_, i) => {
    const date = new Date(today);
    date.setDate(today.getDate() + i);
    return {
      value: date.toISOString().split('T')[0],
      label: i === 0 ? 'Today' : i === 1 ? 'Tomorrow' : date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })
    };
  });

  const timeSlots: TimeSlot[] = [
    { id: '1', time: '8:00 AM - 10:00 AM', available: true, price: 0 },
    { id: '2', time: '10:00 AM - 12:00 PM', available: true, price: 0 },
    { id: '3', time: '12:00 PM - 2:00 PM', available: false, price: 0 },
    { id: '4', time: '2:00 PM - 4:00 PM', available: true, price: 0 },
    { id: '5', time: '4:00 PM - 6:00 PM', available: true, price: 0 },
    { id: '6', time: '6:00 PM - 8:00 PM', available: true, price: 20 },
    { id: '7', time: '8:00 PM - 10:00 PM', available: true, price: 30 },
  ];

  const handleSchedule = () => {
    if (!selectedDate || !selectedTime) {
      toast.error("Please select both date and time slot");
      return;
    }

    const selectedSlot = timeSlots.find(slot => slot.id === selectedTime);
    onSchedule(selectedDate, selectedSlot?.time || "");
    toast.success("Delivery scheduled successfully!");
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-md max-h-[90vh] overflow-hidden">
        <CardHeader className="flex flex-row items-center justify-between">
          <div className="flex items-center space-x-2">
            <Calendar className="w-5 h-5 text-red-600" />
            <CardTitle className="text-xl text-red-700">Schedule Delivery</CardTitle>
          </div>
          <Button variant="ghost" onClick={onClose}>
            <X className="w-5 h-5" />
          </Button>
        </CardHeader>
        
        <CardContent className="p-4 space-y-6">
          {/* Date Selection */}
          <div>
            <h3 className="font-semibold mb-3">Select Date</h3>
            <div className="grid grid-cols-2 gap-2">
              {dates.map((date) => (
                <Button
                  key={date.value}
                  variant={selectedDate === date.value ? "default" : "outline"}
                  onClick={() => setSelectedDate(date.value)}
                  className={`text-sm ${
                    selectedDate === date.value 
                      ? 'bg-red-600 hover:bg-red-700' 
                      : 'border-red-200 text-red-700 hover:bg-red-50'
                  }`}
                >
                  {date.label}
                </Button>
              ))}
            </div>
          </div>

          {/* Time Slot Selection */}
          {selectedDate && (
            <div>
              <h3 className="font-semibold mb-3">Select Time Slot</h3>
              <div className="space-y-2">
                {timeSlots.map((slot) => (
                  <Button
                    key={slot.id}
                    variant={selectedTime === slot.id ? "default" : "outline"}
                    onClick={() => slot.available && setSelectedTime(slot.id)}
                    disabled={!slot.available}
                    className={`w-full justify-between ${
                      selectedTime === slot.id 
                        ? 'bg-red-600 hover:bg-red-700' 
                        : slot.available 
                          ? 'border-red-200 text-red-700 hover:bg-red-50'
                          : 'opacity-50 cursor-not-allowed'
                    }`}
                  >
                    <span>{slot.time}</span>
                    <div className="flex items-center space-x-2">
                      {slot.price > 0 && (
                        <Badge variant="secondary">+₹{slot.price}</Badge>
                      )}
                      {!slot.available && (
                        <Badge variant="destructive">Full</Badge>
                      )}
                    </div>
                  </Button>
                ))}
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex space-x-2">
            <Button variant="outline" onClick={onClose} className="flex-1">
              Cancel
            </Button>
            <Button 
              onClick={handleSchedule} 
              disabled={!selectedDate || !selectedTime}
              className="flex-1 bg-red-600 hover:bg-red-700"
            >
              <Check className="w-4 h-4 mr-2" />
              Schedule
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DeliveryScheduler;
