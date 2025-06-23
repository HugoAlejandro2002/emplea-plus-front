import { z } from "zod";

export const educationSchema = z.object({
  institution: z
    .string()
    .min(1, "La institución es obligatoria")
    .max(100, "Máximo 100 caracteres"),
  degree: z
    .string()
    .min(1, "El título es obligatorio")
    .max(100, "Máximo 100 caracteres"),
  startDate: z.string().min(1, "Fecha de inicio obligatoria"),
  endDate: z.string().min(1, "Fecha de fin obligatoria"),
  description: z.string().max(200, "Máximo 200 caracteres").optional(),
});

export const educationArraySchema = z
  .array(educationSchema)
  .max(5, "Máximo 5 elementos permitidos")
  .default([]);
