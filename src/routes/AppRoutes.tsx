import { Routes, Route } from "react-router-dom";
import LoginPage from "@/pages/LoginPage";
import RegisterPage from "@/pages/RegisterPage";
import WelcomeScreen from "@/pages/WelcomeScreen";
import FormScreen from "@/pages/FormScreen";
import SummaryScreen from "@/pages/SummaryScreen";
import AuthenticatedLayout from "@/layouts/AuthenticatedLayout";
import AuthGuard from "@/guards/AuthGuard";
import ResumeListPage from "@/pages/ResumeListPage";
import ResetPasswordPage from "@/pages/ResetPasswordPage";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<WelcomeScreen />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />

      <Route
        path="/"
        element={
          <AuthGuard>
            <AuthenticatedLayout />
          </AuthGuard>
        }
      >
        <Route path="resumes" element={<ResumeListPage />} />
        <Route path="form" element={<FormScreen />} />
        <Route path="summary" element={<SummaryScreen />} />
        <Route path="reset-password" element={<ResetPasswordPage />} />
      </Route>
    </Routes>
  );
}
