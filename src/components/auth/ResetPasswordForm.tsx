import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { resetPassword } from "@/services/authService";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { toast } from "sonner";
import { z } from "zod";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "../ui/card";
import { Label } from "../ui/label";

const resetPasswordSchema = z.object({
    oldPassword: z.string().min(6, "Contraseña actual demasiado corta"),
    newPassword: z.string().min(6, "La nueva contraseña debe tener al menos 6 caracteres"),
});

type ResetPasswordForm = z.infer<typeof resetPasswordSchema>;

const ResetPasswordForm = () => {
    const [loading, setLoading] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset
    } = useForm<ResetPasswordForm>({
        resolver: zodResolver(resetPasswordSchema),
    });

    const onSubmit = async (data: ResetPasswordForm) => {
        try {
            setLoading(true);
            await resetPassword(data.oldPassword, data.newPassword);
            toast.success("Contraseña actualizada correctamente");
            reset();
        } catch (error: any) {
            toast.error(error.response?.data?.message || "Error al cambiar la contraseña");
        } finally {
            setLoading(false);
        }
    };

    return (
        <Card className="w-full max-w-md shadow-lg">
            <form onSubmit={handleSubmit(onSubmit)}>
                <CardHeader>
                    <CardTitle className="text-xl">Cambiar contraseña</CardTitle>
                </CardHeader>

                <CardContent className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="oldPassword">Contraseña actual</Label>
                        <Input
                            id="oldPassword"
                            type="password"
                            {...register("oldPassword")}
                            placeholder="••••••••"
                        />
                        {errors.oldPassword && (
                            <p className="text-sm text-red-500">{errors.oldPassword.message}</p>
                        )}
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="newPassword">Nueva contraseña</Label>
                        <Input
                            id="newPassword"
                            type="password"
                            {...register("newPassword")}
                            placeholder="••••••••"
                        />
                        {errors.newPassword && (
                            <p className="text-sm text-red-500">{errors.newPassword.message}</p>
                        )}
                    </div>
                </CardContent>

                <CardFooter className="pt-6">
                    <Button type="submit" className="w-full" disabled={loading}>
                        {loading ? "Guardando..." : "Actualizar contraseña"}
                    </Button>
                </CardFooter>
            </form>
        </Card>
    );
};

export default ResetPasswordForm;