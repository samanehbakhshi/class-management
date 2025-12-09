import supabase from "@/lib/services/supabaseClient";
import { ClassFormValues } from "../validation";

export async function createClassApi(payload: Partial<ClassFormValues>) {
  const { data, error } = await supabase
    .from("classes")
    .insert([payload])
    .select()
    .single();
  if (error) throw error;
  return data;
}
