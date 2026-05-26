import React from "react";
import MDButton from "./MDButton";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

/**
 * MDLoadingButton: A generic button component with a built-in loading indicator state.
 * Implements clean layouts to prevent unexpected shifts or popups while saving/registering.
 */
export default function MDLoadingButton({
  loading = false,
  loadingText,
  disabled,
  children,
  startIcon,
  sx = {},
  ...rest
}) {
  return (
    <MDButton
      disabled={disabled || loading}
      startIcon={!loading ? startIcon : null}
      sx={{
        position: "relative",
        // When in loading state, make text a little more transparent or keep it same
        ...(loading ? { color: "transparent !important" } : {}),
        ...sx,
      }}
      {...rest}
    >
      {/* If loading is active, show perfectly centered spinner */}
      {loading && (
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "inherit",
          }}
        >
          <CircularProgress size={20} color="inherit" />
        </Box>
      )}
      
      {/* Children content (remains mounted to support exact size calculations) */}
      <Box component="span" sx={{ opacity: loading ? 0 : 1, display: "inline-flex", alignItems: "center", gap: 1 }}>
        {children}
      </Box>
    </MDButton>
  );
}
