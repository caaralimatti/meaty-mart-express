-- Create dev_api_logs table for activity logging
CREATE TABLE public.dev_api_logs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  endpoint text,
  method text,
  status integer,
  payload jsonb,
  error text,
  created_at timestamptz DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.dev_api_logs ENABLE ROW LEVEL SECURITY;

-- Create read-only policy for dev access
CREATE POLICY "dev_read_only" ON public.dev_api_logs
FOR SELECT USING (true);