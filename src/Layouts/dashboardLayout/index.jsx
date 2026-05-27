import React from "react";
import Box from "@mui/material/Box";
import { useTheme } from "@mui/material/styles";

import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

import MDButton from "@/src/components/MDButton";
import MDTypography from "@/src/components/MDTypography";

import wolibaLogo from "@/src/assets/images/wolibaLogo.png";
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
        justifyContent: "space-between",
        overflowX: "hidden",
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
          backgroundPosition: { xs: "center top", md: "center" },
          backgroundSize: { xs: "cover", md: "contain" },
          opacity: 0.92,
          userSelect: "none",
          pointerEvents: "none",
        }}
      />

      <Box
        component="header"
        id="woliba-header"
        sx={{
          position: "relative",
          zIndex: 10,
          width: "100%",
          maxWidth: "1280px",
          mx: "auto",
          px: { xs: 3, md: 6 },
          py: 2.5,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Box id="logo-wrapper" sx={{ display: "flex", alignItems: "center" }}>
          <Box
            component="img"
            src={wolibaLogo}
            alt="Woliba Logo"
            sx={{
              height: { xs: 48, md: 58 },
              width: "auto",
              objectFit: "contain",
              cursor: "pointer",
              transition: "opacity 0.2s",
              "&:hover": { opacity: 0.9 },
            }}
          />
        </Box>

        <Box
          id="language-static-display"
          sx={{ display: "flex", alignItems: "center" }}
        >
          <MDTypography
            sx={{
              fontFamily: "Inter, sans-serif",
              fontSize: "1.1rem",
              color: theme.palette.text.primary,
              display: "flex",
              alignItems: "center",
              gap: 1,
              fontWeight: 500,
            }}
          >
            Language
            <Box
              component="img"
              src="https://flagcdn.com/w40/us.png"
              alt="United States Flag"
              sx={{
                width: 24,
                height: 16,
                borderRadius: "4px",
                boxShadow: "0 1px 3px rgba(0,0,0,0.15)",
                objectFit: "cover",
                mx: 0.5,
              }}
            />
            <span style={{ fontWeight: 600 }}>En</span>
          </MDTypography>

          <KeyboardArrowDownIcon
            sx={{
              color: theme.palette.primary.main,
              fontSize: "1.1rem",
              ml: 0.5,
            }}
          />
        </Box>
      </Box>

      <Box
        component="main"
        id="main-content-row"
        sx={{
          position: "relative",
          zIndex: 10,
          flex: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          px: 2,
          py: 4,
        }}
      >
        {children}
      </Box>

      <Box
        component="footer"
        id="woliba-footer-bar"
        sx={{
          position: "relative",
          zIndex: 10,
          width: "100%",
          maxWidth: "1280px",
          mx: "auto",
          px: { xs: 3, md: 6 },
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
          onClick={(e) => e.preventDefault()}
          variant="text"
          sx={{
            color: theme.palette.primary.main,
            opacity: 0.8,
            fontSize: "0.9rem",
            px: 1,
            "&:hover": {
              backgroundColor: "transparent",
              opacity: 1,
            },
          }}
        >
          Terms of Use
        </MDButton>

        <MDButton
          component="a"
          href="#/contact"
          onClick={(e) => e.preventDefault()}
          variant="text"
          sx={{
            color: theme.palette.primary.main,
            opacity: 0.8,
            fontSize: "0.9rem",
            px: 1,
            "&:hover": {
              backgroundColor: "transparent",
              opacity: 1,
            },
          }}
        >
          Contact Us
        </MDButton>
      </Box>
    </Box>
  );
}
