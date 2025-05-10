import { z } from "zod";

export const educationItemSchema = z.object({
  institution: z.string().min(1, "Institución requerida"),
  degree: z.string().min(1, "Título o carrera requerido"),
  startYear: z.string().min(4, "Año de inicio inválido"),
  endYear: z.string().min(4, "Año de finalización inválido"),
  notes: z.string().optional(),
});

export const educationSchema = z.object({
  education: z.array(educationItemSchema).min(1, "Agrega al menos una educación"),
});

export type EducationFormType = z.infer<typeof educationSchema>;
