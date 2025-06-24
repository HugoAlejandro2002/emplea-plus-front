import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import PersonalSection from "@/features/personal/PersonalForm";

describe("PersonalSection", () => {
  const onNext = vi.fn();
  const onBack = vi.fn();

  const fillForm = () => {
    fireEvent.change(screen.getByPlaceholderText("Ana María Gutiérrez"), {
      target: { value: "Juan Pérez" },
    });
    fireEvent.change(screen.getByPlaceholderText("ana@example.com"), {
      target: { value: "juan@example.com" },
    });
    fireEvent.change(screen.getByPlaceholderText("+591 71234567"), {
      target: { value: "+59177788899" },
    });
    fireEvent.change(screen.getByPlaceholderText("https://linkedin.com/in/ana"), {
      target: { value: "https://linkedin.com/in/juanperez" },
    });
  };

  it("renderiza correctamente todos los campos", () => {
    render(<PersonalSection onNext={onNext} onBack={onBack} isFirst isLast />);
    expect(screen.getByText("Datos personales")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Ana María Gutiérrez")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("ana@example.com")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("+591 71234567")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("https://linkedin.com/in/ana")).toBeInTheDocument();
  });

//   it("muestra errores si los campos están vacíos", async () => {
//     render(<PersonalSection onNext={onNext} onBack={onBack} isFirst={false} isLast={false} />);
//     fireEvent.submit(screen.getByRole("button", { name: /siguiente/i }));

//     await screen.findAllByText("Este campo es obligatorio");
//     expect(onNext).not.toHaveBeenCalled();
//   });

  it("muestra error si el correo o linkedin son inválidos", async () => {
    render(<PersonalSection onNext={onNext} onBack={onBack} isFirst={false} isLast={false} />);
    
    fireEvent.change(screen.getByPlaceholderText("ana@example.com"), {
      target: { value: "correo-invalido" },
    });
    fireEvent.change(screen.getByPlaceholderText("https://linkedin.com/in/ana"), {
      target: { value: "linkedin-malo" },
    });

    fireEvent.submit(screen.getByRole("button", { name: /siguiente/i }));
    await screen.findByText("Correo inválido");
    await screen.findByText("Debe ser un enlace válido");
    expect(onNext).not.toHaveBeenCalled();
  });

  it("envía los datos correctamente si son válidos", async () => {
    render(<PersonalSection onNext={onNext} onBack={onBack} isFirst={false} isLast />);
    fillForm();
    fireEvent.submit(screen.getByRole("button", { name: /generar cv/i }));

    await waitFor(() => {
      expect(onNext).toHaveBeenCalledWith({
        fullName: "Juan Pérez",
        email: "juan@example.com",
        phone: "+59177788899",
        linkedin: "https://linkedin.com/in/juanperez",
      });
    });
  });

  it("llama a onBack cuando se hace clic en 'Atrás'", () => {
    render(<PersonalSection onNext={onNext} onBack={onBack} isFirst={false} isLast />);
    fireEvent.click(screen.getByRole("button", { name: /atrás/i }));
    expect(onBack).toHaveBeenCalled();
  });
});
