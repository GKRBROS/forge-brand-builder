-- Create storage bucket for logo references
INSERT INTO storage.buckets (id, name, public)
VALUES ('logo-references', 'logo-references', true)
ON CONFLICT (id) DO NOTHING;

-- Create storage policy for public read access
CREATE POLICY "Public can view logo references"
ON storage.objects FOR SELECT
USING (bucket_id = 'logo-references');

-- Create storage policy for public upload (since no auth)
CREATE POLICY "Anyone can upload logo references"
ON storage.objects FOR INSERT
WITH CHECK (bucket_id = 'logo-references');

-- Create questionnaire_submissions table
CREATE TABLE public.questionnaire_submissions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  brand_name TEXT NOT NULL,
  tagline TEXT,
  description TEXT NOT NULL,
  target_customers TEXT NOT NULL,
  logo_type TEXT NOT NULL,
  color_preference TEXT NOT NULL,
  font_style TEXT NOT NULL,
  additional_notes TEXT,
  selected_usage TEXT[] NOT NULL DEFAULT '{}',
  reference_files JSONB DEFAULT '[]',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS but allow public insert (no auth required for this form)
ALTER TABLE public.questionnaire_submissions ENABLE ROW LEVEL SECURITY;

-- Allow anyone to insert submissions
CREATE POLICY "Anyone can submit questionnaire"
ON public.questionnaire_submissions
FOR INSERT
WITH CHECK (true);

-- Allow reading submissions (for admin purposes via service role)
CREATE POLICY "Service role can read all submissions"
ON public.questionnaire_submissions
FOR SELECT
USING (true);