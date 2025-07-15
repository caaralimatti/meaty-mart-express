
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
      <Card className="w-full max-w-md max-h-[90vh] overflow-hidden bg-gradient-to-br from-emerald-50 to-green-100 border-emerald-200 shadow-xl">
        <CardHeader className="flex flex-row items-center justify-between bg-gradient-to-r from-emerald-500 to-green-600 text-white border-b border-emerald-300">
          <div className="flex items-center space-x-2">
            <Activity className="w-5 h-5 text-white" />
            <CardTitle className="text-xl font-semibold">Nutrition Info</CardTitle>
          </div>
          <Button variant="ghost" onClick={onClose} className="text-white hover:bg-white/20 transition-all duration-300">
            <X className="w-5 h-5" />
          </Button>
        </CardHeader>
        
        <CardContent className="p-4 max-h-[70vh] overflow-y-auto bg-gradient-to-br from-emerald-50 to-green-100">
          <Tabs defaultValue="nutrition" className="w-full">
            <TabsList className="grid w-full grid-cols-2 bg-emerald-100 border border-emerald-200">
              <TabsTrigger value="nutrition" className="data-[state=active]:bg-emerald-600 data-[state=active]:text-white transition-all duration-300">Nutrition Facts</TabsTrigger>
              <TabsTrigger value="benefits" className="data-[state=active]:bg-emerald-600 data-[state=active]:text-white transition-all duration-300">Health Benefits</TabsTrigger>
            </TabsList>
            
            <TabsContent value="nutrition" className="space-y-4">
              <div className="text-center mb-4">
                <h3 className="font-bold text-lg text-emerald-900">{productName}</h3>
                <p className="text-sm text-emerald-600">Per 100g serving</p>
              </div>

              <Card className="border-2 border-emerald-200 bg-gradient-to-br from-white to-emerald-50">
                <CardContent className="p-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-emerald-700">{currentNutrition.calories}</div>
                      <div className="text-sm text-emerald-600">Calories</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-emerald-700">{currentNutrition.protein}g</div>
                      <div className="text-sm text-emerald-600">Protein</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <div className="space-y-3">
                <div className="flex justify-between items-center text-emerald-800">
                  <span>Total Fat</span>
                  <span className="font-semibold">{currentNutrition.fat}g</span>
                </div>
                <div className="flex justify-between items-center text-emerald-800">
                  <span>Carbohydrates</span>
                  <span className="font-semibold">{currentNutrition.carbs}g</span>
                </div>
                <div className="flex justify-between items-center text-emerald-800">
                  <span>Sodium</span>
                  <span className="font-semibold">{currentNutrition.sodium}mg</span>
                </div>
                <div className="flex justify-between items-center text-emerald-800">
                  <span>Iron</span>
                  <span className="font-semibold">{currentNutrition.iron}mg</span>
                </div>
                <div className="flex justify-between items-center text-emerald-800">
                  <span>Zinc</span>
                  <span className="font-semibold">{currentNutrition.zinc}mg</span>
                </div>
                <div className="flex justify-between items-center text-emerald-800">
                  <span>Vitamin B12</span>
                  <span className="font-semibold">{currentNutrition.vitaminB12}μg</span>
                </div>
              </div>

              <div className="mt-4 p-3 bg-gradient-to-r from-emerald-100 to-green-100 rounded-lg border border-emerald-200">
                <div className="flex items-center space-x-2">
                  <Badge className="bg-emerald-600 text-white border-emerald-700">Halal Certified</Badge>
                  <Badge className="bg-emerald-100 text-emerald-700 border-emerald-200">Farm Fresh</Badge>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="benefits" className="space-y-4">
              {healthBenefits.map((benefit, index) => {
                const IconComponent = benefit.icon;
                return (
                  <Card key={index} className="border-emerald-200 hover:border-emerald-400 transition-all duration-300 bg-gradient-to-br from-white to-emerald-50">
                    <CardContent className="p-4">
                      <div className="flex items-start space-x-3">
                        <IconComponent className="w-6 h-6 text-emerald-600 mt-1" />
                        <div>
                          <h4 className="font-semibold text-emerald-800">{benefit.title}</h4>
                          <p className="text-sm text-emerald-600 mt-1">{benefit.desc}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}

              <Card className="border-emerald-300 bg-gradient-to-r from-emerald-100 to-green-100">
                <CardContent className="p-4">
                  <h4 className="font-semibold text-emerald-800 mb-2">Cooking Tips</h4>
                  <ul className="text-sm space-y-1 text-emerald-700">
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
