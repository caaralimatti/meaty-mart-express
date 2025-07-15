
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
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-green-100 p-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-emerald-900">Developer Console</h1>
            <p className="text-emerald-700">Welcome back, {username}</p>
          </div>
          <Button onClick={onLogout} variant="outline" className="border-emerald-300 text-emerald-700 hover:bg-emerald-100 hover:border-emerald-400 transition-all duration-300">
            <LogOut className="w-4 h-4 mr-2" />
            Logout
          </Button>
        </div>

        {/* Navigation Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2 lg:grid-cols-5 mb-6 bg-white/70 border border-emerald-200/50 backdrop-blur-sm">
            <TabsTrigger value="monitor" className="flex items-center text-emerald-700 data-[state=active]:bg-emerald-600 data-[state=active]:text-white">
              <Monitor className="w-4 h-4 mr-2" />
              API Monitor
            </TabsTrigger>
            <TabsTrigger value="database" className="flex items-center text-emerald-700 data-[state=active]:bg-emerald-600 data-[state=active]:text-white">
              <Database className="w-4 h-4 mr-2" />
              Database
            </TabsTrigger>
            <TabsTrigger value="odoo" className="flex items-center text-emerald-700 data-[state=active]:bg-emerald-600 data-[state=active]:text-white">
              <Globe className="w-4 h-4 mr-2" />
              Odoo Integration
            </TabsTrigger>
            <TabsTrigger value="sms" className="flex items-center text-emerald-700 data-[state=active]:bg-emerald-600 data-[state=active]:text-white">
              <Smartphone className="w-4 h-4 mr-2" />
              SMS Integration
            </TabsTrigger>
            <TabsTrigger value="settings" className="flex items-center text-emerald-700 data-[state=active]:bg-emerald-600 data-[state=active]:text-white">
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
            <Card className="bg-gradient-to-br from-white/80 to-emerald-50/80 backdrop-blur-md border-emerald-200/50">
              <CardHeader>
                <CardTitle className="text-emerald-900">Database Management</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Card className="bg-gradient-to-br from-white/90 to-emerald-50/90 border-emerald-200/50 hover:shadow-lg transition-all duration-300">
                      <CardContent className="p-4">
                        <h3 className="font-semibold mb-2 text-emerald-800">Sellers</h3>
                        <p className="text-2xl font-bold text-emerald-600">12</p>
                        <p className="text-sm text-emerald-600/70">Active sellers</p>
                      </CardContent>
                    </Card>
                    <Card className="bg-gradient-to-br from-white/90 to-emerald-50/90 border-emerald-200/50 hover:shadow-lg transition-all duration-300">
                      <CardContent className="p-4">
                        <h3 className="font-semibold mb-2 text-emerald-800">Products</h3>
                        <p className="text-2xl font-bold text-emerald-600">45</p>
                        <p className="text-sm text-emerald-600/70">Total products</p>
                      </CardContent>
                    </Card>
                    <Card className="bg-gradient-to-br from-white/90 to-emerald-50/90 border-emerald-200/50 hover:shadow-lg transition-all duration-300">
                      <CardContent className="p-4">
                        <h3 className="font-semibold mb-2 text-emerald-800">Livestock</h3>
                        <p className="text-2xl font-bold text-emerald-600">23</p>
                        <p className="text-sm text-emerald-600/70">Active listings</p>
                      </CardContent>
                    </Card>
                  </div>
                  
                  <div className="text-center py-8 text-emerald-600">
                    <Database className="w-12 h-12 mx-auto mb-4 text-emerald-400" />
                    <p>Database management tools coming soon...</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Odoo Integration Tab */}
          <TabsContent value="odoo">
            <Card className="bg-gradient-to-br from-white/80 to-emerald-50/80 backdrop-blur-md border-emerald-200/50">
              <CardHeader>
                <CardTitle className="text-emerald-900">Odoo Integration Status</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Card className="bg-gradient-to-br from-white/90 to-emerald-50/90 border-emerald-200/50 hover:shadow-lg transition-all duration-300">
                      <CardContent className="p-4">
                        <h3 className="font-semibold mb-2 text-emerald-800">Connection Status</h3>
                        <div className="flex items-center space-x-2">
                          <div className="w-3 h-3 bg-emerald-500 rounded-full"></div>
                          <span className="text-sm text-emerald-600">Connected</span>
                        </div>
                      </CardContent>
                    </Card>
                    <Card className="bg-gradient-to-br from-white/90 to-emerald-50/90 border-emerald-200/50 hover:shadow-lg transition-all duration-300">
                      <CardContent className="p-4">
                        <h3 className="font-semibold mb-2 text-emerald-800">Sync Status</h3>
                        <div className="flex items-center space-x-2">
                          <div className="w-3 h-3 bg-emerald-600 rounded-full"></div>
                          <span className="text-sm text-emerald-700">Active</span>
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  <div>
                    <h3 className="font-semibold mb-4 text-emerald-800">Webhook Endpoints</h3>
                    <div className="space-y-2 bg-emerald-50/50 p-4 rounded-lg text-sm border border-emerald-200/50">
                      <p className="text-emerald-800"><strong>Seller Approval:</strong> /functions/v1/seller-approval-webhook</p>
                      <p className="text-emerald-800"><strong>Product Approval:</strong> /functions/v1/product-approval-webhook</p>
                      <p className="text-emerald-800"><strong>Livestock Approval:</strong> /functions/v1/livestock-approval-webhook</p>
                    </div>
                  </div>

                  <div>
                    <h3 className="font-semibold mb-4 text-emerald-800">Recent Sync Activity</h3>
                    <div className="space-y-2">
                      <div className="flex justify-between items-center p-2 bg-emerald-50 rounded border border-emerald-200/50">
                        <span className="text-sm text-emerald-800">Seller Registration</span>
                        <span className="text-xs text-emerald-600">2 minutes ago</span>
                      </div>
                      <div className="flex justify-between items-center p-2 bg-emerald-50 rounded border border-emerald-200/50">  
                        <span className="text-sm text-emerald-800">Product Sync</span>
                        <span className="text-xs text-emerald-600">15 minutes ago</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* SMS Integration Tab */}
          <TabsContent value="sms">
            <Card className="bg-gradient-to-br from-white/80 to-emerald-50/80 backdrop-blur-md border-emerald-200/50">
              <CardHeader>
                <CardTitle className="text-emerald-900">SMS Integration</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Card className="bg-gradient-to-br from-white/90 to-emerald-50/90 border-emerald-200/50 hover:shadow-lg transition-all duration-300">
                      <CardContent className="p-4">
                        <h3 className="font-semibold mb-2 text-emerald-800">SMS Sent Today</h3>
                        <p className="text-2xl font-bold text-emerald-600">47</p>
                        <p className="text-sm text-emerald-600/70">OTP & notifications</p>
                      </CardContent>
                    </Card>
                    <Card className="bg-gradient-to-br from-white/90 to-emerald-50/90 border-emerald-200/50 hover:shadow-lg transition-all duration-300">
                      <CardContent className="p-4">
                        <h3 className="font-semibold mb-2 text-emerald-800">Success Rate</h3>
                        <p className="text-2xl font-bold text-emerald-600">98.2%</p>
                        <p className="text-sm text-emerald-600/70">Delivery success</p>
                      </CardContent>
                    </Card>
                    <Card className="bg-gradient-to-br from-white/90 to-emerald-50/90 border-emerald-200/50 hover:shadow-lg transition-all duration-300">
                      <CardContent className="p-4">
                        <h3 className="font-semibold mb-2 text-emerald-800">Failed SMS</h3>
                        <p className="text-2xl font-bold text-red-600">1</p>
                        <p className="text-sm text-emerald-600/70">Retry pending</p>
                      </CardContent>
                    </Card>
                  </div>

                  <div>
                    <h3 className="font-semibold mb-4 text-emerald-800">Recent SMS Activity</h3>
                    <div className="space-y-2">
                      <div className="flex justify-between items-center p-2 bg-emerald-50 rounded border border-emerald-200/50">
                        <span className="text-sm text-emerald-800">OTP to +91-9876543210</span>
                        <span className="text-xs text-emerald-600">Delivered - 1 min ago</span>
                      </div>
                      <div className="flex justify-between items-center p-2 bg-emerald-50 rounded border border-emerald-200/50">
                        <span className="text-sm text-emerald-800">Registration confirmation to +91-9876543211</span>
                        <span className="text-xs text-emerald-600">Delivered - 5 min ago</span>
                      </div>
                      <div className="flex justify-between items-center p-2 bg-red-50 rounded border border-red-200/50">
                        <span className="text-sm text-emerald-800">OTP to +91-9876543212</span>
                        <span className="text-xs text-red-600">Failed - 10 min ago</span>
                      </div>
                    </div>
                  </div>

                  <div className="text-center py-4">
                    <Button variant="outline" className="border-emerald-300 text-emerald-700 hover:bg-emerald-100 hover:border-emerald-400 transition-all duration-300">
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
            <Card className="bg-gradient-to-br from-white/80 to-emerald-50/80 backdrop-blur-md border-emerald-200/50">
              <CardHeader>
                <CardTitle className="text-emerald-900">System Settings</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div>
                    <h3 className="font-semibold mb-2 text-emerald-800">Environment</h3>
                    <p className="text-sm text-emerald-600">Development Mode: Active</p>
                    <p className="text-sm text-emerald-600">API Monitoring: Enabled</p>
                  </div>
                  
                  <div>
                    <h3 className="font-semibold mb-2 text-emerald-800">System Information</h3>
                    <div className="bg-emerald-50/50 p-4 rounded-lg text-sm space-y-1 border border-emerald-200/50">
                      <p className="text-emerald-800"><strong>Build Version:</strong> 1.0.0</p>
                      <p className="text-emerald-800"><strong>Last Deploy:</strong> {new Date().toLocaleString()}</p>
                      <p className="text-emerald-800"><strong>Environment:</strong> Development</p>
                    </div>
                  </div>
                  
                  <div className="text-center py-8 text-emerald-600">
                    <Settings className="w-12 h-12 mx-auto mb-4 text-emerald-400" />
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
