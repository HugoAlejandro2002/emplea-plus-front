import { render, screen, fireEvent } from "@testing-library/react";
import CertificationsSection from "@/features/certifications/CertificationsSection";

describe("CertificationsSection", () => {
    const onNext = vi.fn();
    const onBack = vi.fn();

    beforeEach(() => {
        vi.clearAllMocks();
    });

    it("envía el formulario con una certificación válida", async () => {
        render(
            <CertificationsSection onNext={onNext} onBack={onBack} isFirst={false} isLast={false} />
        );

        fireEvent.change(screen.getByPlaceholderText(/curso de git/i), {
            target: { value: "Curso de Git" },
        });
        fireEvent.change(screen.getByPlaceholderText(/platzi/i), {
            target: { value: "Platzi" },
        });
        fireEvent.change(screen.getByPlaceholderText(/2022/i), {
            target: { value: "2022" },
        });
        fireEvent.change(screen.getByPlaceholderText(/https:\/\/.../i), {
            target: { value: "https://example.com" },
        });

        fireEvent.click(screen.getByRole("button", { name: /siguiente/i }));

        await screen.findByText(/cursos o certificaciones/i);
        expect(onNext).toHaveBeenCalled();
    });

    it("muestra errores si se envía vacío", async () => {
        render(
            <CertificationsSection onNext={onNext} onBack={onBack} isFirst={false} isLast={false} />
        );

        fireEvent.click(screen.getByRole("button", { name: /siguiente/i }));

        await screen.findAllByText(/obligatorio/i);
        expect(onNext).not.toHaveBeenCalled();
    });

    it("añade y elimina certificaciones", () => {
        render(
            <CertificationsSection onNext={onNext} onBack={onBack} isFirst={false} isLast={false} />
        );

        fireEvent.click(screen.getByRole("button", { name: /añadir otra certificación/i }));
        expect(screen.getAllByRole("heading", { name: /certificación/i })).toHaveLength(2);

        fireEvent.click(screen.getAllByRole("button", { name: /eliminar/i })[1]);
        expect(screen.getAllByRole("heading", { name: /certificación/i })).toHaveLength(1);
    });

    it("desactiva el botón de agregar al llegar a 8 entradas", () => {
        render(
            <CertificationsSection
                onNext={onNext}
                onBack={onBack}
                isFirst={false}
                isLast={false}
                defaultValues={{
                    certifications: Array(8).fill({
                        course: "Curso",
                        provider: "Instituto",
                        year: "2023",
                        certificate: "https://example.com",
                    }),
                }}
            />
        );

        expect(screen.getAllByRole("heading", { name: /certificación/i })).toHaveLength(8);
        expect(screen.getByRole("button", { name: /añadir otra certificación/i })).toBeDisabled();
    });

    it("llama a onBack al hacer clic en 'Atrás'", () => {
        render(
            <CertificationsSection onNext={onNext} onBack={onBack} isFirst={false} isLast={false} />
        );

        fireEvent.click(screen.getByRole("button", { name: /atrás/i }));
        expect(onBack).toHaveBeenCalled();
    });
});
