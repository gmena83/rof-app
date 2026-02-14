import { createClient } from "@supabase/supabase-js";

// Fallback values for build time / demo mode
const DEFAULT_URL = "https://mock.supabase.co";
const DEFAULT_KEY = "mock-key";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || DEFAULT_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || DEFAULT_KEY;

/** Browser / client-side Supabase client */
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

/** Server-side Supabase client with elevated privileges (API routes only) */
export function getServiceSupabase() {
    const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || DEFAULT_KEY;
    return createClient(supabaseUrl, serviceKey);
}
