import { useFieldArray, UseFormRegister, Control } from "react-hook-form";
import { useEffect } from "react";
import FieldRenderer from "./FieldRenderer";

interface Props {
    section: { section: string; fields: any[] };
    control: Control<any>;
    register: UseFormRegister<any>;
    errors: any;
}

const RepeatableFormSection = ({ section, control, register, errors }: Props) => {
    const { fields, append, remove } = useFieldArray({
        control,
        name: section.section,
    });

    useEffect(() => {
        if (fields.length === 0) append({});
    }, []);

    return (
        <div className="bg-surface p-6 rounded-lg shadow-md space-y-6">
            <h2 className="text-xl font-semibold">{section.section}</h2>

            {fields.map((item, index) => (
                <div key={item.id} className="border p-4 rounded-md space-y-4 relative">
                    <button
                        type="button"
                        onClick={() => remove(index)}
                        className="absolute right-2 top-2 text-sm text-error"
                    >
                        Eliminar
                    </button>

                    {section.fields.map((field) => (
                        <FieldRenderer
                            key={field.name}
                            field={{
                                ...field,
                                name: `${section.section}[${index}].${field.name}`,
                            }}
                            register={register}
                            error={errors?.[index]?.[field.name]?.message}
                        />
                    ))}
                </div>
            ))}

            <button
                type="button"
                onClick={() => fields.length < 3 && append({})}
                className="mt-4 px-4 py-2 border border-primary text-primary rounded"
                disabled={fields.length >= 3}
            >
                Agregar otro
            </button>
        </div>
    );
};

export default RepeatableFormSection;