import React from "react";
import { HashRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import CompanyVerificationPage from "./services/CompanyVerificationPage";
import UserDetailsVerificationPage from "./services/UserDetailsVerificationPage";
import OtpVerificationPage from "./services/OtpVerificationPage";
import LoginCredentialsPage from "./services/LoginCredentialsPage";
import WellnessSelector from "./services/WellnessSelector";
import WellbeingPillars from "./services/WellBeingPillars";

// Elegantly styled Custom Woliba Light Material UI Theme
const wolibaTheme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#D2686E", // Custom Woliba Coral
      contrastText: "#FFFFFF",
    },
    secondary: {
      main: "#1E3A5F", // Deep Corporate Navy
      contrastText: "#FFFFFF",
    },
    background: {
      default: "#FCFBFA", // Pristine warm off-white
      paper: "#FFFFFF",
    },
    text: {
      primary: "#1E3A5F",
      secondary: "#5A6E85",
    },
    error: {
      main: "#D32F2F",
    },
    divider: "#E2E8F0",
  },
  typography: {
    fontFamily: ["Inter", "sans-serif"].join(","),
    h2: {
      fontWeight: 700,
      color: "#1E3A5F",
    },
    body1: {
      fontSize: "1rem",
      lineHeight: 1.5,
    }
  }
});

export default function App() {
  return (
    <Provider store={store}>
      <ThemeProvider theme={wolibaTheme}>
        <CssBaseline />
        <Router>
          <Routes>
            <Route path="/register/company-verification" element={<CompanyVerificationPage />} />
            <Route path="/register/user-details-verification" element={<UserDetailsVerificationPage />} />
            <Route path="/register/otp-verification" element={<OtpVerificationPage />} />
            <Route path="/register/login-credentials" element={<LoginCredentialsPage />} />
            <Route path="/wellness-selector" element={<WellnessSelector />} />
            <Route path="/wellbeing-pillars" element={<WellbeingPillars />} />
            <Route path="*" element={<Navigate to="/register/company-verification" replace />} />
          </Routes>
        </Router>
      </ThemeProvider>
    </Provider>
  );
}
