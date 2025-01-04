// src/utils/supabaseClient.js
import { createClient } from '@supabase/supabase-js'

// Load environment variables
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseKey = import.meta.env.VITE_SUPABASE_KEY

if (!supabaseUrl || !supabaseKey) {
  throw new Error('supabaseUrl and supabaseKey are required.')
}

// Create a Supabase client
const supabase = createClient(supabaseUrl, supabaseKey)

export { supabase }
