import { useFieldArray, useFormContext } from "react-hook-form";
import { ResumeFormType } from "../../schemas/resumeSchema";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Trash2, Plus } from "lucide-react";
import { useEffect } from "react";

const MAX_EXPERIENCE = 6;
const MAX_RESPONSIBILITIES = 3;

const ExperienceSection = () => {
  const {
    control,
    register,
    setValue,
    watch,
    formState: { errors },
  } = useFormContext<ResumeFormType>();

  const { fields, append, remove } = useFieldArray({
    control,
    name: "experience",
  });

  const experienceValues = watch("experience");

  useEffect(() => {
    fields.forEach((_field, index) => {
      const resp = experienceValues?.[index]?.responsibilities;
      if (!resp || resp.length === 0) {
        setValue(`experience.${index}.responsibilities`, [""]);
      }
    });
  }, [fields, experienceValues, setValue]);

  const addResponsibility = (expIndex: number) => {
    const current = experienceValues?.[expIndex]?.responsibilities || [];
    if (current.length < MAX_RESPONSIBILITIES) {
      setValue(`experience.${expIndex}.responsibilities`, [...current, ""]);
    }
  };

  const removeResponsibility = (expIndex: number, respIndex: number) => {
    const current = experienceValues?.[expIndex]?.responsibilities || [];
    const updated = [...current];
    updated.splice(respIndex, 1);
    setValue(`experience.${expIndex}.responsibilities`, updated);
  };

  return (
    <section className="space-y-6">
      <h2 className="text-xl font-semibold">Experiencia</h2>

      {fields.map((field, index) => {
        const responsibilities = experienceValues?.[index]?.responsibilities || [];
        const err = errors.experience?.[index];

        return (
          <div key={field.id} className="space-y-5 border p-4 rounded-md relative">
            <div className="space-y-2">
              <Label>Empresa</Label>
              <Input
                {...register(`experience.${index}.company`)}
                placeholder="Ej: Google LLC"
                maxLength={100}
              />
              {err?.company && (
                <p className="text-red-500 text-sm">{err.company.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label>Rol</Label>
              <Input
                {...register(`experience.${index}.position`)}
                placeholder="Ej: Desarrollador Backend"
                maxLength={100}
              />
              {err?.position && (
                <p className="text-red-500 text-sm">{err.position.message}</p>
              )}
            </div>

            <div className="flex gap-4">
              <div className="flex-1 space-y-2">
                <Label>Fecha de inicio</Label>
                <Input type="date" {...register(`experience.${index}.startDate`)} />
                {err?.startDate && (
                  <p className="text-red-500 text-sm">{err.startDate.message}</p>
                )}
              </div>
              <div className="flex-1 space-y-2">
                <Label>Fecha de fin</Label>
                <Input type="date" {...register(`experience.${index}.endDate`)} />
              </div>
            </div>

            <div className="space-y-2">
              <Label>Responsabilidades</Label>
              {responsibilities.map((_, respIndex) => (
                <div key={respIndex} className="flex gap-2 items-start">
                  <Textarea
                    {...register(`experience.${index}.responsibilities.${respIndex}`)}
                    placeholder={`Ej: Mantenimiento de APIs RESTful en entorno productivo`}
                    maxLength={300}
                    className="flex-1"
                  />
                  {responsibilities.length > 1 && (
                    <Button
                      type="button"
                      variant="ghost"
                      onClick={() => removeResponsibility(index, respIndex)}
                      className="text-red-600 mt-1"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  )}
                </div>
              ))}
              {err?.responsibilities && (
                <p className="text-red-500 text-sm">
                  {typeof err.responsibilities === "string"
                    ? err.responsibilities
                    : ""}
                </p>
              )}
            </div>

            {responsibilities.length < MAX_RESPONSIBILITIES && (
              <Button
                type="button"
                variant="secondary"
                onClick={() => addResponsibility(index)}
              >
                <Plus className="w-4 h-4 mr-1" /> Añadir responsabilidad
              </Button>
            )}

            {fields.length > 1 && (
              <Button
                type="button"
                variant="ghost"
                onClick={() => remove(index)}
                className="text-red-600 mt-2"
              >
                <Trash2 className="w-4 h-4 mr-2" /> Eliminar experiencia
              </Button>
            )}
          </div>
        );
      })}

      {fields.length < MAX_EXPERIENCE && (
        <Button
          type="button"
          variant="outline"
          onClick={() =>
            append({
              company: "",
              position: "",
              startDate: "",
              endDate: "",
              responsibilities: [""],
            })
          }
        >
          <Plus className="w-4 h-4 mr-2" /> Añadir experiencia
        </Button>
      )}
    </section>
  );
};

export default ExperienceSection;
