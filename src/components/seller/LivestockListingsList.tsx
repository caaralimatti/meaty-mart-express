import { useState, useEffect } from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { RefreshCw } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

interface LivestockListing {
  id: string;
  name: string;
  category: string;
  unit_price: number | null;
  pricing_type: 'Fixed' | 'Negotiable';
  approval_status: 'pending' | 'approved' | 'rejected';
  created_at: string;
  description: string | null;
  transportation_type: 'Aggregator' | 'Seller';
}

interface LivestockListingsListProps {
  sellerId: string;
  refreshTrigger: number;
}

const LivestockListingsList = ({ sellerId, refreshTrigger }: LivestockListingsListProps) => {
  const [listings, setListings] = useState<LivestockListing[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchListings = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('livestock_listings')
        .select('*')
        .eq('seller_id', sellerId)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setListings(data || []);
    } catch (error) {
      console.error('Error fetching listings:', error);
      toast.error('Failed to fetch livestock listings');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchListings();
  }, [sellerId, refreshTrigger]);

  const getStatusBadge = (status: LivestockListing['approval_status']) => {
    switch (status) {
      case 'approved':
        return <Badge variant="default" className="bg-green-100 text-green-800">Approved</Badge>;
      case 'rejected':
        return <Badge variant="destructive">Rejected</Badge>;
      default:
        return <Badge variant="secondary">Pending</Badge>;
    }
  };

  const formatPrice = (price: number | null, pricingType: string) => {
    if (!price) return pricingType === 'Negotiable' ? 'Negotiable' : 'N/A';
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 2,
    }).format(price);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-8">
        <RefreshCw className="w-6 h-6 animate-spin" />
        <span className="ml-2">Loading livestock listings...</span>
      </div>
    );
  }

  if (listings.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        <p>No livestock listings added yet.</p>
        <p className="text-sm">Click "Add Livestock" to start listing your animals.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">Your Livestock Listings ({listings.length})</h3>
        <Button
          variant="outline"
          size="sm"
          onClick={fetchListings}
          disabled={loading}
        >
          <RefreshCw className="w-4 h-4 mr-2" />
          Refresh
        </Button>
      </div>

      <div className="border rounded-lg overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Livestock Name</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Transportation</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Added Date</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {listings.map((listing) => (
              <TableRow key={listing.id}>
                <TableCell className="font-medium">
                  <div>
                    <div className="font-medium">{listing.name}</div>
                    {listing.description && (
                      <div className="text-sm text-gray-500 truncate max-w-xs">
                        {listing.description}
                      </div>
                    )}
                  </div>
                </TableCell>
                <TableCell>{listing.category}</TableCell>
                <TableCell>{formatPrice(listing.unit_price, listing.pricing_type)}</TableCell>
                <TableCell>{listing.transportation_type}</TableCell>
                <TableCell>{getStatusBadge(listing.approval_status)}</TableCell>
                <TableCell>{formatDate(listing.created_at)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default LivestockListingsList;