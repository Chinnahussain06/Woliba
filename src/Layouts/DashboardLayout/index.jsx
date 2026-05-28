import React from "react";
import Box from "@mui/material/Box";
import { useTheme } from "@mui/material/styles";
import backgroundImage from "@/src/assets/images/Background.png";

export default function DashboardLayout({ children }) {
  const theme = useTheme();

  return (
    <Box
      id="dashboard-layout"
      sx={{
        position: "relative",
        minHeight: "100vh",
        bgcolor: theme.palette.background.default,
        color: theme.palette.text.primary,
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
      }}
    >
      <Box
        id="lifestyle-bg-element"
        sx={{
          position: "absolute",
          inset: 0,
          zIndex: 0,
          backgroundImage: `url(${backgroundImage})`,
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
          backgroundSize: "contain",
          opacity: 0.15,
          pointerEvents: "none",
          userSelect: "none",
        }}
      />

      {children}
    </Box>
  );
}
