-- Fix RLS policy for customers table to allow phone-based registration
DROP POLICY IF EXISTS "Customers can insert their own profile" ON public.customers;

CREATE POLICY "Allow phone-based registration"
ON public.customers
FOR INSERT
WITH CHECK (user_id IS NULL);