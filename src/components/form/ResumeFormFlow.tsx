import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { Progress } from "@/components/ui/progress";

import { PersonalSection } from "@/features/personal";
import { SummarySection } from "@/features/summary";
import { EducationSection } from "@/features/education";
import { ExperienceSection } from "@/features/experience";
import { SkillsSection } from "@/features/skills";
import { LanguagesSection } from "@/features/languages";
import { CertificationsSection } from "@/features/certifications";

import { generateResume } from "@/services/resumeService";
import { formatFormDataForBackend } from "@/utils/formatFormDataForBackend";

const formSections = [
  { Component: PersonalSection, key: "personalData" },
  { Component: SummarySection, key: "professionalSummary" },
  { Component: EducationSection, key: "education" },
  { Component: ExperienceSection, key: "experience" },
  { Component: SkillsSection, key: "skills" },
  { Component: LanguagesSection, key: "languages" },
  { Component: CertificationsSection, key: "certifications" },
];

const ResumeFormFlow = () => {
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState<Record<string, any>>({});
  const navigate = useNavigate();

  const current = formSections[step];
  const SectionComponent = current.Component;

  const handleNext = (data: any) => {
    const updated = { ...formData, [current.key]: data };
    setFormData(updated);
    console.log("✅ Respuestas acumuladas:", updated);

    if (step < formSections.length - 1) {
      setStep(step + 1);
    } else {
      const finalData = formatFormDataForBackend(updated);
      console.log('🎯 Datos formateados para backend', finalData);

      generateResume(finalData)
        .then((res) => {
          localStorage.setItem("resumeResult", JSON.stringify(res));
          navigate("/summary");
        })
        .catch((err) => {
          console.error("❌ Error al generar resumen:", err);
        });
    }
  };

  const handleBack = () => {
    if (step > 0) setStep(step - 1);
  };

  const progressPercent = ((step + 1) / formSections.length) * 100;

  return (
    <div className="max-w-3xl w-full mx-auto space-y-6">
      <div className="space-y-2">
        <div className="text-sm text-muted-foreground">
          Paso {step + 1} de {formSections.length}
        </div>
        <Progress value={progressPercent} />
      </div>

      <SectionComponent
        onNext={handleNext}
        onBack={handleBack}
        defaultValues={formData[current.key]}
        isLast={step === formSections.length - 1}
        isFirst={step === 0}
      />
    </div>
  );
};

export default ResumeFormFlow;
