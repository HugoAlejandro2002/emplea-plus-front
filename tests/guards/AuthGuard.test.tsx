import { render, screen } from "@testing-library/react";
import AuthGuard from "@/guards/AuthGuard";
import { useAuth } from "@/hooks/useAuth";
import { MemoryRouter } from "react-router-dom";

// Mock del hook useAuth
vi.mock("@/hooks/useAuth", () => ({
  useAuth: vi.fn(),
}));

describe("AuthGuard", () => {
  it("muestra loading mientras carga", () => {
    (useAuth as any).mockReturnValue({ loading: true, isAuthenticated: false });

    render(
      <MemoryRouter>
        <AuthGuard>
          <div>Contenido protegido</div>
        </AuthGuard>
      </MemoryRouter>
    );

    expect(screen.getByText("Cargando...")).toBeInTheDocument();
  });

  it("muestra contenido si está autenticado", () => {
    (useAuth as any).mockReturnValue({ loading: false, isAuthenticated: true });

    render(
      <MemoryRouter>
        <AuthGuard>
          <div>Contenido protegido</div>
        </AuthGuard>
      </MemoryRouter>
    );

    expect(screen.getByText("Contenido protegido")).toBeInTheDocument();
  });

  it("redirige al login si no está autenticado", () => {
    (useAuth as any).mockReturnValue({ loading: false, isAuthenticated: false });

    render(
      <MemoryRouter initialEntries={["/protegido"]}>
        <AuthGuard>
          <div>Contenido protegido</div>
        </AuthGuard>
      </MemoryRouter>
    );

    expect(screen.queryByText("Contenido protegido")).not.toBeInTheDocument();
  });
});
