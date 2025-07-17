-- Allow sellers with user_id = NULL (phone-based) to manage their own meat products
DROP POLICY IF EXISTS "Sellers can manage their own meat products" ON public.meat_products;

CREATE POLICY "Allow phone-based sellers to manage meat products"
ON public.meat_products
FOR ALL
USING (
  (
    (SELECT user_id FROM public.sellers WHERE id = seller_id) = auth.uid()
    OR
    (SELECT user_id FROM public.sellers WHERE id = seller_id) IS NULL
  )
);