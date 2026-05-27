import {
  HashRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import CompanyVerificationPage from "./pages/CompanyVerification";
import UserDetailsVerificationPage from "./pages/UserDetailsVerification";
import OtpVerificationPage from "./pages/OtpVerification";
import LoginCredentialsPage from "./pages/LoginCredentials";
import WellnessSelector from "./pages/WellnessSelector";
import WellbeingPillars from "./pages/WellBeingPillars";
import wolibaTheme from "./assets/theme";

export default function App() {
  return (
    <Provider store={store}>
      <ThemeProvider theme={wolibaTheme}>
        <CssBaseline />
        <Router>
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
            <Route path="/wellness-selector" element={<WellnessSelector />} />
            <Route path="/wellbeing-pillars" element={<WellbeingPillars />} />
            <Route
              path="*"
              element={<Navigate to="/register/company-verification" replace />}
            />
          </Routes>
        </Router>
      </ThemeProvider>
    </Provider>
  );
}
