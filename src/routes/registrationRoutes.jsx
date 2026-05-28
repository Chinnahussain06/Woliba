import React, { lazy } from "react";

import {
  selectCompanyId,
  selectOtpVerified,
  selectRegistrationComplete,
} from "../redux/selectors/registrationSelectors";

// Lazy Pages
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
    requiresGuard: false,
  },

  {
    path: "/register/user-details-verification",
    element: <UserDetailsVerificationPage />,
    selector: selectCompanyId,
    redirectTo: "/register/company-verification",
    requiresGuard: true,
  },

  {
    path: "/register/otp-verification",
    element: <OtpVerificationPage />,
    selector: selectCompanyId,
    redirectTo: "/register/company-verification",
    requiresGuard: true,
  },

  {
    path: "/register/login-credentials",
    element: <LoginCredentialsPage />,
    selector: selectOtpVerified,
    redirectTo: "/register/otp-verification",
    requiresGuard: true,
  },

  {
    path: "/register/wellness-selector",
    element: <WellnessSelector />,
    selector: selectOtpVerified,
    redirectTo: "/register/login-credentials",
    requiresGuard: true,
  },

  {
    path: "/register/wellbeing-pillars",
    element: <WellbeingPillars />,
    selector: selectOtpVerified,
    redirectTo: "/register/login-credentials",
    requiresGuard: true,
  },

  {
    path: "/welcome",
    element: <WelcomePage />,
    selector: selectRegistrationComplete,
    redirectTo: "/register/company-verification",
    requiresGuard: true,
  },
];

export default registrationRoutes;
