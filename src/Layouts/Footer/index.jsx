import React from "react";
import Box from "@mui/material/Box";
import { useTheme } from "@mui/material/styles";
import MDButton from "@/src/components/MDButton";

export default function Footer() {
  const theme = useTheme();

  return (
    <Box
      component="footer"
      id="woliba-footer-bar"
      sx={{
        position: "relative",
        zIndex: 10,
        width: "100%",
        px: { xs: 3, sm: 4, md: 6 },
        py: 2.5,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        gap: 4,
      }}
    >
      <MDButton
        component="a"
        href="#/terms"
        variant="text"
        sx={{
          color: theme.palette.primary.main,
          opacity: 0.85,
          fontSize: "0.9rem",
          textTransform: "none",
          "&:hover": { backgroundColor: "transparent", opacity: 1 },
        }}
      >
        Terms of Use
      </MDButton>

      <MDButton
        component="a"
        href="#/contact"
        variant="text"
        sx={{
          color: theme.palette.primary.main,
          opacity: 0.85,
          fontSize: "0.9rem",
          textTransform: "none",
          "&:hover": { backgroundColor: "transparent", opacity: 1 },
        }}
      >
        Contact Us
      </MDButton>
    </Box>
  );
}
