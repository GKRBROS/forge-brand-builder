-- Create cleanup_logs table
CREATE TABLE public.cleanup_logs (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  cleanup_date TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  deleted_folders_count INTEGER NOT NULL,
  deleted_files_count INTEGER NOT NULL,
  status TEXT NOT NULL,
  details JSONB DEFAULT '{}'
);

-- Enable RLS
ALTER TABLE public.cleanup_logs ENABLE ROW LEVEL SECURITY;

-- Only service role can interact with cleanup_logs
CREATE POLICY "Service role can manage cleanup logs"
ON public.cleanup_logs
FOR ALL
USING (auth.jwt() ->> 'role' = 'service_role');

-- Set up cron job (requires pg_cron extension)
-- Note: This assumes the extension is enabled in the Supabase project.
-- If not, it can be enabled via: CREATE EXTENSION IF NOT EXISTS pg_cron;
SELECT cron.schedule(
  'cleanup-storage-daily',
  '0 0 * * *', -- Run every day at midnight
  $$
  SELECT
     net.http_post(
       url:='https://zxqchfmtlafggsblyuqv.supabase.co/functions/v1/cleanup-storage',
       headers:='{"Content-Type": "application/json", "Authorization": "Bearer YOUR_SERVICE_ROLE_KEY"}'::jsonb,
       body:='{}'::jsonb
     ) as request_id;
  $$
);
