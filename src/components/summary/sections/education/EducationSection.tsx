import { useFieldArray, useFormContext } from "react-hook-form";
import { ResumeFormType } from "../../schemas/resumeSchema";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Trash2, Plus } from "lucide-react";

const MAX_EDUCATION = 5;

const EducationSection = () => {
  const {
    control,
    register,
    formState: { errors },
  } = useFormContext<ResumeFormType>();

  const { fields, append, remove } = useFieldArray({
    control,
    name: "education",
  });

  return (
    <section className="space-y-6">
      <h2 className="text-xl font-semibold">Educación</h2>

      {fields.map((field, index) => {
        const err = errors.education?.[index];

        return (
          <div key={field.id} className="space-y-3 border p-4 rounded-md relative">
            <div className="space-y-2">
              <Label>Institución</Label>
              <Input
                {...register(`education.${index}.institution`)}
                placeholder="Ej: Universidad Mayor de San Andrés"
                maxLength={100}
              />
              {err?.institution && (
                <p className="text-red-500 text-sm">{err.institution.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label>Título o grado</Label>
              <Input
                {...register(`education.${index}.degree`)}
                placeholder="Ej: Licenciatura en Informática"
                maxLength={100}
              />
              {err?.degree && (
                <p className="text-red-500 text-sm">{err.degree.message}</p>
              )}
            </div>

            <div className="flex gap-4">
              <div className="flex-1 space-y-2">
                <Label>Fecha de inicio</Label>
                <Input
                  type="date"
                  {...register(`education.${index}.startDate`)}
                />
                {err?.startDate && (
                  <p className="text-red-500 text-sm">{err.startDate.message}</p>
                )}
              </div>

              <div className="flex-1 space-y-2">
                <Label>Fecha de fin</Label>
                <Input
                  type="date"
                  {...register(`education.${index}.endDate`)}
                />
                {err?.endDate && (
                  <p className="text-red-500 text-sm">{err.endDate.message}</p>
                )}
              </div>
            </div>

            <div className="space-y-2">
              <Label>Descripción (opcional)</Label>
              <Input
                {...register(`education.${index}.description`)}
                placeholder="Ej: Participación en proyectos de investigación..."
                maxLength={200}
              />
              {err?.description && (
                <p className="text-red-500 text-sm">{err.description.message}</p>
              )}
            </div>

            {fields.length > 1 && (
              <Button
                variant="ghost"
                type="button"
                onClick={() => remove(index)}
                className="absolute top-2 right-2 text-red-600"
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            )}
          </div>
        );
      })}

      {fields.length < MAX_EDUCATION && (
        <Button
          type="button"
          variant="outline"
          onClick={() =>
            append({
              institution: "",
              degree: "",
              startDate: "",
              endDate: "",
              description: "",
            })
          }
        >
          <Plus className="w-4 h-4 mr-2" /> Añadir educación
        </Button>
      )}
    </section>
  );
};

export default EducationSection;
