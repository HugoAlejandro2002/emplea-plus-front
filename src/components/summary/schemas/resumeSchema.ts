import { z } from "zod";
import { fullNameSchema } from "../sections/fullName/fullNameSchema";
import { summarySchema } from "../sections/summary/summarySchema";
import { contactSchema } from "../sections/contact/contactSchema";
import { educationSchema } from "../sections/education/educationSchema";
import { experienceSchema } from "../sections/experience/experienceSchema";
import { skillSchema } from "../sections/skills/skillsSchema";
import { languageSchema } from "../sections/languages/languageSchema";
import { certificationSchema } from "../sections/certifications/certificationSchema";

export const resumeSchema = z.object({
  fullName: fullNameSchema,
  summary: summarySchema,
  contact: contactSchema,
  education: z.array(educationSchema).max(5, "Máximo 5 estudios").default([]),
  experience: z.array(experienceSchema).max(6, "Máximo 6 experiencias").default([]),
  skills: z.array(skillSchema).max(8, "Máximo 8 habilidades").default([]),
  languages: z.array(languageSchema).max(5, "Máximo 5 idiomas").default([]),
  certifications: z.array(certificationSchema).max(4, "Máximo 4 certificaciones").default([]),
});

export type ResumeFormType = z.infer<typeof resumeSchema>;
