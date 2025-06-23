
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { X, Camera, Upload } from 'lucide-react';

interface LivestockListingFormProps {
  sellerId: string;
  onClose: () => void;
  onSuccess: () => void;
}

interface State {
  id: number;
  name: string;
}

interface District {
  id: number;
  name: string;
  state_id: number;
}

const goatCategories = [
  'Boer', 'Sirohi', 'Jamunapari', 'Barbari', 'Beetal', 'Totapari', 
  'Malabari', 'Osmanabadi', 'Surti', 'Local Breed', 'Other'
];

const LivestockListingForm = ({ sellerId, onClose, onSuccess }: LivestockListingFormProps) => {
  const [formData, setFormData] = useState({
    category: '',
    name: '',
    description: '',
    video_url: '',
    state_id: '',
    district_id: '',
    pricing_type: '',
    unit_price: '',
    transportation_type: ''
  });
  
  const [states, setStates] = useState<State[]>([]);
  const [districts, setDistricts] = useState<District[]>([]);
  const [filteredDistricts, setFilteredDistricts] = useState<District[]>([]);
  const [liveImages, setLiveImages] = useState<File[]>([]);
  const [vaccinationReport, setVaccinationReport] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchStatesAndDistricts();
  }, []);

  useEffect(() => {
    if (formData.state_id) {
      const filtered = districts.filter(d => d.state_id === parseInt(formData.state_id));
      setFilteredDistricts(filtered);
      setFormData(prev => ({ ...prev, district_id: '' }));
    }
  }, [formData.state_id, districts]);

  const fetchStatesAndDistricts = async () => {
    try {
      const [statesResult, districtsResult] = await Promise.all([
        supabase.from('states').select('*').order('name'),
        supabase.from('districts').select('*').order('name')
      ]);

      if (statesResult.error) throw statesResult.error;
      if (districtsResult.error) throw districtsResult.error;

      setStates(statesResult.data || []);
      setDistricts(districtsResult.data || []);
    } catch (error) {
      console.error('Error fetching states/districts:', error);
      toast.error('Failed to load states and districts');
    }
  };

  const handleLivePhotoCapture = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    setLiveImages(prev => [...prev, ...files]);
  };

  const removeLiveImage = (index: number) => {
    setLiveImages(prev => prev.filter((_, i) => i !== index));
  };

  const uploadFiles = async (listingId: string) => {
    // Upload live images
    if (liveImages.length > 0) {
      const imageUploadPromises = liveImages.map(async (image, index) => {
        const fileExt = image.name.split('.').pop();
        const fileName = `${listingId}_live_${index}.${fileExt}`;
        
        const { error: uploadError } = await supabase.storage
          .from('livestock-images')
          .upload(fileName, image);

        if (uploadError) throw uploadError;

        const { data: urlData } = supabase.storage
          .from('livestock-images')
          .getPublicUrl(fileName);

        return {
          livestock_listing_id: listingId,
          image_url: urlData.publicUrl,
          display_order: index + 1,
          is_live_capture: true
        };
      });

      const imageData = await Promise.all(imageUploadPromises);
      
      const { error } = await supabase
        .from('livestock_images')
        .insert(imageData);

      if (error) throw error;
    }

    // Upload vaccination report
    if (vaccinationReport) {
      const fileExt = vaccinationReport.name.split('.').pop();
      const fileName = `${listingId}_vaccination.${fileExt}`;
      
      const { error: uploadError } = await supabase.storage
        .from('vaccination-reports')
        .upload(fileName, vaccinationReport);

      if (uploadError) throw uploadError;

      const { data: urlData } = supabase.storage
        .from('vaccination-reports')
        .getPublicUrl(fileName);

      // Update listing with vaccination report URL
      const { error: updateError } = await supabase
        .from('livestock_listings')
        .update({ vaccination_report_url: urlData.publicUrl })
        .eq('id', listingId);

      if (updateError) throw updateError;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.category || !formData.name || !formData.state_id || !formData.district_id || 
        !formData.pricing_type || !formData.transportation_type) {
      toast.error('Please fill in all required fields');
      return;
    }

    if (liveImages.length < 4) {
      toast.error('Please capture at least 4 live photos');
      return;
    }

    setLoading(true);
    try {
      // Insert livestock listing
      const { data: listing, error: listingError } = await supabase
        .from('livestock_listings')
        .insert({
          seller_id: sellerId,
          category: formData.category,
          name: formData.name,
          description: formData.description || null,
          video_url: formData.video_url || null,
          state_id: parseInt(formData.state_id),
          district_id: parseInt(formData.district_id),
          pricing_type: formData.pricing_type as 'Fixed' | 'Negotiable',
          unit_price: formData.pricing_type === 'Fixed' ? parseFloat(formData.unit_price) : null,
          transportation_type: formData.transportation_type as 'Aggregator' | 'Seller'
        })
        .select()
        .single();

      if (listingError) throw listingError;

      // Upload files
      await uploadFiles(listing.id);

      toast.success('Livestock listing submitted for approval!');
      onSuccess();
    } catch (error) {
      console.error('Error creating livestock listing:', error);
      toast.error('Failed to create livestock listing');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          Add Livestock Listing
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="w-4 h-4" />
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Live Photos Section */}
          <div>
            <Label className="text-base font-medium">Live Photos (Minimum 4 required) *</Label>
            <div className="space-y-2">
              <Input
                type="file"
                accept="image/*"
                capture="camera"
                multiple
                onChange={handleLivePhotoCapture}
              />
              <p className="text-sm text-gray-600">
                Take live photos using your device camera. Minimum 4 photos required.
              </p>
              {liveImages.length > 0 && (
                <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                  {liveImages.map((image, index) => (
                    <div key={index} className="relative">
                      <img
                        src={URL.createObjectURL(image)}
                        alt={`Live photo ${index + 1}`}
                        className="w-full h-20 object-cover rounded border"
                      />
                      <Button
                        type="button"
                        variant="destructive"
                        size="sm"
                        className="absolute -top-2 -right-2 w-6 h-6 p-0"
                        onClick={() => removeLiveImage(index)}
                      >
                        <X className="w-3 h-3" />
                      </Button>
                    </div>
                  ))}
                </div>
              )}
              <p className="text-sm font-medium">
                Photos captured: {liveImages.length}/4 minimum
              </p>
            </div>
          </div>

          {/* Basic Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="category">Category of Goat *</Label>
              <Select value={formData.category} onValueChange={(value) => setFormData(prev => ({ ...prev, category: value }))}>
                <SelectTrigger>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  {goatCategories.map(category => (
                    <SelectItem key={category} value={category}>{category}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="name">Name *</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                placeholder="Animal name"
                required
              />
            </div>
          </div>

          <div>
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
              placeholder="Detailed information about the animal..."
              rows={3}
            />
          </div>

          <div>
            <Label htmlFor="video_url">Video URL</Label>
            <Input
              id="video_url"
              value={formData.video_url}
              onChange={(e) => setFormData(prev => ({ ...prev, video_url: e.target.value }))}
              placeholder="YouTube, Vimeo, or other video URL"
            />
          </div>

          {/* Location */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="state">State *</Label>
              <Select value={formData.state_id} onValueChange={(value) => setFormData(prev => ({ ...prev, state_id: value }))}>
                <SelectTrigger>
                  <SelectValue placeholder="Select state" />
                </SelectTrigger>
                <SelectContent>
                  {states.map(state => (
                    <SelectItem key={state.id} value={state.id.toString()}>{state.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="district">District *</Label>
              <Select 
                value={formData.district_id} 
                onValueChange={(value) => setFormData(prev => ({ ...prev, district_id: value }))}
                disabled={!formData.state_id}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select district" />
                </SelectTrigger>
                <SelectContent>
                  {filteredDistricts.map(district => (
                    <SelectItem key={district.id} value={district.id.toString()}>{district.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Pricing */}
          <div>
            <Label className="text-base font-medium">Pricing *</Label>
            <RadioGroup 
              value={formData.pricing_type} 
              onValueChange={(value) => setFormData(prev => ({ ...prev, pricing_type: value, unit_price: '' }))}
              className="mt-2"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="Fixed" id="fixed" />
                <Label htmlFor="fixed">Fixed Price</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="Negotiable" id="negotiable" />
                <Label htmlFor="negotiable">Negotiable</Label>
              </div>
            </RadioGroup>
            
            {formData.pricing_type === 'Fixed' && (
              <div className="mt-2">
                <Label htmlFor="unit_price">Unit Price (₹/Kg)</Label>
                <Input
                  id="unit_price"
                  type="number"
                  step="0.01"
                  value={formData.unit_price}
                  onChange={(e) => setFormData(prev => ({ ...prev, unit_price: e.target.value }))}
                  placeholder="0.00"
                  required
                />
              </div>
            )}
          </div>

          {/* Transportation */}
          <div>
            <Label className="text-base font-medium">Transportation *</Label>
            <RadioGroup 
              value={formData.transportation_type} 
              onValueChange={(value) => setFormData(prev => ({ ...prev, transportation_type: value }))}
              className="mt-2"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="Aggregator" id="aggregator" />
                <Label htmlFor="aggregator">Aggregator (Platform arranges transport)</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="Seller" id="seller" />
                <Label htmlFor="seller">Seller (I handle transport)</Label>
              </div>
            </RadioGroup>
          </div>

          {/* Vaccination Report */}
          <div>
            <Label htmlFor="vaccination_report">Vaccination Report (PDF, max 10MB)</Label>
            <Input
              id="vaccination_report"
              type="file"
              accept=".pdf"
              onChange={(e) => setVaccinationReport(e.target.files?.[0] || null)}
            />
            {vaccinationReport && (
              <p className="text-sm text-green-600 mt-1">
                File selected: {vaccinationReport.name}
              </p>
            )}
          </div>

          <div className="flex space-x-2 pt-4">
            <Button type="submit" disabled={loading} className="flex-1">
              {loading ? 'Submitting for Approval...' : 'Submit for Approval'}
            </Button>
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default LivestockListingForm;
