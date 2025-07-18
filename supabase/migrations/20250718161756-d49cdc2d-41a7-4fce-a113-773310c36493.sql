
-- Add profile & contact fields to the existing customers table
ALTER TABLE public.customers
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

-- Audit table for profile changes
CREATE TABLE IF NOT EXISTS public.customer_profile_audit (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  customer_id UUID REFERENCES public.customers(id) ON DELETE CASCADE,
  changed_by UUID REFERENCES auth.users(id),
  field_name TEXT NOT NULL,
  old_value TEXT,
  new_value TEXT,
  change_reason TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Enable Row Level Security on audit table
ALTER TABLE public.customer_profile_audit ENABLE ROW LEVEL SECURITY;

-- Create policy for customers to view their own audit logs
CREATE POLICY "Customers can view their own audit logs" 
ON public.customer_profile_audit 
FOR SELECT 
USING (EXISTS (
  SELECT 1 FROM customers 
  WHERE customers.id = customer_profile_audit.customer_id 
  AND customers.user_id = auth.uid()
));

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_customer_profile_audit_customer_id ON public.customer_profile_audit(customer_id);
CREATE INDEX IF NOT EXISTS idx_customer_profile_audit_created_at ON public.customer_profile_audit(created_at);
