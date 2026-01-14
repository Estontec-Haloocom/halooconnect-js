-- Add location (country) and city columns to leads table
ALTER TABLE public.leads 
ADD COLUMN location TEXT,
ADD COLUMN city TEXT;