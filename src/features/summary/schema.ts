import { z } from "zod";

export const summarySchema = z.object({
  summary: z
    .string()
    .min(20, "Debe tener al menos 20 caracteres")
    .max(600, "No debe exceder los 600 caracteres"),
});

export type SummaryFormValues = z.infer<typeof summarySchema>;
