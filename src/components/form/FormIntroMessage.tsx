import { Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Props {
  onStart: () => void;
}

export default function FormIntroMessage({ onStart }: Props) {
  return (
    <div className="w-full flex flex-col justify-center items-center text-center px-6 py-20">
      <div className="flex justify-center mb-4">
        <Sparkles className="h-12 w-12 text-primary" />
      </div>
      <h2 className="text-2xl font-bold text-primary mb-2">¡Queremos conocerte bien!</h2>
      <p className="text-muted-foreground text-sm max-w-xl">
        Este formulario te guiará paso a paso con preguntas específicas para ayudarte a construir un currículum profesional y personalizado.
        <br />
        <span className="font-medium text-foreground">
          Cuanto más detalladas y descriptivas sean tus respuestas, mejores resultados generará nuestra inteligencia artificial.
        </span>
      </p>
      <Button size="lg" className="mt-8" onClick={onStart}>
        Comenzar
      </Button>
    </div>
  );
}
