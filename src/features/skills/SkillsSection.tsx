import { useFieldArray, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { skillsSchema, SkillsFormValues } from "./schema";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface Props {
  onNext: (data: any) => void;
  onBack: () => void;
  isLast?: boolean;
  isFirst?: boolean;
  defaultValues?: SkillsFormValues;
}

const SkillsSection = ({ onNext, onBack, isLast, isFirst, defaultValues }: Props) => {
  const form = useForm<SkillsFormValues>({
    resolver: zodResolver(skillsSchema),
    defaultValues: defaultValues ?? {
      skills: [{ skill: "", level: "Intermedio" }],
    },
    mode: "onTouched",
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "skills",
  });

  const onSubmit = (values: SkillsFormValues) => {
    onNext(values);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <h2 className="text-xl font-semibold">Habilidades</h2>

        {fields.map((field, index) => (
          <div key={field.id} className="p-4 border rounded-lg space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="font-medium">Habilidad #{index + 1}</h3>
              {fields.length > 1 && (
                <Button type="button" variant="destructive" onClick={() => remove(index)}>
                  Eliminar
                </Button>
              )}
            </div>

            <FormField
              control={form.control}
              name={`skills.${index}.skill`}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Habilidad o herramienta</FormLabel>
                  <FormControl>
                    <Input placeholder="Ej. Excel, Canva, Python" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name={`skills.${index}.level`}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nivel</FormLabel>
                  <FormControl>
                    <Select
                      value={field.value}
                      onValueChange={field.onChange}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Selecciona nivel" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Básico">Básico</SelectItem>
                        <SelectItem value="Intermedio">Intermedio</SelectItem>
                        <SelectItem value="Avanzado">Avanzado</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        ))}

        <Button type="button" variant="outline" onClick={() => append({ skill: "", level: "Intermedio" })}>
          Añadir otra habilidad
        </Button>

        <div className="flex justify-between pt-4">
          <Button type="button" onClick={onBack} variant="outline" disabled={isFirst}>
            Atrás
          </Button>
          <Button type="submit">{isLast ? "Generar CV" : "Siguiente"}</Button>
        </div>
      </form>
    </Form>
  );
};

export default SkillsSection;
