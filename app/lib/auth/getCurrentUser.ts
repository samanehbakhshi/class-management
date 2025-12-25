

// import { Role } from "@/types/role";
// import { createSupabaseServerClient } from "../supabase/server";


// export interface CurrentUser {
//   id: string;
//   email: string;
//   role: Role;
// }

// export async function getCurrentUser(): Promise<CurrentUser | null> {
//   const supabase =  await createSupabaseServerClient();

//   const {
//     data: { user },
//   } = await supabase.auth.getUser();

//   if (!user) return null;

//   const { data: profile, error } = await supabase
//     .from("users")
//     .select("id, role")
//     .eq("id", user.id)
//     .single();

//   if (error) throw error;

//   return {
//    id: user.id,
//    email: user.email!,
//     role: profile.role,
//   };
// }
import { Role } from "@/types/role";
import { createSupabaseServerClient } from "../supabase/server";

export interface CurrentUser {
  id: string;
  email: string;
  role: Role;
}

export async function getCurrentUser(): Promise<CurrentUser | null> {
  const supabase = await createSupabaseServerClient();

  // ۱. گرفتن user safely
  const userResponse = await supabase.auth.getUser();
  const user = userResponse.data?.user;

  if (!user) return null;

  const { data: profile, error } = await supabase
    .from("users") // یا "profiles" اگر جدول شما اینه
    .select("id, role")
    .eq("id", user.id)
    .maybeSingle();
    
if (!profile) {
  return null; // یا redirect به /unauthorized
}
  if (error) throw error;

  return {
    id: user.id,
    email: user.email!,
    role: profile.role,
  };
}
