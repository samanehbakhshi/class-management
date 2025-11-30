import { createClient } from "@supabase/supabase-js";
const supabaseUrl = "https://lmofhbkmnpclptmlkdxg.supabase.co";
const supabaseKey = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imxtb2ZoYmttbnBjbHB0bWxrZHhnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjA4ODE4MjEsImV4cCI6MjA3NjQ1NzgyMX0.pmpz6iEcSpWBGqyW6eE8oTnFUux-oTPtrqiwCMHl2tI`;
const supabase = createClient(supabaseUrl, supabaseKey);
export default supabase;
