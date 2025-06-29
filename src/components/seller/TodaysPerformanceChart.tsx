
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface TodaysPerformanceChartProps {
  sellerType: 'Meat' | 'Livestock' | 'Both';
}

const TodaysPerformanceChart = ({ sellerType }: TodaysPerformanceChartProps) => {
  // Mock hourly data for today
  const performanceData = [
    { hour: '9 AM', revenue: 150, orders: 3 },
    { hour: '10 AM', revenue: 280, orders: 5 },
    { hour: '11 AM', revenue: 420, orders: 8 },
    { hour: '12 PM', revenue: 650, orders: 12 },
    { hour: '1 PM', revenue: 580, orders: 10 },
    { hour: '2 PM', revenue: 720, orders: 14 },
    { hour: '3 PM', revenue: 480, orders: 9 },
    { hour: '4 PM', revenue: 620, orders: 11 },
    { hour: '5 PM', revenue: 890, orders: 16 },
    { hour: '6 PM', revenue: 1200, orders: 22 },
    { hour: '7 PM', revenue: 750, orders: 13 }
  ];

  const totalRevenue = performanceData.reduce((sum, data) => sum + data.revenue, 0);
  const totalOrders = performanceData.reduce((sum, data) => sum + data.orders, 0);

  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle>Today's Performance</CardTitle>
        <div className="flex gap-4 text-sm text-gray-600">
          <span>Total Revenue: <strong>${totalRevenue.toLocaleString()}</strong></span>
          <span>Total Orders: <strong>{totalOrders}</strong></span>
        </div>
      </CardHeader>
      <CardContent>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={performanceData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="hour" />
              <YAxis />
              <Tooltip 
                formatter={(value, name) => [
                  name === 'revenue' ? `$${value}` : value,
                  name === 'revenue' ? 'Revenue' : 'Orders'
                ]}
              />
              <Line 
                type="monotone" 
                dataKey="revenue" 
                stroke="#dc2626" 
                strokeWidth={2}
                name="revenue"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
        <div className="mt-4 text-sm text-gray-600">
          <p>Peak hours: 6 PM - 7 PM with highest revenue and order count</p>
        </div>
      </CardContent>
    </Card>
  );
};

export default TodaysPerformanceChart;
