
-- Add new optional columns to sellers table for editable account details
ALTER TABLE public.sellers 
ADD COLUMN IF NOT EXISTS business_address TEXT,
ADD COLUMN IF NOT EXISTS business_city TEXT,
ADD COLUMN IF NOT EXISTS business_pincode TEXT,
ADD COLUMN IF NOT EXISTS gstin TEXT,
ADD COLUMN IF NOT EXISTS fssai_license TEXT,
ADD COLUMN IF NOT EXISTS bank_account_number TEXT,
ADD COLUMN IF NOT EXISTS ifsc_code TEXT,
ADD COLUMN IF NOT EXISTS account_holder_name TEXT,
ADD COLUMN IF NOT EXISTS business_logo_url TEXT,
ADD COLUMN IF NOT EXISTS aadhaar_number TEXT,
ADD COLUMN IF NOT EXISTS notification_email BOOLEAN DEFAULT true,
ADD COLUMN IF NOT EXISTS notification_sms BOOLEAN DEFAULT true,
ADD COLUMN IF NOT EXISTS notification_push BOOLEAN DEFAULT false;

-- Create audit log table for tracking profile changes
CREATE TABLE IF NOT EXISTS public.seller_profile_audit (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  seller_id UUID REFERENCES public.sellers(id) ON DELETE CASCADE,
  changed_by UUID REFERENCES auth.users(id),
  field_name TEXT NOT NULL,
  old_value TEXT,
  new_value TEXT,
  change_reason TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Enable RLS on audit table
ALTER TABLE public.seller_profile_audit ENABLE ROW LEVEL SECURITY;

-- Create RLS policy for audit table - sellers can view their own audit logs
CREATE POLICY "Sellers can view their own audit logs" 
ON public.seller_profile_audit 
FOR SELECT 
USING (
  EXISTS (
    SELECT 1 FROM public.sellers 
    WHERE sellers.id = seller_profile_audit.seller_id 
    AND sellers.user_id = auth.uid()
  )
);

-- Add indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_seller_profile_audit_seller_id ON public.seller_profile_audit(seller_id);
CREATE INDEX IF NOT EXISTS idx_seller_profile_audit_created_at ON public.seller_profile_audit(created_at DESC);
