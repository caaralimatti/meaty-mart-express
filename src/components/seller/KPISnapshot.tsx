
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { TrendingUp, TrendingDown, DollarSign, ShoppingCart, Users, Package } from 'lucide-react';

interface KPISnapshotProps {
  sellerType: 'Meat' | 'Livestock' | 'Both';
}

const KPISnapshot = ({ sellerType }: KPISnapshotProps) => {
  // Mock data - in real app, this would come from your backend
  const kpiData = {
    totalRevenue: { value: 12450, change: 15.3, period: 'this month' },
    averageOrderValue: { value: 85.50, change: -2.1, period: 'this week' },
    totalOrders: { value: 146, change: 8.7, period: 'this month' },
    customerCount: { value: 89, change: 12.5, period: 'this month' }
  };

  const formatCurrency = (amount: number) => `$${amount.toLocaleString()}`;
  const formatChange = (change: number) => `${change > 0 ? '+' : ''}${change}%`;

  const TrendIcon = ({ change }: { change: number }) => {
    return change > 0 ? (
      <TrendingUp className="w-4 h-4 text-green-600" />
    ) : (
      <TrendingDown className="w-4 h-4 text-red-600" />
    );
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
          <DollarSign className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{formatCurrency(kpiData.totalRevenue.value)}</div>
          <div className="flex items-center text-xs text-muted-foreground">
            <TrendIcon change={kpiData.totalRevenue.change} />
            <span className={`ml-1 ${kpiData.totalRevenue.change > 0 ? 'text-green-600' : 'text-red-600'}`}>
              {formatChange(kpiData.totalRevenue.change)} from last {kpiData.totalRevenue.period}
            </span>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Average Order Value</CardTitle>
          <Package className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{formatCurrency(kpiData.averageOrderValue.value)}</div>
          <div className="flex items-center text-xs text-muted-foreground">
            <TrendIcon change={kpiData.averageOrderValue.change} />
            <span className={`ml-1 ${kpiData.averageOrderValue.change > 0 ? 'text-green-600' : 'text-red-600'}`}>
              {formatChange(kpiData.averageOrderValue.change)} from last {kpiData.averageOrderValue.period}
            </span>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Orders</CardTitle>
          <ShoppingCart className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{kpiData.totalOrders.value}</div>
          <div className="flex items-center text-xs text-muted-foreground">
            <TrendIcon change={kpiData.totalOrders.change} />
            <span className={`ml-1 ${kpiData.totalOrders.change > 0 ? 'text-green-600' : 'text-red-600'}`}>
              {formatChange(kpiData.totalOrders.change)} from last {kpiData.totalOrders.period}
            </span>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Customer Count</CardTitle>
          <Users className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{kpiData.customerCount.value}</div>
          <div className="flex items-center text-xs text-muted-foreground">
            <TrendIcon change={kpiData.customerCount.change} />
            <span className={`ml-1 ${kpiData.customerCount.change > 0 ? 'text-green-600' : 'text-red-600'}`}>
              {formatChange(kpiData.customerCount.change)} from last {kpiData.customerCount.period}
            </span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default KPISnapshot;
