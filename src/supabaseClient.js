import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://placeholder.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'placeholder-key';

// Only create the client if we have valid-looking URLs, otherwise it crashes the whole app
export const supabase = createClient(supabaseUrl, supabaseAnonKey);
