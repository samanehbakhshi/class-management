import supabase from "@/lib/services/supabaseClient";
import type {  UserFormValues } from "../validation";

export async function updateUser(
  id: number,
  payload: Partial<UserFormValues>
) {
  const { data, error } = await supabase
    .from("users")
    .update(payload)
    .eq("id", id)
    .select()
    .single();
  if (error) throw error;
  return data;
}
