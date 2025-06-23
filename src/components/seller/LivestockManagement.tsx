
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Plus } from 'lucide-react';
import { SellerProfile } from '@/hooks/useSellerData';
import LivestockListingForm from './LivestockListingForm';

interface LivestockManagementProps {
  sellerProfile: SellerProfile;
  onStatusToggle: (status: boolean) => void;
}

const LivestockManagement = ({ sellerProfile, onStatusToggle }: LivestockManagementProps) => {
  const [showListingForm, setShowListingForm] = useState(false);

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
            <Button onClick={() => setShowListingForm(true)}>
              <Plus className="w-4 h-4 mr-2" />
              Add Listing
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent>
          {showListingForm ? (
            <LivestockListingForm 
              sellerId={sellerProfile.id}
              onClose={() => setShowListingForm(false)}
              onSuccess={() => setShowListingForm(false)}
            />
          ) : (
            <div className="text-center py-8 text-gray-500">
              <p>No livestock listings yet.</p>
              <p className="text-sm">Click "Add Listing" to start listing your livestock.</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default LivestockManagement;
