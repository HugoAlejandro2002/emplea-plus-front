import { useEffect, useState } from "react";
import { getUserResumes } from "@/services/resumeService";
import { ResumeReference } from "@/models/resume";
import ResumeCard from "@/components/resume/ResumeCard";
import { toast } from "sonner";

export default function ResumeListPage() {
  const [resumes, setResumes] = useState<ResumeReference[]>([]);

  const fetchResumes = async () => {
    try {
      const data = await getUserResumes();
      setResumes(data);
    } catch {
      toast.error("Error al cargar los CVs");
    }
  };

  useEffect(() => {
    fetchResumes();
  }, []);

  const handleDelete = (id: string) => {
    setResumes((prev) => prev.filter((r) => r.id !== id));
  };

  const handleRename = (id: string, newFilename: string) => {
    setResumes((prev) =>
      prev.map((r) => (r.id === id ? { ...r, filename: newFilename } : r))
    );
  };

  return (
    <div className="p-6 max-w-6xl mx-auto space-y-6">
      <h1 className="text-3xl font-bold">Lista de tus CVs</h1>
      {resumes.length === 0 ? (
        <p className="text-muted-foreground">No has generado ningún CV aún.</p>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {resumes.map((resume) => (
            <ResumeCard
              key={resume.id}
              resume={resume}
              onDelete={handleDelete}
              onRename={handleRename}
            />
          ))}
        </div>
      )}
    </div>
  );
}
