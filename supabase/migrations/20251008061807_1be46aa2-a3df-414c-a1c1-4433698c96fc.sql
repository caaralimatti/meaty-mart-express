-- Create data deletion requests table
CREATE TABLE IF NOT EXISTS public.data_deletion_requests (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  phone_number TEXT,
  email TEXT,
  reason TEXT,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'processing', 'completed', 'cancelled')),
  requested_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
  processed_at TIMESTAMP WITH TIME ZONE,
  processed_by UUID REFERENCES auth.users(id),
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
  CONSTRAINT phone_or_email_required CHECK (
    phone_number IS NOT NULL OR email IS NOT NULL
  )
);

-- Enable RLS
ALTER TABLE public.data_deletion_requests ENABLE ROW LEVEL SECURITY;

-- Allow anyone to submit deletion requests
CREATE POLICY "Anyone can submit deletion requests"
  ON public.data_deletion_requests
  FOR INSERT
  WITH CHECK (true);

-- Only allow users to view their own requests
CREATE POLICY "Users can view their own deletion requests"
  ON public.data_deletion_requests
  FOR SELECT
  USING (
    phone_number IN (SELECT phone_number FROM customers WHERE user_id = auth.uid())
    OR email IN (SELECT email FROM customers WHERE user_id = auth.uid())
  );

-- Create index for faster lookups
CREATE INDEX idx_data_deletion_phone ON public.data_deletion_requests(phone_number);
CREATE INDEX idx_data_deletion_email ON public.data_deletion_requests(email);
CREATE INDEX idx_data_deletion_status ON public.data_deletion_requests(status);

-- Add trigger for updated_at
CREATE TRIGGER update_data_deletion_requests_updated_at
  BEFORE UPDATE ON public.data_deletion_requests
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();