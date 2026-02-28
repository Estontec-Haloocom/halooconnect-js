
CREATE TABLE public.analysis_leads (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  full_name TEXT,
  email TEXT,
  company_name TEXT NOT NULL,
  website TEXT NOT NULL,
  business_type TEXT NOT NULL,
  readiness_score INTEGER,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.analysis_leads ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can insert analysis leads"
ON public.analysis_leads
FOR INSERT
WITH CHECK (true);

CREATE POLICY "Authenticated users can view analysis leads"
ON public.analysis_leads
FOR SELECT
USING (true);
