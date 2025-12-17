import { z } from "zod";

export const UserSchema = z.object({
  first_name: z.string().min(1, "لطفانام را وارد کنید."),
  last_name: z.string().min(1, "لطفانام خانوادگی را وارد کنید."),
  is_active: z.boolean().default(true),
  id: z.union([z.string(), z.number()]).optional(),
  role: z.enum(["teacher", "student", "admin"]).optional(),
  email: z
    .string()
    .min(1, "لطفا ایمیل را وارد کنید.")
    .email({ error: "لطفا ایمیل معتبر وارد کنید." }),
});

export type UserFormValues = z.infer<typeof UserSchema>;
