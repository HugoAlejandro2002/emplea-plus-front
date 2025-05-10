interface Props {
    title: string;
    children: React.ReactNode;
}

const EditableSection = ({ title, children }: Props) => (
    <section className="space-y-2">
        <h2 className="text-lg font-semibold">{title}</h2>
        {children}
    </section>
);

export default EditableSection;
