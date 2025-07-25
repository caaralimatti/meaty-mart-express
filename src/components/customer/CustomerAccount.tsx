import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calendar } from '@/components/ui/calendar';
import type { DateRange } from 'react-day-picker';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { 
  User, 
  ShoppingBag, 
  CreditCard, 
  Gift,
  MapPin,
  Phone,
  Mail,
  Calendar as CalendarIcon,
  Filter,
  Search,
  Eye,
  Download,
  Star,
  Edit2,
  Save,
  X,
  Building
} from 'lucide-react';
import { format } from 'date-fns';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';
import { customerService } from '@/services/customerService';
import { LocationPicker } from './LocationPicker';
import { useLocation } from '@/hooks/useLocation';
import { locationService } from '@/services/locationService';

interface CustomerAccountProps {
  isOpen: boolean;
  onClose: () => void;
}

interface CustomerProfile {
  id: string;
  full_name: string;
  phone_number: string;
  email?: string;
  address?: string;
  business_address?: string;
  business_city?: string;
  business_pincode?: string;
  gstin?: string;
  fssai_license?: string;
  bank_account_number?: string;
  ifsc_code?: string;
  account_holder_name?: string;
  business_logo_url?: string;
  aadhaar_number?: string;
  notification_email?: boolean;
  notification_sms?: boolean;
  notification_push?: boolean;
  location_latitude?: number;
  location_longitude?: number;
  created_at: string;
}

interface Order {
  id: string;
  order_number: string;
  status: string;
  total_amount: number;
  payment_status: string;
  created_at: string;
  currency: string;
  delivery_address?: string;
  order_items: OrderItem[];
}

interface OrderItem {
  id: string;
  quantity: number;
  unit_price: number;
  total_price: number;
  product_type: string;
  // Product details would be joined
}

interface Payment {
  id: string;
  amount: number;
  currency: string;
  payment_method: string;
  status: string;
  gateway_transaction_id?: string;
  created_at: string;
  order_id: string;
}

