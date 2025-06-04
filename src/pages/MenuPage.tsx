import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { UserCircle } from "lucide-react";

export default function MenuPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-muted px-6">
      <Card className="w-full max-w-md shadow-xl border-none">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-2">
            <UserCircle className="h-10 w-10 text-primary" />
          </div>
          <CardTitle className="text-2xl">Menú Principal</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Button className="w-full" onClick={() => navigate("/form")}>
            Llenar nuevo CV
          </Button>
          <Button variant="secondary" className="w-full" onClick={() => navigate("/summary")}>
            Ver datos guardados
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
