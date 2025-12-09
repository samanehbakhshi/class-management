import supabase from "@/lib/services/supabaseClient";

export async function deleteClass(id: number) {
  const { error } = await supabase.from("classes").delete().eq("id", id);

  if (error) {
    console.error(error);
    throw new Error(error.message);
  }
  return true;
}
