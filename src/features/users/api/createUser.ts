import supabase from "@/lib/services/supabaseClient";
import { UserFormValues } from "../validation";

export async function createUser(payload: Partial<UserFormValues>) {
  const { data, error } = await supabase
    .from("users")
    .insert([payload])
    .select()
    .single();
  if (error) throw error;
  return data;
}
