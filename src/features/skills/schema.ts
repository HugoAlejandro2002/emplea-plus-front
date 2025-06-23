import { z } from "zod";

export const skillsSchema = z.object({
  skills: z
    .array(
      z.object({
        skill: z
          .string()
          .min(1, "La habilidad es obligatoria")
          .max(50, "La habilidad no debe exceder los 50 caracteres"),
        level: z.enum(["Básico", "Intermedio", "Avanzado"], {
          errorMap: () => ({ message: "Selecciona un nivel válido" }),
        }),
      })
    )
    .min(1, "Debes añadir al menos una habilidad")
    .max(8, "Solo puedes añadir hasta 8 habilidades"),
});

export type SkillsFormValues = z.infer<typeof skillsSchema>;
