import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import ResumeEditor from "@/components/summary/ResumeEditor";

const SummaryScreen = () => {
  const navigate = useNavigate();

  return (
    <div className="max-w-5xl mx-auto w-full">
      <div className="mb-6">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary"
        >
          <ArrowLeft className="w-4 h-4" />
          Volver
        </button>
      </div>

      <h1 className="text-2xl font-bold text-primary mb-6">
        Revisa y ajusta tu currículum
      </h1>

      <div className="bg-white shadow-lg rounded-lg p-6">
        <ResumeEditor />
      </div>
    </div>
  );
};

export default SummaryScreen;
