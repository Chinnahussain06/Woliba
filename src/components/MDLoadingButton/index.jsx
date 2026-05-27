import React from "react";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import { useTheme } from "@mui/material/styles";
import MDButton from "../MDButton";

export default function MDLoadingButton({
  loading = false,
  loadingText = "",
  disabled = false,
  children,
  startIcon = null,
  variant = "contained",
  sx = {},
  ...rest
}) {
  const theme = useTheme();
  const { palette } = theme;

  return (
    <MDButton
      variant={variant}
      disabled={disabled || loading}
      startIcon={!loading ? startIcon : null}
      sx={{
        position: "relative",
        minHeight: "42px",

        "&.Mui-disabled": {
          backgroundColor: palette.action?.disabledBackground || "#EBEBEB",
          color: palette.text?.disabled || "#A0AEC0",
        },

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
            sx={{
              color: theme.palette.primary.main,
            }}
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
