import supabase from "@/lib/services/supabaseClient";

export async function deleteUser(id: number) {
  const { error } = await supabase.from("users").delete().eq("id", id);

  if (error) {
    console.error(error);
    throw new Error(error.message);
  }
  return true;
}
