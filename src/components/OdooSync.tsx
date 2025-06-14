import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { RotateCw, Database, ShoppingCart, Users, Package, Settings } from "lucide-react";
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
  const [connectionDetails, setConnectionDetails] = useState<string>('');
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
      setConnectionDetails('Testing connection...');
      console.log('Starting connection test...');
      
      const connected = await odooService.authenticate();
      setIsConnected(connected);
      
      if (connected) {
        setConnectionDetails('Successfully connected to Odoo');
        toast({
          title: "Connected to Odoo",
          description: "Successfully authenticated with Odoo instance.",
        });
      } else {
        setConnectionDetails('Authentication failed - check credentials and server');
        toast({
          title: "Connection Failed", 
          description: "Could not authenticate with Odoo. Please verify your Odoo server is running and credentials are correct.",
          variant: "destructive",
        });
      }
    } catch (error: any) {
      console.error('Connection test error:', error);
      setIsConnected(false);
      setConnectionDetails(`Error: ${error.message}`);
      toast({
        title: "Connection Error",
        description: error.message || "An unexpected error occurred during connection test.",
        variant: "destructive",
      });
    }
  };

  const syncProducts = async () => {
    setIsSyncing(true);
    setSyncProgress(0);
    
    try {
      setSyncProgress(20);
      const connected = await odooService.authenticate();
      
      if (!connected) {
        throw new Error('Authentication failed. Please configure your Odoo credentials in Supabase secrets.');
      }

      setSyncProgress(50);
      const syncedProducts = await odooService.syncProductsToLocal(products);
      setSyncProgress(80);
      
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
    } catch (error: any) {
      console.error('Sync failed:', error);
      toast({
        title: "Sync Failed",
        description: error.message || "Could not sync products with Odoo.",
        variant: "destructive",
      });
    } finally {
      setIsSyncing(false);
      setSyncProgress(0);
    }
  };

  const createSampleOrder = async () => {
    try {
      const sampleOrder = {
        partner_id: 1,
        order_line: [
          {
            product_id: 1,
            product_uom_qty: 1,
            price_unit: 420,
          }
        ],
      };
      
      const orderId = await odooService.createOrder(sampleOrder);
      
      if (orderId) {
        setSyncStats(prev => ({ ...prev, ordersCreated: prev.ordersCreated + 1 }));
        toast({
          title: "Order Created",
          description: `Order #${orderId} created in Odoo successfully.`,
        });
      } else {
         throw new Error("Order creation returned null ID.");
      }
    } catch (error: any) {
       console.error("Order creation failed:", error);
       toast({
        title: "Order Creation Failed",
        description: error.message || "Could not create order in Odoo.",
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
          <div className="p-4 border border-yellow-200 bg-yellow-50 rounded-lg">
            <div className="flex items-start space-x-3">
              <Settings className="w-5 h-5 text-yellow-600 mt-0.5" />
              <div>
                <h3 className="font-semibold text-yellow-800">Configuration Required</h3>
                <p className="text-sm text-yellow-700 mt-1">
                  Expected configuration:
                </p>
                <ul className="text-sm text-yellow-700 mt-2 space-y-1">
                  <li>• ODOO_URL: http://138.91.109.69:8069</li>
                  <li>• ODOO_DB: ipurvey_staging</li>
                  <li>• ODOO_USERNAME: admin</li>
                  <li>• ODOO_PASSWORD: admin</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between p-4 border rounded-lg">
            <div>
              <h3 className="font-semibold">Connection Status</h3>
              <p className="text-sm text-gray-600">
                {connectionDetails || (isConnected ? "Connected to Odoo" : "Not connected. Click test to begin.")}
              </p>
            </div>
            <Button onClick={testConnection} variant="outline">
              <Database className="w-4 h-4 mr-2" />
              Test Connection
            </Button>
          </div>

          {/* Debug section */}
          <div className="p-3 bg-gray-50 rounded-lg text-xs">
            <p className="font-medium mb-1">Debug Info:</p>
            <p>Check console logs for detailed authentication flow</p>
            <p>Expected Odoo server: http://138.91.109.69:8069</p>
          </div>

          {isSyncing && (
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Syncing...</span>
                <span className="text-sm text-gray-600">{syncProgress}%</span>
              </div>
              <Progress value={syncProgress} className="w-full" />
            </div>
          )}

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

          {lastSync && (
            <div className="text-center p-3 bg-gray-50 rounded-lg">
              <p className="text-sm text-gray-600">
                Last sync: {lastSync.toLocaleString()}
              </p>
            </div>
          )}

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
