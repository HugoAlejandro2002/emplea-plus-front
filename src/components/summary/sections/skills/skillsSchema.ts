import { z } from "zod";

export const skillSchema = z.object({
  name: z.string()
    .min(1, "La habilidad es obligatoria")
    .max(50, "Máximo 50 caracteres"),
  level: z.string()
    .min(1, "El nivel es obligatorio")
    .max(50, "Máximo 50 caracteres"),
});

export const skillArraySchema = z.array(skillSchema)
  .max(6, "Máximo 6 habilidades permitidas")
  .default([]);
