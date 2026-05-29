import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import { Provider } from "react-redux";

import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

import App from "./App.jsx";
import AppErrorBoundary from "./AppErrorBoundary.jsx";

import { store } from "./redux/store";
import wolibaTheme from "./assets/theme";

import "./styles/index.css";

import "@fontsource/lato";
import "@fontsource/lato/400.css";
import "@fontsource/lato/700.css";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <ThemeProvider theme={wolibaTheme}>
        <CssBaseline />
        <BrowserRouter>
          <AppErrorBoundary>
            <App />
          </AppErrorBoundary>
        </BrowserRouter>
      </ThemeProvider>
    </Provider>
  </StrictMode>,
);
