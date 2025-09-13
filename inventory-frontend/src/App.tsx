import { ThemeProvider } from "@mui/material";

import AppRoutes from "./AppRoutes";
import { AuthContextProvider } from "./context/auth/AuthContext";
import { theme } from "./theme";

function App() {
  return (
    <>
      <ThemeProvider theme={theme}>
        <AuthContextProvider>
          <AppRoutes />
        </AuthContextProvider>
      </ThemeProvider>
    </>
  );
}

export default App;
