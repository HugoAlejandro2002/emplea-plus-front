interface FieldProps {
  field: {
    name: string;
    label: string;
    type: string;
    placeholder: string;
    options?: string[];
  };
  register: any;
  error?: string;
}

const FieldRenderer = ({ field, register, error }: FieldProps) => {
  const baseClass = "w-full p-2 border rounded";
  const className = `${baseClass} ${error ? "border-error" : "border-muted"}`;

  const inputMap: Record<string, any> = {
    text: (
      <input
        {...register(field.name)}
        type="text"
        placeholder={field.placeholder}
        className={className}
      />
    ),
    email: (
      <input
        {...register(field.name)}
        type="email"
        placeholder={field.placeholder}
        className={className}
      />
    ),
    number: (
      <input
        {...register(field.name)}
        type="number"
        placeholder={field.placeholder}
        className={className}
      />
    ),
    date: (
      <input
        {...register(field.name)}
        type="date"
        placeholder={field.placeholder}
        className={className}
      />
    ),
    textarea: (
      <textarea
        {...register(field.name)}
        placeholder={field.placeholder}
        className={className}
      />
    ),
    select: (
      <select {...register(field.name)} className={className}>
        <option value="">Selecciona una opción</option>
        {field.options?.map((opt) => (
          <option key={opt} value={opt}>
            {opt}
          </option>
        ))}
      </select>
    ),
  };

  const inputElement = inputMap[field.type] ?? null;

  return (
    <div className="mb-4">
      <label className="block text-sm font-medium mb-1">{field.label}</label>
      {inputElement}
      {error && <p className="text-error text-sm mt-1">{error}</p>}
    </div>
  );
};

export default FieldRenderer;
