import { createClient } from '@supabase/supabase-js';

const rawUrl = import.meta.env.VITE_SUPABASE_URL || '';
const rawKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

export const isPlaceholder = !rawUrl ||
    rawUrl.includes('placeholder.supabase') ||
    rawUrl.includes('YOUR_SUPABASE');

const supabaseUrl = isPlaceholder ? 'https://placeholder.supabase.co' : rawUrl;
const supabaseAnonKey = isPlaceholder ? 'placeholder-key' : rawKey;

// Only create the client if we have valid-looking URLs, otherwise it crashes the whole app
export const supabase = createClient(supabaseUrl, supabaseAnonKey);
