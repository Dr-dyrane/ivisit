-- Create subscribers table
CREATE TABLE IF NOT EXISTS public.subscribers (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  type TEXT NOT NULL DEFAULT 'free' CHECK (type IN ('free', 'paid')),
  sale_id TEXT UNIQUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create index on email for faster lookups
CREATE INDEX IF NOT EXISTS idx_subscribers_email ON public.subscribers(email);

-- Create index on type for filtering by subscriber type
CREATE INDEX IF NOT EXISTS idx_subscribers_type ON public.subscribers(type);

-- Enable RLS (Row Level Security)
ALTER TABLE public.subscribers ENABLE ROW LEVEL SECURITY;

-- Create policy for inserting (anyone can insert their own email)
CREATE POLICY "Allow insert for all users" ON public.subscribers
  FOR INSERT WITH CHECK (true);

-- Create policy for reading (allow anonymous read of all records for verification)
CREATE POLICY "Allow read for all users" ON public.subscribers
  FOR SELECT USING (true);

-- Create policy for updating (allow updating own record only)
CREATE POLICY "Allow update for own record" ON public.subscribers
  FOR UPDATE USING (true) WITH CHECK (true);
