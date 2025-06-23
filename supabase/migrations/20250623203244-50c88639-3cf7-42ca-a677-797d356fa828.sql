
-- Add a user_type field to distinguish between sellers and customers
-- We'll add this to the sellers table and also create a simple user_types table for reference

-- Add user_type enum
CREATE TYPE user_type_enum AS ENUM ('customer', 'seller');

-- Add user_type column to sellers table to track this
ALTER TABLE public.sellers ADD COLUMN user_type user_type_enum DEFAULT 'seller';

-- Update existing sellers to have seller type
UPDATE public.sellers SET user_type = 'seller' WHERE user_type IS NULL;
