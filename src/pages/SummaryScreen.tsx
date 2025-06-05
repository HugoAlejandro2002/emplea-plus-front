import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ResumeResponse } from "@/models/resume";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import EditableListSection from "@/components/summary/EditableListSection";
import EditableSection from "@/components/summary/EditableSection";
import { downloadResumePdf } from "@/services/resumeService";
import { ArrowLeft } from "lucide-react";

const SummaryScreen = () => {
  const [cvData, setCvData] = useState<ResumeResponse | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const stored = localStorage.getItem("resumeResult");
    if (stored) {
      setCvData(JSON.parse(stored));
    }
  }, []);

  const updateField = <T extends keyof ResumeResponse>(
    section: T,
    key: keyof ResumeResponse[T],
    value: any
  ) => {
    if (!cvData) return;
    setCvData((prev) => ({
      ...prev!,
      [section]: {
        ...(prev![section] as any),
        [key]: value,
      },
    }));
  };

  const updateListItem = (
    section: keyof ResumeResponse,
    index: number,
    key: string,
    value: string
  ) => {
    const updated = [...(cvData as any)[section]];
    updated[index][key] = value;
    setCvData({ ...cvData!, [section]: updated });
  };

  const updateResponsibility = (expIndex: number, resIndex: number, value: string) => {
    const updated = [...cvData.experience];
    if (!updated[expIndex].responsibilities) {
      updated[expIndex].responsibilities = [];
    }
    updated[expIndex].responsibilities[resIndex] = value;
    setCvData((prev) => ({ ...prev, experience: updated }));
  };

  const handleSubmit = async () => {
    try {
      const pdfBlob = await downloadResumePdf(cvData!);
      const url = window.URL.createObjectURL(new Blob([pdfBlob]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "cv.pdf");
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("❌ Error al generar el PDF:", error);
    }
  };

  if (!cvData) return <p className="text-center mt-20">Cargando resumen...</p>;

  return (
    <div className="max-w-5xl mx-auto p-6">
      <div className="bg-white shadow-lg rounded-lg p-6 space-y-10">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary"
        >
          <ArrowLeft className="w-4 h-4" />
          Volver
        </button>

        <h1 className="text-2xl font-bold text-primary">Revisa y ajusta tu currículum</h1>

        <EditableSection title="Nombre completo">
          <Input
            value={cvData.fullName}
            onChange={(e) => setCvData({ ...cvData, fullName: e.target.value })}
          />
        </EditableSection>

        <EditableSection title="Resumen profesional">
          <Textarea
            value={cvData.summary}
            onChange={(e) => setCvData({ ...cvData, summary: e.target.value })}
            rows={4}
          />
        </EditableSection>

        <EditableListSection
          title="Educación"
          items={cvData.education}
          onUpdate={updateListItem}
          fields={[
            { key: "institution", label: "Institución" },
            { key: "degree", label: "Título" },
            { key: "startDate", label: "Inicio", type: "date" },
            { key: "endDate", label: "Fin", type: "date" },
            { key: "description", label: "Descripción", multiline: true },
          ]}
        />

        <EditableListSection
          title="Experiencia"
          items={cvData.experience}
          onUpdate={updateListItem}
          customRender={(exp, idx) => (
            <div className="space-y-2">
              <Input
                value={exp.company}
                onChange={(e) =>
                  updateListItem("experience", idx, "company", e.target.value)
                }
                placeholder="Empresa"
              />
              <Input
                value={exp.role}
                onChange={(e) =>
                  updateListItem("experience", idx, "role", e.target.value)
                }
                placeholder="Rol"
              />
              <Input
                type="date"
                value={exp.startDate}
                onChange={(e) =>
                  updateListItem("experience", idx, "startDate", e.target.value)
                }
              />
              <Input
                type="date"
                value={exp.endDate ?? ""}
                onChange={(e) =>
                  updateListItem("experience", idx, "endDate", e.target.value)
                }
              />

              <p className="font-medium mt-2">Responsabilidades o logros</p>
              {(exp.responsibilities ?? []).map((resp: string, j: number) => (
                <Textarea
                  key={j}
                  value={resp}
                  onChange={(e) => updateResponsibility(idx, j, e.target.value)}
                  placeholder="Describe una responsabilidad o logro importante"
                />
              ))}
            </div>
          )}
        />

        <Button onClick={handleSubmit} className="w-full mt-6">
          Generar CV final
        </Button>
      </div>
    </div>
  );
};

export default SummaryScreen;
