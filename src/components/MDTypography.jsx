import React from "react";
import Typography from "@mui/material/Typography";

/**
 * MDTypography: A generic, highly reusable typography component.
 * Wraps MUI's Typography with elegant font and color defaults.
 */
export default function MDTypography({
  variant = "body1",
  color,
  sx = {},
  children,
  ...rest
}) {
  // Graceful color mapping depending on corporate themes:
  // - primary/header: #1E3A5F
  // - secondary/body: #475569
  // - caption/muted: #94A3B8 or #5A6E85
  const getResolvedColor = () => {
    if (color) return color;
    
    switch (variant) {
      case "h1":
      case "h2":
      case "h3":
      case "h4":
      case "h5":
      case "h6":
        return "#1E3A5F";
      case "subtitle1":
      case "subtitle2":
      case "body1":
        return "#475569";
      case "body2":
        return "#5A6E85";
      case "caption":
        return "#94A3B8";
      default:
        return "inherit";
    }
  };

  const defaultStyles = {
    fontFamily: "Inter, sans-serif",
    color: getResolvedColor(),
    ...(variant === "h5" || variant === "h6"
      ? { fontWeight: 700, letterSpacing: "-0.01em" }
      : {}),
  };

  return (
    <Typography
      variant={variant}
      sx={{
        ...defaultStyles,
        ...sx,
      }}
      {...rest}
    >
      {children}
    </Typography>
  );
}
