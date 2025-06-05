import { useFieldArray, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { experienceSchema, ExperienceFormValues } from "./schema";
import { experienceFieldMeta } from "./fields";

import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form";

interface Props {
  onNext: (data: any) => void;
  onBack: () => void;
  isLast?: boolean;
  isFirst?: boolean;
  defaultValues?: ExperienceFormValues;
}

const ExperienceSection = ({
  onNext,
  onBack,
  isLast,
  isFirst,
  defaultValues
}: Props) => {
  const form = useForm<ExperienceFormValues>({
    resolver: zodResolver(experienceSchema),
    defaultValues: defaultValues ?? {
      experience: [
        {
          projectName: "",
          role: "",
          achievements: "",
          teamwork: "",
          coordination: "",
          presentation: ""
        }
      ]
    },
    mode: "onTouched"
  });

  const { control, handleSubmit } = form;
  const { fields, append, remove } = useFieldArray({
    control,
    name: "experience"
  });

  const onSubmit = (values: ExperienceFormValues) => {
    onNext(values);
  };

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <h2 className="text-xl font-semibold">Experiencia laboral y/o actividades de importancia</h2>

        {fields.map((field, index) => (
          <div key={field.id} className="p-4 border rounded-lg space-y-4 bg-muted/10">
            <div className="flex justify-between items-center">
              <h3 className="font-medium">Experiencia y/o Actividad #{index + 1}</h3>
              {fields.length > 1 && (
                <Button
                  type="button"
                  variant="destructive"
                  onClick={() => remove(index)}
                >
                  Eliminar
                </Button>
              )}
            </div>

            {experienceFieldMeta.map(({ name, label, placeholder }) => (
              <FormField
                key={name}
                control={control}
                name={`experience.${index}.${name}` as const}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{label}</FormLabel>
                    <FormControl>
                      <Textarea {...field} placeholder={placeholder} className="resize-y" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            ))}
          </div>
        ))}

        <Button
          type="button"
          variant="outline"
          onClick={() =>
            append({
              projectName: "",
              role: "",
              achievements: "",
              teamwork: "",
              coordination: "",
              presentation: ""
            })
          }
        >
          Añadir otra experiencia
        </Button>

        <div className="flex justify-between pt-4">
          <Button type="button" onClick={onBack} variant="outline" disabled={isFirst}>
            Atrás
          </Button>
          <Button type="submit">
            {isLast ? "Generar CV" : "Siguiente"}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default ExperienceSection;
