
-- Create enum types first
CREATE TYPE seller_type_enum AS ENUM ('Meat', 'Livestock', 'Both');
CREATE TYPE pricing_type_enum AS ENUM ('Fixed', 'Negotiable');
CREATE TYPE transportation_type_enum AS ENUM ('Aggregator', 'Seller');
CREATE TYPE listing_status_enum AS ENUM ('Pending Approval', 'Approved', 'Rejected', 'Sold', 'Inactive');

-- Create sellers table
CREATE TABLE public.sellers (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users NOT NULL,
  seller_name TEXT NOT NULL,
  seller_type seller_type_enum NOT NULL,
  contact_email TEXT,
  contact_phone TEXT,
  meat_shop_status BOOLEAN DEFAULT true,
  livestock_status BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create states table
CREATE TABLE public.states (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL UNIQUE
);

-- Create districts table
CREATE TABLE public.districts (
  id SERIAL PRIMARY KEY,
  state_id INTEGER REFERENCES public.states(id) NOT NULL,
  name TEXT NOT NULL
);

-- Create nutritional_info table
CREATE TABLE public.nutritional_info (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  meat_type TEXT NOT NULL,
  protein_g_per_100g NUMERIC(5,2),
  fat_g_per_100g NUMERIC(5,2),
  carbohydrates_g_per_100g NUMERIC(5,2),
  calories_kcal_per_100g NUMERIC(6,2),
  other_nutrients_json JSONB DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create meat_products table
CREATE TABLE public.meat_products (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  seller_id UUID REFERENCES public.sellers(id) ON DELETE CASCADE NOT NULL,
  name TEXT NOT NULL,
  description TEXT,
  price NUMERIC(10,2) NOT NULL,
  stock INTEGER DEFAULT 0,
  nutritional_info_id UUID REFERENCES public.nutritional_info(id),
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create meat_product_images table
CREATE TABLE public.meat_product_images (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  meat_product_id UUID REFERENCES public.meat_products(id) ON DELETE CASCADE NOT NULL,
  image_url TEXT NOT NULL,
  display_order INTEGER DEFAULT 1,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create livestock_listings table
CREATE TABLE public.livestock_listings (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  seller_id UUID REFERENCES public.sellers(id) ON DELETE CASCADE NOT NULL,
  category TEXT NOT NULL,
  name TEXT NOT NULL,
  description TEXT,
  video_url TEXT,
  state_id INTEGER REFERENCES public.states(id) NOT NULL,
  district_id INTEGER REFERENCES public.districts(id) NOT NULL,
  pricing_type pricing_type_enum NOT NULL,
  unit_of_measure TEXT DEFAULT 'Kg',
  unit_price NUMERIC(10,2),
  transportation_type transportation_type_enum NOT NULL,
  vaccination_report_url TEXT,
  status listing_status_enum DEFAULT 'Pending Approval',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create livestock_images table
CREATE TABLE public.livestock_images (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  livestock_listing_id UUID REFERENCES public.livestock_listings(id) ON DELETE CASCADE NOT NULL,
  image_url TEXT NOT NULL,
  display_order INTEGER DEFAULT 1,
  is_live_capture BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.sellers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.meat_products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.meat_product_images ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.livestock_listings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.livestock_images ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for sellers
CREATE POLICY "Users can view their own seller profile" ON public.sellers
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own seller profile" ON public.sellers
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own seller profile" ON public.sellers
  FOR UPDATE USING (auth.uid() = user_id);

-- Create RLS policies for meat_products
CREATE POLICY "Sellers can manage their own meat products" ON public.meat_products
  FOR ALL USING (EXISTS (
    SELECT 1 FROM public.sellers 
    WHERE sellers.id = meat_products.seller_id 
    AND sellers.user_id = auth.uid()
  ));

-- Create RLS policies for meat_product_images
CREATE POLICY "Sellers can manage their own meat product images" ON public.meat_product_images
  FOR ALL USING (EXISTS (
    SELECT 1 FROM public.meat_products mp
    JOIN public.sellers s ON s.id = mp.seller_id
    WHERE mp.id = meat_product_images.meat_product_id 
    AND s.user_id = auth.uid()
  ));

-- Create RLS policies for livestock_listings
CREATE POLICY "Sellers can manage their own livestock listings" ON public.livestock_listings
  FOR ALL USING (EXISTS (
    SELECT 1 FROM public.sellers 
    WHERE sellers.id = livestock_listings.seller_id 
    AND sellers.user_id = auth.uid()
  ));

-- Create RLS policies for livestock_images
CREATE POLICY "Sellers can manage their own livestock images" ON public.livestock_images
  FOR ALL USING (EXISTS (
    SELECT 1 FROM public.livestock_listings ll
    JOIN public.sellers s ON s.id = ll.seller_id
    WHERE ll.id = livestock_images.livestock_listing_id 
    AND s.user_id = auth.uid()
  ));

-- Create storage buckets
INSERT INTO storage.buckets (id, name, public) VALUES ('meat-product-images', 'meat-product-images', true);
INSERT INTO storage.buckets (id, name, public) VALUES ('livestock-images', 'livestock-images', true);
INSERT INTO storage.buckets (id, name, public) VALUES ('vaccination-reports', 'vaccination-reports', true);

-- Create storage policies
CREATE POLICY "Anyone can view meat product images" ON storage.objects
  FOR SELECT USING (bucket_id = 'meat-product-images');

CREATE POLICY "Sellers can upload meat product images" ON storage.objects
  FOR INSERT WITH CHECK (bucket_id = 'meat-product-images' AND auth.role() = 'authenticated');

CREATE POLICY "Anyone can view livestock images" ON storage.objects
  FOR SELECT USING (bucket_id = 'livestock-images');

CREATE POLICY "Sellers can upload livestock images" ON storage.objects
  FOR INSERT WITH CHECK (bucket_id = 'livestock-images' AND auth.role() = 'authenticated');

CREATE POLICY "Anyone can view vaccination reports" ON storage.objects
  FOR SELECT USING (bucket_id = 'vaccination-reports');

CREATE POLICY "Sellers can upload vaccination reports" ON storage.objects
  FOR INSERT WITH CHECK (bucket_id = 'vaccination-reports' AND auth.role() = 'authenticated');

-- Insert Indian States
INSERT INTO public.states (name) VALUES
('Andhra Pradesh'), ('Arunachal Pradesh'), ('Assam'), ('Bihar'), ('Chhattisgarh'),
('Goa'), ('Gujarat'), ('Haryana'), ('Himachal Pradesh'), ('Jharkhand'),
('Karnataka'), ('Kerala'), ('Madhya Pradesh'), ('Maharashtra'), ('Manipur'),
('Meghalaya'), ('Mizoram'), ('Nagaland'), ('Odisha'), ('Punjab'),
('Rajasthan'), ('Sikkim'), ('Tamil Nadu'), ('Telangana'), ('Tripura'),
('Uttar Pradesh'), ('Uttarakhand'), ('West Bengal'),
('Andaman and Nicobar Islands'), ('Chandigarh'), ('Dadra and Nagar Haveli and Daman and Diu'),
('Delhi'), ('Jammu and Kashmir'), ('Ladakh'), ('Lakshadweep'), ('Puducherry');

-- Insert sample districts for major states (you can expand this)
INSERT INTO public.districts (state_id, name) VALUES
-- Maharashtra districts
((SELECT id FROM public.states WHERE name = 'Maharashtra'), 'Mumbai'),
((SELECT id FROM public.states WHERE name = 'Maharashtra'), 'Pune'),
((SELECT id FROM public.states WHERE name = 'Maharashtra'), 'Nagpur'),
((SELECT id FROM public.states WHERE name = 'Maharashtra'), 'Nashik'),
((SELECT id FROM public.states WHERE name = 'Maharashtra'), 'Aurangabad'),
((SELECT id FROM public.states WHERE name = 'Maharashtra'), 'Solapur'),
-- Karnataka districts
((SELECT id FROM public.states WHERE name = 'Karnataka'), 'Bangalore Urban'),
((SELECT id FROM public.states WHERE name = 'Karnataka'), 'Mysore'),
((SELECT id FROM public.states WHERE name = 'Karnataka'), 'Hubli-Dharwad'),
((SELECT id FROM public.states WHERE name = 'Karnataka'), 'Mangalore'),
-- Tamil Nadu districts
((SELECT id FROM public.states WHERE name = 'Tamil Nadu'), 'Chennai'),
((SELECT id FROM public.states WHERE name = 'Tamil Nadu'), 'Coimbatore'),
((SELECT id FROM public.states WHERE name = 'Tamil Nadu'), 'Madurai'),
((SELECT id FROM public.states WHERE name = 'Tamil Nadu'), 'Tiruchirappalli'),
-- Gujarat districts
((SELECT id FROM public.states WHERE name = 'Gujarat'), 'Ahmedabad'),
((SELECT id FROM public.states WHERE name = 'Gujarat'), 'Surat'),
((SELECT id FROM public.states WHERE name = 'Gujarat'), 'Vadodara'),
((SELECT id FROM public.states WHERE name = 'Gujarat'), 'Rajkot'),
-- Uttar Pradesh districts
((SELECT id FROM public.states WHERE name = 'Uttar Pradesh'), 'Lucknow'),
((SELECT id FROM public.states WHERE name = 'Uttar Pradesh'), 'Kanpur'),
((SELECT id FROM public.states WHERE name = 'Uttar Pradesh'), 'Ghaziabad'),
((SELECT id FROM public.states WHERE name = 'Uttar Pradesh'), 'Agra'),
-- Delhi
((SELECT id FROM public.states WHERE name = 'Delhi'), 'Central Delhi'),
((SELECT id FROM public.states WHERE name = 'Delhi'), 'New Delhi'),
((SELECT id FROM public.states WHERE name = 'Delhi'), 'North Delhi'),
((SELECT id FROM public.states WHERE name = 'Delhi'), 'South Delhi');

-- Insert nutritional information for common meat types
INSERT INTO public.nutritional_info (meat_type, protein_g_per_100g, fat_g_per_100g, carbohydrates_g_per_100g, calories_kcal_per_100g, other_nutrients_json) VALUES
('Chicken Breast', 31.0, 3.6, 0.0, 165, '{"iron_mg": 0.7, "zinc_mg": 1.0, "vitamin_b12_mcg": 0.3}'),
('Chicken Thigh', 18.0, 9.3, 0.0, 147, '{"iron_mg": 0.9, "zinc_mg": 1.5, "vitamin_b12_mcg": 0.4}'),
('Chicken Wings', 19.0, 12.0, 0.0, 186, '{"iron_mg": 0.8, "zinc_mg": 1.2, "vitamin_b12_mcg": 0.3}'),
('Mutton/Goat Meat', 25.6, 9.2, 0.0, 190, '{"iron_mg": 3.4, "zinc_mg": 4.5, "vitamin_b12_mcg": 2.9}'),
('Mutton Liver', 26.0, 4.8, 4.0, 154, '{"iron_mg": 29.0, "zinc_mg": 12.0, "vitamin_b12_mcg": 85.0}'),
('Fish - Rohu', 19.0, 1.4, 0.0, 91, '{"omega_3_g": 0.3, "iron_mg": 1.0, "zinc_mg": 0.8}'),
('Fish - Catla', 18.0, 2.5, 0.0, 96, '{"omega_3_g": 0.4, "iron_mg": 0.9, "zinc_mg": 0.7}'),
('Prawns', 24.0, 0.9, 0.2, 106, '{"omega_3_g": 0.5, "iron_mg": 1.8, "zinc_mg": 1.6}'),
('Fish - Salmon', 25.0, 12.0, 0.0, 206, '{"omega_3_g": 2.3, "iron_mg": 0.8, "zinc_mg": 0.6}');

-- Create function to automatically update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers for updated_at
CREATE TRIGGER update_sellers_updated_at BEFORE UPDATE ON public.sellers FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_meat_products_updated_at BEFORE UPDATE ON public.meat_products FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_meat_product_images_updated_at BEFORE UPDATE ON public.meat_product_images FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_livestock_listings_updated_at BEFORE UPDATE ON public.livestock_listings FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_livestock_images_updated_at BEFORE UPDATE ON public.livestock_images FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
