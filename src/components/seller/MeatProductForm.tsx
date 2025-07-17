
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { X, Upload } from 'lucide-react';
import { odooService } from '@/services/odooService';

interface MeatProductFormProps {
  sellerId: string;
  onClose: () => void;
  onSuccess: () => void;
}

const MeatProductForm = ({ sellerId, onClose, onSuccess }: MeatProductFormProps) => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    stock: ''
  });
  const [images, setImages] = useState<File[]>([]);
  const [loading, setLoading] = useState(false);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    setImages(prev => [...prev, ...files]);
  };

  const removeImage = (index: number) => {
    setImages(prev => prev.filter((_, i) => i !== index));
  };

  const uploadImages = async (productId: string) => {
    const uploadPromises = images.map(async (image, index) => {
      const fileExt = image.name.split('.').pop();
      const fileName = `${productId}_${index}.${fileExt}`;
      
      const { error: uploadError } = await supabase.storage
        .from('meat-product-images')
        .upload(fileName, image);

      if (uploadError) throw uploadError;

      const { data: urlData } = supabase.storage
        .from('meat-product-images')
        .getPublicUrl(fileName);

      return {
        meat_product_id: productId,
        image_url: urlData.publicUrl,
        display_order: index + 1
      };
    });

    const imageData = await Promise.all(uploadPromises);
    
    const { error } = await supabase
      .from('meat_product_images')
      .insert(imageData);

    if (error) throw error;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.price) {
      toast.error('Please fill in all required fields');
      return;
    }

    setLoading(true);
    try {
      // Insert product
      const { data: product, error: productError } = await supabase
        .from('meat_products')
        .insert({
          seller_id: sellerId,
          name: formData.name,
          description: formData.description || null,
          price: parseFloat(formData.price),
          stock: formData.stock ? parseInt(formData.stock) : 0
        })
        .select()
        .single();

      if (productError) throw productError;

      // Upload images if any
      if (images.length > 0) {
        await uploadImages(product.id);
      }

      // Get seller name for Odoo API
      const { data: seller, error: sellerError } = await supabase
        .from('sellers')
        .select('seller_name')
        .eq('id', sellerId)
        .single();

      if (sellerError) {
        console.error('Error fetching seller name:', sellerError);
      } else {
        // Create product in Odoo
        try {
          const odooResult = await odooService.createProduct({
            name: formData.name,
            list_price: parseFloat(formData.price),
            seller_id: seller.seller_name,
            state: 'pending'
          });
          console.log('Product created successfully in Odoo with ID:', odooResult);
        } catch (odooError) {
          console.error('Failed to create product in Odoo (non-blocking):', odooError);
          // Don't block the success flow if Odoo fails
        }
      }

      toast.success('Product added successfully!');
      onSuccess();
    } catch (error) {
      console.error('Error adding product:', error);
      toast.error('Failed to add product');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          Add Meat Product
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="w-4 h-4" />
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="name">Product Name *</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                placeholder="e.g., Chicken Breast"
                required
              />
            </div>
            <div>
              <Label htmlFor="price">Price (₹) *</Label>
              <Input
                id="price"
                type="number"
                step="0.01"
                value={formData.price}
                onChange={(e) => setFormData(prev => ({ ...prev, price: e.target.value }))}
                placeholder="0.00"
                required
              />
            </div>
          </div>

          <div>
            <Label htmlFor="stock">Stock/Quantity (kg)</Label>
            <Input
              id="stock"
              type="number"
              value={formData.stock}
              onChange={(e) => setFormData(prev => ({ ...prev, stock: e.target.value }))}
              placeholder="0"
            />
          </div>

          <div>
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
              placeholder="Product description..."
              rows={3}
            />
          </div>

          <div>
            <Label htmlFor="images">Product Images</Label>
            <div className="space-y-2">
              <Input
                id="images"
                type="file"
                accept="image/*"
                multiple
                onChange={handleImageUpload}
              />
              {images.length > 0 && (
                <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                  {images.map((image, index) => (
                    <div key={index} className="relative">
                      <img
                        src={URL.createObjectURL(image)}
                        alt={`Preview ${index + 1}`}
                        className="w-full h-20 object-cover rounded border"
                      />
                      <Button
                        type="button"
                        variant="destructive"
                        size="sm"
                        className="absolute -top-2 -right-2 w-6 h-6 p-0"
                        onClick={() => removeImage(index)}
                      >
                        <X className="w-3 h-3" />
                      </Button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="flex space-x-2 pt-4">
            <Button type="submit" disabled={loading} className="flex-1">
              {loading ? 'Adding Product...' : 'Add Product'}
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

export default MeatProductForm;
