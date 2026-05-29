import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import { useTheme } from "@mui/material/styles";

import MDButton from "../MDButton";

export default function MDLoadingButton({
  loading = false,
  loadingText = "Loading...",
  disabled = false,
  children,
  startIcon = null,
  variant = "contained",
  size = "medium",
  sx = {},
  ...rest
}) {
  const theme = useTheme();

  return (
    <MDButton
      variant={variant}
      size={size}
      disabled={disabled || loading}
      startIcon={!loading ? startIcon : null}
      sx={{
        minWidth: 140,
        ...sx,
      }}
      {...rest}
    >
      {loading ? (
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 1,
          }}
        >
          <CircularProgress
            size={18}
            sx={{
              color: theme.palette.primary.main,
            }}
          />

          <Box component="span">{loadingText}</Box>
        </Box>
      ) : (
        children
      )}
    </MDButton>
  );
}
