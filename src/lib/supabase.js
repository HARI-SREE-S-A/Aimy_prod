import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

// Fast check: is Supabase actually configured?
export const isSupabaseConfigured = !!(
  supabaseUrl && 
  supabaseKey && 
  !supabaseUrl.includes('dummy') &&
  supabaseUrl.startsWith('https://')
);

// Only create a real client if configured; otherwise create a mock
// that returns empty data instantly (no 7-second network timeout).
const emptyResponse = { data: null, error: null };
const mockFrom = () => ({
  select: () => mockFrom(),
  eq: () => mockFrom(),
  order: () => mockFrom(),
  single: () => Promise.resolve(emptyResponse),
  then: (resolve) => resolve(emptyResponse),
});

const mockClient = {
  from: () => mockFrom(),
  auth: {
    getSession: () => Promise.resolve({ data: { session: null } }),
    signInWithPassword: () => Promise.resolve({ data: null, error: { message: 'Supabase not configured' } }),
  },
};

export const supabase = isSupabaseConfigured
  ? createClient(supabaseUrl, supabaseKey, {
      auth: { persistSession: true },
    })
  : mockClient;

// Helper for server-side actions using the service role key (bypasses RLS)
export const getServiceSupabase = () => {
  if (!isSupabaseConfigured) return mockClient;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || '';
  return createClient(supabaseUrl, serviceKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  });
};
