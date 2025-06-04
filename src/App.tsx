import { BrowserRouter as Router } from "react-router-dom";

import { Toaster } from "@/components/ui/sonner";
import AppRoutes from "./routes/AppRoutes";

const App = () => {
  return (
  <>
    <Router>
      <AppRoutes />
    </Router>
    <Toaster richColors position="top-center" />
  </>

  );
};

export default App;