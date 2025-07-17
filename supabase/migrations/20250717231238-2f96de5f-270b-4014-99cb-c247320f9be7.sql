-- Fix livestock image storage policies
CREATE POLICY "Allow livestock image uploads for sellers" 
ON storage.objects 
FOR INSERT 
WITH CHECK (
  bucket_id = 'livestock-images' 
  AND auth.uid() IS NOT NULL
);

CREATE POLICY "Allow livestock image access" 
ON storage.objects 
FOR SELECT 
USING (bucket_id = 'livestock-images');

CREATE POLICY "Allow livestock image updates for sellers" 
ON storage.objects 
FOR UPDATE 
USING (bucket_id = 'livestock-images' AND auth.uid() IS NOT NULL);

CREATE POLICY "Allow livestock image deletion for sellers" 
ON storage.objects 
FOR DELETE 
USING (bucket_id = 'livestock-images' AND auth.uid() IS NOT NULL);