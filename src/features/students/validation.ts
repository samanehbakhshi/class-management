import { z } from "zod";

export const studentSchema = z.object({
  first_name: z.string().min(1, "First name is required"),
  last_name: z.string().min(1, "Last name is required"),
  id: z.number().optional(), // optional external id
  date_of_birth: z.date().optional() ,
  gender: z.enum(["male", "female", "other"]).optional(),
  email: z.string().email("Invalid email").optional(),
  phone: z.string().optional(),
  address: z.string().optional(),
  class_id: z.number().optional().nullable(),
});

export type StudentFormValues = z.infer<typeof studentSchema>;
