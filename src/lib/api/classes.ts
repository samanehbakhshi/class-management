import supabase from "../../services/supabaseClient";
import { Class } from "@/src/types/class";

export async function getClasses(): Promise<Class[]> {
  const { data: classes, error } = await supabase.from("classes").select("*");
  if (error) {
    console.error(error);
    throw new Error(error.message);
  }
  return classes;
}
