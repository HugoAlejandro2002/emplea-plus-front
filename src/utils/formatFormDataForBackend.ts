import { ResumeFormType } from "@/components/summary/schemas/resumeSchema";
import { ResumeResponse } from "@/models/resume";

export const formatFormDataForBackend = (formData: Record<string, any>) => {
  return {
    personalData: formData.personalData,
    education: formData.education.education,
    experience: formData.experience.experience,
    skills: formData.skills.skills,
    languages: formData.languages.languages,
    certifications: formData.certifications.certifications,
    professionalSummary: formData.professionalSummary,
  };
};

const formatToMonthYear = (dateStr: string): string => {
  const [year, month] = dateStr.split("-");
  return month && year ? `${month}/${year}` : "";
};

export const transformToResumeResponse = (formData: ResumeFormType): ResumeResponse => {
  return {
    fullName: formData.fullName,
    summary: formData.summary,
    contact: {
      email: formData.contact.email,
      phone: formData.contact.phone,
      linkedin: formData.contact.linkedin,
    },
    education: formData.education.map(e => ({
      institution: e.institution,
      degree: e.degree,
      startYear: formatToMonthYear(e.startDate),
      endYear: formatToMonthYear(e.endDate),
      description: e.description ?? "",
    })),
    experience: formData.experience.map(e => ({
      company: e.company,
      position: e.position,
      startDate: formatToMonthYear(e.startDate),
      endDate: e.endDate ? formatToMonthYear(e.endDate) : null,
      responsibilities: e.responsibilities,
    })),
    skills: formData.skills.map(s => ({
      name: s.name,
      level: s.level,
    })),
    languages: formData.languages.map(l => ({
      name: l.name,
      proficiency: l.level, // ✅ renombrado correctamente
    })),
    certifications: formData.certifications.map(c => ({
      name: c.name,
      institution: c.institution,
      year: Number(c.year),
    })),
  };
};

