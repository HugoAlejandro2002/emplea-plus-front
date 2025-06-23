import { z } from "zod";
import type { LanguagesFormValues } from "./model";

export const languageLevels = ["A1", "A2", "B1", "B2", "C1", "C2"] as const;

export const languagesSchema = z.object({
  languages: z.array(
    z.object({
      language: z.string().min(1, "El idioma es obligatorio"),
      level: z.enum(languageLevels, {
        errorMap: () => ({ message: "Selecciona un nivel válido (A1 - C2)" }),
      }),
    })
  )
  .min(1, "Debes agregar al menos un idioma")
  .max(4, "Solo puedes agregar hasta 4 idiomas"),
});

export type { LanguagesFormValues };
