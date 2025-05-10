import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { summarySchema, SummaryFormValues } from "./schema";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

interface Props {
  defaultValues?: SummaryFormValues;
  onNext: (data: SummaryFormValues) => void;
  onBack: () => void;
  isLast?: boolean;
  isFirst?: boolean;
}

export const SummarySection = ({ defaultValues, onNext, onBack, isLast, isFirst }: Props) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SummaryFormValues>({
    resolver: zodResolver(summarySchema),
    defaultValues,
    mode: "onTouched",
  });

  const onSubmit = (data: SummaryFormValues) => {
    onNext(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div>
        <label htmlFor="summary" className="block text-lg font-medium text-foreground mb-1">
          ¿Cómo te describirías como profesional o estudiante?
        </label>
        <Textarea
          id="summary"
          {...register("summary")}
          placeholder="Soy una persona proactiva, con habilidades en liderazgo y tecnología..."
          className="min-h-[120px]"
        />
        {errors.summary && <p className="text-red-500 text-sm mt-1">{errors.summary.message}</p>}
      </div>

      <div className="flex justify-between pt-4">
        <Button type="button" variant="outline" onClick={onBack} disabled={isFirst}>
          Atrás
        </Button>
        <Button type="submit">{isLast ? "Finalizar" : "Siguiente"}</Button>
      </div>
    </form>
  );
};
