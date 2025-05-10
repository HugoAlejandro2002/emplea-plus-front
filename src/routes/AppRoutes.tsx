import { Routes, Route } from "react-router-dom";
import WelcomeScreen from "../pages/WelcomeScreen";
import FormularioScreen from "../pages/FormScreen";
import SummaryScreen from "../pages/SummaryScreen";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<WelcomeScreen />} />
      <Route path="/formulario" element={<FormularioScreen />} />
      <Route path="/resumen" element={<SummaryScreen />} />
    </Routes>
  );
};

export default AppRoutes;
