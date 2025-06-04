import { useFieldArray, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { certificationsSchema, CertificationsFormValues } from "./schema";
import { certificationFields } from "./fields";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";

interface Props {
    onNext: (data: any) => void;
    onBack: () => void;
    isLast?: boolean;
    isFirst?: boolean;
    defaultValues?: CertificationsFormValues;
}

const CertificationsSection = ({
    onNext,
    onBack,
    isLast,
    isFirst,
    defaultValues,
}: Props) => {
    const form = useForm<CertificationsFormValues>({
        resolver: zodResolver(certificationsSchema),
        defaultValues: defaultValues ?? {
            certifications: [
                { course: "", provider: "", year: "", certificate: "" },
            ],
        },
        mode: "onTouched",
    });

    const { fields, append, remove } = useFieldArray({
        control: form.control,
        name: "certifications",
    });

    const onSubmit = (values: CertificationsFormValues) => {
        onNext(values);
    };

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <h2 className="text-xl font-semibold">Cursos o certificaciones</h2>

                {fields.map((field, index) => (
                    <div key={field.id} className="p-4 border rounded-lg space-y-4">
                        <div className="flex justify-between items-center">
                            <h3 className="font-medium">Certificación #{index + 1}</h3>
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

                        {certificationFields.map(({ name, label, placeholder }) => (
                            <FormField
                                key={name}
                                control={form.control}
                                name={`certifications.${index}.${name}` as const}
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>{label}</FormLabel>
                                        <FormControl>
                                            <Input {...field} placeholder={placeholder} />
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
                        append({ course: "", provider: "", year: "", certificate: "" })
                    }
                >
                    Añadir otra certificación
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

export default CertificationsSection;
