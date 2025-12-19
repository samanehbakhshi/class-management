export type UserRole = "student" | "teacher" | "admin";
export interface User {
  id: number;
  created_at: string;
  emial: string;
  first_name: string;
  last_name: string;
  role: UserRole;
  is_active: boolean;
}
