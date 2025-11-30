import { Student } from "@/src/types/student";
import supabase from "../../../lib/services/supabaseClient";

export async function getStudents(): Promise<Student[]> {
  const { data: students, error } = await supabase.from("students").select("*");
  if (error) {
    console.error(error);
    throw new Error(error.message);
  }
  return students;
}
