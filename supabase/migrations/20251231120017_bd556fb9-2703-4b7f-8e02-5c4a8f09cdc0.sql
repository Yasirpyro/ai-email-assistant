-- Create contact_submissions table to store form submissions
CREATE TABLE public.contact_submissions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  company TEXT,
  services TEXT[] DEFAULT '{}',
  budget TEXT,
  message TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.contact_submissions ENABLE ROW LEVEL SECURITY;

-- Create policy for service role to insert (edge functions use service role)
CREATE POLICY "Service role can insert contact submissions"
ON public.contact_submissions
FOR INSERT
TO service_role
WITH CHECK (true);

-- Create policy for service role to select (for admin purposes)
CREATE POLICY "Service role can view contact submissions"
ON public.contact_submissions
FOR SELECT
TO service_role
USING (true);

-- Create policy for service role to update (for status changes)
CREATE POLICY "Service role can update contact submissions"
ON public.contact_submissions
FOR UPDATE
TO service_role
USING (true);

-- Create trigger for automatic timestamp updates
CREATE OR REPLACE FUNCTION public.update_contact_submissions_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

CREATE TRIGGER update_contact_submissions_updated_at
BEFORE UPDATE ON public.contact_submissions
FOR EACH ROW
EXECUTE FUNCTION public.update_contact_submissions_updated_at();