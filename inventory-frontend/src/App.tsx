import { ThemeProvider } from "@mui/material";

import AppRoutes from "./AppRoutes";
import { AuthContextProvider } from "./context/auth/AuthContext";
import { ServicesContextProvider } from "./context/services/ServicesContext";
import { useServices } from "./context/services/useServices";
import { theme } from "./theme";

// Inner component that can use the ServicesContext
function AppContent() {
  const { api } = useServices();

  return (
    <AuthContextProvider api={api}>
      <AppRoutes />
    </AuthContextProvider>
  );
}

function App() {
  return (
    <>
      <ThemeProvider theme={theme}>
        <ServicesContextProvider>
          <AppContent />
        </ServicesContextProvider>
      </ThemeProvider>
    </>
  );
}

export default App;
