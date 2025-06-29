
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import ApiMonitor from './ApiMonitor';
import { Database, Monitor, Settings, LogOut } from 'lucide-react';

interface DeveloperSettingsProps {
  onLogout: () => void;
  username: string;
}

const DeveloperSettings = ({ onLogout, username }: DeveloperSettingsProps) => {
  const [activeTab, setActiveTab] = useState('monitor');

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Developer Console</h1>
            <p className="text-gray-600">Welcome back, {username}</p>
          </div>
          <Button onClick={onLogout} variant="outline">
            <LogOut className="w-4 h-4 mr-2" />
            Logout
          </Button>
        </div>

        {/* Navigation Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-6">
            <TabsTrigger value="monitor" className="flex items-center">
              <Monitor className="w-4 h-4 mr-2" />
              API Monitor
            </TabsTrigger>
            <TabsTrigger value="database" className="flex items-center">
              <Database className="w-4 h-4 mr-2" />
              Database
            </TabsTrigger>
            <TabsTrigger value="settings" className="flex items-center">
              <Settings className="w-4 h-4 mr-2" />
              Settings
            </TabsTrigger>
          </TabsList>

          {/* API Monitor Tab */}
          <TabsContent value="monitor">
            <ApiMonitor />
          </TabsContent>

          {/* Database Tab */}
          <TabsContent value="database">
            <Card>
              <CardHeader>
                <CardTitle>Database Management</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Card>
                      <CardContent className="p-4">
                        <h3 className="font-semibold mb-2">Sellers</h3>
                        <p className="text-2xl font-bold text-blue-600">12</p>
                        <p className="text-sm text-gray-600">Active sellers</p>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardContent className="p-4">
                        <h3 className="font-semibold mb-2">Products</h3>
                        <p className="text-2xl font-bold text-green-600">45</p>
                        <p className="text-sm text-gray-600">Total products</p>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardContent className="p-4">
                        <h3 className="font-semibold mb-2">Livestock</h3>
                        <p className="text-2xl font-bold text-purple-600">23</p>
                        <p className="text-sm text-gray-600">Active listings</p>
                      </CardContent>
                    </Card>
                  </div>
                  
                  <div className="text-center py-8 text-gray-500">
                    <Database className="w-12 h-12 mx-auto mb-4 text-gray-400" />
                    <p>Database management tools coming soon...</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Settings Tab */}
          <TabsContent value="settings">
            <Card>
              <CardHeader>
                <CardTitle>System Settings</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div>
                    <h3 className="font-semibold mb-2">Environment</h3>
                    <p className="text-sm text-gray-600">Development Mode: Active</p>
                    <p className="text-sm text-gray-600">API Monitoring: Enabled</p>
                  </div>
                  
                  <div>
                    <h3 className="font-semibold mb-2">System Information</h3>
                    <div className="bg-gray-100 p-4 rounded-lg text-sm space-y-1">
                      <p><strong>Build Version:</strong> 1.0.0</p>
                      <p><strong>Last Deploy:</strong> {new Date().toLocaleString()}</p>
                      <p><strong>Environment:</strong> Development</p>
                    </div>
                  </div>
                  
                  <div className="text-center py-8 text-gray-500">
                    <Settings className="w-12 h-12 mx-auto mb-4 text-gray-400" />
                    <p>Additional settings coming soon...</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default DeveloperSettings;
