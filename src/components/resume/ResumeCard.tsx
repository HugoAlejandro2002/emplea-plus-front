import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Pencil, Trash2, Eye } from "lucide-react";
import { toast } from "sonner";

import { getResumeById, deleteResume, renameResume } from "@/services/resumeService";
import { ResumeReference } from "@/models/resume";

interface Props {
  resume: ResumeReference;
  onDelete: (id: string) => void;
  onRename: (id: string, newFilename: string) => void;
}

export default function ResumeCard({ resume, onDelete, onRename }: Props) {
  const navigate = useNavigate();
  const [newFilename, setNewFilename] = useState(resume.filename);

  const handleLoadResume = async () => {
    try {
      const data = await getResumeById(resume.id);
      localStorage.setItem("resumeResult", JSON.stringify(data));
      navigate("/summary");
    } catch {
      toast.error("No se pudo cargar el contenido del CV.");
    }
  };

  const handleRename = async () => {
    try {
      await renameResume(resume.id, newFilename.trim());
      onRename(resume.id, newFilename.trim());
      toast.success("Nombre actualizado");
    } catch {
      toast.error("Error al renombrar");
    }
  };

  const handleDelete = async () => {
    try {
      await deleteResume(resume.id);
      onDelete(resume.id);
      toast.success("CV eliminado");
    } catch {
      toast.error("Error al eliminar el CV");
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base truncate">{resume.filename}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        <p className="text-sm text-muted-foreground">
          Creado: {new Date(resume.created_at).toLocaleString()}
        </p>
        <div className="flex gap-2 flex-wrap">
          <Button onClick={handleLoadResume} size="sm" variant="secondary">
            <Eye className="h-4 w-4 mr-1" />
            Ver
          </Button>

          <Dialog>
            <DialogTrigger asChild>
              <Button size="sm" variant="outline">
                <Pencil className="h-4 w-4 mr-1" />
                Renombrar
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Renombrar CV</DialogTitle>
              </DialogHeader>
              <Input
                value={newFilename}
                onChange={(e) => setNewFilename(e.target.value)}
              />
              <DialogFooter>
                <Button onClick={handleRename}>Guardar</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>

          <Button onClick={handleDelete} size="sm" variant="destructive">
            <Trash2 className="h-4 w-4 mr-1" />
            Eliminar
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
