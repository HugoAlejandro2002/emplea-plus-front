import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import LanguagesSection from "@/features/languages/LanguagesSection";

describe("LanguagesSection", () => {
  const onNext = vi.fn();
  const onBack = vi.fn();

  const fillForm = async () => {
    fireEvent.change(screen.getByPlaceholderText("Ej. Inglés"), {
      target: { value: "Inglés" },
    });

    const selectTrigger = screen.getByRole("combobox");
    fireEvent.click(selectTrigger);

    const option = await screen.findByText("B2");
    fireEvent.click(option);
  };

  it("renderiza correctamente el formulario de idiomas", () => {
    render(<LanguagesSection onNext={onNext} onBack={onBack} isFirst isLast />);
    expect(screen.getByText("Idiomas")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Ej. Inglés")).toBeInTheDocument();
    expect(screen.getByRole("combobox")).toBeInTheDocument();
  });

  it("muestra error si se deja vacío el campo idioma", async () => {
    render(<LanguagesSection onNext={onNext} onBack={onBack} />);
    fireEvent.submit(screen.getByRole("button", { name: /siguiente/i }));
    await screen.findByText("El idioma es obligatorio");
    expect(onNext).not.toHaveBeenCalled();
  });

//   it("envía el formulario con un idioma válido", async () => {
//     render(<LanguagesSection onNext={onNext} onBack={onBack} isFirst={false} isLast />);
//     await fillForm();
//     fireEvent.submit(screen.getByRole("button", { name: /generar cv/i }));

//     await waitFor(() => {
//       expect(onNext).toHaveBeenCalledWith({
//         languages: [{ language: "Inglés", level: "B2" }],
//       });
//     });
//   });

  it("añade y elimina idiomas", () => {
    render(<LanguagesSection onNext={onNext} onBack={onBack} />);
    const addButton = screen.getByRole("button", { name: /añadir otro idioma/i });

    fireEvent.click(addButton);
    expect(screen.getAllByText(/idioma #/i)).toHaveLength(2);

    const deleteButtons = screen.getAllByRole("button", { name: /eliminar/i });
    fireEvent.click(deleteButtons[0]);
    expect(screen.getAllByText(/idioma #/i)).toHaveLength(1);
  });

  it("llama a onBack al hacer clic en 'Atrás'", () => {
    render(<LanguagesSection onNext={onNext} onBack={onBack} isFirst={false} isLast />);
    fireEvent.click(screen.getByRole("button", { name: /atrás/i }));
    expect(onBack).toHaveBeenCalled();
  });

  it("desactiva el botón para añadir más de 4 idiomas", () => {
    render(<LanguagesSection onNext={onNext} onBack={onBack} />);
    const addButton = screen.getByRole("button", { name: /añadir otro idioma/i });

    for (let i = 0; i < 3; i++) {
      fireEvent.click(addButton);
    }

    expect(screen.getAllByText(/idioma #/i)).toHaveLength(4);
    expect(addButton).toBeDisabled();
  });
});
