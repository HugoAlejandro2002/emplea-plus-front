import { z } from "zod";

export const certificationsSchema = z.object({
    certifications: z.array(
        z.object({
            course: z.string().min(1, "El nombre del curso es obligatorio"),
            provider: z.string().min(1, "La institución es obligatoria"),
            year: z.string().min(4, "Debe indicar el año"),
            certificate: z.string().optional(),
        })
    ).min(1, "Agrega al menos una certificación"),
});

export type CertificationsFormValues = z.infer<typeof certificationsSchema>;
