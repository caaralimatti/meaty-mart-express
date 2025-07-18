import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Checkbox } from '@/components/ui/checkbox';
import { useToast } from '@/hooks/use-toast';
import { User, Building, CreditCard, Bell, ArrowRight, ArrowLeft } from 'lucide-react';

export interface ExtendedCustomerData {
  // Basic Info
  fullName: string;
  phoneNumber: string;
  email?: string;
  address?: string;
  
  // Business Info
  businessAddress?: string;
  businessCity?: string;
  businessPincode?: string;
  gstin?: string;
  fssaiLicense?: string;
  businessLogoUrl?: string;
  aadhaarNumber?: string;
  
  // Banking Info
  bankAccountNumber?: string;
  ifscCode?: string;
  accountHolderName?: string;
  
  // Notifications
  notificationEmail?: boolean;
  notificationSms?: boolean;
  notificationPush?: boolean;
  
  // Location
  latitude?: number;
  longitude?: number;
}

interface CustomerRegistrationFormProps {
  onSubmit: (data: ExtendedCustomerData) => void;
  isLoading?: boolean;
  initialData?: Partial<ExtendedCustomerData>;
}

export const CustomerRegistrationForm = ({ 
  onSubmit, 
  isLoading = false, 
  initialData = {} 
}: CustomerRegistrationFormProps) => {
  const [activeTab, setActiveTab] = useState('basic');
  const [formData, setFormData] = useState<ExtendedCustomerData>({
    fullName: '',
    phoneNumber: '',
    email: '',
    address: '',
    businessAddress: '',
    businessCity: '',
    businessPincode: '',
    gstin: '',
    fssaiLicense: '',
    bankAccountNumber: '',
    ifscCode: '',
    accountHolderName: '',
    aadhaarNumber: '',
    notificationEmail: true,
    notificationSms: true,
    notificationPush: false,
    ...initialData
  });

  const { toast } = useToast();

  const handleInputChange = (field: keyof ExtendedCustomerData, value: string | boolean) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.fullName || !formData.phoneNumber) {
      toast({
        title: "Required Fields Missing",
        description: "Please fill in your name and phone number",
        variant: "destructive",
      });
      return;
    }

    onSubmit(formData);
  };

  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setFormData(prev => ({
            ...prev,
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
          }));
          toast({
            title: "Location Added",
            description: "Your location has been captured for better delivery service",
          });
        },
        (error) => {
          console.error('Error getting location:', error);
          toast({
            title: "Location Error",
            description: "Unable to get your location. You can skip this step.",
            variant: "destructive",
          });
        }
      );
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-emerald-700">
            <User className="w-5 h-5" />
            Customer Registration
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="basic">Basic</TabsTrigger>
                <TabsTrigger value="business">Business</TabsTrigger>
                <TabsTrigger value="banking">Banking</TabsTrigger>
                <TabsTrigger value="preferences">Preferences</TabsTrigger>
              </TabsList>

              <TabsContent value="basic" className="space-y-4">
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="fullName">Full Name *</Label>
                    <Input
                      id="fullName"
                      value={formData.fullName}
                      onChange={(e) => handleInputChange('fullName', e.target.value)}
                      placeholder="Enter your full name"
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="phoneNumber">Phone Number *</Label>
                    <Input
                      id="phoneNumber"
                      value={formData.phoneNumber}
                      onChange={(e) => handleInputChange('phoneNumber', e.target.value)}
                      placeholder="Enter your phone number"
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="email">Email Address</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      placeholder="Enter your email address"
                    />
                  </div>

                  <div>
                    <Label htmlFor="address">Delivery Address</Label>
                    <Input
                      id="address"
                      value={formData.address}
                      onChange={(e) => handleInputChange('address', e.target.value)}
                      placeholder="Enter your delivery address"
                    />
                  </div>

                  <Button 
                    type="button" 
                    variant="outline" 
                    onClick={getCurrentLocation}
                    className="w-full"
                  >
                    📍 Add Current Location
                  </Button>
                </div>

                <div className="flex justify-end">
                  <Button 
                    type="button" 
                    onClick={() => setActiveTab('business')}
                    className="bg-emerald-600 hover:bg-emerald-700"
                  >
                    Next <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </div>
              </TabsContent>

              <TabsContent value="business" className="space-y-4">
                <div className="flex items-center gap-2 mb-4">
                  <Building className="w-5 h-5 text-emerald-600" />
                  <h3 className="text-lg font-semibold">Business Information (Optional)</h3>
                </div>

                <div className="space-y-4">
                  <div>
                    <Label htmlFor="businessAddress">Business Address</Label>
                    <Input
                      id="businessAddress"
                      value={formData.businessAddress}
                      onChange={(e) => handleInputChange('businessAddress', e.target.value)}
                      placeholder="Enter your business address"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="businessCity">Business City</Label>
                      <Input
                        id="businessCity"
                        value={formData.businessCity}
                        onChange={(e) => handleInputChange('businessCity', e.target.value)}
                        placeholder="City"
                      />
                    </div>
                    <div>
                      <Label htmlFor="businessPincode">PIN Code</Label>
                      <Input
                        id="businessPincode"
                        value={formData.businessPincode}
                        onChange={(e) => handleInputChange('businessPincode', e.target.value)}
                        placeholder="PIN Code"
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="gstin">GSTIN</Label>
                    <Input
                      id="gstin"
                      value={formData.gstin}
                      onChange={(e) => handleInputChange('gstin', e.target.value)}
                      placeholder="Enter GSTIN number"
                    />
                  </div>

                  <div>
                    <Label htmlFor="fssaiLicense">FSSAI License</Label>
                    <Input
                      id="fssaiLicense"
                      value={formData.fssaiLicense}
                      onChange={(e) => handleInputChange('fssaiLicense', e.target.value)}
                      placeholder="Enter FSSAI license number"
                    />
                  </div>

                  <div>
                    <Label htmlFor="aadhaarNumber">Aadhaar Number</Label>
                    <Input
                      id="aadhaarNumber"
                      value={formData.aadhaarNumber}
                      onChange={(e) => handleInputChange('aadhaarNumber', e.target.value)}
                      placeholder="Enter Aadhaar number"
                    />
                  </div>
                </div>

                <div className="flex justify-between">
                  <Button 
                    type="button" 
                    variant="outline" 
                    onClick={() => setActiveTab('basic')}
                  >
                    <ArrowLeft className="w-4 h-4 mr-2" /> Previous
                  </Button>
                  <Button 
                    type="button" 
                    onClick={() => setActiveTab('banking')}
                    className="bg-emerald-600 hover:bg-emerald-700"
                  >
                    Next <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </div>
              </TabsContent>

              <TabsContent value="banking" className="space-y-4">
                <div className="flex items-center gap-2 mb-4">
                  <CreditCard className="w-5 h-5 text-emerald-600" />
                  <h3 className="text-lg font-semibold">Banking Information (Optional)</h3>
                </div>

                <div className="space-y-4">
                  <div>
                    <Label htmlFor="bankAccountNumber">Bank Account Number</Label>
                    <Input
                      id="bankAccountNumber"
                      value={formData.bankAccountNumber}
                      onChange={(e) => handleInputChange('bankAccountNumber', e.target.value)}
                      placeholder="Enter bank account number"
                    />
                  </div>

                  <div>
                    <Label htmlFor="ifscCode">IFSC Code</Label>
                    <Input
                      id="ifscCode"
                      value={formData.ifscCode}
                      onChange={(e) => handleInputChange('ifscCode', e.target.value)}
                      placeholder="Enter IFSC code"
                    />
                  </div>

                  <div>
                    <Label htmlFor="accountHolderName">Account Holder Name</Label>
                    <Input
                      id="accountHolderName"
                      value={formData.accountHolderName}
                      onChange={(e) => handleInputChange('accountHolderName', e.target.value)}
                      placeholder="Enter account holder name"
                    />
                  </div>
                </div>

                <div className="flex justify-between">
                  <Button 
                    type="button" 
                    variant="outline" 
                    onClick={() => setActiveTab('business')}
                  >
                    <ArrowLeft className="w-4 h-4 mr-2" /> Previous
                  </Button>
                  <Button 
                    type="button" 
                    onClick={() => setActiveTab('preferences')}
                    className="bg-emerald-600 hover:bg-emerald-700"
                  >
                    Next <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </div>
              </TabsContent>

              <TabsContent value="preferences" className="space-y-4">
                <div className="flex items-center gap-2 mb-4">
                  <Bell className="w-5 h-5 text-emerald-600" />
                  <h3 className="text-lg font-semibold">Notification Preferences</h3>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="notificationEmail"
                      checked={formData.notificationEmail}
                      onCheckedChange={(checked) => handleInputChange('notificationEmail', checked)}
                    />
                    <Label htmlFor="notificationEmail">Email Notifications</Label>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="notificationSms"
                      checked={formData.notificationSms}
                      onCheckedChange={(checked) => handleInputChange('notificationSms', checked)}
                    />
                    <Label htmlFor="notificationSms">SMS Notifications</Label>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="notificationPush"
                      checked={formData.notificationPush}
                      onCheckedChange={(checked) => handleInputChange('notificationPush', checked)}
                    />
                    <Label htmlFor="notificationPush">Push Notifications</Label>
                  </div>
                </div>

                <div className="flex justify-between">
                  <Button 
                    type="button" 
                    variant="outline" 
                    onClick={() => setActiveTab('banking')}
                  >
                    <ArrowLeft className="w-4 h-4 mr-2" /> Previous
                  </Button>
                  <Button 
                    type="submit" 
                    disabled={isLoading}
                    className="bg-emerald-600 hover:bg-emerald-700"
                  >
                    {isLoading ? 'Creating Account...' : 'Complete Registration'}
                  </Button>
                </div>
              </TabsContent>
            </Tabs>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};