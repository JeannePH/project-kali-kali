
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL_MINE
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY_MINE

export const supabase = createClient(supabaseUrl, supabaseAnonKey)


