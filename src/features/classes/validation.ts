import { z } from "zod";

export const classSchema = z.object({
  name: z.string().min(1, "لطفا نام کلاس را وارد کنید."),
  teacher: z.string().min(1, "لطفا نام معلم را وارد کنید."),
  id: z.union([z.string(), z.number()]).optional(),
  grade: z.string().optional(),
  subject: z.string().min(1, "لطفا موضوع را وارد کنید."),
  session_count: z.number().optional(),
  start_date: z.preprocess((val) => {
    if (!val) return undefined;
    return val instanceof Date ? val : new Date(val);
  }, z.date().optional()),
  start_time: z.string(),
});

export type ClassFormValues = z.infer<typeof classSchema>;
