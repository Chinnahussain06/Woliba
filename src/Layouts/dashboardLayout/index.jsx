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
        overflow: "hidden",
      }}
    >
      {/* Background Image */}
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

      {/* Header */}
      <Box
        component="header"
        id="woliba-header"
        sx={{
          position: "relative",
          zIndex: 10,
          width: "100%",
          px: { xs: 3, sm: 4, md: 6 },
          py: 2.5,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        {/* Logo */}
        <Box
          component="img"
          src={wolibaLogo}
          alt="Woliba Logo"
          sx={{
            height: { xs: 42, md: 52 },
            width: "auto",
            objectFit: "contain",
            cursor: "pointer",
          }}
        />

        {/* Language */}
        <Box
          id="language-static-display"
          sx={{
            display: "flex",
            alignItems: "center",
            cursor: "pointer",
            gap: 0.5,
          }}
        >
          <MDTypography
            sx={{
              fontSize: "0.8rem",
              color: theme.palette.text.primary,
              display: "flex",
              alignItems: "center",
              gap: 1,
              fontWeight: 400,
            }}
          >
            Language
          </MDTypography>

          <Box
            component="img"
            src="https://flagcdn.com/w40/us.png"
            alt="US Flag"
            sx={{
              width: 22,
              height: 15,
              borderRadius: "2px",
              objectFit: "cover",
            }}
          />

          <MDTypography
            sx={{
              fontSize: "0.8rem",
              fontWeight: 500,
              color: theme.palette.text.primary,
            }}
          >
            En
          </MDTypography>

          <KeyboardArrowDownIcon
            sx={{
              fontSize: "1rem",
              color: theme.palette.primary.main,
            }}
          />
        </Box>
      </Box>

      {/* Main Content */}
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

      {/* Footer */}
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
          variant="text"
          sx={{
            color: theme.palette.primary.main,
            opacity: 0.85,
            fontSize: "0.9rem",
            textTransform: "none",
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