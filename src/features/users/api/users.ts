import supabase from "../../../lib/services/supabaseClient";
import { User } from "@/types/user";

export async function getUsers(): Promise<User[]> {
  const { data: users, error } = await supabase.from("users").select("*");
  if (error) {
    console.error(error);
    throw new Error(error.message);
  }
  return users;
}
