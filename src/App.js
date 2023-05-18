// import "./App.css";
import Router from "./routes";

import { ThemeProvider, createTheme } from "@mui/material/styles";

const theme = createTheme({
  // palette: {
  //   primary: {
  //     main: "#90caf9",
  //   },
  //   secondary: {
  //     main: "#f48fb1",
  //   },
  //   background: {
  //     default: "#212121",
  //     paper: "#424242",
  //   },
  // },
});

function App() {
  return (
    <>
      <ThemeProvider theme={theme}>
        <Router />
      </ThemeProvider>
    </>
  );
}

export default App;
