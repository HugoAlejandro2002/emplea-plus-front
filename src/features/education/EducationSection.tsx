import { useFieldArray, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { educationSchema, EducationFormType } from "./schema";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";

interface Props {
  onNext: (data: EducationFormType) => void;
  onBack: () => void;
  defaultValues?: EducationFormType;
  isLast: boolean;
  isFirst: boolean;
}

const EducationSection = ({ onNext, onBack, defaultValues, isLast, isFirst }: Props) => {
  const form = useForm<EducationFormType>({
    resolver: zodResolver(educationSchema),
    defaultValues: defaultValues ?? { education: [{}] },
    mode: "onTouched",
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "education",
  });

  const onSubmit = (data: EducationFormType) => {
    onNext(data);
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Formación académica</h2>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          {fields.map((field, index) => (
            <div key={field.id} className="border p-4 rounded-lg space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="font-semibold">Educación #{index + 1}</h3>
                {fields.length > 1 && (
                  <Button variant="destructive" type="button" onClick={() => remove(index)}>
                    Eliminar
                  </Button>
                )}
              </div>
              <FormField
                control={form.control}
                name={`education.${index}.institution`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Institución</FormLabel>
                    <FormControl>
                      <Input placeholder="Universidad Privada Boliviana" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name={`education.${index}.degree`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Título o carrera</FormLabel>
                    <FormControl>
                      <Input placeholder="Ingeniería de Sistemas" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name={`education.${index}.startYear`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Año de inicio</FormLabel>
                      <FormControl>
                        <Input placeholder="2018" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name={`education.${index}.endYear`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Año de finalización</FormLabel>
                      <FormControl>
                        <Input placeholder="2023" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <FormField
                control={form.control}
                name={`education.${index}.notes`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Notas u observaciones</FormLabel>
                    <FormControl>
                      <Textarea placeholder="Graduado con honores" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          ))}

          <Button
            type="button"
            variant="outline"
            onClick={() =>
              append({
                institution: "",
                degree: "",
                startYear: "",
                endYear: "",
                notes: ""
              })
            }
          >
            Añadir otra formación
          </Button>

          <div className="flex justify-between pt-4">
            <Button type="button" onClick={onBack} variant="outline" disabled={isFirst}>
              Atrás
            </Button>
            <Button type="submit">{isLast ? "Generar CV" : "Siguiente"}</Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default EducationSection;
