
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Clock, User, Package } from 'lucide-react';

interface LiveOrdersProps {
  sellerType: 'Meat' | 'Livestock' | 'Both';
}

interface Order {
  id: string;
  customerName: string;
  items: string[];
  status: 'Received' | 'Processing' | 'Ready' | 'Completed';
  timeActive: string;
  total: number;
  type: 'meat' | 'livestock';
}

const LiveOrders = ({ sellerType }: LiveOrdersProps) => {
  // Mock data - filter based on seller type
  const allOrders: Order[] = [
    {
      id: 'ORD-001',
      customerName: 'John Smith',
      items: ['2 lbs Ribeye Steak', '1 whole chicken'],
      status: 'Processing',
      timeActive: '15 min',
      total: 65.50,
      type: 'meat'
    },
    {
      id: 'ORD-002',
      customerName: 'Sarah Johnson',
      items: ['1 Premium Cattle (Holstein)', 'Vaccination cert'],
      status: 'Received',
      timeActive: '5 min',
      total: 2500.00,
      type: 'livestock'
    },
    {
      id: 'ORD-003',
      customerName: 'Mike Davis',
      items: ['3 lbs Ground Beef', '2 lbs Pork Chops'],
      status: 'Ready',
      timeActive: '45 min',
      total: 48.75,
      type: 'meat'
    }
  ];

  const filteredOrders = allOrders.filter(order => {
    if (sellerType === 'Both') return true;
    if (sellerType === 'Meat') return order.type === 'meat';
    if (sellerType === 'Livestock') return order.type === 'livestock';
    return true;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Received': return 'bg-blue-100 text-blue-800';
      case 'Processing': return 'bg-yellow-100 text-yellow-800';
      case 'Ready': return 'bg-green-100 text-green-800';
      case 'Completed': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle className="flex items-center">
          <Package className="w-5 h-5 mr-2" />
          Live Orders in Progress
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {filteredOrders.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              <Package className="w-12 h-12 mx-auto mb-4 text-gray-300" />
              <p>No active orders at the moment</p>
              <p className="text-sm">New orders will appear here in real-time</p>
            </div>
          ) : (
            filteredOrders.map((order) => (
              <div key={order.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h4 className="font-semibold text-lg">{order.id}</h4>
                    <div className="flex items-center text-sm text-gray-600 mt-1">
                      <User className="w-4 h-4 mr-1" />
                      {order.customerName}
                    </div>
                  </div>
                  <div className="text-right">
                    <Badge className={getStatusColor(order.status)}>
                      {order.status}
                    </Badge>
                    <div className="flex items-center text-sm text-gray-500 mt-2">
                      <Clock className="w-4 h-4 mr-1" />
                      {order.timeActive}
                    </div>
                  </div>
                </div>
                <div className="mb-3">
                  <h5 className="text-sm font-medium text-gray-700 mb-1">Items:</h5>
                  <ul className="text-sm text-gray-600 space-y-1">
                    {order.items.map((item, index) => (
                      <li key={index} className="flex items-center">
                        <span className="w-2 h-2 bg-gray-300 rounded-full mr-2"></span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="flex justify-between items-center">
                  <span className="font-semibold text-lg">${order.total.toFixed(2)}</span>
                  <Badge variant="outline" className="text-xs">
                    {order.type === 'meat' ? '🥩 Meat' : '🐄 Livestock'}
                  </Badge>
                </div>
              </div>
            ))
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default LiveOrders;
