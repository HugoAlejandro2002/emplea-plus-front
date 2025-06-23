import ResetPasswordForm from "@/components/auth/ResetPasswordForm";

const ResetPasswordPage = () => {
  return (
    <div className="p-6 max-w-3xl mx-auto space-y-6">
      <h1 className="text-2xl font-bold">Cambiar contraseña</h1>
      <ResetPasswordForm />
    </div>
  );
};

export default ResetPasswordPage;
