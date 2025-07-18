import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Edit, MapPin, Phone, Mail, Building, CreditCard, Settings, Save, X } from 'lucide-react';
import { SellerProfile, useSellerData } from '@/hooks/useSellerData';
import GoogleMap from '@/components/GoogleMap';
import { toast } from 'sonner';

interface EditableAccountDetailsProps {
  sellerProfile: SellerProfile;
}

const EditableAccountDetails = ({ sellerProfile }: EditableAccountDetailsProps) => {
  const { updateSellerProfile } = useSellerData();
  const [editingSection, setEditingSection] = useState<string | null>(null);
  const [formData, setFormData] = useState<Partial<SellerProfile>>({});
  const [saving, setSaving] = useState(false);

  const handleEdit = (section: string) => {
    setEditingSection(section);
    setFormData(sellerProfile);
  };

  const handleCancel = () => {
    setEditingSection(null);
    setFormData({});
  };

  const handleSave = async () => {
    if (!editingSection) return;
    
    setSaving(true);
    try {
      // Filter out only the fields that are relevant to the current section
      const updates: Partial<SellerProfile> = {};
      
      if (editingSection === 'business') {
        updates.seller_name = formData.seller_name;
        updates.business_logo_url = formData.business_logo_url;
      } else if (editingSection === 'contact') {
        updates.contact_email = formData.contact_email;
        updates.contact_phone = formData.contact_phone;
        updates.business_address = formData.business_address;
        updates.business_city = formData.business_city;
        updates.business_pincode = formData.business_pincode;
      } else if (editingSection === 'financial') {
        updates.gstin = formData.gstin;
        updates.fssai_license = formData.fssai_license;
        updates.bank_account_number = formData.bank_account_number;
        updates.ifsc_code = formData.ifsc_code;
        updates.account_holder_name = formData.account_holder_name;
        updates.aadhaar_number = formData.aadhaar_number;
      } else if (editingSection === 'preferences') {
        updates.notification_email = formData.notification_email;
        updates.notification_sms = formData.notification_sms;
        updates.notification_push = formData.notification_push;
      }

      await updateSellerProfile(updates);
      setEditingSection(null);
      setFormData({});
    } catch (error) {
      console.error('Failed to save changes:', error);
    } finally {
      setSaving(false);
    }
  };

  const updateFormField = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
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
            {editingSection === 'business' ? (
              <div className="flex space-x-2">
                <Button variant="outline" size="sm" onClick={handleCancel}>
                  <X className="w-4 h-4 mr-2" />
                  Cancel
                </Button>
                <Button size="sm" onClick={handleSave} disabled={saving}>
                  <Save className="w-4 h-4 mr-2" />
                  {saving ? 'Saving...' : 'Save'}
                </Button>
              </div>
            ) : (
              <Button variant="outline" size="sm" onClick={() => handleEdit('business')}>
                <Edit className="w-4 h-4 mr-2" />
                Edit Business Info
              </Button>
            )}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {editingSection === 'business' ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="seller_name">Shop/Farm Name</Label>
                <Input
                  id="seller_name"
                  value={formData.seller_name || ''}
                  onChange={(e) => updateFormField('seller_name', e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="business_logo_url">Business Logo URL</Label>
                <Input
                  id="business_logo_url"
                  value={formData.business_logo_url || ''}
                  onChange={(e) => updateFormField('business_logo_url', e.target.value)}
                  placeholder="https://example.com/logo.png"
                />
              </div>
            </div>
          ) : (
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
                  {sellerProfile.business_logo_url ? (
                    <img 
                      src={sellerProfile.business_logo_url} 
                      alt="Business Logo"
                      className="w-full h-full object-cover rounded-lg"
                    />
                  ) : (
                    <Building className="w-8 h-8 text-gray-400" />
                  )}
                </div>
              </div>
            </div>
          )}
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
            {editingSection === 'contact' ? (
              <div className="flex space-x-2">
                <Button variant="outline" size="sm" onClick={handleCancel}>
                  <X className="w-4 h-4 mr-2" />
                  Cancel
                </Button>
                <Button size="sm" onClick={handleSave} disabled={saving}>
                  <Save className="w-4 h-4 mr-2" />
                  {saving ? 'Saving...' : 'Save'}
                </Button>
              </div>
            ) : (
              <Button variant="outline" size="sm" onClick={() => handleEdit('contact')}>
                <Edit className="w-4 h-4 mr-2" />
                Edit Contact & Location
              </Button>
            )}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {editingSection === 'contact' ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="contact_email">Email Address</Label>
                <Input
                  id="contact_email"
                  type="email"
                  value={formData.contact_email || ''}
                  onChange={(e) => updateFormField('contact_email', e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="contact_phone">Phone Number</Label>
                <Input
                  id="contact_phone"
                  value={formData.contact_phone || ''}
                  onChange={(e) => updateFormField('contact_phone', e.target.value)}
                />
              </div>
              <div className="col-span-2">
                <Label htmlFor="business_address">Shop/Farm Address</Label>
                <Textarea
                  id="business_address"
                  value={formData.business_address || ''}
                  onChange={(e) => updateFormField('business_address', e.target.value)}
                  rows={3}
                />
              </div>
              <div>
                <Label htmlFor="business_city">City</Label>
                <Input
                  id="business_city"
                  value={formData.business_city || ''}
                  onChange={(e) => updateFormField('business_city', e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="business_pincode">Pincode</Label>
                <Input
                  id="business_pincode"
                  value={formData.business_pincode || ''}
                  onChange={(e) => updateFormField('business_pincode', e.target.value)}
                />
              </div>
            </div>
          ) : (
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
                <p className="text-gray-900">{sellerProfile.business_address || 'Not provided'}</p>
                {sellerProfile.business_city && (
                  <p className="text-gray-600 text-sm">{sellerProfile.business_city} - {sellerProfile.business_pincode}</p>
                )}
              </div>
              <div className="col-span-2">
                <label className="text-sm font-medium text-emerald-700">Location on Map</label>
                <GoogleMap 
                  latitude={28.6139} 
                  longitude={77.2090} 
                  zoom={15}
                  address={`${sellerProfile.seller_name} - Shop/Farm Location`}
                  className="mt-2"
                />
              </div>
            </div>
          )}
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
            {editingSection === 'financial' ? (
              <div className="flex space-x-2">
                <Button variant="outline" size="sm" onClick={handleCancel}>
                  <X className="w-4 h-4 mr-2" />
                  Cancel
                </Button>
                <Button size="sm" onClick={handleSave} disabled={saving}>
                  <Save className="w-4 h-4 mr-2" />
                  {saving ? 'Saving...' : 'Save'}
                </Button>
              </div>
            ) : (
              <Button variant="outline" size="sm" onClick={() => handleEdit('financial')}>
                <Edit className="w-4 h-4 mr-2" />
                Edit Financial Details
              </Button>
            )}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {editingSection === 'financial' ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="gstin">GSTIN</Label>
                <Input
                  id="gstin"
                  value={formData.gstin || ''}
                  onChange={(e) => updateFormField('gstin', e.target.value)}
                  placeholder="22AAAAA0000A1Z5"
                />
              </div>
              {(sellerProfile.seller_type === 'Meat' || sellerProfile.seller_type === 'Both') && (
                <div>
                  <Label htmlFor="fssai_license">FSSAI License Number</Label>
                  <Input
                    id="fssai_license"
                    value={formData.fssai_license || ''}
                    onChange={(e) => updateFormField('fssai_license', e.target.value)}
                    placeholder="12345678901234"
                  />
                </div>
              )}
              <div>
                <Label htmlFor="account_holder_name">Account Holder Name</Label>
                <Input
                  id="account_holder_name"
                  value={formData.account_holder_name || ''}
                  onChange={(e) => updateFormField('account_holder_name', e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="bank_account_number">Bank Account Number</Label>
                <Input
                  id="bank_account_number"
                  value={formData.bank_account_number || ''}
                  onChange={(e) => updateFormField('bank_account_number', e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="ifsc_code">IFSC Code</Label>
                <Input
                  id="ifsc_code"
                  value={formData.ifsc_code || ''}
                  onChange={(e) => updateFormField('ifsc_code', e.target.value)}
                  placeholder="ABCD0001234"
                />
              </div>
              <div>
                <Label htmlFor="aadhaar_number">Aadhaar Number</Label>
                <Input
                  id="aadhaar_number"
                  value={formData.aadhaar_number || ''}
                  onChange={(e) => updateFormField('aadhaar_number', e.target.value)}
                  placeholder="XXXX XXXX XXXX"
                />
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-gray-600">GSTIN</label>
                <p className="text-gray-900 font-mono">{sellerProfile.gstin || 'Not provided'}</p>
              </div>
              {(sellerProfile.seller_type === 'Meat' || sellerProfile.seller_type === 'Both') && (
                <div>
                  <label className="text-sm font-medium text-gray-600">FSSAI License Number</label>
                  <p className="text-gray-900 font-mono">{sellerProfile.fssai_license || 'Not provided'}</p>
                </div>
              )}
              <div>
                <label className="text-sm font-medium text-gray-600">Account Holder Name</label>
                <p className="text-gray-900">{sellerProfile.account_holder_name || 'Not provided'}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-600">Bank Account Number</label>
                <p className="text-gray-900 font-mono">
                  {sellerProfile.bank_account_number 
                    ? `${'*'.repeat(Math.max(0, sellerProfile.bank_account_number.length - 4))}${sellerProfile.bank_account_number.slice(-4)}`
                    : 'Not provided'
                  }
                </p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-600">IFSC Code</label>
                <p className="text-gray-900 font-mono">{sellerProfile.ifsc_code || 'Not provided'}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-600">Aadhaar Number</label>
                <p className="text-gray-900 font-mono">
                  {sellerProfile.aadhaar_number 
                    ? `XXXX XXXX ${sellerProfile.aadhaar_number.slice(-4)}`
                    : 'Not provided'
                  }
                </p>
              </div>
            </div>
          )}
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
            {editingSection === 'preferences' ? (
              <div className="flex space-x-2">
                <Button variant="outline" size="sm" onClick={handleCancel}>
                  <X className="w-4 h-4 mr-2" />
                  Cancel
                </Button>
                <Button size="sm" onClick={handleSave} disabled={saving}>
                  <Save className="w-4 h-4 mr-2" />
                  {saving ? 'Saving...' : 'Save'}
                </Button>
              </div>
            ) : (
              <Button variant="outline" size="sm" onClick={() => handleEdit('preferences')}>
                <Edit className="w-4 h-4 mr-2" />
                Edit Preferences
              </Button>
            )}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-3">
            <div>
              <label className="text-sm font-medium text-gray-600 mb-2 block">Notification Preferences</label>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label htmlFor="notification_email">Email notifications for new orders</Label>
                  {editingSection === 'preferences' ? (
                    <Switch
                      id="notification_email"
                      checked={formData.notification_email ?? sellerProfile.notification_email ?? true}
                      onCheckedChange={(checked) => updateFormField('notification_email', checked)}
                    />
                  ) : (
                    <span className="text-sm text-gray-600">
                      {sellerProfile.notification_email ? 'Enabled' : 'Disabled'}
                    </span>
                  )}
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="notification_sms">SMS for low stock alerts</Label>
                  {editingSection === 'preferences' ? (
                    <Switch
                      id="notification_sms"
                      checked={formData.notification_sms ?? sellerProfile.notification_sms ?? true}
                      onCheckedChange={(checked) => updateFormField('notification_sms', checked)}
                    />
                  ) : (
                    <span className="text-sm text-gray-600">
                      {sellerProfile.notification_sms ? 'Enabled' : 'Disabled'}
                    </span>
                  )}
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="notification_push">App Push Notifications</Label>
                  {editingSection === 'preferences' ? (
                    <Switch
                      id="notification_push"
                      checked={formData.notification_push ?? sellerProfile.notification_push ?? false}
                      onCheckedChange={(checked) => updateFormField('notification_push', checked)}
                    />
                  ) : (
                    <span className="text-sm text-gray-600">
                      {sellerProfile.notification_push ? 'Enabled' : 'Disabled'}
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default EditableAccountDetails;