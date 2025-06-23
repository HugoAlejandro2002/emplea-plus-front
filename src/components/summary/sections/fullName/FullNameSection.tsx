import { useFormContext } from "react-hook-form";
import { Input } from "@/components/ui/input";

const FullNameSection = () => {
  const { register } = useFormContext();

  return (
    <section className="space-y-2">
      <h2 className="text-lg font-semibold">Nombre completo</h2>
      <Input {...register("fullName")} placeholder="Ej. Juan Pérez" />
    </section>
  );
};

export default FullNameSection;
