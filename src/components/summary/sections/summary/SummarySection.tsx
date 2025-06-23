import { useFormContext } from "react-hook-form";
import { Textarea } from "@/components/ui/textarea";

const SummarySection = () => {
  const { register, formState: { errors } } = useFormContext();

  return (
    <section className="space-y-2">
      <h2 className="text-lg font-semibold">Resumen profesional</h2>
      <Textarea
        {...register("summary")}
        rows={4}
        maxLength={500}
        placeholder="Breve descripción de tu perfil profesional, por ejemplo: Desarrollador Fullstack con 3 años de experiencia en React y Node.js"
      />
      {errors.summary && (
        <p className="text-red-500 text-sm">{errors.summary.message as string}</p>
      )}
    </section>
  );
};

export default SummarySection;
