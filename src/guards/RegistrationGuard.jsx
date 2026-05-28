import React from "react";
import { Navigate } from "react-router-dom";

import { selectRegistrationComplete } from "../redux/selectors/registrationSelectors";
import { useAppSelector } from "../redux/hooks";

export default function RegistrationGuard({ children }) {
  const completed = useAppSelector(selectRegistrationComplete);

  if (completed) {
    return <Navigate to="/welcome" replace />;
  }

  return children;
}
