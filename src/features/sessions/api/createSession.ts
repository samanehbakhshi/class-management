import supabase from "@/lib/services/supabaseClient";
import { SessionFormValues } from "../validaiton";

export  default async function createSession(payload : Partial<SessionFormValues>){
const {data, error} = await supabase
   .from("sessions")
    .insert([payload])
    .select()
    .single();
  if (error) throw error;
  return data;
}