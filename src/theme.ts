import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    mode: "light",
    primary: { main: "#2b6ef6" },
    background: { default: "#f6f7fb" },
  },
  typography: {
    fontFamily: "'Bricolage Grotesque', sans-serif",
    subtitle1: {
      fontWeight: 700,
    },
    body2: {
      fontWeight:100, 
    },
  },
});

export default theme;
