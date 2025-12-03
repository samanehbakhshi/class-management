
import supabase from "@/src/lib/services/supabaseClient";
import type { StudentFormValues } from "../validation";

export async function createStudentApi(payload: Partial<StudentFormValues>) {
  const { data, error } = await supabase
    .from("students")
    .insert([payload])
    .select()
    .single();
  if (error) throw error;
  return data;
}
