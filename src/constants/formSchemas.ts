import { z } from "zod";

export const sectionNames = [
  "Datos personales",
  "Formación académica",
  "Experiencia en proyectos o actividades",
  "Habilidades",
  "Idiomas",
  "Cursos o certificaciones",
  "Extracto profesional",
] as const;

export type SectionName = typeof sectionNames[number];

export const schemas: Record<SectionName, any> = {
  "Datos personales": z.object({
    fullName: z.string().min(3),
    email: z.string().email(),
    phone: z.string().min(7),
    country: z.string().min(2),
    city: z.string().min(2),
    birthDate: z.string().nonempty(),
  }),
  "Formación académica":
    z.object({
      institution: z.string().min(3),
      degree: z.string().min(3),
      startYear: z.string().regex(/^\d{4}$/),
      endYear: z.string().regex(/^\d{4}$/),
      notes: z.string().optional(),
    }),
  "Experiencia en proyectos o actividades":
    z.object({
      projectName: z.string().min(3),
      role: z.string().min(5),
      achievements: z.string().min(5),
      teamwork: z.string().optional(),
      coordination: z.string().optional(),
      presentation: z.string().optional(),
    }),
  "Habilidades":
    z.object({
      skill: z.string().min(2),
      level: z.enum(["Básico", "Intermedio", "Avanzado"]),
    }),
  "Idiomas":
    z.object({
      language: z.string().min(2),
      level: z.enum(["Básico", "Intermedio", "Avanzado"]),
    }),
  "Cursos o certificaciones":
    z.object({
      course: z.string().min(3),
      provider: z.string().min(3),
      year: z.string().regex(/^\d{4}$/),
      certificate: z.string().optional(),
    }),
  "Extracto profesional": z.object({
    summary: z.string().min(10),
  }),
};