import { useFieldArray, useFormContext } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Trash2, Plus } from "lucide-react";
import { ResumeFormType } from "../../schemas/resumeSchema";

const MAX_CERTIFICATIONS = 4;
const CURRENT_YEAR = new Date().getFullYear();

const CertificationsSection = () => {
  const {
    control,
    register,
    formState: { errors },
  } = useFormContext<ResumeFormType>();

  const { fields, append, remove } = useFieldArray({
    control,
    name: "certifications",
  });

  return (
    <section className="space-y-4">
      <h2 className="text-lg font-semibold">Certificaciones</h2>

      {fields.map((field, index) => (
        <div key={field.id} className="border p-4 rounded">
          <div className="flex gap-2 items-start">
            <div className="flex-1 space-y-2">
              <Input
                placeholder="Ej: Scrum Master"
                maxLength={100}
                {...register(`certifications.${index}.name`)}
              />
              {errors.certifications?.[index]?.name && (
                <p className="text-red-500 text-sm">
                  {errors.certifications[index]?.name?.message}
                </p>
              )}

              <Input
                placeholder="Ej: CertiProf, Google, AWS"
                maxLength={100}
                {...register(`certifications.${index}.institution`)}
              />
              {errors.certifications?.[index]?.institution && (
                <p className="text-red-500 text-sm">
                  {errors.certifications[index]?.institution?.message}
                </p>
              )}

              <Input
                placeholder="Ej: 2023"
                type="number"
                min={1950}
                max={CURRENT_YEAR + 5}
                {...register(`certifications.${index}.year`, {
                  valueAsNumber: true,
                })}
              />
              {errors.certifications?.[index]?.year && (
                <p className="text-red-500 text-sm">
                  {errors.certifications[index]?.year?.message}
                </p>
              )}
            </div>

            {fields.length > 1 && (
              <button
                type="button"
                onClick={() => remove(index)}
                className="text-red-500 mt-1"
              >
                <Trash2 size={18} />
              </button>
            )}
          </div>
        </div>
      ))}

      <Button
        type="button"
        variant="outline"
        onClick={() =>
          append({ name: "", institution: "", year: CURRENT_YEAR })
        }
        disabled={fields.length >= MAX_CERTIFICATIONS}
      >
        <Plus className="mr-2 h-4 w-4" />
        Añadir certificación
      </Button>
    </section>
  );
};

export default CertificationsSection;
