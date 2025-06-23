import { z } from "zod";

export const experienceSchema = z.object({
  company: z
    .string()
    .min(1, "La empresa es obligatoria")
    .max(100, "Máximo 100 caracteres"),
  position: z
    .string()
    .min(1, "El rol es obligatorio")
    .max(100, "Máximo 100 caracteres"),
  startDate: z.string().min(1, "La fecha de inicio es obligatoria"),
  endDate: z.string().optional(),
  responsibilities: z
    .array(z.string().min(1, "La responsabilidad no puede estar vacía"))
    .min(1, "Debe haber al menos una responsabilidad")
    .max(3, "Máximo 3 responsabilidades por experiencia"),
});

export const experienceArraySchema = z
  .array(experienceSchema)
  .max(6, "Máximo 6 experiencias permitidas")
  .default([]);
