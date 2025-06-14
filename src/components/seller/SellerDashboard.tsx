
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { 
  TrendingUp, 
  Package, 
  Users, 
  IndianRupee,
  Eye,
  ShoppingCart,
  Clock,
  AlertCircle,
  CheckCircle,
  BarChart3,
  Settings
} from "lucide-react";

interface SellerDashboardProps {
  onBackToMain: () => void;
}

const SellerDashboard = ({ onBackToMain }: SellerDashboardProps) => {
  const [selectedPeriod, setSelectedPeriod] = useState("today");

  // Mock data for demonstration
  const stats = {
    revenue: { today: 45200, week: 312400, month: 1250000 },
    orders: { today: 67, week: 456, month: 1890 },
    customers: { today: 23, week: 189, month: 567 },
    products: 145
  };

  const currentStats = stats.revenue[selectedPeriod as keyof typeof stats.revenue];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      {/* Header */}
      <div className="bg-white shadow-md border-b-2 border-blue-100 p-4">
        <div className="container mx-auto flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-blue-800">Seller Dashboard 📊</h1>
            <p className="text-gray-600">Welcome back, QuickGoat Seller</p>
          </div>
          <div className="flex space-x-3">
            <Button variant="outline" onClick={onBackToMain}>
              Back to Main
            </Button>
            <Button className="bg-blue-600 hover:bg-blue-700">
              <Settings className="w-4 h-4 mr-2" />
              Settings
            </Button>
          </div>
        </div>
      </div>

      <div className="container mx-auto p-6">
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="products">Products</TabsTrigger>
            <TabsTrigger value="orders">Orders</TabsTrigger>
            <TabsTrigger value="customers">Customers</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            {/* Period Selector */}
            <div className="flex space-x-2">
              {["today", "week", "month"].map((period) => (
                <Button
                  key={period}
                  variant={selectedPeriod === period ? "default" : "outline"}
                  onClick={() => setSelectedPeriod(period)}
                  className={selectedPeriod === period ? "bg-blue-600" : ""}
                >
                  {period.charAt(0).toUpperCase() + period.slice(1)}
                </Button>
              ))}
            </div>

            {/* Key Metrics */}
            <div className="grid md:grid-cols-4 gap-6">
              <Card className="bg-gradient-to-r from-green-500 to-green-600 text-white">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-green-100">Revenue</p>
                      <h3 className="text-2xl font-bold">₹{currentStats.toLocaleString()}</h3>
                    </div>
                    <IndianRupee className="w-8 h-8" />
                  </div>
                  <div className="mt-2 flex items-center text-green-100">
                    <TrendingUp className="w-4 h-4 mr-1" />
                    <span className="text-sm">+12% from last {selectedPeriod}</span>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-r from-blue-500 to-blue-600 text-white">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-blue-100">Orders</p>
                      <h3 className="text-2xl font-bold">{stats.orders[selectedPeriod as keyof typeof stats.orders]}</h3>
                    </div>
                    <ShoppingCart className="w-8 h-8" />
                  </div>
                  <div className="mt-2 flex items-center text-blue-100">
                    <TrendingUp className="w-4 h-4 mr-1" />
                    <span className="text-sm">+8% from last {selectedPeriod}</span>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-r from-purple-500 to-purple-600 text-white">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-purple-100">New Customers</p>
                      <h3 className="text-2xl font-bold">{stats.customers[selectedPeriod as keyof typeof stats.customers]}</h3>
                    </div>
                    <Users className="w-8 h-8" />
                  </div>
                  <div className="mt-2 flex items-center text-purple-100">
                    <TrendingUp className="w-4 h-4 mr-1" />
                    <span className="text-sm">+15% from last {selectedPeriod}</span>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-r from-orange-500 to-orange-600 text-white">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-orange-100">Products</p>
                      <h3 className="text-2xl font-bold">{stats.products}</h3>
                    </div>
                    <Package className="w-8 h-8" />
                  </div>
                  <div className="mt-2 flex items-center text-orange-100">
                    <Eye className="w-4 h-4 mr-1" />
                    <span className="text-sm">5 low stock alerts</span>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Recent Activity & Alerts */}
            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Clock className="w-5 h-5 text-blue-600" />
                    <span>Recent Orders</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {[
                    { id: "QG-2024-001", customer: "Rajesh Kumar", amount: 850, status: "processing", time: "5 min ago" },
                    { id: "QG-2024-002", customer: "Priya Sharma", amount: 620, status: "delivered", time: "12 min ago" },
                    { id: "QG-2024-003", customer: "Amit Patel", amount: 1200, status: "preparing", time: "18 min ago" },
                    { id: "QG-2024-004", customer: "Sneha Reddy", amount: 480, status: "delivered", time: "25 min ago" }
                  ].map((order) => (
                    <div key={order.id} className="flex justify-between items-center p-3 border rounded-lg">
                      <div>
                        <p className="font-semibold">{order.id}</p>
                        <p className="text-sm text-gray-600">{order.customer}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold">₹{order.amount}</p>
                        <Badge 
                          variant={order.status === 'delivered' ? 'default' : 'outline'}
                          className={order.status === 'delivered' ? 'bg-green-100 text-green-700' : ''}
                        >
                          {order.status}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <AlertCircle className="w-5 h-5 text-red-600" />
                    <span>Inventory Alerts</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {[
                    { product: "Premium Mutton Curry Cut", stock: 2, unit: "kg", alert: "critical" },
                    { product: "Fresh Goat Liver", stock: 5, unit: "kg", alert: "low" },
                    { product: "Boneless Mutton Chunks", stock: 8, unit: "kg", alert: "low" },
                    { product: "Goat Biryani Cut", stock: 12, unit: "kg", alert: "warning" }
                  ].map((item, index) => (
                    <div key={index} className="flex justify-between items-center p-3 border rounded-lg">
                      <div>
                        <p className="font-semibold">{item.product}</p>
                        <p className="text-sm text-gray-600">{item.stock} {item.unit} remaining</p>
                      </div>
                      <Badge 
                        variant="destructive"
                        className={
                          item.alert === 'critical' ? 'bg-red-100 text-red-700' :
                          item.alert === 'low' ? 'bg-orange-100 text-orange-700' :
                          'bg-yellow-100 text-yellow-700'
                        }
                      >
                        {item.alert}
                      </Badge>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="products" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">Product Management</h2>
              <Button className="bg-blue-600 hover:bg-blue-700">
                <Package className="w-4 h-4 mr-2" />
                Add New Product
              </Button>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Product Performance</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { name: "Premium Mutton Curry Cut", sales: 156, revenue: 97200, growth: 15 },
                    { name: "Boneless Mutton Chunks", sales: 134, revenue: 96480, growth: 8 },
                    { name: "Fresh Goat Liver", sales: 89, revenue: 24920, growth: -3 },
                    { name: "Goat Biryani Cut", sales: 76, revenue: 64600, growth: 12 }
                  ].map((product, index) => (
                    <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex-1">
                        <h4 className="font-semibold">{product.name}</h4>
                        <div className="flex items-center space-x-4 mt-2">
                          <span className="text-sm text-gray-600">{product.sales} units sold</span>
                          <span className="text-sm font-semibold text-green-600">₹{product.revenue.toLocaleString()}</span>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3">
                        <Badge 
                          variant={product.growth >= 0 ? "default" : "destructive"}
                          className={product.growth >= 0 ? "bg-green-100 text-green-700" : ""}
                        >
                          {product.growth >= 0 ? '+' : ''}{product.growth}%
                        </Badge>
                        <Button variant="outline" size="sm">Edit</Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="orders" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">Order Management</h2>
              <div className="flex space-x-2">
                <Button variant="outline">Export</Button>
                <Button className="bg-blue-600 hover:bg-blue-700">Bulk Actions</Button>
              </div>
            </div>

            <div className="grid md:grid-cols-4 gap-4">
              {[
                { label: "Pending", count: 12, color: "yellow" },
                { label: "Processing", count: 8, color: "blue" },
                { label: "Out for Delivery", count: 15, color: "purple" },
                { label: "Delivered", count: 156, color: "green" }
              ].map((status) => (
                <Card key={status.label}>
                  <CardContent className="p-4 text-center">
                    <h3 className="text-2xl font-bold">{status.count}</h3>
                    <p className="text-sm text-gray-600">{status.label}</p>
                  </CardContent>
                </Card>
              ))}
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Today's Orders</CardTitle>
              </CardHeader>
              <CardContent>
                {/* Order list would go here */}
                <p className="text-gray-600">Order management interface would be implemented here...</p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="customers" className="space-y-6">
            <h2 className="text-2xl font-bold">Customer Management</h2>
            <Card>
              <CardContent className="p-6">
                <p className="text-gray-600">Customer analytics and management tools would be implemented here...</p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-6">
            <h2 className="text-2xl font-bold">Advanced Analytics</h2>
            <Card>
              <CardContent className="p-6">
                <p className="text-gray-600">Advanced analytics dashboard would be implemented here...</p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default SellerDashboard;
