import { z } from "zod";

export const contactSchema = z.object({
  email: z.string().email("Correo inválido").max(100, "Máximo 100 caracteres"),
  phone: z.string().min(1, "Teléfono requerido").max(25, "Máximo 25 caracteres"),
  linkedin: z.string().url("URL inválida").max(120, "Máximo 120 caracteres"),
});