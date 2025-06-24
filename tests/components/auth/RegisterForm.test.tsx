import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import RegisterForm from "@/components/auth/RegisterForm";
import { vi } from "vitest";
import { MemoryRouter } from "react-router-dom";

vi.mock("@/hooks/useAuth", () => ({
  useAuth: () => ({
    register: vi.fn().mockResolvedValue(undefined),
  }),
}));

vi.mock("react-router-dom", async () => {
  const mod = await vi.importActual("react-router-dom");
  return {
    ...mod,
    useNavigate: () => vi.fn(),
  };
});

describe("RegisterForm", () => {
  it("envía correctamente con datos válidos", async () => {
    render(
      <MemoryRouter>
        <RegisterForm />
      </MemoryRouter>
    );

    fireEvent.change(screen.getByPlaceholderText(/ejemplo@correo.com/i), {
      target: { value: "test@email.com" },
    });
    fireEvent.change(screen.getByPlaceholderText("******"), {
      target: { value: "123456" },
    });

    fireEvent.click(screen.getByRole("button", { name: /registrarse/i }));

    await waitFor(() =>
      expect(screen.queryByText(/no se pudo registrar/i)).not.toBeInTheDocument()
    );
  });

  it("muestra errores si los campos están vacíos", async () => {
    render(
      <MemoryRouter>
        <RegisterForm />
      </MemoryRouter>
    );

    fireEvent.click(screen.getByRole("button", { name: /registrarse/i }));

    expect(await screen.findAllByText(/obligatorio/i)).toHaveLength(2);
  });
});
