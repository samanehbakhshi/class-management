import { z } from "zod";

export const classSchema = z.object({
  first_name: z.string().min(1, "لطفا نام را وارد کنید."),
  last_name: z.string().min(1, "لطفا نام خانوادگی را وارد کنید."),
  id: z.union([z.string(), z.number()]).optional(),
  date_of_birth: z.date().optional(),
  gender: z.enum(["male", "female", "other"]).optional(),
  email: z
    .string()
    .min(1, "لطفا ایمیل را وارد کنید.")
    .email("لطفا ایمیل را درست وارد کنید."),
  phone: z.string().optional(),
  address: z.string().optional(),
  class_id: z.number().optional().nullable(),
});

export type ClassFormValues = z.infer<typeof classSchema>;
