
import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { X, TrendingUp, AlertTriangle, Trophy } from 'lucide-react';
import { SellerProfile } from '@/hooks/useSellerData';

interface LovablePromptProps {
  sellerProfile: SellerProfile;
}

interface PromptData {
  type: 'success' | 'warning' | 'info';
  icon: React.ReactNode;
  greeting: string;
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
    const greeting = hour < 12 ? 'Good Morning!' : hour < 17 ? 'Good Afternoon!' : 'Good Evening!';
    
    // Different prompts based on seller type
    if (sellerProfile.seller_type === 'Meat' || sellerProfile.seller_type === 'Both') {
      return {
        type: 'success',
        icon: <TrendingUp className="w-5 h-5 text-green-600" />,
        greeting: `${greeting} ☀️`,
        insight: "Your Ribeye Steak sales have increased by 25% this week compared to last!",
        suggestion: "Would you like to check your current inventory and consider a special offer to keep the momentum going?",
        actions: [
          { label: "View Inventory", action: () => console.log('Navigate to inventory') },
          { label: "Create Offer", action: () => console.log('Create special offer'), variant: 'outline' }
        ]
      };
    }
    
    if (sellerProfile.seller_type === 'Livestock') {
      return {
        type: 'info',
        icon: <Trophy className="w-5 h-5 text-blue-600" />,
        greeting: `${greeting} 🎉`,
        insight: "You've just received 3 new inquiries for your premium cattle listings!",
        suggestion: "These buyers are looking for livestock in your area. Should we prioritize these leads?",
        actions: [
          { label: "View Inquiries", action: () => console.log('Navigate to inquiries') },
          { label: "Contact Buyers", action: () => console.log('Contact buyers'), variant: 'outline' }
        ]
      };
    }

    // Default prompt for 'Both' type
    return {
      type: 'warning',
      icon: <AlertTriangle className="w-5 h-5 text-orange-600" />,
      greeting: "Heads up!",
      insight: "Your inventory needs attention - some items are running low while others are performing exceptionally well.",
      suggestion: "Would you like to review your stock levels and sales performance?",
      actions: [
        { label: "Check Inventory", action: () => console.log('Navigate to inventory') },
        { label: "View Analytics", action: () => console.log('View analytics'), variant: 'outline' }
      ]
    };
  };

  const prompt = generatePrompt();

  return (
    <Card className="mb-6 border-l-4 border-l-blue-500 shadow-md">
      <CardContent className="p-4">
        <div className="flex items-start justify-between">
          <div className="flex items-start space-x-3 flex-1">
            <div className="mt-1">{prompt.icon}</div>
            <div className="flex-1">
              <h3 className="font-semibold text-lg text-gray-800 mb-2">{prompt.greeting}</h3>
              <p className="text-gray-700 mb-2">{prompt.insight}</p>
              <p className="text-gray-600 text-sm mb-4">{prompt.suggestion}</p>
              <div className="flex flex-wrap gap-2">
                {prompt.actions.map((action, index) => (
                  <Button
                    key={index}
                    size="sm"
                    variant={action.variant || 'default'}
                    onClick={action.action}
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
            className="text-gray-400 hover:text-gray-600"
          >
            <X className="w-4 h-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default LovablePrompt;
