import { lazy } from "react";

// Selectors
import {
  selectCompanyId,
  selectMail,
  selectOtpVerified,
  selectRegistrationComplete,
} from "../redux/selectors/registrationSelectors";

// Registration Pages
const CompanyVerificationPage = lazy(
  () => import("../pages/CompanyVerification"),
);
const UserDetailsVerificationPage = lazy(
  () => import("../pages/UserDetailsVerification"),
);
const OtpVerificationPage = lazy(() => import("../pages/OtpVerification"));
const LoginCredentialsPage = lazy(() => import("../pages/LoginCredentials"));
const WellnessSelector = lazy(() => import("../pages/WellnessSelector"));
const WellbeingPillars = lazy(() => import("../pages/WellBeingPillars"));
const WelcomePage = lazy(() => import("../pages/welcome"));

const registrationRoutes = [
  {
    path: "/register/company-verification",
    element: <CompanyVerificationPage />,
  },

  {
    path: "/register/user-details-verification",
    element: <UserDetailsVerificationPage />,
    condition: selectCompanyId,
    redirectTo: "/register/company-verification",
  },

  {
    path: "/register/otp-verification",
    element: <OtpVerificationPage />,
    condition: selectMail,
    redirectTo: "/register/company-verification",
  },

  {
    path: "/register/login-credentials",
    element: <LoginCredentialsPage />,
    condition: selectOtpVerified,
    redirectTo: "/register/otp-verification",
  },

  {
    path: "/register/wellness-selector",
    element: <WellnessSelector />,
    condition: selectOtpVerified,
    redirectTo: "/register/login-credentials",
  },

  {
    path: "/register/wellbeing-pillars",
    element: <WellbeingPillars />,
    condition: selectOtpVerified,
    redirectTo: "/register/login-credentials",
  },

  {
    path: "/welcome",
    element: <WelcomePage />,
    condition: selectRegistrationComplete,
    redirectTo: "/register/company-verification",
  },
];

export default registrationRoutes;
