import { z } from "zod";

export const languageSchema = z.object({
  name: z.string()
    .min(1, "El nombre del idioma es obligatorio")
    .max(50, "Máximo 50 caracteres"),
  level: z.string()
    .min(1, "El nivel es obligatorio")
    .max(50, "Máximo 50 caracteres"),
});

export const languageArraySchema = z.array(languageSchema)
  .max(5, "Máximo 5 idiomas permitidos")
  .default([]);
