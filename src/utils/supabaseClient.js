import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseKey = import.meta.env.VITE_SUPABASE_KEY

let supabase

if (!supabase) {
  supabase = createClient(supabaseUrl, supabaseKey)
}

export { supabase }
