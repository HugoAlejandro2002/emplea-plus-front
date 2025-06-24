import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import ResetPasswordForm from "@/components/auth/ResetPasswordForm";
import { resetPassword } from "@/services/authService";
import { vi } from "vitest";

vi.mock("@/services/authService", () => ({
    resetPassword: vi.fn().mockResolvedValue(undefined),
}));

vi.mock("sonner", () => ({
    toast: {
        success: vi.fn(),
        error: vi.fn(),
    },
}));

describe("ResetPasswordForm", () => {
    it("envía correctamente con datos válidos", async () => {
        render(<ResetPasswordForm />);

        fireEvent.change(screen.getByLabelText(/contraseña actual/i), {
            target: { value: "oldpass123" },
        });
        fireEvent.change(screen.getByLabelText(/nueva contraseña/i), {
            target: { value: "newpass123" },
        });

        fireEvent.click(screen.getByRole("button", { name: /actualizar contraseña/i }));

        await waitFor(() => {
            expect(resetPassword).toHaveBeenCalledWith("oldpass123", "newpass123");
        });
    });

    it("muestra errores de validación si se envía vacío", async () => {
        render(<ResetPasswordForm />);

        fireEvent.click(screen.getByRole("button", { name: /actualizar contraseña/i }));

        // Espera ambos errores por separado en lugar de por cantidad
        expect(await screen.findByText(/contraseña actual demasiado corta/i)).toBeInTheDocument();
        expect(await screen.findByText(/la nueva contraseña debe tener al menos 6 caracteres/i)).toBeInTheDocument();
    });
});
