import { useFieldArray, useFormContext } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Trash2, Plus } from "lucide-react";
import { ResumeFormType } from "../../schemas/resumeSchema";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const MAX_SKILLS = 8;

const SKILL_LEVELS = ["Básico", "Intermedio", "Avanzado", "Experto"];

const SkillsSection = () => {
  const { control, register, setValue, watch, formState: { errors } } = useFormContext<ResumeFormType>();
  const { fields, append, remove } = useFieldArray({ control, name: "skills" });
  const values = watch("skills");

  return (
    <section className="space-y-4">
      <h2 className="text-lg font-semibold">Habilidades</h2>

      {fields.map((field, index) => (
        <div key={field.id} className="border p-4 rounded">
          <div className="flex gap-2 items-start">
            <div className="flex-1 space-y-2">
              <Input
                placeholder="Ej: JavaScript"
                maxLength={100}
                {...register(`skills.${index}.name`)}
              />
              {errors.skills?.[index]?.name && (
                <p className="text-red-500 text-sm">{errors.skills[index]?.name?.message}</p>
              )}

              <div className="relative">
                <Select
                  value={values?.[index]?.level || ""}
                  onValueChange={(val) => setValue(`skills.${index}.level`, val)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Nivel (Ej: Intermedio)" />
                  </SelectTrigger>
                  <SelectContent className="max-h-[200px] overflow-y-auto">
                    {SKILL_LEVELS.map((level) => (
                      <SelectItem key={level} value={level}>
                        {level}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              {errors.skills?.[index]?.level && (
                <p className="text-red-500 text-sm">{errors.skills[index]?.level?.message}</p>
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
        onClick={() => append({ name: "", level: "" })}
        disabled={fields.length >= MAX_SKILLS}
      >
        <Plus className="mr-2 h-4 w-4" />
        Añadir habilidad
      </Button>
    </section>
  );
};

export default SkillsSection;
