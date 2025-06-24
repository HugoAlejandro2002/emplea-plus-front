import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import ExperienceSection from "@/features/experience/ExperienceSection";
import { experienceFieldMeta } from "@/features/experience/fields";

describe("ExperienceSection", () => {
  const onNext = vi.fn();
  const onBack = vi.fn();

  const fillForm = () => {
    experienceFieldMeta.forEach(({ placeholder }, i) => {
      const input = screen.getByPlaceholderText(placeholder);
      fireEvent.change(input, { target: { value: `Valor ${i}` } });
    });
  };

  it("renderiza correctamente", () => {
    render(<ExperienceSection onNext={onNext} onBack={onBack} />);
    expect(screen.getByText("Experiencia laboral y/o actividades de importancia")).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText(experienceFieldMeta[0].placeholder)
    ).toBeInTheDocument();
  });

  it("muestra error si se envía vacío", async () => {
    render(<ExperienceSection onNext={onNext} onBack={onBack} />);
    fireEvent.submit(screen.getByRole("button", { name: /siguiente/i }));
    const messages = await screen.findAllByText("Este campo es requerido");
    expect(messages.length).toBe(experienceFieldMeta.length);
    expect(onNext).not.toHaveBeenCalled();
  });

  it("envía el formulario con una experiencia válida", async () => {
    render(<ExperienceSection onNext={onNext} onBack={onBack} isLast />);
    fillForm();
    fireEvent.submit(screen.getByRole("button", { name: /generar cv/i }));

    await waitFor(() => {
      expect(onNext).toHaveBeenCalledWith({
        experience: [
          {
            projectName: "Valor 0",
            role: "Valor 1",
            achievements: "Valor 2",
            teamwork: "Valor 3",
            coordination: "Valor 4",
            presentation: "Valor 5",
          },
        ],
      });
    });
  });

  it("añade y elimina experiencias", () => {
    render(<ExperienceSection onNext={onNext} onBack={onBack} />);
    const addBtn = screen.getByRole("button", { name: /añadir otra experiencia/i });

    fireEvent.click(addBtn);
    expect(screen.getAllByText(/experiencia y\/o actividad/i)).toHaveLength(2);

    const deleteButtons = screen.getAllByRole("button", { name: /eliminar/i });
    fireEvent.click(deleteButtons[0]);
    expect(screen.getAllByText(/experiencia y\/o actividad/i)).toHaveLength(1);
  });

  it("desactiva el botón de agregar al llegar a 4 experiencias", () => {
    render(<ExperienceSection onNext={onNext} onBack={onBack} />);
    const addBtn = screen.getByRole("button", { name: /añadir otra experiencia/i });

    for (let i = 0; i < 3; i++) fireEvent.click(addBtn);
    expect(screen.getAllByText(/experiencia y\/o actividad/i)).toHaveLength(4);
    expect(addBtn).toBeDisabled();
  });

  it("llama a onBack al hacer clic en 'Atrás'", () => {
    render(<ExperienceSection onNext={onNext} onBack={onBack} isFirst={false} />);
    fireEvent.click(screen.getByRole("button", { name: /atrás/i }));
    expect(onBack).toHaveBeenCalled();
  });
});
