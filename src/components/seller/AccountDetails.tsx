
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Edit, MapPin, Phone, Mail, Building, CreditCard, Settings } from 'lucide-react';
import { SellerProfile } from '@/hooks/useSellerData';

interface AccountDetailsProps {
  sellerProfile: SellerProfile;
}

const AccountDetails = ({ sellerProfile }: AccountDetailsProps) => {
  const [editingSection, setEditingSection] = useState<string | null>(null);

  const handleEdit = (section: string) => {
    setEditingSection(section);
    console.log(`Editing ${section} section`);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-800">Account Details</h2>
        <Badge variant="outline" className="text-sm">
          {sellerProfile.seller_type} Seller
        </Badge>
      </div>

      {/* Business Information */}
      <Card className="border-l-4 border-l-orange-500">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Building className="w-5 h-5 text-orange-500" />
              <span>Business Information</span>
            </div>
            <Button variant="outline" size="sm" onClick={() => handleEdit('business')}>
              <Edit className="w-4 h-4 mr-2" />
              Edit Business Info
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium text-gray-600">Shop/Farm Name</label>
              <p className="text-gray-900 font-medium">{sellerProfile.seller_name}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-600">Business Type</label>
              <p className="text-gray-900 font-medium">{sellerProfile.seller_type}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-600">Contact Person</label>
              <p className="text-gray-900 font-medium">{sellerProfile.seller_name}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-600">Business Logo</label>
              <div className="w-16 h-16 bg-gray-200 rounded-lg flex items-center justify-center">
                <Building className="w-8 h-8 text-gray-400" />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Contact & Location */}
      <Card className="border-l-4 border-l-blue-500">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <MapPin className="w-5 h-5 text-blue-500" />
              <span>Contact & Location</span>
            </div>
            <Button variant="outline" size="sm" onClick={() => handleEdit('contact')}>
              <Edit className="w-4 h-4 mr-2" />
              Edit Contact & Location
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium text-gray-600">Registered Email</label>
              <div className="flex items-center space-x-2">
                <Mail className="w-4 h-4 text-gray-400" />
                <p className="text-gray-900">{sellerProfile.contact_email || 'Not provided'}</p>
              </div>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-600">Phone Number</label>
              <div className="flex items-center space-x-2">
                <Phone className="w-4 h-4 text-gray-400" />
                <p className="text-gray-900">{sellerProfile.contact_phone || 'Not provided'}</p>
              </div>
            </div>
            <div className="col-span-2">
              <label className="text-sm font-medium text-gray-600">Shop/Farm Address</label>
              <p className="text-gray-900">123 Farm Street, Agricultural District, State - 123456</p>
            </div>
            <div className="col-span-2">
              <label className="text-sm font-medium text-gray-600">Location on Map</label>
              <div className="w-full h-48 bg-gray-200 rounded-lg flex items-center justify-center">
                <MapPin className="w-8 h-8 text-gray-400" />
                <span className="text-gray-500 ml-2">Map integration pending</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Financial & Legal Details */}
      <Card className="border-l-4 border-l-green-500">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <CreditCard className="w-5 h-5 text-green-500" />
              <span>Financial & Legal Details</span>
            </div>
            <Button variant="outline" size="sm" onClick={() => handleEdit('financial')}>
              <Edit className="w-4 h-4 mr-2" />
              Edit Financial Details
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium text-gray-600">GSTIN</label>
              <p className="text-gray-900 font-mono">22AAAAA0000A1Z5</p>
            </div>
            {(sellerProfile.seller_type === 'Meat' || sellerProfile.seller_type === 'Both') && (
              <div>
                <label className="text-sm font-medium text-gray-600">FSSAI License Number</label>
                <p className="text-gray-900 font-mono">12345678901234</p>
              </div>
            )}
            <div>
              <label className="text-sm font-medium text-gray-600">Bank Account Number</label>
              <p className="text-gray-900 font-mono">************1234</p>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-600">IFSC Code</label>
              <p className="text-gray-900 font-mono">ABCD0001234</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Settings & Preferences */}
      <Card className="border-l-4 border-l-purple-500">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Settings className="w-5 h-5 text-purple-500" />
              <span>Settings & Preferences</span>
            </div>
            <Button variant="outline" size="sm" onClick={() => handleEdit('preferences')}>
              <Edit className="w-4 h-4 mr-2" />
              Edit Preferences
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-3">
            <div>
              <label className="text-sm font-medium text-gray-600">Password</label>
              <p className="text-gray-900 font-mono">••••••••</p>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-600 mb-2 block">Notification Preferences</label>
              <div className="space-y-2">
                <label className="flex items-center space-x-2">
                  <input type="checkbox" defaultChecked className="rounded" />
                  <span className="text-sm">Email for new orders</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input type="checkbox" defaultChecked className="rounded" />
                  <span className="text-sm">SMS for low stock alerts</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input type="checkbox" className="rounded" />
                  <span className="text-sm">App Push Notifications</span>
                </label>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AccountDetails;
