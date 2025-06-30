
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import ApiMonitor from './ApiMonitor';
import { Database, Monitor, Settings, LogOut, Smartphone, Globe } from 'lucide-react';

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
          <TabsList className="grid w-full grid-cols-2 lg:grid-cols-5 mb-6">
            <TabsTrigger value="monitor" className="flex items-center">
              <Monitor className="w-4 h-4 mr-2" />
              API Monitor
            </TabsTrigger>
            <TabsTrigger value="database" className="flex items-center">
              <Database className="w-4 h-4 mr-2" />
              Database
            </TabsTrigger>
            <TabsTrigger value="odoo" className="flex items-center">
              <Globe className="w-4 h-4 mr-2" />
              Odoo Integration
            </TabsTrigger>
            <TabsTrigger value="sms" className="flex items-center">
              <Smartphone className="w-4 h-4 mr-2" />
              SMS Integration
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

          {/* Odoo Integration Tab */}
          <TabsContent value="odoo">
            <Card>
              <CardHeader>
                <CardTitle>Odoo Integration Status</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Card>
                      <CardContent className="p-4">
                        <h3 className="font-semibold mb-2">Connection Status</h3>
                        <div className="flex items-center space-x-2">
                          <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                          <span className="text-sm text-green-600">Connected</span>
                        </div>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardContent className="p-4">
                        <h3 className="font-semibold mb-2">Sync Status</h3>
                        <div className="flex items-center space-x-2">
                          <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                          <span className="text-sm text-blue-600">Active</span>
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  <div>
                    <h3 className="font-semibold mb-4">Webhook Endpoints</h3>
                    <div className="space-y-2 bg-gray-100 p-4 rounded-lg text-sm">
                      <p><strong>Seller Approval:</strong> /functions/v1/seller-approval-webhook</p>
                      <p><strong>Product Approval:</strong> /functions/v1/product-approval-webhook</p>
                      <p><strong>Livestock Approval:</strong> /functions/v1/livestock-approval-webhook</p>
                    </div>
                  </div>

                  <div>
                    <h3 className="font-semibold mb-4">Recent Sync Activity</h3>
                    <div className="space-y-2">
                      <div className="flex justify-between items-center p-2 bg-green-50 rounded">
                        <span className="text-sm">Seller Registration</span>
                        <span className="text-xs text-gray-500">2 minutes ago</span>
                      </div>
                      <div className="flex justify-between items-center p-2 bg-blue-50 rounded">  
                        <span className="text-sm">Product Sync</span>
                        <span className="text-xs text-gray-500">15 minutes ago</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* SMS Integration Tab */}
          <TabsContent value="sms">
            <Card>
              <CardHeader>
                <CardTitle>SMS Integration</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Card>
                      <CardContent className="p-4">
                        <h3 className="font-semibold mb-2">SMS Sent Today</h3>
                        <p className="text-2xl font-bold text-blue-600">47</p>
                        <p className="text-sm text-gray-600">OTP & notifications</p>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardContent className="p-4">
                        <h3 className="font-semibold mb-2">Success Rate</h3>
                        <p className="text-2xl font-bold text-green-600">98.2%</p>
                        <p className="text-sm text-gray-600">Delivery success</p>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardContent className="p-4">
                        <h3 className="font-semibold mb-2">Failed SMS</h3>
                        <p className="text-2xl font-bold text-red-600">1</p>
                        <p className="text-sm text-gray-600">Retry pending</p>
                      </CardContent>
                    </Card>
                  </div>

                  <div>
                    <h3 className="font-semibold mb-4">Recent SMS Activity</h3>
                    <div className="space-y-2">
                      <div className="flex justify-between items-center p-2 bg-green-50 rounded">
                        <span className="text-sm">OTP to +91-9876543210</span>
                        <span className="text-xs text-gray-500">Delivered - 1 min ago</span>
                      </div>
                      <div className="flex justify-between items-center p-2 bg-green-50 rounded">
                        <span className="text-sm">Registration confirmation to +91-9876543211</span>
                        <span className="text-xs text-gray-500">Delivered - 5 min ago</span>
                      </div>
                      <div className="flex justify-between items-center p-2 bg-red-50 rounded">
                        <span className="text-sm">OTP to +91-9876543212</span>
                        <span className="text-xs text-gray-500">Failed - 10 min ago</span>
                      </div>
                    </div>
                  </div>

                  <div className="text-center py-4">
                    <Button variant="outline">
                      <Smartphone className="w-4 h-4 mr-2" />
                      View Full SMS Logs
                    </Button>
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
