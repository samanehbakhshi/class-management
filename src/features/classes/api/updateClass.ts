import supabase from "@/lib/services/supabaseClient";
import type { ClassFormValues } from "../validation";

export async function updateClassApi(
  id: number,
  payload: Partial<ClassFormValues>
) {
  const { data, error } = await supabase
    .from("classes")
    .update(payload)
    .eq("id", id)
    .select()
    .single();
  if (error) throw error;
  return data;
}
