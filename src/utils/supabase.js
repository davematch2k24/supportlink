// supabase.js
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://rxstewvejfgseqzqbidd.supabase.co'
const supabaseKey =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJ4c3Rld3ZlamZnc2VxenFiaWRkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzU4NDk0MzYsImV4cCI6MjA1MTQyNTQzNn0.k-Nfd6KT3hoWMZF6P1lQa197SstafTjP9h8aeSBL8JY'
export const supabase = createClient(supabaseUrl, supabaseKey)
