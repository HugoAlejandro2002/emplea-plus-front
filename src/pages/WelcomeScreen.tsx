import { useNavigate } from "react-router-dom";
import WelcomeHeader from "@/components/shared/WelcomeHeader";
import { Button } from "@/components/ui/button";

const WelcomeScreen = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 py-12 bg-background">
      <WelcomeHeader
        title="Bienvenido a EmpleaPlus"
        description="Genera tu currículum paso a paso con ayuda inteligente. Solo responde algunas preguntas y nosotros nos encargamos del resto."
      />
      <div className="mt-8">
        <Button onClick={() => navigate("/formulario")} size="lg">
          Comenzar
        </Button>
      </div>
    </div>
  );
};

export default WelcomeScreen;
