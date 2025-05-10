import { z } from "zod";

export const skillsSchema = z.object({
  skills: z.array(
    z.object({
      skill: z.string().min(1, "La habilidad es obligatoria"),
      level: z.enum(["Básico", "Intermedio", "Avanzado"], {
        errorMap: () => ({ message: "Selecciona un nivel válido" }),
      }),
    })
  ).min(1, "Debes añadir al menos una habilidad"),
});

export type SkillsFormValues = z.infer<typeof skillsSchema>;
