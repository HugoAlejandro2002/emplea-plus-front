import { Routes, Route } from "react-router-dom";
import LoginPage from "@/pages/LoginPage";
import RegisterPage from "@/pages/RegisterPage";
import WelcomeScreen from "@/pages/WelcomeScreen";
import FormScreen from "@/pages/FormScreen";
import SummaryScreen from "@/pages/SummaryScreen";
import MenuPage from "@/pages/MenuPage";
import AuthGuard from "@/guards/AuthGuard";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<WelcomeScreen />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route
        path="/menu"
        element={
          <AuthGuard>
            <MenuPage />
          </AuthGuard>
        }
      />
      <Route
        path="/form"
        element={
          <AuthGuard>
            <FormScreen />
          </AuthGuard>
        }
      />
      <Route
        path="/summary"
        element={
          <AuthGuard>
            <SummaryScreen />
          </AuthGuard>
        }
      />
    </Routes>
  );
}
