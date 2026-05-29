import Box from "@mui/material/Box";
import { ErrorBoundary } from "react-error-boundary";
import MDTypography from "./components/MDTypography";
import MDButton from "./components/MDButton";

function ErrorFallback({ resetErrorBoundary }) {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        textAlign: "center",
        gap: 2,
      }}
    >
      <MDTypography
        variant="h5"
        fontSize="2rem"
        sx={{ color: "primary.main", fontWeight: 700 }}
      >
        Something went wrong
      </MDTypography>

      <MDButton onClick={resetErrorBoundary} variant="contained">
        Try Again
      </MDButton>

      <MDButton onClick={() => (window.location.href = "/")} variant="outlined">
        Go Home
      </MDButton>
    </Box>
  );
}

export default function AppErrorBoundary({ children }) {
  return (
    <ErrorBoundary
      FallbackComponent={ErrorFallback}
      onReset={() => (window.location.href = "/")}
    >
      {children}
    </ErrorBoundary>
  );
}
