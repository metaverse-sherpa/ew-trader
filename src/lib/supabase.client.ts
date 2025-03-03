import { createClient } from '@supabase/supabase-js';

// Explicitly provide default values as fallbacks
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://fobbjcbpyvyxswrrngoh.supabase.co';
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZvYmJqY2JweXZ5eHN3cnJuZ29oIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc0MDQxODYyMiwiZXhwIjoyMDU1OTk0NjIyfQ.3HrHnqCBBqn_FTXvPPp5fg4cHslq0LGyprNGlQdlM68';

try {
  new URL(supabaseUrl); // Validate the URL
} catch (error) {
  console.error(`Invalid Supabase URL: ${supabaseUrl}`);
  throw new Error(`Invalid Supabase URL: ${supabaseUrl}`);
}

export const supabase = createClient(supabaseUrl, supabaseKey, {
  global: {
    headers: {
      'Access-Control-Allow-Origin': 'http://localhost:5005'
    }
  }
});

// Debug log to verify environment variables
console.log('Supabase initialized with URL:', supabaseUrl.substring(0, 20) + '...');
