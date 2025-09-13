import { createTheme } from "@mui/material/styles";

export const theme = createTheme({
  typography: {
    fontFamily: "Roboto , sans-serif",
    h3: {
      fontSize: "2rem",
    },
  },
  palette: {
    primary: {
      main: "#1976d2", // Example primary color
    },
    secondary: { main: "#dc004e" }, // Example secondary color
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 900,
      lg: 1200,
      xl: 1536,
    },
  },
});
