
-- Add categories and tags columns to blog_posts
ALTER TABLE public.blog_posts ADD COLUMN IF NOT EXISTS category text DEFAULT NULL;
ALTER TABLE public.blog_posts ADD COLUMN IF NOT EXISTS tags text[] DEFAULT '{}';
