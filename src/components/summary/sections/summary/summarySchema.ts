import { z } from "zod";

export const summarySchema = z
  .string()
  .min(1, "El resumen no puede estar vacío")
  .max(500, "El resumen no puede tener más de 500 caracteres");
