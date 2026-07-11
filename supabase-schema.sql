-- Supabase Database Schema for Aimy India

-- 1. Banners Table (for Home page hero carousel)
CREATE TABLE public.banners (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  title text NOT NULL,
  subtitle text,
  image_url text NOT NULL,
  cta_text text,
  cta_link text,
  is_active boolean DEFAULT true,
  sort_order integer DEFAULT 0,
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 2. Posts Table (for News Feeds/Blog)
CREATE TABLE public.posts (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  title text NOT NULL,
  slug text NOT NULL UNIQUE,
  content text NOT NULL,
  excerpt text,
  featured_image text,
  category text,
  is_published boolean DEFAULT false,
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 3. Careers Table
CREATE TABLE public.careers (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  title text NOT NULL,
  location text DEFAULT 'India',
  type text DEFAULT 'Full-time',
  description text NOT NULL,
  requirements text,
  is_active boolean DEFAULT true,
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 4. Contact Submissions Table
CREATE TABLE public.contact_submissions (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  name text NOT NULL,
  email text NOT NULL,
  phone text,
  subject text,
  message text NOT NULL,
  status text DEFAULT 'new', -- new, read, replied
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Set up Row Level Security (RLS)
ALTER TABLE public.banners ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.careers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.contact_submissions ENABLE ROW LEVEL SECURITY;

-- Create policies for public access (READ ONLY)
CREATE POLICY "Allow public read access on active banners" ON public.banners FOR SELECT USING (is_active = true);
CREATE POLICY "Allow public read access on published posts" ON public.posts FOR SELECT USING (is_published = true);
CREATE POLICY "Allow public read access on active careers" ON public.careers FOR SELECT USING (is_active = true);

-- Contact form submissions can only be inserted by public, read by admin
CREATE POLICY "Allow public insert on contact_submissions" ON public.contact_submissions FOR INSERT WITH CHECK (true);

-- Create policies for admin access (ALL PRIVILEGES)
-- Assumes admin users are authenticated via Supabase Auth
CREATE POLICY "Allow authenticated users full access on banners" ON public.banners FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Allow authenticated users full access on posts" ON public.posts FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Allow authenticated users full access on careers" ON public.careers FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Allow authenticated users full access on contact_submissions" ON public.contact_submissions FOR ALL USING (auth.role() = 'authenticated');

-- Function to update 'updated_at' column on posts
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
   NEW.updated_at = now(); 
   RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_posts_updated_at
BEFORE UPDATE ON public.posts
FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();
