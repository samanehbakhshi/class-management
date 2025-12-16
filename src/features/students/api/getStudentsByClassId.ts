import supabase from "@/lib/services/supabaseClient";

export async function getStudentsByClassId( classId : number ) {
  const { data, error } = await supabase
    .from("students")
    .select("*")
    .eq("class_id", classId);

  if (error) {
    console.error(error);
    throw new Error(error.message);
  }
  return data ?? [];
}
