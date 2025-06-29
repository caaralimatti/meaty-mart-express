
import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { X, TrendingUp, AlertTriangle, Trophy, Lightbulb, BarChart3, Users } from 'lucide-react';
import { SellerProfile } from '@/hooks/useSellerData';

interface LovablePromptProps {
  sellerProfile: SellerProfile;
}

interface PromptData {
  type: 'success' | 'warning' | 'info' | 'opportunity';
  icon: React.ReactNode;
  headline: string;
  insight: string;
  suggestion: string;
  actions: Array<{
    label: string;
    action: () => void;
    variant?: 'default' | 'outline';
  }>;
}

const LovablePrompt = ({ sellerProfile }: LovablePromptProps) => {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  // Generate dynamic prompt based on seller type and mock data
  const generatePrompt = (): PromptData => {
    const hour = new Date().getHours();
    const scenarios = [];
    
    // Different prompts based on seller type
    if (sellerProfile.seller_type === 'Meat' || sellerProfile.seller_type === 'Both') {
      scenarios.push(
        {
          type: 'success' as const,
          icon: <TrendingUp className="w-5 h-5 text-orange-400" />,
          headline: "Your Meat Products are Performing Great! 📈",
          insight: "Your Ribeye Steak sales have increased by 25% this week compared to last, with most orders coming from repeat customers.",
          suggestion: "This is excellent momentum! Would you like to check your current inventory and consider a special offer to keep this trend going?",
          actions: [
            { label: "View Inventory", action: () => console.log('Navigate to inventory') },
            { label: "Create Special Offer", action: () => console.log('Create special offer'), variant: 'outline' as const }
          ]
        },
        {
          type: 'opportunity' as const,
          icon: <Lightbulb className="w-5 h-5 text-orange-400" />,
          headline: "Cross-Selling Opportunity Alert! 💡",
          insight: "Customers who bought Ground Beef this month also frequently purchased Burger Buns & Cheddar Cheese in the same order.",
          suggestion: "You could create a 'Burger Night Bundle' to increase the average order value by 20-30%. Shall we create a new promotion?",
          actions: [
            { label: "Create Bundle", action: () => console.log('Create bundle promotion') },
            { label: "View Customer Data", action: () => console.log('View customer analytics'), variant: 'outline' as const }
          ]
        }
      );
    }
    
    if (sellerProfile.seller_type === 'Livestock' || sellerProfile.seller_type === 'Both') {
      scenarios.push(
        {
          type: 'info' as const,
          icon: <BarChart3 className="w-5 h-5 text-orange-400" />,
          headline: "Your Livestock is Getting Noticed! 🐄",
          insight: "Your listing for the 'Angus Bull' has received 75 views in the last 24 hours, which is 40% more than your average listing. The clicks are coming mostly from the northern region.",
          suggestion: "This is great visibility! Would you like to 'Boost' this listing to reach an even wider audience?",
          actions: [
            { label: "Boost Listing", action: () => console.log('Boost livestock listing') },
            { label: "View Analytics", action: () => console.log('View listing analytics'), variant: 'outline' as const }
          ]
        },
        {
          type: 'opportunity' as const,
          icon: <Users className="w-5 h-5 text-orange-400" />,
          headline: "A Customer Misses You! 👋",
          insight: "'Rohan Sharma,' one of your top customers, hasn't placed an order in over 30 days. His last order was for 'Premium Holstein Cow.'",
          suggestion: "How about sending him a friendly notification with a 10% off coupon for his next purchase?",
          actions: [
            { label: "Send Offer", action: () => console.log('Send customer offer') },
            { label: "View Customer Profile", action: () => console.log('View customer details'), variant: 'outline' as const }
          ]
        }
      );
    }

    // Default warning scenario
    scenarios.push({
      type: 'warning' as const,
      icon: <AlertTriangle className="w-5 h-5 text-orange-400" />,
      headline: "Inventory Attention Needed! ⚠️",
      insight: "Your inventory needs attention - some items are running low while others are performing exceptionally well.",
      suggestion: "Would you like to review your stock levels and sales performance to optimize your inventory?",
      actions: [
        { label: "Check Inventory", action: () => console.log('Navigate to inventory') },
        { label: "View Performance Report", action: () => console.log('View analytics'), variant: 'outline' as const }
      ]
    });

    // Return a random scenario from available ones
    return scenarios[Math.floor(Math.random() * scenarios.length)];
  };

  const prompt = generatePrompt();

  const getBorderColor = (type: string) => {
    switch (type) {
      case 'success': return 'border-l-green-500';
      case 'warning': return 'border-l-orange-500';
      case 'info': return 'border-l-blue-500';
      case 'opportunity': return 'border-l-orange-400';
      default: return 'border-l-orange-500';
    }
  };

  return (
    <Card className={`mb-6 border-l-4 ${getBorderColor(prompt.type)} shadow-lg bg-gradient-to-r from-gray-900 to-gray-800 text-white`}>
      <CardContent className="p-6">
        <div className="flex items-start justify-between">
          <div className="flex items-start space-x-4 flex-1">
            <div className="mt-1 p-2 bg-orange-500/20 rounded-full">
              {prompt.icon}
            </div>
            <div className="flex-1">
              <h3 className="font-bold text-xl text-white mb-3">{prompt.headline}</h3>
              <p className="text-gray-200 mb-3 leading-relaxed">{prompt.insight}</p>
              <p className="text-gray-300 text-sm mb-4 leading-relaxed">{prompt.suggestion}</p>
              <div className="flex flex-wrap gap-3">
                {prompt.actions.map((action, index) => (
                  <Button
                    key={index}
                    size="sm"
                    variant={action.variant || 'default'}
                    onClick={action.action}
                    className={
                      action.variant === 'outline' 
                        ? "border-orange-500 text-orange-400 hover:bg-orange-500/10" 
                        : "bg-orange-500 hover:bg-orange-600 text-white"
                    }
                  >
                    {action.label}
                  </Button>
                ))}
              </div>
            </div>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsVisible(false)}
            className="text-gray-400 hover:text-white hover:bg-gray-700"
          >
            <X className="w-4 h-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default LovablePrompt;
