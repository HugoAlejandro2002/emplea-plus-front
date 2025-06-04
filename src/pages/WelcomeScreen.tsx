import { useNavigate } from "react-router-dom";
import WelcomeHeader from "@/components/shared/WelcomeHeader";
import { Button } from "@/components/ui/button";
import heroImage from "@/assets/hero-cv.svg";

const WelcomeScreen = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen grid grid-cols-1 md:grid-cols-2 items-center px-6 py-12 bg-muted">
      {/* Imagen ilustrativa */}
      <div className="hidden md:flex justify-center">
        <img
          src={heroImage}
          alt="Ilustración currículum"
          className="max-w-md w-full h-auto object-contain"
        />
      </div>

      {/* Contenido de bienvenida */}
      <div className="flex flex-col items-center text-center space-y-8">
        <WelcomeHeader
          title="Bienvenido a EmpleaPlus"
          description="Genera tu currículum paso a paso con ayuda inteligente. Solo responde algunas preguntas y nosotros nos encargamos del resto."
        />
        <div className="flex flex-col sm:flex-row gap-4">
          <Button onClick={() => navigate("/login")} size="lg">
            Iniciar sesión
          </Button>
          <Button
            onClick={() => navigate("/register")}
            size="lg"
            variant="secondary"
          >
            Registrarse
          </Button>
        </div>
      </div>
    </div>
  );
};

export default WelcomeScreen;
