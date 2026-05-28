import React from "react";
import Typography from "@mui/material/Typography";

export default function MDTypography({
  variant = "body1",
  color = "text.primary",
  sx = {},
  children,
  ...rest
}) {
  return (
    <Typography
      variant={variant}
      color={color}
      sx={{
        fontFamily: "Lato, sans-serif",
        ...sx,
      }}
      {...rest}
    >
      {children}
    </Typography>
  );
}
