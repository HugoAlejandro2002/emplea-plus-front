import { z } from "zod";

const currentYear = new Date().getFullYear();

export const certificationsSchema = z.object({
    certifications: z.array(
        z.object({
            course: z.string()
                .min(1, "El nombre del curso es obligatorio")
                .max(100, "Máximo 100 caracteres"),
            provider: z.string()
                .min(1, "La institución es obligatoria")
                .max(100, "Máximo 100 caracteres"),
            year: z.string()
                .min(4, "Debe indicar el año")
                .max(4, "Debe ser un año válido")
                .refine(val => {
                    const yearNum = parseInt(val, 10);
                    return yearNum >= 1900 && yearNum <= currentYear;
                }, { message: `El año debe estar entre 1900 y ${currentYear}` }),
            certificate: z.string()
                .url("Debe ser un enlace válido")
                .max(300, "URL demasiado larga")
                .optional(),
        })
    )
        .min(1, "Agrega al menos una certificación")
        .max(4, "Máximo 4 certificaciones"),
});

export type CertificationsFormValues = z.infer<typeof certificationsSchema>;
