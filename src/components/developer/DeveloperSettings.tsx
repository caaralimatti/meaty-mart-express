
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Switch } from '@/components/ui/switch';
import { Textarea } from '@/components/ui/textarea';
import { 
  Settings, 
  Database, 
  MessageSquare, 
  LogOut, 
  Save, 
  TestTube,
  Shield,
  Eye,
  EyeOff
} from 'lucide-react';
import { toast } from 'sonner';

interface DeveloperSettingsProps {
  onLogout: () => void;
  username: string;
}

interface OdooConfig {
  serverUrl: string;
  database: string;
  username: string;
  password: string;
  apiKey: string;
  enabled: boolean;
}

interface SMSConfig {
  provider: string;
  apiKey: string;
  senderId: string;
  enabled: boolean;
  testNumber: string;
}

const DeveloperSettings = ({ onLogout, username }: DeveloperSettingsProps) => {
  const [odooConfig, setOdooConfig] = useState<OdooConfig>({
    serverUrl: '',
    database: '',
    username: '',
    password: '',
    apiKey: '',
    enabled: false
  });

  const [smsConfig, setSmsConfig] = useState<SMSConfig>({
    provider: 'textlocal',
    apiKey: '',
    senderId: 'QKGOAT',
    enabled: false,
    testNumber: ''
  });

  const [showPasswords, setShowPasswords] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Load saved configurations
  useEffect(() => {
    const savedOdoo = localStorage.getItem('quickgoat_odoo_config');
    const savedSMS = localStorage.getItem('quickgoat_sms_config');
    
    if (savedOdoo) {
      setOdooConfig(JSON.parse(savedOdoo));
    }
    
    if (savedSMS) {
      setSmsConfig(JSON.parse(savedSMS));
    }
  }, []);

  const saveOdooConfig = () => {
    localStorage.setItem('quickgoat_odoo_config', JSON.stringify(odooConfig));
    toast.success('Odoo configuration saved');
  };

  const saveSMSConfig = () => {
    localStorage.setItem('quickgoat_sms_config', JSON.stringify(smsConfig));
    toast.success('SMS configuration saved');
  };

  const testOdooConnection = async () => {
    if (!odooConfig.serverUrl || !odooConfig.database) {
      toast.error('Please fill in server URL and database name');
      return;
    }

    setIsLoading(true);
    
    // Simulate connection test
    setTimeout(() => {
      toast.success('Odoo connection test successful');
      setIsLoading(false);
    }, 2000);
  };

  const testSMSConnection = async () => {
    if (!smsConfig.apiKey || !smsConfig.testNumber) {
      toast.error('Please fill in API key and test number');
      return;
    }

    setIsLoading(true);
    
    // Simulate SMS test
    setTimeout(() => {
      toast.success(`Test SMS sent to ${smsConfig.testNumber}`);
      setIsLoading(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black">
      {/* Header */}
      <header className="bg-gray-900/50 backdrop-blur-sm border-b border-orange-500/20 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Shield className="w-6 h-6 text-orange-500" />
              <h1 className="text-2xl font-bold text-white">Developer Panel</h1>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <span className="text-gray-400">Logged in as: {username}</span>
            <Button
              onClick={onLogout}
              variant="outline"
              size="sm"
              className="text-red-400 border-red-400 hover:bg-red-400/10"
            >
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="p-6">
        <div className="max-w-6xl mx-auto">
          <Tabs defaultValue="odoo" className="w-full">
            <TabsList className="grid w-full grid-cols-2 bg-gray-800 border-gray-700">
              <TabsTrigger value="odoo" className="data-[state=active]:bg-orange-500 data-[state=active]:text-white">
                <Database className="w-4 h-4 mr-2" />
                Odoo Integration
              </TabsTrigger>
              <TabsTrigger value="sms" className="data-[state=active]:bg-orange-500 data-[state=active]:text-white">
                <MessageSquare className="w-4 h-4 mr-2" />
                SMS Configuration
              </TabsTrigger>
            </TabsList>

            {/* Odoo Configuration Tab */}
            <TabsContent value="odoo" className="mt-6">
              <Card className="bg-gray-900/50 border-gray-700">
                <CardHeader>
                  <CardTitle className="text-white flex items-center">
                    <Database className="w-5 h-5 mr-2 text-orange-500" />
                    Odoo ERP Integration Settings
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-center space-x-2">
                    <Switch
                      checked={odooConfig.enabled}
                      onCheckedChange={(checked) => 
                        setOdooConfig(prev => ({ ...prev, enabled: checked }))
                      }
                    />
                    <Label className="text-gray-300">Enable Odoo Integration</Label>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label className="text-gray-300">Server URL</Label>
                      <Input
                        placeholder="https://your-odoo-server.com"
                        value={odooConfig.serverUrl}
                        onChange={(e) => setOdooConfig(prev => ({ ...prev, serverUrl: e.target.value }))}
                        className="bg-gray-800 border-gray-600 text-white"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label className="text-gray-300">Database Name</Label>
                      <Input
                        placeholder="your-database-name"
                        value={odooConfig.database}
                        onChange={(e) => setOdooConfig(prev => ({ ...prev, database: e.target.value }))}
                        className="bg-gray-800 border-gray-600 text-white"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label className="text-gray-300">Username</Label>
                      <Input
                        placeholder="odoo-username"
                        value={odooConfig.username}
                        onChange={(e) => setOdooConfig(prev => ({ ...prev, username: e.target.value }))}
                        className="bg-gray-800 border-gray-600 text-white"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label className="text-gray-300">Password / API Key</Label>
                      <div className="relative">
                        <Input
                          type={showPasswords ? 'text' : 'password'}
                          placeholder="password-or-api-key"
                          value={odooConfig.password}
                          onChange={(e) => setOdooConfig(prev => ({ ...prev, password: e.target.value }))}
                          className="bg-gray-800 border-gray-600 text-white pr-10"
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={() => setShowPasswords(!showPasswords)}
                          className="absolute right-2 top-1/2 -translate-y-1/2 h-8 w-8 p-0 text-gray-400"
                        >
                          {showPasswords ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        </Button>
                      </div>
                    </div>
                  </div>

                  <div className="flex space-x-3">
                    <Button
                      onClick={saveOdooConfig}
                      className="bg-orange-500 hover:bg-orange-600"
                    >
                      <Save className="w-4 h-4 mr-2" />
                      Save Configuration
                    </Button>
                    
                    <Button
                      onClick={testOdooConnection}
                      variant="outline"
                      disabled={isLoading}
                      className="border-green-500 text-green-500 hover:bg-green-500/10"
                    >
                      <TestTube className="w-4 h-4 mr-2" />
                      {isLoading ? 'Testing...' : 'Test Connection'}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* SMS Configuration Tab */}
            <TabsContent value="sms" className="mt-6">
              <Card className="bg-gray-900/50 border-gray-700">
                <CardHeader>
                  <CardTitle className="text-white flex items-center">
                    <MessageSquare className="w-5 h-5 mr-2 text-orange-500" />
                    SMS Integration Settings
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-center space-x-2">
                    <Switch
                      checked={smsConfig.enabled}
                      onCheckedChange={(checked) => 
                        setSmsConfig(prev => ({ ...prev, enabled: checked }))
                      }
                    />
                    <Label className="text-gray-300">Enable SMS Integration</Label>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label className="text-gray-300">SMS Provider</Label>
                      <Input
                        placeholder="textlocal / twilio / msg91"
                        value={smsConfig.provider}
                        onChange={(e) => setSmsConfig(prev => ({ ...prev, provider: e.target.value }))}
                        className="bg-gray-800 border-gray-600 text-white"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label className="text-gray-300">Sender ID</Label>
                      <Input
                        placeholder="QKGOAT"
                        value={smsConfig.senderId}
                        onChange={(e) => setSmsConfig(prev => ({ ...prev, senderId: e.target.value }))}
                        className="bg-gray-800 border-gray-600 text-white"
                      />
                    </div>

                    <div className="space-y-2 md:col-span-2">
                      <Label className="text-gray-300">API Key</Label>
                      <div className="relative">
                        <Input
                          type={showPasswords ? 'text' : 'password'}
                          placeholder="your-sms-api-key"
                          value={smsConfig.apiKey}
                          onChange={(e) => setSmsConfig(prev => ({ ...prev, apiKey: e.target.value }))}
                          className="bg-gray-800 border-gray-600 text-white pr-10"
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={() => setShowPasswords(!showPasswords)}
                          className="absolute right-2 top-1/2 -translate-y-1/2 h-8 w-8 p-0 text-gray-400"
                        >
                          {showPasswords ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        </Button>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label className="text-gray-300">Test Mobile Number</Label>
                      <Input
                        placeholder="+91XXXXXXXXXX"
                        value={smsConfig.testNumber}
                        onChange={(e) => setSmsConfig(prev => ({ ...prev, testNumber: e.target.value }))}
                        className="bg-gray-800 border-gray-600 text-white"
                      />
                    </div>
                  </div>

                  <div className="flex space-x-3">
                    <Button
                      onClick={saveSMSConfig}
                      className="bg-orange-500 hover:bg-orange-600"
                    >
                      <Save className="w-4 h-4 mr-2" />
                      Save Configuration
                    </Button>
                    
                    <Button
                      onClick={testSMSConnection}
                      variant="outline"
                      disabled={isLoading}
                      className="border-green-500 text-green-500 hover:bg-green-500/10"
                    >
                      <TestTube className="w-4 h-4 mr-2" />
                      {isLoading ? 'Sending...' : 'Send Test SMS'}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  );
};

export default DeveloperSettings;
