import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import SkillsSection from "@/features/skills/SkillsSection";

describe("SkillsSection", () => {
  const onNext = vi.fn();
  const onBack = vi.fn();

  it("renderiza correctamente con valores por defecto", () => {
    render(
      <SkillsSection onNext={onNext} onBack={onBack} isFirst isLast />
    );

    expect(screen.getByText("Habilidad #1")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Ej. Excel, Canva, Python")).toBeInTheDocument();
  });

  it("muestra error si el campo está vacío", async () => {
    render(<SkillsSection onNext={onNext} onBack={onBack} />);

    const input = screen.getByPlaceholderText("Ej. Excel, Canva, Python");
    fireEvent.change(input, { target: { value: "" } });
    fireEvent.submit(screen.getByRole("button", { name: /siguiente/i }));

    await screen.findByText("La habilidad es obligatoria");
    expect(onNext).not.toHaveBeenCalled();
  });

  it("permite agregar y eliminar habilidades", () => {
    render(<SkillsSection onNext={onNext} onBack={onBack} />);

    fireEvent.click(screen.getByText("Añadir otra habilidad"));
    expect(screen.getByText("Habilidad #2")).toBeInTheDocument();

    fireEvent.click(screen.getAllByRole("button", { name: "Eliminar" })[0]);
    expect(screen.queryByText("Habilidad #2")).not.toBeInTheDocument();
  });

  it("envía datos válidos", async () => {
    render(<SkillsSection onNext={onNext} onBack={onBack} />);

    const input = screen.getByPlaceholderText("Ej. Excel, Canva, Python");
    fireEvent.change(input, { target: { value: "React" } });
    fireEvent.submit(screen.getByRole("button", { name: /siguiente/i }));

    await waitFor(() => {
      expect(onNext).toHaveBeenCalledOnce();
      expect(onNext.mock.calls[0][0]).toEqual({
        skills: [{ skill: "React", level: "Intermedio" }],
      });
    });
  });

  it("llama a onBack cuando se hace clic en Atrás", () => {
    render(<SkillsSection onNext={onNext} onBack={onBack} isFirst={false} />);
    fireEvent.click(screen.getByRole("button", { name: /atrás/i }));
    expect(onBack).toHaveBeenCalledOnce();
  });
});
