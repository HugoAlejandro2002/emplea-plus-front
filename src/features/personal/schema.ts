import { z } from "zod";

export const personalSchema = z.object({
  fullName: z
    .string()
    .min(1, "Este campo es obligatorio")
    .max(100, "El nombre no debe exceder los 100 caracteres"),
  email: z
    .string()
    .email("Correo inválido")
    .max(100, "El correo no debe exceder los 100 caracteres"),
  phone: z
    .string()
    .min(1, "Este campo es obligatorio")
    .max(30, "El teléfono no debe exceder los 30 caracteres"),
  linkedin: z
    .string()
    .url("Debe ser un enlace válido")
    .max(120, "El enlace de LinkedIn es muy largo"),
});
