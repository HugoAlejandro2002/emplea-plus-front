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
