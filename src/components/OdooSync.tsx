import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { RotateCw, Database, ShoppingCart, Users, Package } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { odooService } from "@/services/odooService";

interface OdooSyncProps {
  isOpen: boolean;
  onClose: () => void;
  products: any[];
  onProductsSync: (products: any[]) => void;
}

const OdooSync = ({ isOpen, onClose, products, onProductsSync }: OdooSyncProps) => {
  const [isConnected, setIsConnected] = useState(false);
  const [isSyncing, setIsSyncing] = useState(false);
  const [syncProgress, setSyncProgress] = useState(0);
  const [lastSync, setLastSync] = useState<Date | null>(null);
  const [syncStats, setSyncStats] = useState({
    productsUpdated: 0,
    ordersCreated: 0,
    customersSync: 0,
  });
  const { toast } = useToast();

  useEffect(() => {
    const savedLastSync = localStorage.getItem('odooLastSync');
    if (savedLastSync) {
      setLastSync(new Date(savedLastSync));
    }
  }, []);

  const testConnection = async () => {
    try {
      const connected = await odooService.authenticate();
      setIsConnected(connected);
      
      if (connected) {
        toast({
          title: "Connected to Odoo",
          description: "Successfully authenticated with Odoo instance.",
        });
      } else {
        toast({
          title: "Connection Failed",
          description: "Could not authenticate with Odoo. Please check your configuration.",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Connection Error",
        description: "Failed to connect to Odoo instance.",
        variant: "destructive",
      });
    }
  };

  const syncProducts = async () => {
    setIsSyncing(true);
    setSyncProgress(0);
    
    try {
      // Step 1: Authenticate
      setSyncProgress(20);
      const connected = await odooService.authenticate();
      
      if (!connected) {
        throw new Error('Authentication failed');
      }

      // Step 2: Sync products
      setSyncProgress(50);
      const syncedProducts = await odooService.syncProductsToLocal(products);
      setSyncProgress(80);
      
      // Step 3: Update local state
      onProductsSync(syncedProducts);
      setSyncProgress(100);
      
      const updatedCount = syncedProducts.filter(p => p.odooId).length;
      setSyncStats(prev => ({ 
        ...prev, 
        productsUpdated: updatedCount 
      }));
      
      const now = new Date();
      setLastSync(now);
      localStorage.setItem('odooLastSync', now.toISOString());
      
      toast({
        title: "Sync Completed",
        description: `Successfully synced ${updatedCount} products with Odoo.`,
      });
    } catch (error) {
      console.error('Sync failed:', error);
      toast({
        title: "Sync Failed",
        description: "Could not sync products with Odoo.",
        variant: "destructive",
      });
    } finally {
      setIsSyncing(false);
      setSyncProgress(0);
    }
  };

  const createSampleOrder = async () => {
    try {
      // This would typically be called when a real order is placed
      const sampleOrder = {
        partner_id: 1, // Would be actual customer ID
        order_line: [
          {
            product_id: 1, // Would be actual product ID from Odoo
            product_uom_qty: 1,
            price_unit: 420,
          }
        ],
      };
      
      const orderId = await odooService.createOrder(sampleOrder);
      
      if (orderId) {
        setSyncStats(prev => ({ 
          ...prev, 
          ordersCreated: prev.ordersCreated + 1 
        }));
        
        toast({
          title: "Order Created",
          description: `Order #${orderId} created in Odoo successfully.`,
        });
      }
    } catch (error) {
      toast({
        title: "Order Creation Failed",
        description: "Could not create order in Odoo.",
        variant: "destructive",
      });
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Database className="w-5 h-5 text-red-600" />
              <CardTitle>Odoo Integration</CardTitle>
            </div>
            <Badge variant={isConnected ? "default" : "secondary"}>
              {isConnected ? "Connected" : "Disconnected"}
            </Badge>
          </div>
        </CardHeader>
        
        <CardContent className="space-y-6">
          {/* Connection Status */}
          <div className="flex items-center justify-between p-4 border rounded-lg">
            <div>
              <h3 className="font-semibold">Connection Status</h3>
              <p className="text-sm text-gray-600">
                {isConnected ? "Connected to Odoo" : "Not connected"}
              </p>
            </div>
            <Button onClick={testConnection} variant="outline">
              <Database className="w-4 h-4 mr-2" />
              Test Connection
            </Button>
          </div>

          {/* Sync Progress */}
          {isSyncing && (
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Syncing...</span>
                <span className="text-sm text-gray-600">{syncProgress}%</span>
              </div>
              <Progress value={syncProgress} className="w-full" />
            </div>
          )}

          {/* Sync Statistics */}
          <div className="grid grid-cols-3 gap-4">
            <div className="text-center p-4 border rounded-lg">
              <Package className="w-6 h-6 mx-auto mb-2 text-blue-600" />
              <div className="text-2xl font-bold">{syncStats.productsUpdated}</div>
              <div className="text-sm text-gray-600">Products Synced</div>
            </div>
            <div className="text-center p-4 border rounded-lg">
              <ShoppingCart className="w-6 h-6 mx-auto mb-2 text-green-600" />
              <div className="text-2xl font-bold">{syncStats.ordersCreated}</div>
              <div className="text-sm text-gray-600">Orders Created</div>
            </div>
            <div className="text-center p-4 border rounded-lg">
              <Users className="w-6 h-6 mx-auto mb-2 text-purple-600" />
              <div className="text-2xl font-bold">{syncStats.customersSync}</div>
              <div className="text-sm text-gray-600">Customers Synced</div>
            </div>
          </div>

          {/* Last Sync Info */}
          {lastSync && (
            <div className="text-center p-3 bg-gray-50 rounded-lg">
              <p className="text-sm text-gray-600">
                Last sync: {lastSync.toLocaleString()}
              </p>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex space-x-3">
            <Button 
              onClick={syncProducts} 
              disabled={!isConnected || isSyncing}
              className="flex-1 bg-red-600 hover:bg-red-700"
            >
              <RotateCw className={`w-4 h-4 mr-2 ${isSyncing ? 'animate-spin' : ''}`} />
              {isSyncing ? 'Syncing...' : 'Sync Products'}
            </Button>
            
            <Button 
              onClick={createSampleOrder}
              disabled={!isConnected}
              variant="outline"
              className="flex-1"
            >
              <ShoppingCart className="w-4 h-4 mr-2" />
              Test Order
            </Button>
          </div>

          <Button onClick={onClose} variant="ghost" className="w-full">
            Close
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default OdooSync;
