import { z } from "zod";

export const educationItemSchema = z.object({
  institution: z
    .string({
      required_error: "Institución requerida",
    })
    .min(1, "Institución requerida")
    .max(100, "Máximo 100 caracteres"),
  degree: z
    .string({
      required_error: "Título o carrera requerido",
    })
    .min(1, "Título o carrera requerido")
    .max(100, "Máximo 100 caracteres"),
  startYear: z
    .string({
      required_error: "Año de inicio requerido",
    })
    .regex(/^\d{4}$/, "Debe tener 4 dígitos")
    .refine((val) => parseInt(val) >= 1900, {
      message: "Debe ser un año válido",
    }),
  endYear: z
    .string({
      required_error: "Año de finalización requerido",
    })
    .regex(/^\d{4}$/, "Debe tener 4 dígitos")
    .refine((val) => parseInt(val) >= 1900, {
      message: "Debe ser un año válido",
    }),
  notes: z.string().max(300, "Máximo 300 caracteres").optional(),
});

export const educationSchema = z.object({
  education: z
    .array(educationItemSchema)
    .min(1, "Agrega al menos una educación")
    .max(4, "Máximo 4 formaciones académicas"),
});

export type EducationFormType = z.infer<typeof educationSchema>;
