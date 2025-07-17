-- Drop the incomplete policy
DROP POLICY IF EXISTS "Allow phone-based sellers to manage livestock listings" ON public.livestock_listings;

-- Create complete policy with both USING and WITH CHECK clauses
CREATE POLICY "Allow phone-based sellers to manage livestock listings"
ON public.livestock_listings
FOR ALL
USING (
  (
    (SELECT user_id FROM public.sellers WHERE id = seller_id) = auth.uid()
    OR
    (SELECT user_id FROM public.sellers WHERE id = seller_id) IS NULL
  )
)
WITH CHECK (
  (
    (SELECT user_id FROM public.sellers WHERE id = seller_id) = auth.uid()
    OR
    (SELECT user_id FROM public.sellers WHERE id = seller_id) IS NULL
  )
);