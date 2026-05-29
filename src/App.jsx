import { Suspense } from "react";

import { Routes, Route, Navigate } from "react-router-dom";

import { Box } from "@mui/material";

// Components
import MDLoader from "@/src/components/MDLoader";

// Routes
import registrationRoutes from "./routes/registrationRoutes";

// Guard
import RouteGuard from "./routes/RouteGuard";

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
    <Suspense fallback={<SuspenseLoader />}>
      <Routes>
        {registrationRoutes.map(({ path, element, condition, redirectTo }) => (
          <Route
            key={path}
            path={path}
            element={
              <RouteGuard condition={condition} redirectTo={redirectTo}>
                {element}
              </RouteGuard>
            }
          />
        ))}

        <Route
          path="*"
          element={<Navigate to="/register/company-verification" replace />}
        />
      </Routes>
    </Suspense>
  );
}
