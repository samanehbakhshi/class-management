"use client";
import { supabaseBrowser } from "@/lib/supabase/client";

export async function logout() {
  const supabase = supabaseBrowser();
  await supabase.auth.signOut();
}
