import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import LoginForm from "@/components/auth/LoginForm";
import { vi } from "vitest";
import { MemoryRouter } from "react-router-dom";

// Mock de useAuth
vi.mock("@/hooks/useAuth", () => ({
  useAuth: () => ({
    login: vi.fn().mockResolvedValue(undefined),
  }),
}));

vi.mock("react-router-dom", async () => {
  const mod = await vi.importActual("react-router-dom");
  return {
    ...mod,
    useNavigate: () => vi.fn(),
  };
});

describe("LoginForm", () => {
  it("envía correctamente con datos válidos", async () => {
    render(
      <MemoryRouter>
        <LoginForm />
      </MemoryRouter>
    );

    fireEvent.change(screen.getByPlaceholderText(/ejemplo@correo.com/i), {
      target: { value: "test@email.com" },
    });
    fireEvent.change(screen.getByPlaceholderText("******"), {
      target: { value: "123456" },
    });

    fireEvent.click(screen.getByRole("button", { name: /iniciar sesión/i }));

    await waitFor(() =>
      expect(screen.queryByText(/credenciales incorrectas/i)).not.toBeInTheDocument()
    );
  });

  it("muestra errores de validación si los campos están vacíos", async () => {
    render(
      <MemoryRouter>
        <LoginForm />
      </MemoryRouter>
    );

    fireEvent.click(screen.getByRole("button", { name: /iniciar sesión/i }));

    expect(await screen.findAllByText(/obligatorio/i)).toHaveLength(2);
  });
});
