import { Navigate } from "react-router-dom";

import { useAppSelector } from "../redux/hooks";

export default function RouteGuard({ condition, redirectTo, children }) {
  if (!condition) {
    return children;
  }

  const canAccess = useAppSelector(condition);

  if (!canAccess) {
    return <Navigate to={redirectTo} replace />;
  }

  return children;
}
