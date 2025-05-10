import { z } from "zod";

export const summarySchema = z.object({
  summary: z.string().min(20, "Debe tener al menos 20 caracteres"),
});

export type SummaryFormValues = z.infer<typeof summarySchema>;
