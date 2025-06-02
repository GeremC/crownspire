import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://cnqvuvuxuifsxinakxlx.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNucXZ1dnV4dWlmc3hpbmFreGx4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDg4ODU2NzUsImV4cCI6MjA2NDQ2MTY3NX0.Kx7kDGmJwxHxPcvXytktSgYtE7Qhp1cyXRMxKpS9XCQ';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
