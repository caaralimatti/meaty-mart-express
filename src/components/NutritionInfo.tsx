
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { X, Heart, Activity, Shield, Zap } from "lucide-react";

interface NutritionInfoProps {
  isOpen: boolean;
  onClose: () => void;
  productName: string;
}

const NutritionInfo = ({ isOpen, onClose, productName }: NutritionInfoProps) => {
  const nutritionData = {
    "Premium Goat Curry Cut": {
      calories: 143,
      protein: 27,
      fat: 3,
      carbs: 0,
      fiber: 0,
      sodium: 82,
      iron: 3.8,
      zinc: 4.5,
      vitaminB12: 2.6
    },
    "Boneless Goat Chunks": {
      calories: 150,
      protein: 28,
      fat: 3.5,
      carbs: 0,
      fiber: 0,
      sodium: 75,
      iron: 4.2,
      zinc: 5.1,
      vitaminB12: 2.8
    }
  };

  const healthBenefits = [
    { icon: Heart, title: "Heart Healthy", desc: "Low in saturated fat, good for cardiovascular health" },
    { icon: Activity, title: "High Protein", desc: "Complete protein source for muscle building" },
    { icon: Shield, title: "Rich in Iron", desc: "Prevents anemia and boosts immunity" },
    { icon: Zap, title: "Energy Boost", desc: "B-vitamins for sustained energy" }
  ];

  const currentNutrition = nutritionData[productName as keyof typeof nutritionData] || nutritionData["Premium Goat Curry Cut"];

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-md max-h-[90vh] overflow-hidden">
        <CardHeader className="flex flex-row items-center justify-between">
          <div className="flex items-center space-x-2">
            <Activity className="w-5 h-5 text-green-600" />
            <CardTitle className="text-xl text-green-700">Nutrition Info</CardTitle>
          </div>
          <Button variant="ghost" onClick={onClose}>
            <X className="w-5 h-5" />
          </Button>
        </CardHeader>
        
        <CardContent className="p-4 max-h-[70vh] overflow-y-auto">
          <Tabs defaultValue="nutrition" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="nutrition">Nutrition Facts</TabsTrigger>
              <TabsTrigger value="benefits">Health Benefits</TabsTrigger>
            </TabsList>
            
            <TabsContent value="nutrition" className="space-y-4">
              <div className="text-center mb-4">
                <h3 className="font-bold text-lg">{productName}</h3>
                <p className="text-sm text-gray-600">Per 100g serving</p>
              </div>

              <Card className="border-2 border-green-200">
                <CardContent className="p-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-green-600">{currentNutrition.calories}</div>
                      <div className="text-sm text-gray-600">Calories</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-blue-600">{currentNutrition.protein}g</div>
                      <div className="text-sm text-gray-600">Protein</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span>Total Fat</span>
                  <span className="font-semibold">{currentNutrition.fat}g</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Carbohydrates</span>
                  <span className="font-semibold">{currentNutrition.carbs}g</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Sodium</span>
                  <span className="font-semibold">{currentNutrition.sodium}mg</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Iron</span>
                  <span className="font-semibold">{currentNutrition.iron}mg</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Zinc</span>
                  <span className="font-semibold">{currentNutrition.zinc}mg</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Vitamin B12</span>
                  <span className="font-semibold">{currentNutrition.vitaminB12}μg</span>
                </div>
              </div>

              <div className="mt-4 p-3 bg-green-50 rounded-lg">
                <div className="flex items-center space-x-2">
                  <Badge className="bg-green-600">Halal Certified</Badge>
                  <Badge className="bg-blue-600">Farm Fresh</Badge>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="benefits" className="space-y-4">
              {healthBenefits.map((benefit, index) => {
                const IconComponent = benefit.icon;
                return (
                  <Card key={index} className="border-green-200">
                    <CardContent className="p-4">
                      <div className="flex items-start space-x-3">
                        <IconComponent className="w-6 h-6 text-green-600 mt-1" />
                        <div>
                          <h4 className="font-semibold text-green-700">{benefit.title}</h4>
                          <p className="text-sm text-gray-600 mt-1">{benefit.desc}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}

              <Card className="border-orange-200 bg-orange-50">
                <CardContent className="p-4">
                  <h4 className="font-semibold text-orange-700 mb-2">Cooking Tips</h4>
                  <ul className="text-sm space-y-1 text-gray-700">
                    <li>• Marinate for 2-4 hours for best flavor</li>
                    <li>• Cook on medium heat to retain nutrients</li>
                    <li>• Don't overcook to preserve protein quality</li>
                    <li>• Pair with iron-rich vegetables</li>
                  </ul>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default NutritionInfo;
