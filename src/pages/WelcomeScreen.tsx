import { useNavigate } from "react-router-dom";

const WelcomeScreen = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background text-center p-8">
      <h1 className="text-3xl font-bold text-primary mb-4">Bienvenido a EmpleaPlus</h1>
      <p className="text-muted mb-6">
        Genera tu currículum paso a paso con ayuda inteligente. Solo responde algunas preguntas y nosotros nos encargamos del resto.
      </p>
      <button
        onClick={() => navigate("/formulario")}
        className="px-6 py-3 bg-primary text-white rounded hover:bg-secondary transition"
      >
        Comenzar
      </button>
    </div>
  );
};

export default WelcomeScreen;
