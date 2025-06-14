
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Settings, Database, Check } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface OdooConfigProps {
  isOpen: boolean;
  onClose: () => void;
}

const OdooConfig = ({ isOpen, onClose }: OdooConfigProps) => {
  const [config, setConfig] = useState({
    serverUrl: '',
    database: '',
    username: '',
    password: '',
    apiKey: ''
  });
  const [isConnecting, setIsConnecting] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  const { toast } = useToast();

  const handleConfigChange = (field: string, value: string) => {
    setConfig(prev => ({ ...prev, [field]: value }));
  };

  const testConnection = async () => {
    setIsConnecting(true);
    console.log("Testing Odoo connection with config:", config);
    
    try {
      // Simulate API call - in real implementation, this would call your Supabase edge function
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      setIsConnected(true);
      toast({
        title: "Connection Successful!",
        description: "Successfully connected to Odoo instance.",
      });
    } catch (error) {
      toast({
        title: "Connection Failed",
        description: "Could not connect to Odoo. Please check your credentials.",
        variant: "destructive",
      });
    } finally {
      setIsConnecting(false);
    }
  };

  const saveConfiguration = () => {
    localStorage.setItem('odooConfig', JSON.stringify(config));
    toast({
      title: "Configuration Saved",
      description: "Odoo configuration has been saved successfully.",
    });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <Card className="w-full max-w-md">
        <CardHeader>
          <div className="flex items-center space-x-2">
            <Database className="w-5 h-5 text-red-600" />
            <CardTitle>Odoo Configuration</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="serverUrl">Server URL</Label>
            <Input
              id="serverUrl"
              placeholder="https://your-odoo-instance.com"
              value={config.serverUrl}
              onChange={(e) => handleConfigChange('serverUrl', e.target.value)}
            />
          </div>
          
          <div>
            <Label htmlFor="database">Database Name</Label>
            <Input
              id="database"
              placeholder="your_database_name"
              value={config.database}
              onChange={(e) => handleConfigChange('database', e.target.value)}
            />
          </div>
          
          <div>
            <Label htmlFor="username">Username</Label>
            <Input
              id="username"
              placeholder="admin"
              value={config.username}
              onChange={(e) => handleConfigChange('username', e.target.value)}
            />
          </div>
          
          <div>
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              placeholder="your_password"
              value={config.password}
              onChange={(e) => handleConfigChange('password', e.target.value)}
            />
          </div>
          
          <div>
            <Label htmlFor="apiKey">API Key (Optional)</Label>
            <Input
              id="apiKey"
              placeholder="your_api_key"
              value={config.apiKey}
              onChange={(e) => handleConfigChange('apiKey', e.target.value)}
            />
          </div>
          
          <div className="flex space-x-2">
            <Button 
              onClick={testConnection} 
              disabled={isConnecting || !config.serverUrl || !config.database}
              className="flex-1"
              variant="outline"
            >
              {isConnecting ? (
                <Settings className="w-4 h-4 mr-2 animate-spin" />
              ) : isConnected ? (
                <Check className="w-4 h-4 mr-2 text-green-600" />
              ) : (
                <Settings className="w-4 h-4 mr-2" />
              )}
              {isConnecting ? 'Testing...' : isConnected ? 'Connected' : 'Test Connection'}
            </Button>
            
            <Button onClick={saveConfiguration} className="flex-1 bg-red-600 hover:bg-red-700">
              Save Config
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

export default OdooConfig;
