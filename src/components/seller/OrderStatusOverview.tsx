
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle, Clock, XCircle } from 'lucide-react';

interface OrderStatusOverviewProps {
  sellerType: 'Meat' | 'Livestock' | 'Both';
}

const OrderStatusOverview = ({ sellerType }: OrderStatusOverviewProps) => {
  // Mock data - in real app, this would be fetched based on seller type
  const statusData = {
    completed: 24,
    pending: 8,
    cancelled: 2
  };

  const total = statusData.completed + statusData.pending + statusData.cancelled;

  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle>Order Status Overview</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-3 gap-4">
          <div className="text-center">
            <div className="flex items-center justify-center mb-2">
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
            <div className="text-2xl font-bold text-green-600">{statusData.completed}</div>
            <div className="text-sm text-gray-600">Completed</div>
            <div className="text-xs text-gray-500 mt-1">
              {total > 0 ? Math.round((statusData.completed / total) * 100) : 0}%
            </div>
          </div>
          
          <div className="text-center">
            <div className="flex items-center justify-center mb-2">
              <Clock className="w-8 h-8 text-yellow-600" />
            </div>
            <div className="text-2xl font-bold text-yellow-600">{statusData.pending}</div>
            <div className="text-sm text-gray-600">Pending</div>
            <div className="text-xs text-gray-500 mt-1">
              {total > 0 ? Math.round((statusData.pending / total) * 100) : 0}%
            </div>
          </div>
          
          <div className="text-center">
            <div className="flex items-center justify-center mb-2">
              <XCircle className="w-8 h-8 text-red-600" />
            </div>
            <div className="text-2xl font-bold text-red-600">{statusData.cancelled}</div>
            <div className="text-sm text-gray-600">Cancelled</div>
            <div className="text-xs text-gray-500 mt-1">
              {total > 0 ? Math.round((statusData.cancelled / total) * 100) : 0}%
            </div>
          </div>
        </div>
        
        {/* Simple progress bar */}
        <div className="mt-6">
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-green-600 h-2 rounded-l-full" 
              style={{ width: `${total > 0 ? (statusData.completed / total) * 100 : 0}%` }}
            ></div>
          </div>
          <div className="flex justify-between text-xs text-gray-500 mt-1">
            <span>Today's Orders</span>
            <span>{total} Total</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default OrderStatusOverview;
