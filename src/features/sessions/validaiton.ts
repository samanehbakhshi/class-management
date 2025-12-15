import { z } from "zod";

export const sessionSchema = z.object({
  data: z.preprocess((val) => {
    if (!val) return undefined;
    return val instanceof Date ? val : new Date(val);
  }, z.date().optional()),
//   status: z.enum(["scheduled", "completed"]).default("scheduled"),
  start_time: z.string(),
  end_time: z.string(),
});
export type SessionFormValues = z.infer<typeof sessionSchema>;
