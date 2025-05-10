import { z } from "zod"

export const personalSchema = z.object({
  fullName: z.string().min(1, "Este campo es obligatorio"),
  email: z.string().email("Correo inválido"),
  phone: z.string().min(1, "Este campo es obligatorio"),
  linkedin: z.string().url("Debe ser un enlace válido")
})
