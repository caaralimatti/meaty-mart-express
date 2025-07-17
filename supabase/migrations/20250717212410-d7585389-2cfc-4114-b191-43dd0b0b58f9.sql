-- Drop existing restrictive policy if it exists
DROP POLICY IF EXISTS "Sellers can manage their own livestock listings" ON public.livestock_listings;

-- Create new policy that mirrors meat_products policy
CREATE POLICY "Allow phone-based sellers to manage livestock listings"
ON public.livestock_listings
FOR ALL
USING (
  (
    (SELECT user_id FROM public.sellers WHERE id = seller_id) = auth.uid()
    OR
    (SELECT user_id FROM public.sellers WHERE id = seller_id) IS NULL
  )
);