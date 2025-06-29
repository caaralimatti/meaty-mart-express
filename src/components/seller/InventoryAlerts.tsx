
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { AlertTriangle, TrendingUp, DollarSign } from 'lucide-react';

interface InventoryAlertsProps {
  sellerType: 'Meat' | 'Livestock' | 'Both';
}

const InventoryAlerts = ({ sellerType }: InventoryAlertsProps) => {
  // Mock alerts based on seller type
  const meatAlerts = [
    {
      type: 'low_stock',
      item: 'Organic Chicken Breast',
      current: '15 lbs',
      threshold: '20 lbs',
      severity: 'high'
    },
    {
      type: 'price_change',
      item: 'Sirloin Steak',
      message: 'Supplier cost increased by 5%',
      recommendation: 'Consider updating price to $18/lb',
      severity: 'medium'
    }
  ];

  const livestockAlerts = [
    {
      type: 'low_stock',
      item: 'Holstein Cattle',
      current: '2 available',
      threshold: '5 available',
      severity: 'medium'
    },
    {
      type: 'price_intelligence',
      item: 'Premium Goats',
      message: 'Market price increased by 8% this week',
      recommendation: 'Good time to list available stock',
      severity: 'low'
    }
  ];

  const getAlertsForType = () => {
    if (sellerType === 'Meat') return meatAlerts;
    if (sellerType === 'Livestock') return livestockAlerts;
    return [...meatAlerts, ...livestockAlerts];
  };

  const alerts = getAlertsForType();

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'high': return 'bg-red-100 text-red-800 border-red-200';
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'low': return 'bg-blue-100 text-blue-800 border-blue-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getIcon = (type: string) => {
    switch (type) {
      case 'low_stock': return <AlertTriangle className="w-5 h-5 text-orange-600" />;
      case 'price_change': return <DollarSign className="w-5 h-5 text-red-600" />;
      case 'price_intelligence': return <TrendingUp className="w-5 h-5 text-green-600" />;
      default: return <AlertTriangle className="w-5 h-5 text-gray-600" />;
    }
  };

  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle className="flex items-center">
          <AlertTriangle className="w-5 h-5 mr-2" />
          Inventory & Pricing Intelligence
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {alerts.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              <AlertTriangle className="w-12 h-12 mx-auto mb-4 text-gray-300" />
              <p>No alerts at the moment</p>
              <p className="text-sm">All inventory levels and pricing look good!</p>
            </div>
          ) : (
            alerts.map((alert, index) => (
              <div key={index} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center">
                    {getIcon(alert.type)}
                    <h4 className="font-semibold ml-2">{alert.item}</h4>
                  </div>
                  <Badge className={getSeverityColor(alert.severity)}>
                    {alert.severity.toUpperCase()}
                  </Badge>
                </div>
                
                {alert.type === 'low_stock' && (
                  <div className="mb-3">
                    <p className="text-sm text-gray-600">
                      Current stock: <strong>{alert.current}</strong> (below threshold of {alert.threshold})
                    </p>
                    <div className="mt-2 flex gap-2">
                      <Button size="sm" variant="outline">
                        View Suppliers
                      </Button>
                      <Button size="sm">
                        Reorder Now
                      </Button>
                    </div>
                  </div>
                )}
                
                {(alert.type === 'price_change' || alert.type === 'price_intelligence') && (
                  <div className="mb-3">
                    <p className="text-sm text-gray-600 mb-2">{alert.message}</p>
                    <p className="text-sm font-medium text-gray-800">{alert.recommendation}</p>
                    <div className="mt-2 flex gap-2">
                      <Button size="sm" variant="outline">
                        View Details
                      </Button>
                      <Button size="sm">
                        Update Price
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default InventoryAlerts;
