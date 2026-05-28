import React, { Suspense } from "react";

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import { Provider } from "react-redux";

import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { Box } from "@mui/material";

// components
import MDLoader from "@/src/components/MDLoader";
import ErrorBoundary from "./components/ErrorBoundary";

// Redux
import { store } from "./redux/store";

// Theme
import wolibaTheme from "./assets/theme";

// Routes
import registrationRoutes from "./routes/registrationRoutes";

// Guards
import StepGuard from "./guards/StepGuard";
import RegistrationGuard from "./guards/RegistrationGuard";

const SuspenseLoader = () => (
  <Box
    sx={{
      minHeight: "100vh",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    }}
  >
    <MDLoader text="Initializing..." size="15em" />
  </Box>
);

export default function App() {
  return (
    <Provider store={store}>
      <ThemeProvider theme={wolibaTheme}>
        <CssBaseline />

        <Router>
          <Suspense fallback={<SuspenseLoader />}>
            <ErrorBoundary>
              <Routes>
                {registrationRoutes.map(
                  ({ path, element, selector, redirectTo, requiresGuard }) => (
                    <Route
                      key={path}
                      path={path}
                      element={
                        requiresGuard ? (
                          <StepGuard
                            selector={selector}
                            redirectTo={redirectTo}
                          >
                            {element}
                          </StepGuard>
                        ) : (
                          <RegistrationGuard>{element}</RegistrationGuard>
                        )
                      }
                    />
                  ),
                )}

                <Route
                  path="*"
                  element={
                    <Navigate to="/register/company-verification" replace />
                  }
                />
              </Routes>
            </ErrorBoundary>
          </Suspense>
        </Router>
      </ThemeProvider>
    </Provider>
  );
}
