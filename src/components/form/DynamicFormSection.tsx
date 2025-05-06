import FieldRenderer from "./FieldRenderer";

interface SectionProps {
    section: {
        section: string;
        fields: any[];
    };
    register: any;
    //   errors: Record<string, { message?: string }>;
    errors: any;
}

const DynamicFormSection = ({ section, register, errors }: SectionProps) => {
    return (
        <div className="bg-surface p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">{section.section}</h2>
            {section.fields.map((field) => (
                <FieldRenderer
                    key={field.name}
                    field={field}
                    register={register}
                    error={errors?.[field.name]?.message}
                />
            ))}
        </div>
    );
};

export default DynamicFormSection;
