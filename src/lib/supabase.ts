import { createBrowserClient } from '@supabase/ssr'

let supabaseInstance: any;

export const createClient = () => {
  if (supabaseInstance) return supabaseInstance;

  supabaseInstance = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  return supabaseInstance;
}
export const supabase = createClient();