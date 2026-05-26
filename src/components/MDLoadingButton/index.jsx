import React from "react";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

import MDButton from "../MDButton";

export default function MDLoadingButton({
  loading = false,
  loadingText = "",
  disabled = false,
  children,
  startIcon = null,
  sx = {},
  ...rest
}) {
  return (
    <MDButton
      disabled={disabled || loading}
      startIcon={!loading ? startIcon : null}
      sx={{
        position: "relative",
        minHeight: "42px",
        ...sx,
      }}
      {...rest}
    >
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
          }}
        >
          <CircularProgress
            size={20}
            color="inherit"
          />
        </Box>
      )}

      <Box
        component="span"
        sx={{
          opacity: loading ? 0 : 1,
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 1,
        }}
      >
        {loading && loadingText ? loadingText : children}
      </Box>
    </MDButton>
  );
}