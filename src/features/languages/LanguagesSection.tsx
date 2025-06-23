import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
  } from "@/components/ui/form";
  import { Input } from "@/components/ui/input";
  import { Button } from "@/components/ui/button";
  import { Select, SelectTrigger, SelectItem, SelectContent, SelectValue } from "@/components/ui/select";
  
  import { useFieldArray, useForm } from "react-hook-form";
  import { zodResolver } from "@hookform/resolvers/zod";
  import { languagesSchema, LanguagesFormValues, languageLevels } from "./schema";
  
  interface Props {
    onNext: (data: LanguagesFormValues) => void;
    onBack: () => void;
    isLast?: boolean;
    isFirst?: boolean;
    defaultValues?: LanguagesFormValues;
  }
  
  const LanguagesSection = ({ onNext, onBack, isLast, isFirst, defaultValues }: Props) => {
    const form = useForm<LanguagesFormValues>({
      resolver: zodResolver(languagesSchema),
      defaultValues: defaultValues ?? {
        languages: [{ language: "", level: "A1" }],
      },
      mode: "onTouched",
    });
  
    const { fields, append, remove } = useFieldArray({
      control: form.control,
      name: "languages",
    });
  
    const onSubmit = (values: LanguagesFormValues) => {
      onNext(values);
    };
  
    return (
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <h2 className="text-xl font-semibold">Idiomas</h2>
  
          {fields.map((field, index) => (
            <div key={field.id} className="p-4 border rounded-lg space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="font-medium">Idioma #{index + 1}</h3>
                {fields.length > 1 && (
                  <Button type="button" variant="destructive" onClick={() => remove(index)}>
                    Eliminar
                  </Button>
                )}
              </div>
  
              <FormField
                control={form.control}
                name={`languages.${index}.language`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Idioma</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Ej. Inglés" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
  
              <FormField
                control={form.control}
                name={`languages.${index}.level`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nivel</FormLabel>
                    <FormControl>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Selecciona un nivel" />
                        </SelectTrigger>
                        <SelectContent>
                          {languageLevels.map((level) => (
                            <SelectItem key={level} value={level}>
                              {level}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
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
            onClick={() => fields.length < 4 && append({ language: "", level: "A1" })}
            disabled={fields.length >= 4}
          >
            Añadir otro idioma
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
  
  export default LanguagesSection;
  