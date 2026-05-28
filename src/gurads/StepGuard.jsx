import React from "react";
import { useAppSelector } from "../redux/hooks";
import { Navigate } from "react-router-dom";
import { selectAuthToken } from "../redux/selectors/registrationSelectors";

export default function StepGuard({ selector, redirectTo, children }) {
  const value = useAppSelector(selector);

  const authToken = useAppSelector(selectAuthToken);

  console.log(authToken);

  if (!value) {
    return <Navigate to={redirectTo} replace />;
  }

  return children;
}
