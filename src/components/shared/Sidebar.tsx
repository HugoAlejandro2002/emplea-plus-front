import { NavLink } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { NotebookPen , FileText, LogOut, KeyRound } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";

export default function Sidebar() {
  const { logout } = useAuth();

  const menuItems = [
    { to: "/form", label: "Llenar CV", icon: <NotebookPen className="h-5 w-5" /> },
    { to: "/resumes", label: "Mis CVs", icon: <FileText className="h-5 w-5" /> },
    { to: "/reset-password", label: "Cambiar contraseña", icon: <KeyRound className="h-5 w-5" /> },
  ];

  return (
    <aside className="w-64 min-h-screen bg-background border-r p-6 flex flex-col">
      <div className="flex-1 space-y-4">
        <h2 className="text-xl font-bold">EmpleaPlus</h2>
        <nav className="space-y-2">
          {menuItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition ${
                  isActive
                    ? "bg-muted text-primary"
                    : "text-muted-foreground hover:bg-primary/10"
                }`
              }
            >
              {item.icon}
              {item.label}
            </NavLink>
          ))}
        </nav>
      </div>
      <Button
        variant="ghost"
        className="w-full justify-start mt-6"
        onClick={logout}
      >
        <LogOut className="h-5 w-5 mr-2" /> Cerrar sesión
      </Button>
    </aside>
  );
}
