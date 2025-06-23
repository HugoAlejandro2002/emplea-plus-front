import { useFieldArray, useFormContext } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Trash2, Plus } from "lucide-react";
import { ResumeFormType } from "../../schemas/resumeSchema";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const MAX_LANGUAGES = 5;

const LANGUAGE_LEVELS = ["A1", "A2", "B1", "B2", "C1", "C2", "Nativo"];

const LanguagesSection = () => {
  const { control, register, setValue, watch, formState: { errors } } = useFormContext<ResumeFormType>();
  const { fields, append, remove } = useFieldArray({ control, name: "languages" });
  const values = watch("languages");

  return (
    <section className="space-y-4">
      <h2 className="text-lg font-semibold">Idiomas</h2>

      {fields.map((field, index) => (
        <div key={field.id} className="border p-4 rounded">
          <div className="flex gap-2 items-start">
            <div className="flex-1 space-y-2">
              <Input
                placeholder="Ej: Inglés"
                maxLength={50}
                {...register(`languages.${index}.name`)}
              />
              {errors.languages?.[index]?.name && (
                <p className="text-red-500 text-sm">{errors.languages[index]?.name?.message}</p>
              )}

              <Select
                value={values?.[index]?.level || ""}
                onValueChange={(val) => setValue(`languages.${index}.level`, val)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Nivel (Ej: B2)" />
                </SelectTrigger>
                <SelectContent>
                  {LANGUAGE_LEVELS.map((level) => (
                    <SelectItem key={level} value={level}>
                      {level}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.languages?.[index]?.level && (
                <p className="text-red-500 text-sm">{errors.languages[index]?.level?.message}</p>
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
        disabled={fields.length >= MAX_LANGUAGES}
      >
        <Plus className="mr-2 h-4 w-4" />
        Añadir idioma
      </Button>
    </section>
  );
};

export default LanguagesSection;
