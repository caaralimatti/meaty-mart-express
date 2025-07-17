
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Plus } from 'lucide-react';
import { SellerProfile } from '@/hooks/useSellerData';
import MeatProductForm from './MeatProductForm';
import MeatProductsList from './MeatProductsList';

interface MeatShopManagementProps {
  sellerProfile: SellerProfile;
  onStatusToggle: (status: boolean) => void;
  canAddProducts?: boolean;
}

const MeatShopManagement = ({ sellerProfile, onStatusToggle, canAddProducts = true }: MeatShopManagementProps) => {
  const [showProductForm, setShowProductForm] = useState(false);
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  return (
    <div className="space-y-6">
      {/* Shop Status Card */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            Meat Shop Status
            <div className="flex items-center space-x-2">
              <Label htmlFor="meat-shop-status">
                {sellerProfile.meat_shop_status ? 'Open' : 'Closed'}
              </Label>
              <Switch
                id="meat-shop-status"
                checked={sellerProfile.meat_shop_status}
                onCheckedChange={onStatusToggle}
              />
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-gray-600">
            {sellerProfile.meat_shop_status 
              ? 'Your meat shop is currently open and visible to customers.'
              : 'Your meat shop is currently closed. Products are not visible to customers.'}
          </p>
        </CardContent>
      </Card>

      {/* Products Management */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            Meat Products
            <Button 
              onClick={() => setShowProductForm(true)}
              disabled={!canAddProducts}
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Product
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent>
          {!canAddProducts && (
            <div className="mb-4 p-3 bg-yellow-50 border border-yellow-200 rounded-md">
              <p className="text-sm text-yellow-800">
                Product addition is disabled until your seller account is approved.
              </p>
            </div>
          )}
          {showProductForm ? (
            <MeatProductForm 
              sellerId={sellerProfile.id}
              onClose={() => setShowProductForm(false)}
              onSuccess={() => {
                setShowProductForm(false);
                setRefreshTrigger(prev => prev + 1);
              }}
            />
          ) : (
            <MeatProductsList 
              sellerId={sellerProfile.id}
              refreshTrigger={refreshTrigger}
            />
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default MeatShopManagement;