export const CustomerAccount = ({ isOpen, onClose }: CustomerAccountProps) => {
  const [activeTab, setActiveTab] = useState<'profile' | 'orders' | 'payments' | 'loyalty'>('profile');
  const [customerProfile, setCustomerProfile] = useState<CustomerProfile | null>(null);
  const [orders, setOrders] = useState<Order[]>([]);
  const [payments, setPayments] = useState<Payment[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  // Editing state
  const [editingField, setEditingField] = useState<string | null>(null);
  const [editingValue, setEditingValue] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  
  // Filters for orders
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [dateRange, setDateRange] = useState<DateRange | undefined>();
  
  // Location management
  const [isLocationPickerOpen, setIsLocationPickerOpen] = useState(false);
  const { currentLocation, updateLocation } = useLocation();
  
  const { toast } = useToast();

  useEffect(() => {
    if (isOpen) {
      fetchCustomerData();
    }
  }, [isOpen]);

  const fetchCustomerData = async () => {
    try {
      setIsLoading(true);
      
      // Get current session
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) return;

      // Fetch customer profile
      const { data: profile, error: profileError } = await supabase
        .from('customers')
        .select('*')
        .eq('user_id', session.user.id)
        .single();

      if (profileError) throw profileError;
      setCustomerProfile(profile);

      // Fetch orders with items
      const { data: ordersData, error: ordersError } = await supabase
        .from('orders')
        .select(`
          *,
          order_items (
            id,
            quantity,
            unit_price,
            total_price,
            product_type
          )
        `)
        .eq('customer_id', profile.id)
        .order('created_at', { ascending: false });

      if (ordersError) throw ordersError;
      setOrders(ordersData || []);

      // Fetch payments
      const { data: paymentsData, error: paymentsError } = await supabase
        .from('payments')
        .select('*')
        .eq('customer_id', profile.id)
        .order('created_at', { ascending: false });

      if (paymentsError) throw paymentsError;
      setPayments(paymentsData || []);

    } catch (error: any) {
      console.error('Error fetching customer data:', error);
      toast({
        title: "Error",
        description: "Failed to load account data",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'completed': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      case 'processing': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPaymentStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'paid': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'failed': return 'bg-red-100 text-red-800';
      case 'refunded': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const startEditing = (field: string, currentValue: string) => {
    setEditingField(field);
    setEditingValue(currentValue || '');
  };

  const cancelEditing = () => {
    setEditingField(null);
    setEditingValue('');
  };

  const saveField = async () => {
    if (!customerProfile || !editingField) return;

    setIsSaving(true);
    try {
      const result = await customerService.updateProfile(customerProfile.id, {
        [editingField]: editingValue
      });

      if (result.success) {
        setCustomerProfile(prev => prev ? {
          ...prev,
          [editingField]: editingValue
        } : null);
        
        setEditingField(null);
        setEditingValue('');
        
        toast({
          title: "Profile Updated",
          description: "Your profile has been updated successfully",
        });
      } else {
        throw new Error(result.error);
      }
    } catch (error: any) {
      toast({
        title: "Update Failed",
        description: error.message || "Failed to update profile",
        variant: "destructive",
      });
    } finally {
      setIsSaving(false);
    }
  };

  const handleLocationSelect = async (location: { address: string; lat: number; lng: number }) => {
    updateLocation(location);
    
    // Save to customer profile if logged in
    if (customerProfile?.id) {
      try {
        const saved = await locationService.saveCustomerLocation(customerProfile.id, location);
        if (saved) {
          // Update the local customer profile state
          setCustomerProfile(prev => prev ? {
            ...prev,
            address: location.address,
            location_latitude: location.lat,
            location_longitude: location.lng
          } : null);
          
          toast({
            title: "Location Saved",
            description: "Your delivery location has been updated.",
          });
        }
      } catch (error) {
        console.error('Error saving location:', error);
        toast({
          title: "Save Error",
          description: "Location updated locally but failed to save to profile.",
          variant: "destructive",
        });
      }
    }
    
    setIsLocationPickerOpen(false);
  };

  const EditableField = ({ 
    label, 
    field, 
    value, 
    icon: Icon, 
    type = 'text' 
  }: { 
    label: string; 
    field: string; 
    value?: string; 
    icon: any; 
    type?: string; 
  }) => {
    const isEditing = editingField === field;
    
    return (
      <div>
        <Label>{label}</Label>
        <div className="flex items-center gap-2 mt-1">
          <Icon className="w-4 h-4 text-gray-500" />
          {isEditing ? (
            <div className="flex items-center gap-2 flex-1">
              <Input
                type={type}
                value={editingValue}
                onChange={(e) => setEditingValue(e.target.value)}
                className="flex-1"
                autoFocus
              />
              <Button
                size="sm"
                onClick={saveField}
                disabled={isSaving}
                className="bg-emerald-600 hover:bg-emerald-700"
              >
                <Save className="w-4 h-4" />
              </Button>
              <Button
                size="sm"
                variant="outline"
                onClick={cancelEditing}
                disabled={isSaving}
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
          ) : (
            <div className="flex items-center gap-2 flex-1">
              <span className="text-gray-900">{value || 'Not provided'}</span>
              <Button
                size="sm"
                variant="ghost"
                onClick={() => startEditing(field, value || '')}
                className="ml-auto"
              >
                <Edit2 className="w-4 h-4" />
              </Button>
            </div>
          )}
        </div>
      </div>
    );
  };

  const filteredOrders = orders.filter(order => {
    const matchesSearch = order.order_number.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         order.delivery_address?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || order.status.toLowerCase() === statusFilter;
    const matchesDate = !dateRange?.from || !dateRange?.to || 
                       (new Date(order.created_at) >= dateRange.from && 
                        new Date(order.created_at) <= dateRange.to);
    
    return matchesSearch && matchesStatus && matchesDate;
  });

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg w-full max-w-6xl max-h-[90vh] overflow-hidden">
        <div className="flex h-full">
          {/* Sidebar */}
          <div className="w-64 bg-gray-50 p-6 border-r">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center">
                <User className="w-6 h-6 text-emerald-600" />
              </div>
              <div>
                <h2 className="font-semibold text-gray-900">
                  {customerProfile?.full_name || 'Customer'}
                </h2>
                <p className="text-sm text-gray-600">
                  {customerProfile?.phone_number}
                </p>
              </div>
            </div>

            <nav className="space-y-2">
              <button
                onClick={() => setActiveTab('profile')}
                className={cn(
                  "w-full flex items-center gap-3 px-3 py-2 rounded-lg text-left transition-colors",
                  activeTab === 'profile' 
                    ? "bg-emerald-100 text-emerald-700" 
                    : "text-gray-600 hover:bg-gray-100"
                )}
              >
                <User className="w-4 h-4" />
                Profile
              </button>
              
              <button
                onClick={() => setActiveTab('orders')}
                className={cn(
                  "w-full flex items-center gap-3 px-3 py-2 rounded-lg text-left transition-colors",
                  activeTab === 'orders' 
                    ? "bg-emerald-100 text-emerald-700" 
                    : "text-gray-600 hover:bg-gray-100"
                )}
              >
                <ShoppingBag className="w-4 h-4" />
                Orders ({orders.length})
              </button>
              
              <button
                onClick={() => setActiveTab('payments')}
                className={cn(
                  "w-full flex items-center gap-3 px-3 py-2 rounded-lg text-left transition-colors",
                  activeTab === 'payments' 
                    ? "bg-emerald-100 text-emerald-700" 
                    : "text-gray-600 hover:bg-gray-100"
                )}
              >
                <CreditCard className="w-4 h-4" />
                Payments
              </button>
              
              <button
                onClick={() => setActiveTab('loyalty')}
                className={cn(
                  "w-full flex items-center gap-3 px-3 py-2 rounded-lg text-left transition-colors",
                  activeTab === 'loyalty' 
                    ? "bg-emerald-100 text-emerald-700" 
                    : "text-gray-600 hover:bg-gray-100"
                )}
              >
                <Gift className="w-4 h-4" />
                Loyalty Points
              </button>
            </nav>

            <div className="mt-8">
              <Button 
                onClick={onClose} 
                variant="outline" 
                className="w-full"
              >
              Close Account
            </Button>
          </div>
        </div>

        {/* Location Picker Modal */}
        <LocationPicker
          isOpen={isLocationPickerOpen}
          onClose={() => setIsLocationPickerOpen(false)}
          onLocationSelect={handleLocationSelect}
          currentLocation={currentLocation}
        />

          {/* Main Content */}
          <div className="flex-1 overflow-y-auto">
            <div className="p-6">
              {/* Profile Tab */}
              {activeTab === 'profile' && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <h1 className="text-2xl font-bold text-gray-900">Profile Settings</h1>
                  </div>

                  <Card>
                    <CardHeader>
                      <CardTitle>Personal Information</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <EditableField
                          label="Full Name"
                          field="full_name"
                          value={customerProfile?.full_name}
                          icon={User}
                        />
                        <div>
                          <Label>Phone Number</Label>
                          <div className="flex items-center gap-2 mt-1">
                            <Phone className="w-4 h-4 text-gray-500" />
                            <span className="text-gray-900">{customerProfile?.phone_number}</span>
                          </div>
                        </div>
                        <EditableField
                          label="Email"
                          field="email"
                          value={customerProfile?.email}
                          icon={Mail}
                          type="email"
                        />
                        <div>
                          <Label>Member Since</Label>
                          <div className="flex items-center gap-2 mt-1">
                            <CalendarIcon className="w-4 h-4 text-gray-500" />
                            <span className="text-gray-900">
                              {customerProfile?.created_at ? format(new Date(customerProfile.created_at), 'MMM dd, yyyy') : 'N/A'}
                            </span>
                          </div>
                        </div>
                      </div>
                      
                      <div>
                        <Label>Delivery Address</Label>
                        <div className="flex items-center gap-2 mt-1">
                          <MapPin className="w-4 h-4 text-gray-500" />
                          <span className="text-gray-900 flex-1">
                            {customerProfile?.address || currentLocation?.address || 'Not set'}
                          </span>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => setIsLocationPickerOpen(true)}
                            className="border-emerald-200 text-emerald-700 hover:bg-emerald-50"
                          >
                            <MapPin className="w-4 h-4 mr-1" />
                            Set Location
                          </Button>
                        </div>
                        {(customerProfile?.location_latitude && customerProfile?.location_longitude) && (
                          <div className="text-xs text-gray-500 mt-1">
                            Coordinates: {customerProfile.location_latitude.toFixed(6)}, {customerProfile.location_longitude.toFixed(6)}
                          </div>
                        )}
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Building className="w-5 h-5" />
                        Business Information
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <EditableField
                          label="Business Address"
                          field="business_address"
                          value={customerProfile?.business_address}
                          icon={Building}
                        />
                        <EditableField
                          label="Business City"
                          field="business_city"
                          value={customerProfile?.business_city}
                          icon={Building}
                        />
                        <EditableField
                          label="Business PIN Code"
                          field="business_pincode"
                          value={customerProfile?.business_pincode}
                          icon={Building}
                        />
                        <EditableField
                          label="GSTIN"
                          field="gstin"
                          value={customerProfile?.gstin}
                          icon={Building}
                        />
                        <EditableField
                          label="FSSAI License"
                          field="fssai_license"
                          value={customerProfile?.fssai_license}
                          icon={Building}
                        />
                        <EditableField
                          label="Aadhaar Number"
                          field="aadhaar_number"
                          value={customerProfile?.aadhaar_number}
                          icon={Building}
                        />
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <CreditCard className="w-5 h-5" />
                        Banking Information
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <EditableField
                          label="Bank Account Number"
                          field="bank_account_number"
                          value={customerProfile?.bank_account_number}
                          icon={CreditCard}
                        />
                        <EditableField
                          label="IFSC Code"
                          field="ifsc_code"
                          value={customerProfile?.ifsc_code}
                          icon={CreditCard}
                        />
                        <EditableField
                          label="Account Holder Name"
                          field="account_holder_name"
                          value={customerProfile?.account_holder_name}
                          icon={CreditCard}
                        />
                      </div>
                    </CardContent>
                  </Card>
                </div>
              )}

              {/* Orders Tab */}
              {activeTab === 'orders' && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <h1 className="text-2xl font-bold text-gray-900">Order History</h1>
                    <Badge variant="outline" className="text-sm">
                      {orders.length} Total Orders
                    </Badge>
                  </div>

                  {/* Filters */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Filter className="w-4 h-4" />
                        Filters
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                          <Label htmlFor="search">Search Orders</Label>
                          <div className="relative">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                            <Input
                              id="search"
                              placeholder="Order number, address..."
                              value={searchTerm}
                              onChange={(e) => setSearchTerm(e.target.value)}
                              className="pl-10"
                            />
                          </div>
                        </div>
                        
                        <div>
                          <Label>Status</Label>
                          <Select value={statusFilter} onValueChange={setStatusFilter}>
                            <SelectTrigger>
                              <SelectValue placeholder="All statuses" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="all">All Statuses</SelectItem>
                              <SelectItem value="pending">Pending</SelectItem>
                              <SelectItem value="processing">Processing</SelectItem>
                              <SelectItem value="completed">Completed</SelectItem>
                              <SelectItem value="cancelled">Cancelled</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        
                        <div>
                          <Label>Date Range</Label>
                          <Popover>
                            <PopoverTrigger asChild>
                              <Button variant="outline" className="w-full justify-start text-left font-normal">
                                <CalendarIcon className="mr-2 h-4 w-4" />
                                {dateRange?.from ? (
                                  dateRange?.to ? (
                                    `${format(dateRange.from, "MMM dd")} - ${format(dateRange.to, "MMM dd")}`
                                  ) : (
                                    format(dateRange.from, "MMM dd, yyyy")
                                  )
                                ) : (
                                  "Select date range"
                                )}
                              </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0" align="start">
                              <Calendar
                                mode="range"
                                selected={dateRange}
                                onSelect={setDateRange}
                                initialFocus
                                className="pointer-events-auto"
                              />
                            </PopoverContent>
                          </Popover>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Orders List */}
                  <div className="space-y-4">
                    {filteredOrders.length === 0 ? (
                      <Card>
                        <CardContent className="py-8 text-center">
                          <ShoppingBag className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                          <p className="text-gray-500">No orders found</p>
                        </CardContent>
                      </Card>
                    ) : (
                      filteredOrders.map((order) => (
                        <Card key={order.id}>
                          <CardContent className="p-6">
                            <div className="flex items-center justify-between mb-4">
                              <div className="flex items-center gap-4">
                                <div>
                                  <h3 className="font-semibold text-gray-900">
                                    {order.order_number}
                                  </h3>
                                  <p className="text-sm text-gray-600">
                                    {format(new Date(order.created_at), 'MMM dd, yyyy • h:mm a')}
                                  </p>
                                </div>
                                <Badge className={getStatusColor(order.status)}>
                                  {order.status}
                                </Badge>
                              </div>
                              <div className="text-right">
                                <p className="text-lg font-semibold text-gray-900">
                                  ₹{order.total_amount.toFixed(2)}
                                </p>
                                <Badge className={getPaymentStatusColor(order.payment_status)}>
                                  {order.payment_status}
                                </Badge>
                              </div>
                            </div>
                            
                            <div className="space-y-2">
                              <div className="flex items-center gap-2">
                                <MapPin className="w-4 h-4 text-gray-500" />
                                <span className="text-sm text-gray-600">
                                  {order.delivery_address || 'No delivery address'}
                                </span>
                              </div>
                              <div className="flex items-center gap-2">
                                <ShoppingBag className="w-4 h-4 text-gray-500" />
                                <span className="text-sm text-gray-600">
                                  {order.order_items?.length || 0} items
                                </span>
                              </div>
                            </div>
                            
                            <div className="flex gap-2 mt-4">
                              <Button variant="outline" size="sm">
                                <Eye className="w-4 h-4 mr-2" />
                                View Details
                              </Button>
                              <Button variant="outline" size="sm">
                                <Download className="w-4 h-4 mr-2" />
                                Download Invoice
                              </Button>
                            </div>
                          </CardContent>
                        </Card>
                      ))
                    )}
                  </div>
                </div>
              )}

              {/* Payments Tab */}
              {activeTab === 'payments' && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <h1 className="text-2xl font-bold text-gray-900">Payments & Refunds</h1>
                    <Badge variant="outline" className="text-sm">
                      {payments.length} Transactions
                    </Badge>
                  </div>

                  <div className="space-y-4">
                    {payments.length === 0 ? (
                      <Card>
                        <CardContent className="py-8 text-center">
                          <CreditCard className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                          <p className="text-gray-500">No payment records found</p>
                        </CardContent>
                      </Card>
                    ) : (
                      payments.map((payment) => (
                        <Card key={payment.id}>
                          <CardContent className="p-6">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-4">
                                <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                                  <CreditCard className="w-5 h-5 text-gray-600" />
                                </div>
                                <div>
                                  <h3 className="font-semibold text-gray-900">
                                    {payment.payment_method}
                                  </h3>
                                  <p className="text-sm text-gray-600">
                                    {format(new Date(payment.created_at), 'MMM dd, yyyy • h:mm a')}
                                  </p>
                                  {payment.gateway_transaction_id && (
                                    <p className="text-xs text-gray-500 mt-1">
                                      ID: {payment.gateway_transaction_id}
                                    </p>
                                  )}
                                </div>
                              </div>
                              <div className="text-right">
                                <p className="text-lg font-semibold text-gray-900">
                                  ₹{payment.amount.toFixed(2)}
                                </p>
                                <Badge className={getPaymentStatusColor(payment.status)}>
                                  {payment.status}
                                </Badge>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))
                    )}
                  </div>
                </div>
              )}

              {/* Loyalty Tab */}
              {activeTab === 'loyalty' && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <h1 className="text-2xl font-bold text-gray-900">Loyalty Program</h1>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <Card>
                      <CardContent className="p-6 text-center">
                        <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
                          <Star className="w-8 h-8 text-yellow-600" />
                        </div>
                        <h3 className="font-semibold text-gray-900 mb-2">Total Points</h3>
                        <p className="text-3xl font-bold text-yellow-600">1,250</p>
                      </CardContent>
                    </Card>
                    
                    <Card>
                      <CardContent className="p-6 text-center">
                        <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                          <Gift className="w-8 h-8 text-emerald-600" />
                        </div>
                        <h3 className="font-semibold text-gray-900 mb-2">Rewards Available</h3>
                        <p className="text-3xl font-bold text-emerald-600">3</p>
                      </CardContent>
                    </Card>
                    
                    <Card>
                      <CardContent className="p-6 text-center">
                        <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                          <ShoppingBag className="w-8 h-8 text-blue-600" />
                        </div>
                        <h3 className="font-semibold text-gray-900 mb-2">Member Tier</h3>
                        <p className="text-xl font-bold text-blue-600">Silver</p>
                      </CardContent>
                    </Card>
                  </div>

                  <Card>
                    <CardHeader>
                      <CardTitle>Available Rewards</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between p-4 border rounded-lg">
                          <div>
                            <h4 className="font-semibold">₹100 Off Next Order</h4>
                            <p className="text-sm text-gray-600">Minimum order value ₹500</p>
                          </div>
                          <div className="text-right">
                            <p className="text-sm text-gray-600">500 Points</p>
                            <Button size="sm" className="mt-2">Redeem</Button>
                          </div>
                        </div>
                        
                        <div className="flex items-center justify-between p-4 border rounded-lg">
                          <div>
                            <h4 className="font-semibold">Free Delivery</h4>
                            <p className="text-sm text-gray-600">On orders above ₹300</p>
                          </div>
                          <div className="text-right">
                            <p className="text-sm text-gray-600">200 Points</p>
                            <Button size="sm" className="mt-2">Redeem</Button>
                          </div>
                        </div>
                        
                        <div className="flex items-center justify-between p-4 border rounded-lg">
                          <div>
                            <h4 className="font-semibold">Premium Meat Sample</h4>
                            <p className="text-sm text-gray-600">Try our premium cuts</p>
                          </div>
                          <div className="text-right">
                            <p className="text-sm text-gray-600">1000 Points</p>
                            <Button size="sm" className="mt-2">Redeem</Button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};