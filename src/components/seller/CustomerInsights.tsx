
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Users, Star, Trophy, TrendingUp } from 'lucide-react';

interface CustomerInsightsProps {
  sellerType: 'Meat' | 'Livestock' | 'Both';
}

const CustomerInsights = ({ sellerType }: CustomerInsightsProps) => {
  // Mock customer data
  const topCustomers = [
    { name: 'Restaurant Prime', spent: 2450, orders: 12, type: 'meat', category: 'Business' },
    { name: 'Johnson Family Farm', spent: 3200, orders: 8, type: 'livestock', category: 'Farm' },
    { name: 'Smith Household', spent: 890, orders: 24, type: 'meat', category: 'Individual' },
    { name: 'Green Valley Ranch', spent: 1850, orders: 6, type: 'livestock', category: 'Ranch' }
  ];

  const productSpotlight = {
    meat: {
      name: 'Premium Ribeye Steak',
      image: '/placeholder.svg?height=200&width=300',
      sales: 45,
      revenue: 1350,
      margin: '35%'
    },
    livestock: {
      name: 'Holstein Dairy Cattle',
      image: '/placeholder.svg?height=200&width=300',
      inquiries: 12,
      sold: 3,
      avgPrice: 2500
    }
  };

  const filteredCustomers = topCustomers.filter(customer => {
    if (sellerType === 'Both') return true;
    if (sellerType === 'Meat') return customer.type === 'meat';
    if (sellerType === 'Livestock') return customer.type === 'livestock';
    return true;
  });

  const getSpotlight = () => {
    if (sellerType === 'Meat') return productSpotlight.meat;
    if (sellerType === 'Livestock') return productSpotlight.livestock;
    return productSpotlight.meat; // Default to meat for 'Both'
  };

  const spotlight = getSpotlight();

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
      {/* Top Customers */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Users className="w-5 h-5 mr-2" />
            Top Customers
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredCustomers.map((customer, index) => (
              <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                    {index === 0 && <Trophy className="w-4 h-4 text-yellow-600" />}
                    {index === 1 && <Star className="w-4 h-4 text-gray-600" />}
                    {index === 2 && <TrendingUp className="w-4 h-4 text-blue-600" />}
                    {index > 2 && <span className="text-sm font-medium">{index + 1}</span>}
                  </div>
                  <div>
                    <h4 className="font-semibold">{customer.name}</h4>
                    <p className="text-sm text-gray-600">{customer.orders} orders</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-semibold">${customer.spent.toLocaleString()}</p>
                  <Badge variant="outline" className="text-xs">
                    {customer.category}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Product Spotlight */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Trophy className="w-5 h-5 mr-2" />
            Product Spotlight
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="aspect-video bg-gray-200 rounded-lg overflow-hidden">
              <img 
                src={spotlight.image} 
                alt={spotlight.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <h3 className="font-semibold text-lg">{spotlight.name}</h3>
              <div className="grid grid-cols-2 gap-4 mt-3">
                {sellerType === 'Meat' || sellerType === 'Both' ? (
                  <>
                    <div>
                      <p className="text-sm text-gray-600">Units Sold</p>
                      <p className="font-semibold">{(spotlight as any).sales}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Revenue</p>
                      <p className="font-semibold">${(spotlight as any).revenue}</p>
                    </div>
                  </>
                ) : (
                  <>
                    <div>
                      <p className="text-sm text-gray-600">Inquiries</p>
                      <p className="font-semibold">{(spotlight as any).inquiries}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Sold</p>
                      <p className="font-semibold">{(spotlight as any).sold}</p>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CustomerInsights;
