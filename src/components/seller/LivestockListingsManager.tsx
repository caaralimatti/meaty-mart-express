
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Eye, MousePointer, Edit, CheckCircle, Clock, XCircle, Plus } from 'lucide-react';

interface LivestockListingsManagerProps {
  sellerType: 'Meat' | 'Livestock' | 'Both';
}

interface LivestockListing {
  id: string;
  title: string;
  price: number;
  status: 'Approved' | 'Pending' | 'Rejected';
  views: number;
  clicks: number;
  image: string;
  category: string;
}

const LivestockListingsManager = ({ sellerType }: LivestockListingsManagerProps) => {
  const [activeTab, setActiveTab] = useState('approved');

  // Mock data - in real app, this would come from your backend
  const mockListings: LivestockListing[] = [
    {
      id: '1',
      title: 'Healthy Holstein Friesian Cow, 3 Years Old',
      price: 85000,
      status: 'Approved',
      views: 245,
      clicks: 32,
      image: '/placeholder.svg',
      category: 'Cattle'
    },
    {
      id: '2',
      title: 'Premium Angus Bull, 4 Years Old',
      price: 120000,
      status: 'Approved',
      views: 189,
      clicks: 28,
      image: '/placeholder.svg',
      category: 'Cattle'
    },
    {
      id: '3',
      title: 'Young Goat Pair, 8 Months Old',
      price: 15000,
      status: 'Pending',
      views: 67,
      clicks: 12,
      image: '/placeholder.svg',
      category: 'Goat'
    },
    {
      id: '4',
      title: 'Dairy Buffalo, High Milk Yield',
      price: 95000,
      status: 'Rejected',
      views: 23,
      clicks: 3,
      image: '/placeholder.svg',
      category: 'Buffalo'
    }
  ];

  const approvedListings = mockListings.filter(l => l.status === 'Approved');
  const pendingListings = mockListings.filter(l => l.status === 'Pending');
  const rejectedListings = mockListings.filter(l => l.status === 'Rejected');

  const totalViews = mockListings.reduce((sum, listing) => sum + listing.views, 0);
  const totalClicks = mockListings.reduce((sum, listing) => sum + listing.clicks, 0);
  const ctr = totalViews > 0 ? ((totalClicks / totalViews) * 100).toFixed(2) : '0.00';

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Approved':
        return <Badge className="bg-green-100 text-green-800">Approved</Badge>;
      case 'Pending':
        return <Badge className="bg-yellow-100 text-yellow-800">Pending</Badge>;
      case 'Rejected':
        return <Badge className="bg-red-100 text-red-800">Rejected</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  // Don't show this component if seller is not livestock or both
  if (sellerType === 'Meat') {
    return null;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-800">Livestock Listings</h2>
        <Button className="bg-orange-500 hover:bg-orange-600">
          <Plus className="w-4 h-4 mr-2" />
          Add New Listing
        </Button>
      </div>

      {/* KPI Dashboard */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="border-l-4 border-l-blue-500">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 mb-1">Total Views (Last 30 Days)</p>
                <p className="text-3xl font-bold text-gray-900">{totalViews.toLocaleString()}</p>
                <p className="text-sm text-green-600 flex items-center mt-1">
                  <span className="mr-1">+12.5%</span>
                  <span className="text-gray-500">vs last month</span>
                </p>
              </div>
              <Eye className="w-8 h-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-green-500">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 mb-1">Total Clicks (Last 30 Days)</p>
                <p className="text-3xl font-bold text-gray-900">{totalClicks}</p>
                <p className="text-sm text-green-600 flex items-center mt-1">
                  <span className="mr-1">+8.7%</span>
                  <span className="text-gray-500">vs last month</span>
                </p>
              </div>
              <MousePointer className="w-8 h-8 text-green-500" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-orange-500">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 mb-1">Click-Through Rate</p>
                <p className="text-3xl font-bold text-gray-900">{ctr}%</p>
                <p className="text-sm text-gray-500 mt-1">
                  Industry avg: 12.5%
                </p>
              </div>
              <div className="text-orange-500 text-2xl font-bold">CTR</div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Listings Tabs */}
      <Card>
        <CardHeader>
          <CardTitle>My Livestock Listings</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="approved" className="flex items-center space-x-2">
                <CheckCircle className="w-4 h-4" />
                <span>Approved ({approvedListings.length})</span>
              </TabsTrigger>
              <TabsTrigger value="pending" className="flex items-center space-x-2">
                <Clock className="w-4 h-4" />
                <span>Pending ({pendingListings.length})</span>
              </TabsTrigger>
              <TabsTrigger value="rejected" className="flex items-center space-x-2">
                <XCircle className="w-4 h-4" />
                <span>Rejected ({rejectedListings.length})</span>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="approved" className="mt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {approvedListings.map((listing) => (
                  <Card key={listing.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                    <div className="aspect-video bg-gray-200 relative">
                      <img 
                        src={listing.image} 
                        alt={listing.title}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute top-2 right-2">
                        {getStatusBadge(listing.status)}
                      </div>
                    </div>
                    <CardContent className="p-4">
                      <h3 className="font-semibold text-lg mb-2 line-clamp-2">{listing.title}</h3>
                      <p className="text-2xl font-bold text-green-600 mb-3">₹{listing.price.toLocaleString()}</p>
                      
                      <div className="flex justify-between text-sm text-gray-600 mb-4">
                        <div className="flex items-center space-x-1">
                          <Eye className="w-4 h-4" />
                          <span>{listing.views}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <MousePointer className="w-4 h-4" />
                          <span>{listing.clicks}</span>
                        </div>
                      </div>

                      <div className="flex space-x-2">
                        <Button variant="outline" size="sm" className="flex-1">
                          View Details
                        </Button>
                        <Button size="sm" className="flex-1">
                          <Edit className="w-4 h-4 mr-1" />
                          Edit
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="pending" className="mt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {pendingListings.map((listing) => (
                  <Card key={listing.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                    <div className="aspect-video bg-gray-200 relative">
                      <img 
                        src={listing.image} 
                        alt={listing.title}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute top-2 right-2">
                        {getStatusBadge(listing.status)}
                      </div>
                    </div>
                    <CardContent className="p-4">
                      <h3 className="font-semibold text-lg mb-2 line-clamp-2">{listing.title}</h3>
                      <p className="text-2xl font-bold text-green-600 mb-3">₹{listing.price.toLocaleString()}</p>
                      
                      <div className="flex justify-between text-sm text-gray-600 mb-4">
                        <div className="flex items-center space-x-1">
                          <Eye className="w-4 h-4" />
                          <span>{listing.views}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <MousePointer className="w-4 h-4" />
                          <span>{listing.clicks}</span>
                        </div>
                      </div>

                      <div className="flex space-x-2">
                        <Button variant="outline" size="sm" className="flex-1">
                          View Details
                        </Button>
                        <Button size="sm" className="flex-1">
                          <Edit className="w-4 h-4 mr-1" />
                          Edit
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="rejected" className="mt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {rejectedListings.map((listing) => (
                  <Card key={listing.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                    <div className="aspect-video bg-gray-200 relative">
                      <img 
                        src={listing.image} 
                        alt={listing.title}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute top-2 right-2">
                        {getStatusBadge(listing.status)}
                      </div>
                    </div>
                    <CardContent className="p-4">
                      <h3 className="font-semibold text-lg mb-2 line-clamp-2">{listing.title}</h3>
                      <p className="text-2xl font-bold text-green-600 mb-3">₹{listing.price.toLocaleString()}</p>
                      
                      <div className="flex justify-between text-sm text-gray-600 mb-4">
                        <div className="flex items-center space-x-1">
                          <Eye className="w-4 h-4" />
                          <span>{listing.views}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <MousePointer className="w-4 h-4" />
                          <span>{listing.clicks}</span>
                        </div>
                      </div>

                      <div className="flex space-x-2">
                        <Button variant="outline" size="sm" className="flex-1">
                          View Details
                        </Button>
                        <Button size="sm" className="flex-1">
                          <Edit className="w-4 h-4 mr-1" />
                          Edit
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default LivestockListingsManager;
