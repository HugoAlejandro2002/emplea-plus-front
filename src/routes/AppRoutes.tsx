import { Routes, Route } from "react-router-dom";
import WelcomeScreen from "../pages/WelcomeScreen";
import FormularioScreen from "../pages/FormularioScreen";
import ResumenScreen from "../pages/ResumenScreen";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<WelcomeScreen />} />
      <Route path="/formulario" element={<FormularioScreen />} />
      <Route path="/resumen" element={<ResumenScreen />} />
    </Routes>
  );
};

export default AppRoutes;
