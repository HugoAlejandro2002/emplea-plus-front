import { z } from "zod";

export const experienceItemSchema = z.object({
  projectName: z.string().min(1, "Este campo es requerido"),
  role: z.string().min(1, "Este campo es requerido"),
  achievements: z.string().min(1, "Este campo es requerido"),
  teamwork: z.string().min(1, "Este campo es requerido"),
  coordination: z.string().min(1, "Este campo es requerido"),
  presentation: z.string().min(1, "Este campo es requerido"),
});

export const experienceSchema = z.object({
  experience: z.array(experienceItemSchema).min(1, "Agrega al menos una experiencia"),
});

export type ExperienceFormValues = z.infer<typeof experienceSchema>;
