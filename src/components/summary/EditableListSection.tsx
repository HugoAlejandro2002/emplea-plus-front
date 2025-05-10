import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import EditableSection from "./EditableSection";

interface FieldConfig {
    key: string;
    label: string;
    type?: "text" | "date";
    multiline?: boolean;
}

interface Props {
    title: string;
    items: any[];
    fields?: FieldConfig[];
    onUpdate: (section: string, index: number, key: string, value: string) => void;
    customRender?: (item: any, index: number) => React.ReactNode;
}

const EditableListSection = ({
    title,
    items,
    fields,
    onUpdate,
    customRender,
}: Props) => {
    return (
        <EditableSection title={title}>
            {items.map((item, i) => (
                <div key={i} className="p-4 border rounded space-y-2">
                    {customRender
                        ? customRender(item, i)
                        : fields?.map((field) =>
                            field.multiline ? (
                                <Textarea
                                    key={field.key}
                                    value={item[field.key]}
                                    placeholder={field.label}
                                    onChange={(e) => onUpdate(title.toLowerCase(), i, field.key, e.target.value)}
                                />
                            ) : (
                                <Input
                                    key={field.key}
                                    type={field.type ?? "text"}
                                    value={item[field.key]}
                                    placeholder={field.label}
                                    onChange={(e) => onUpdate(title.toLowerCase(), i, field.key, e.target.value)}
                                />
                            )
                        )}
                </div>
            ))}
        </EditableSection>
    );
};

export default EditableListSection;
