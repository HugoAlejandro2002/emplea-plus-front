import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import EducationSection from "@/features/education/EducationSection";

describe("EducationSection", () => {
  const onNext = vi.fn();
  const onBack = vi.fn();

  const fillForm = () => {
    fireEvent.change(screen.getByPlaceholderText("Universidad Privada Boliviana"), {
      target: { value: "UPB" },
    });
    fireEvent.change(screen.getByPlaceholderText("Ingeniería de Sistemas"), {
      target: { value: "Ingeniería" },
    });
    fireEvent.change(screen.getByPlaceholderText("2018"), {
      target: { value: "2018" },
    });
    fireEvent.change(screen.getByPlaceholderText("2023"), {
      target: { value: "2023" },
    });
    fireEvent.change(screen.getByPlaceholderText("Graduado con honores"), {
      target: { value: "Con honores" },
    });
  };

  it("renderiza correctamente los campos del formulario", () => {
    render(<EducationSection onNext={onNext} onBack={onBack} isFirst isLast />);
    expect(screen.getByText("Formación académica")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Universidad Privada Boliviana")).toBeInTheDocument();
  });

  it("muestra errores si se envía vacío", async () => {
    render(<EducationSection onNext={onNext} onBack={onBack} isFirst={false} isLast={false} />);
    fireEvent.submit(screen.getByRole("button", { name: /siguiente/i }));
    await screen.findAllByText(/requerido/i);
    expect(onNext).not.toHaveBeenCalled();
  });

  it("envía el formulario con una educación válida", async () => {
    render(<EducationSection onNext={onNext} onBack={onBack} isLast isFirst={false} />);
    fillForm();
    fireEvent.submit(screen.getByRole("button", { name: /generar cv/i }));

    await waitFor(() => {
      expect(onNext).toHaveBeenCalledWith({
        education: [
          {
            institution: "UPB",
            degree: "Ingeniería",
            startYear: "2018",
            endYear: "2023",
            notes: "Con honores",
          },
        ],
      });
    });
  });

  it("añade y elimina entradas de educación", () => {
    render(<EducationSection onNext={onNext} onBack={onBack} isFirst isLast />);
    const addBtn = screen.getByRole("button", { name: /añadir otra formación/i });

    fireEvent.click(addBtn);
    expect(screen.getAllByText(/educación #/i)).toHaveLength(2);

    const deleteButtons = screen.getAllByRole("button", { name: /eliminar/i });
    fireEvent.click(deleteButtons[0]);
    expect(screen.getAllByText(/educación #/i)).toHaveLength(1);
  });

  it("desactiva el botón de agregar al llegar a 4 entradas", () => {
    render(<EducationSection onNext={onNext} onBack={onBack} isFirst isLast />);
    const addBtn = screen.getByRole("button", { name: /añadir otra formación/i });

    for (let i = 0; i < 3; i++) fireEvent.click(addBtn);
    expect(screen.getAllByText(/educación #/i)).toHaveLength(4);
    expect(addBtn).toBeDisabled();
  });

  it("llama a onBack al hacer clic en 'Atrás'", () => {
    render(<EducationSection onNext={onNext} onBack={onBack} isFirst={false} isLast />);
    fireEvent.click(screen.getByRole("button", { name: /atrás/i }));
    expect(onBack).toHaveBeenCalled();
  });
});
