
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RotateCw, Database, ShoppingCart, Users, Package, Settings, Edit3, Save, X, Play, Pause, Square } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { odooService } from "@/services/odooService";
import OdooProductsTable from "./OdooProductsTable";

interface OdooSyncProps {
  products: any[];
  onProductsSync: (products: any[]) => void;
}

interface OdooConfig {
  serverUrl: string;
  database: string;
  fields: string;
  username: string;
  password: string;
}

const OdooSync = ({ products, onProductsSync }: OdooSyncProps) => {
  const [isConnected, setIsConnected] = useState(false);
  const [isSyncing, setIsSyncing] = useState(false);
  const [isLoadingProducts, setIsLoadingProducts] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [isStopped, setIsStopped] = useState(false);
  const [isEditingConfig, setIsEditingConfig] = useState(false);
  const [syncProgress, setSyncProgress] = useState(0);
  const [lastSync, setLastSync] = useState<Date | null>(null);
  const [connectionDetails, setConnectionDetails] = useState<string>('');
  const [odooProducts, setOdooProducts] = useState<any[]>([]);
  const [config, setConfig] = useState<OdooConfig>({
    serverUrl: 'https://goatgoat.xyz/',
    database: 'staging',
    fields: 'name, list_price, uom_id',
    username: 'admin',
    password: 'admin'
  });
  const [tempConfig, setTempConfig] = useState<OdooConfig>(config);
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
    
    const savedConfig = localStorage.getItem('odooConfig');
    if (savedConfig) {
      const parsedConfig = JSON.parse(savedConfig);
      const fullConfig = {
        serverUrl: parsedConfig.serverUrl || 'https://goatgoat.xyz/',
        database: parsedConfig.database || 'staging',
        fields: parsedConfig.fields || 'name, list_price, uom_id',
        username: parsedConfig.username || 'admin',
        password: parsedConfig.password || 'admin'
      };
      setConfig(fullConfig);
      setTempConfig(fullConfig);
    }
  }, []);

  const getConnectionStatus = () => {
    if (isStopped) return "Stopped";
    if (isPaused) return "Paused";
    if (isConnected) return "Connected";
    return "Disconnected";
  };

  const getConnectionBadgeVariant = () => {
    if (isStopped) return "destructive";
    if (isPaused) return "secondary";
    if (isConnected) return "default";
    return "secondary";
  };

  const saveConfig = () => {
    setConfig(tempConfig);
    localStorage.setItem('odooConfig', JSON.stringify(tempConfig));
    setIsEditingConfig(false);
    toast({
      title: "Configuration Saved",
      description: "Odoo configuration has been updated successfully.",
    });
  };

  const cancelConfigEdit = () => {
    setTempConfig(config);
    setIsEditingConfig(false);
  };

  const testConnection = async () => {
    if (isStopped || isPaused) {
      toast({
        title: "Connection Unavailable",
        description: "Connection is currently stopped or paused. Please resume first.",
        variant: "destructive",
      });
      return;
    }

    try {
      setConnectionDetails('Testing connection...');
      console.log('Starting connection test...');
      
      // Set configuration before authenticating
      odooService.setConfig({
        serverUrl: config.serverUrl,
        database: config.database,
        username: config.username,
        password: config.password,
      });
      
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

  const pauseConnection = () => {
    setIsPaused(true);
    setIsConnected(false);
    setConnectionDetails('Connection paused');
    toast({
      title: "Connection Paused",
      description: "Odoo connection has been paused. Click resume to continue.",
    });
  };

  const resumeConnection = () => {
    setIsPaused(false);
    setIsStopped(false);
    setConnectionDetails('Connection resumed');
    toast({
      title: "Connection Resumed",
      description: "Odoo connection has been resumed. Test connection to reconnect.",
    });
  };

  const stopConnection = () => {
    setIsStopped(true);
    setIsPaused(false);
    setIsConnected(false);
    setConnectionDetails('Connection stopped');
    toast({
      title: "Connection Stopped",
      description: "Odoo connection has been stopped. Click resume to enable connection again.",
      variant: "destructive",
    });
  };

  const fetchOdooProducts = async () => {
    if (isStopped || isPaused) {
      toast({
        title: "Connection Unavailable",
        description: "Connection is currently stopped or paused. Please resume first.",
        variant: "destructive",
      });
      return;
    }

    setIsLoadingProducts(true);
    try {
      // Set configuration before making requests
      odooService.setConfig({
        serverUrl: config.serverUrl,
        database: config.database,
        username: config.username,
        password: config.password,
      });

      const connected = await odooService.authenticate();
      if (!connected) {
        throw new Error('Authentication failed. Please test connection first.');
      }

      // Parse fields from config
      const fieldsArray = config.fields.split(',').map(field => field.trim());
      const fetchedProducts = await odooService.getProducts(fieldsArray);
      setOdooProducts(fetchedProducts);
      
      toast({
        title: "Products Loaded",
        description: `Successfully loaded ${fetchedProducts.length} products from Odoo.`,
      });
    } catch (error: any) {
      console.error('Failed to fetch Odoo products:', error);
      toast({
        title: "Failed to Load Products",
        description: error.message || "Could not fetch products from Odoo.",
        variant: "destructive",
      });
    } finally {
      setIsLoadingProducts(false);
    }
  };

  const syncProducts = async () => {
    if (isStopped || isPaused) {
      toast({
        title: "Connection Unavailable",
        description: "Connection is currently stopped or paused. Please resume first.",
        variant: "destructive",
      });
      return;
    }

    setIsSyncing(true);
    setSyncProgress(0);
    
    try {
      setSyncProgress(20);
      
      // Set configuration before making requests
      odooService.setConfig({
        serverUrl: config.serverUrl,
        database: config.database,
        username: config.username,
        password: config.password,
      });

      const connected = await odooService.authenticate();
      
      if (!connected) {
        throw new Error('Authentication failed. Please configure your Odoo credentials in Supabase secrets.');
      }

      setSyncProgress(50);
      // Parse fields from config
      const fieldsArray = config.fields.split(',').map(field => field.trim());
      const syncedProducts = await odooService.syncProductsToLocal(products, fieldsArray);
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
    if (isStopped || isPaused) {
      toast({
        title: "Connection Unavailable",
        description: "Connection is currently stopped or paused. Please resume first.",
        variant: "destructive",
      });
      return;
    }

    try {
      // Set configuration before making requests
      odooService.setConfig({
        serverUrl: config.serverUrl,
        database: config.database,
        username: config.username,
        password: config.password,
      });

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

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Database className="w-5 h-5 text-emerald-600" />
          <h2 className="text-xl font-semibold text-emerald-900">Odoo Integration - Product Sync</h2>
        </div>
        <Badge variant={getConnectionBadgeVariant()} className="bg-emerald-100 text-emerald-800 border-emerald-300">
          {getConnectionStatus()}
        </Badge>
      </div>
      
      <div className="p-4 border border-emerald-200 bg-emerald-50 rounded-lg">
        <div className="flex items-start justify-between">
          <div className="flex items-start space-x-3">
            <Settings className="w-5 h-5 text-emerald-600 mt-0.5" />
            <div>
              <h3 className="font-semibold text-emerald-800">Configuration Status</h3>
              <p className="text-sm text-emerald-700 mt-1">
                Syncing from: product.product table
              </p>
              {!isEditingConfig ? (
                <ul className="text-sm text-emerald-700 mt-2 space-y-1">
                  <li>• Fields: {config.fields}</li>
                  <li>• Server: {config.serverUrl}</li>
                  <li>• Database: {config.database}</li>
                  <li>• Username: {config.username}</li>
                  <li>• Password: {'•'.repeat((config.password || '').length)}</li>
                </ul>
              ) : (
                <div className="mt-3 space-y-3">
                  <div>
                    <Label htmlFor="fields" className="text-sm font-medium text-emerald-800">Fields</Label>
                    <Input
                      id="fields"
                      value={tempConfig.fields}
                      onChange={(e) => setTempConfig(prev => ({ ...prev, fields: e.target.value }))}
                      placeholder="name, list_price, uom_id"
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="server" className="text-sm font-medium text-emerald-800">Server URL</Label>
                    <Input
                      id="server"
                      value={tempConfig.serverUrl}
                      onChange={(e) => setTempConfig(prev => ({ ...prev, serverUrl: e.target.value }))}
                      placeholder="https://goatgoat.xyz/"
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="database" className="text-sm font-medium text-emerald-800">Database</Label>
                    <Input
                      id="database"
                      value={tempConfig.database}
                      onChange={(e) => setTempConfig(prev => ({ ...prev, database: e.target.value }))}
                      placeholder="staging"
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="username" className="text-sm font-medium text-emerald-800">Username</Label>
                    <Input
                      id="username"
                      value={tempConfig.username}
                      onChange={(e) => setTempConfig(prev => ({ ...prev, username: e.target.value }))}
                      placeholder="admin"
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="password" className="text-sm font-medium text-emerald-800">Password</Label>
                    <Input
                      id="password"
                      type="password"
                      value={tempConfig.password}
                      onChange={(e) => setTempConfig(prev => ({ ...prev, password: e.target.value }))}
                      placeholder="admin"
                      className="mt-1"
                    />
                  </div>
                </div>
              )}
            </div>
          </div>
          <div className="flex space-x-2">
            {!isEditingConfig ? (
              <Button 
                onClick={() => setIsEditingConfig(true)}
                variant="outline"
                size="sm"
                className="border-emerald-300 text-emerald-700 hover:bg-emerald-100"
              >
                <Edit3 className="w-4 h-4 mr-2" />
                Edit
              </Button>
            ) : (
              <>
                <Button 
                  onClick={saveConfig}
                  size="sm"
                  className="bg-emerald-600 hover:bg-emerald-700 text-white"
                >
                  <Save className="w-4 h-4 mr-2" />
                  Save
                </Button>
                <Button 
                  onClick={cancelConfigEdit}
                  variant="outline"
                  size="sm"
                  className="border-emerald-300 text-emerald-700 hover:bg-emerald-100"
                >
                  <X className="w-4 h-4 mr-2" />
                  Cancel
                </Button>
              </>
            )}
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between p-4 border border-emerald-200 rounded-lg bg-white/50">
        <div>
          <h3 className="font-semibold text-emerald-800">Connection Status</h3>
          <p className="text-sm text-emerald-600">
            {connectionDetails || (isConnected ? "Connected to Odoo" : "Not connected. Click test to begin.")}
          </p>
        </div>
        <div className="flex space-x-2">
          <Button onClick={testConnection} variant="outline" className="border-emerald-300 text-emerald-700 hover:bg-emerald-100 hover:border-emerald-400">
            <Database className="w-4 h-4 mr-2" />
            Test Connection
          </Button>
          
          {(isPaused || isStopped) ? (
            <Button 
              onClick={resumeConnection}
              variant="outline" 
              className="border-emerald-300 text-emerald-700 hover:bg-emerald-100 hover:border-emerald-400"
            >
              <Play className="w-4 h-4 mr-2" />
              Resume
            </Button>
          ) : (
            <>
              <Button 
                onClick={pauseConnection}
                variant="outline" 
                className="border-yellow-300 text-yellow-700 hover:bg-yellow-100 hover:border-yellow-400"
                disabled={!isConnected}
              >
                <Pause className="w-4 h-4 mr-2" />
                Pause
              </Button>
              <Button 
                onClick={stopConnection}
                variant="outline" 
                className="border-red-300 text-red-700 hover:bg-red-100 hover:border-red-400"
                disabled={!isConnected}
              >
                <Square className="w-4 h-4 mr-2" />
                Stop
              </Button>
            </>
          )}
        </div>
      </div>

      {isSyncing && (
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-emerald-800">Syncing...</span>
            <span className="text-sm text-emerald-600">{syncProgress}%</span>
          </div>
          <Progress value={syncProgress} className="w-full" />
        </div>
      )}

      <div className="grid grid-cols-3 gap-4">
        <div className="text-center p-4 border border-emerald-200 rounded-lg bg-white/50">
          <Package className="w-6 h-6 mx-auto mb-2 text-emerald-600" />
          <div className="text-2xl font-bold text-emerald-800">{syncStats.productsUpdated}</div>
          <div className="text-sm text-emerald-600">Products Synced</div>
        </div>
        <div className="text-center p-4 border border-emerald-200 rounded-lg bg-white/50">
          <ShoppingCart className="w-6 h-6 mx-auto mb-2 text-emerald-600" />
          <div className="text-2xl font-bold text-emerald-800">{syncStats.ordersCreated}</div>
          <div className="text-sm text-emerald-600">Orders Created</div>
        </div>
        <div className="text-center p-4 border border-emerald-200 rounded-lg bg-white/50">
          <Users className="w-6 h-6 mx-auto mb-2 text-emerald-600" />
          <div className="text-2xl font-bold text-emerald-800">{odooProducts.length}</div>
          <div className="text-sm text-emerald-600">Odoo Products</div>
        </div>
      </div>

      {lastSync && (
        <div className="text-center p-3 bg-emerald-50 rounded-lg border border-emerald-200">
          <p className="text-sm text-emerald-700">
            Last sync: {lastSync.toLocaleString()}
          </p>
        </div>
      )}

      <div className="flex space-x-3">
        <Button 
          onClick={fetchOdooProducts} 
          disabled={!isConnected || isLoadingProducts || isPaused || isStopped}
          variant="outline"
          className="flex-1 border-emerald-300 text-emerald-700 hover:bg-emerald-100 hover:border-emerald-400"
        >
          <Package className={`w-4 h-4 mr-2 ${isLoadingProducts ? 'animate-spin' : ''}`} />
          {isLoadingProducts ? 'Loading...' : 'Load Products'}
        </Button>
        
        <Button 
          onClick={syncProducts} 
          disabled={!isConnected || isSyncing || isPaused || isStopped}
          className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white"
        >
          <RotateCw className={`w-4 h-4 mr-2 ${isSyncing ? 'animate-spin' : ''}`} />
          {isSyncing ? 'Syncing...' : 'Sync Products'}
        </Button>
        
        <Button 
          onClick={createSampleOrder}
          disabled={!isConnected || isPaused || isStopped}
          variant="outline"
          className="flex-1 border-emerald-300 text-emerald-700 hover:bg-emerald-100 hover:border-emerald-400"
        >
          <ShoppingCart className="w-4 h-4 mr-2" />
          Test Order
        </Button>
      </div>

      <OdooProductsTable 
        products={odooProducts} 
        isLoading={isLoadingProducts} 
      />
    </div>
  );
};

export default OdooSync;
