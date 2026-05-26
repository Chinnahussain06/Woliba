import React from "react";
import Button from "@mui/material/Button";

/**
 * MDButton: A generic, highly reusable button component.
 * Stylized with Woliba brand theme color presets and smooth interactive transitions.
 */
export default function MDButton({
  variant = "contained",
  children,
  sx = {},
  ...rest
}) {
  const getVariantStyles = () => {
    switch (variant) {
      case "contained":
        return {
          backgroundColor: "#D2686E",
          color: "#FFFFFF",
          fontWeight: 600,
          boxShadow: "0px 4px 10px rgba(210, 104, 110, 0.15)",
          "&.Mui-disabled": {
            backgroundColor: "#EBEBEB",
            color: "#A0AEC0",
          },
          "&:hover": {
            backgroundColor: "#C1585D",
            transform: "translateY(-1px)",
            boxShadow: "0px 6px 15px rgba(210, 104, 110, 0.25)",
          },
          "&:active": {
            transform: "scale(0.98)",
          },
        };
      case "outlined":
        return {
          borderColor: "#CBD5E1",
          color: "#475569",
          fontWeight: 600,
          "&:hover": {
            borderColor: "#94A3B8",
            backgroundColor: "#F8FAFC",
            transform: "translateY(-1px)",
          },
          "&:active": {
            transform: "scale(0.98)",
          },
        };
      case "text":
        return {
          color: "rgba(210, 104, 110, 0.8)",
          fontWeight: 600,
          "&:hover": {
            color: "#C1585D",
            backgroundColor: "transparent",
            textDecoration: "underline",
          },
        };
      default:
        return {};
    }
  };

  const genericBaseStyles = {
    fontFamily: "Inter, sans-serif",
    textTransform: "none",
    borderRadius: "8px",
    transition: "all 0.25s ease-in-out",
    fontSize: "0.875rem",
    ...getVariantStyles(),
  };

  return (
    <Button
      variant={variant}
      sx={{
        ...genericBaseStyles,
        ...sx,
      }}
      {...rest}
    >
      {children}
    </Button>
  );
}
