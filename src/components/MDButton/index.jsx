import React from "react";
import Button from "@mui/material/Button";
import { useTheme } from "@mui/material/styles";

export default function MDButton({
  variant = "contained",
  children,
  sx = {},
  ...rest
}) {
  const theme = useTheme();
  const { palette } = theme;

  const getVariantStyles = () => {
    switch (variant) {
      case "contained":
        return {
          backgroundColor: palette.primary.main,
          color: palette.primary.contrastText,
          fontWeight: 600,
          boxShadow: `0px 4px 10px ${palette.primary.main}25`,

          "&.Mui-disabled": {
            backgroundColor: "#EBEBEB",
            color: "#A0AEC0",
          },

          "&:hover": {
            backgroundColor: palette.primary.dark,
            transform: "translateY(-1px)",
            boxShadow: `0px 6px 15px ${palette.primary.main}40`,
          },

          "&:active": {
            transform: "scale(0.98)",
          },
        };

      case "outlined":
        return {
          borderColor: palette.divider,
          color: palette.text.primary,
          fontWeight: 600,

          "&:hover": {
            borderColor: palette.primary.dark,
            backgroundColor: palette.background.default,
            transform: "translateY(-1px)",
          },

          "&:active": {
            transform: "scale(0.98)",
          },
        };

      case "text":
        return {
          color: palette.primary.main,
          fontWeight: 600,

          "&:hover": {
            color: palette.primary.dark,
            backgroundColor: "transparent",
            textDecoration: "underline",
          },
        };

      default:
        return {};
    }
  };

  return (
    <Button
      variant={variant}
      sx={{
        fontFamily: "Inter, sans-serif",
        textTransform: "none",
        borderRadius: "8px",
        transition: "all 0.25s ease-in-out",
        fontSize: "0.875rem",
        ...getVariantStyles(),
        ...sx,
      }}
      {...rest}
    >
      {children}
    </Button>
  );
}
