import React, { lazy, Suspense } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import { Provider } from "react-redux";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

import { store } from "./redux/store";
import wolibaTheme from "./assets/theme";
import { CircularProgress } from "@mui/material";

// Lazy loaded pages
const CompanyVerificationPage = lazy(
  () => import("./pages/CompanyVerification"),
);
const UserDetailsVerificationPage = lazy(
  () => import("./pages/UserDetailsVerification"),
);
const OtpVerificationPage = lazy(() => import("./pages/OtpVerification"));
const LoginCredentialsPage = lazy(() => import("./pages/LoginCredentials"));
const WellnessSelector = lazy(() => import("./pages/WellnessSelector"));
const WellbeingPillars = lazy(() => import("./pages/WellBeingPillars"));
const WelcomePage = lazy(() => import("./pages/welcome"));

const PageLoader = () => (
  <div
    style={{
      height: "100vh",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    }}
  >
    <CircularProgress sx={{ color: wolibaTheme.palette.primary.main }} />
  </div>
);

export default function App() {
  return (
    <Provider store={store}>
      <ThemeProvider theme={wolibaTheme}>
        <CssBaseline />
        <Router>
          <Suspense fallback={<PageLoader />}>
            <Routes>
              <Route
                path="/register/company-verification"
                element={<CompanyVerificationPage />}
              />

              <Route
                path="/register/user-details-verification"
                element={<UserDetailsVerificationPage />}
              />

              <Route
                path="/register/otp-verification"
                element={<OtpVerificationPage />}
              />

              <Route
                path="/register/login-credentials"
                element={<LoginCredentialsPage />}
              />

              <Route
                path="/register/wellness-selector"
                element={<WellnessSelector />}
              />

              <Route
                path="/register/wellbeing-pillars"
                element={<WellbeingPillars />}
              />

              <Route path="/welcome" element={<WelcomePage />} />

              <Route
                path="*"
                element={
                  <Navigate to="/register/company-verification" replace />
                }
              />
            </Routes>
          </Suspense>
        </Router>
      </ThemeProvider>
    </Provider>
  );
}
