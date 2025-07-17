
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Plus } from 'lucide-react';
import { SellerProfile } from '@/hooks/useSellerData';
import LivestockListingForm from './LivestockListingForm';
import LivestockListingsList from './LivestockListingsList';

interface LivestockManagementProps {
  sellerProfile: SellerProfile;
  onStatusToggle: (status: boolean) => void;
  canAddProducts?: boolean;
}

const LivestockManagement = ({ sellerProfile, onStatusToggle, canAddProducts = true }: LivestockManagementProps) => {
  const [showListingForm, setShowListingForm] = useState(false);
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  return (
    <div className="space-y-6">
      {/* Livestock Status Card */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            Livestock Status
            <div className="flex items-center space-x-2">
              <Label htmlFor="livestock-status">
                {sellerProfile.livestock_status ? 'Open' : 'Closed'}
              </Label>
              <Switch
                id="livestock-status"
                checked={sellerProfile.livestock_status}
                onCheckedChange={onStatusToggle}
              />
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-gray-600">
            {sellerProfile.livestock_status 
              ? 'Your livestock section is currently open and visible to customers.'
              : 'Your livestock section is currently closed. Listings are not visible to customers.'}
          </p>
        </CardContent>
      </Card>

      {/* Livestock Listings Management */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            Livestock Listings
            <Button 
              onClick={() => setShowListingForm(true)}
              disabled={!canAddProducts}
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Listing
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent>
          {!canAddProducts && (
            <div className="mb-4 p-3 bg-yellow-50 border border-yellow-200 rounded-md">
              <p className="text-sm text-yellow-800">
                Livestock listing is disabled until your seller account is approved.
              </p>
            </div>
          )}
          {showListingForm ? (
            <LivestockListingForm 
              sellerId={sellerProfile.id}
              onClose={() => setShowListingForm(false)}
              onSuccess={() => {
                setShowListingForm(false);
                setRefreshTrigger(prev => prev + 1);
              }}
            />
          ) : (
            <LivestockListingsList 
              sellerId={sellerProfile.id}
              refreshTrigger={refreshTrigger}
            />
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default LivestockManagement;
