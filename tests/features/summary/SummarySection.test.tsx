import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { SummarySection } from "@/features/summary/SummarySection";

describe("SummarySection", () => {
  const defaultValues = { summary: "Soy un desarrollador apasionado por la tecnología." };
  const onNext = vi.fn();
  const onBack = vi.fn();

  it("renderiza el formulario con el valor inicial", () => {
    render(
      <SummarySection
        defaultValues={defaultValues}
        onNext={onNext}
        onBack={onBack}
        isFirst={false}
        isLast={false}
      />
    );

    expect(screen.getByPlaceholderText(/soy una persona proactiva/i)).toBeInTheDocument();
    expect(screen.getByDisplayValue(defaultValues.summary)).toBeInTheDocument();
  });

  it("muestra error si el resumen es muy corto", async () => {
    render(
      <SummarySection defaultValues={{ summary: "" }} onNext={onNext} onBack={onBack} />
    );

    const textarea = screen.getByPlaceholderText(/soy una persona proactiva/i);
    fireEvent.change(textarea, { target: { value: "muy corto" } });
    fireEvent.submit(screen.getByRole("button", { name: /siguiente/i }));

    expect(await screen.findByText(/al menos 20 caracteres/i)).toBeInTheDocument();
    expect(onNext).not.toHaveBeenCalled();
  });

  it("envía datos válidos", async () => {
    render(
      <SummarySection defaultValues={{ summary: "" }} onNext={onNext} onBack={onBack} />
    );

    const textarea = screen.getByPlaceholderText(/soy una persona proactiva/i);
    fireEvent.change(textarea, {
      target: {
        value: "Soy una persona responsable, con experiencia en desarrollo frontend.",
      },
    });

    fireEvent.submit(screen.getByRole("button", { name: /siguiente/i }));
    expect(await screen.findByDisplayValue(/soy una persona responsable/i)).toBeInTheDocument();
    expect(onNext).toHaveBeenCalledOnce();
  });

  it("llama a onBack cuando se hace clic en Atrás", () => {
    render(
      <SummarySection defaultValues={defaultValues} onNext={onNext} onBack={onBack} />
    );

    fireEvent.click(screen.getByRole("button", { name: /atrás/i }));
    expect(onBack).toHaveBeenCalledOnce();
  });
});
