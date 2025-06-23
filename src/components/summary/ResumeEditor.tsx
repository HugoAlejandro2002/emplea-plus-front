import { useEffect } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { resumeSchema, ResumeFormType } from "./schemas/resumeSchema";
import { downloadResumePdf } from "@/services/resumeService";
import { Button } from "@/components/ui/button";

import FullNameSection from "./sections/fullName/FullNameSection";
import SummarySection from "./sections/summary/SummarySection";
import ContactSection from "./sections/contact/ContactSection";
import EducationSection from "./sections/education/EducationSection";
import ExperienceSection from "./sections/experience/ExperienceSection";
import SkillsSection from "./sections/skills/SkillsSection";
import LanguagesSection from "./sections/languages/LanguagesSection";
import CertificationsSection from "./sections/certifications/CertificationsSection";

import { transformToResumeResponse } from "@/utils/formatFormDataForBackend";

const ResumeEditor = () => {
  const methods = useForm<any>({
  resolver: zodResolver(resumeSchema),
  defaultValues: {
    fullName: "",
    summary: "",
    contact: {
      email: "",
      phone: "",
      linkedin: "",
    },
    education: [],
    experience: [],
    skills: [],
    languages: [],
    certifications: [],
  },
});

  const { reset, handleSubmit } = methods;

  useEffect(() => {
    const stored = localStorage.getItem("resumeResult");
    if (stored) {
      reset(JSON.parse(stored));
    }
  }, [reset]);

  const onSubmit = async (data: ResumeFormType) => {
    try {
      const payload = transformToResumeResponse(data);
      const pdfBlob = await downloadResumePdf(payload);
      const url = URL.createObjectURL(new Blob([pdfBlob]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "cv.pdf");
      document.body.appendChild(link);
      link.click();
      link.remove();
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error("❌ Error al generar el PDF:", error);
    }
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-10">
        <FullNameSection />
        <SummarySection />
        <ContactSection />
        <EducationSection />
        <ExperienceSection />
        <SkillsSection />
        <LanguagesSection />
        <CertificationsSection />
        <Button type="submit" className="w-full">Generar CV final</Button>
      </form>
    </FormProvider>
  );
};

export default ResumeEditor;
