import { Outlet } from "react-router-dom";
import Sidebar from "@/components/shared/Sidebar";

export default function AuthenticatedLayout() {
  return (
    <div className="flex min-h-screen bg-muted">
      <Sidebar />
      <main className="flex-1 h-screen overflow-hidden">
        <div className="h-full overflow-y-auto p-6">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
