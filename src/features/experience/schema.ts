import { z } from "zod";

export const experienceItemSchema = z.object({
  projectName: z.string().min(1, "Este campo es requerido").max(300, "Máximo 300 caracteres"),
  role: z.string().min(1, "Este campo es requerido").max(300, "Máximo 300 caracteres"),
  achievements: z.string().min(1, "Este campo es requerido").max(300, "Máximo 300 caracteres"),
  teamwork: z.string().min(1, "Este campo es requerido").max(300, "Máximo 300 caracteres"),
  coordination: z.string().min(1, "Este campo es requerido").max(300, "Máximo 300 caracteres"),
  presentation: z.string().min(1, "Este campo es requerido").max(300, "Máximo 300 caracteres"),
});

export const experienceSchema = z.object({
  experience: z
    .array(experienceItemSchema)
    .min(1, "Agrega al menos una experiencia")
    .max(4, "Máximo 4 experiencias"),
});

export type ExperienceFormValues = z.infer<typeof experienceSchema>;
