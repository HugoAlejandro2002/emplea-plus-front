import { z } from "zod";

export const certificationSchema = z.object({
  name: z.string()
    .min(1, "El nombre de la certificación es obligatorio")
    .max(200, "Máximo 200 caracteres permitidos"),
  institution: z.string()
    .min(1, "La institución es obligatoria")
    .max(200, "Máximo 200 caracteres permitidos"),
  year: z
    .number({ invalid_type_error: "El año debe ser un número" })
    .min(1900, "Debe ser mayor a 1900")
    .max(new Date().getFullYear(), "No puede ser un año futuro"),
});

export const certificationArraySchema = z.array(certificationSchema)
  .max(4, "Máximo 4 certificaciones permitidas")
  .default([]);
