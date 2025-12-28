"use client";

import { useAuth } from "@/lib/providers/AuthProvider";


interface Props {
  role?: "admin" | "teacher" | "student";
  roles?: ("admin" | "teacher" | "student")[];
  children: React.ReactNode;
}

export default function RequireRole({ role, roles, children }: Props) {
  const  user  = useAuth();
console.log(user?.role !== role, children)
  if (role && user?.role !== role)  return null;
  

  if (roles && !roles?.includes(user?.role)) return null;
 

  return <>{children}</>;
}
