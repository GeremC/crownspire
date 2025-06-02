import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'TON_URL_SUPABASE';
const supabaseAnonKey = 'TA_CLE_ANNONCE_PUBLIC';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);