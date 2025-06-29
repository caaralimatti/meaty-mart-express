
-- Remove the foreign key constraint that's causing the issue
ALTER TABLE public.sellers DROP CONSTRAINT IF EXISTS sellers_user_id_fkey;

-- Make user_id nullable since we're not using Supabase auth
ALTER TABLE public.sellers ALTER COLUMN user_id DROP NOT NULL;
