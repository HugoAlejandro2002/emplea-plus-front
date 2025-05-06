import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { schemas, SectionName } from "../../constants/formSchemas";
import { formBlueprint } from "../../constants/formBlueprint";
import ProgressBar from "../shared/ProgressBar";
import DynamicFormSection from "./DynamicFormSection";
import { formatFormDataForBackend } from "../../utils/formatFormDataForBackend";

const ResumeFormFlow = () => {
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState<Record<string, any>>({});

  const currentSection = formBlueprint[step];
  const sectionName = currentSection.section as SectionName;
  const schema = schemas[sectionName];


  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: formData[sectionName] ?? {},
    mode: "onTouched",
  });

  const onSubmit = (data: any) => {
    const updatedFormData = { ...formData, [sectionName]: data };
    setFormData(updatedFormData);
    console.log("✅ Respuestas hasta ahora:", updatedFormData);

    if (step < formBlueprint.length - 1) {
      setStep(step + 1);
    } else {
      const finalData = formatFormDataForBackend(updatedFormData);
      console.log("🎯 Enviando al backend:", finalData);
    }
  };

  const handleBack = () => {
    if (step > 0) setStep((s) => s - 1);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="max-w-3xl w-full mx-auto space-y-6"
    >
      <ProgressBar current={step + 1} total={formBlueprint.length} />
      <DynamicFormSection
        section={currentSection}
        register={register}
        errors={errors}
      />
      <div className="flex justify-between pt-4">
        <button
          type="button"
          onClick={handleBack}
          disabled={step === 0}
          className="px-4 py-2 text-primary border border-primary rounded disabled:opacity-50"
        >
          Atrás
        </button>
        <button
          type="submit"
          className="px-4 py-2 bg-primary text-white rounded hover:bg-secondary"
        >
          {step === formBlueprint.length - 1 ? "Generar CV" : "Siguiente"}
        </button>
      </div>
    </form>
  );
};

export default ResumeFormFlow;
