import React from "react";
import Box from "@mui/material/Box";
import MDTypography from "../../components/MDTypography";
import MDButton from "../../components/MDButton";

// Import required assets
import wolibaLogo from "../../assets/woliba Logo.png";
import backgroundImage from "../../assets/Background.png";

export default function DashboardLayout({ children }) {
  return (
    <Box
      id="dashboard-layout"
      sx={{
        position: "relative",
        minHeight: "100vh",
        bgcolor: "#FCFBFA",
        color: "#1E3A5F",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        overflowX: "hidden",
      }}
    >
      {/* Background illustration */}
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

      {/* Header element overlay */}
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
        {/* Brand Logo */}
        <Box id="logo-wrapper" sx={{ display: "flex", alignItems: "center" }}>
          <Box
            component="img"
            src={wolibaLogo}
            alt="Woliba Logo"
            id="woliba-logo-img"
            sx={{
              height: { xs: 36, md: 44 },
              width: "auto",
              objectFit: "contain",
              cursor: "pointer",
              transition: "opacity 0.2s",
              "&:hover": { opacity: 0.9 },
            }}
          />
        </Box>

        {/* Static Dummy Language Selector Button Matching Image 1 */}
        <Box id="language-static-display" sx={{ display: "flex", alignItems: "center" }}>
          <MDTypography
            id="lang-selector-text"
            sx={{
              fontFamily: "Inter, sans-serif",
              fontSize: "1.1rem",
              color: "#1E3A5F",
              display: "flex",
              alignItems: "center",
              gap: 1,
              fontWeight: 500,
            }}
          >
            Language{" "}
            <Box
              component="img"
              src="https://flagcdn.com/w40/us.png"
              alt="United States Flag"
              sx={{
                width: 24,
                height: 16,
                borderRadius: "4px",
                boxShadow: "0 1px 3px rgba(0,0,0,0.15)",
                display: "inline-block",
                objectFit: "cover",
                verticalAlign: "middle",
                mx: 0.5,
              }}
            />{" "}
            <span style={{ fontWeight: 600 }}>En</span>
          </MDTypography>
          <Box component="span" sx={{ color: "#D2686E", fontSize: "0.7rem", ml: 1, transform: "scaleY(0.85)" }}>
            ▼
          </Box>
        </Box>
      </Box>

      {/* Main Container for active route views */}
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

      {/* Footer bar links */}
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
          id="terms-of-use-link"
          component="a"
          href="#/terms"
          onClick={(e) => e.preventDefault()}
          variant="text"
          sx={{
            color: "rgba(210, 104, 110, 0.8)",
            fontSize: "0.75rem",
            px: 1,
          }}
        >
          Terms of Use
        </MDButton>
        <MDButton
          id="contact-us-link"
          component="a"
          href="#/contact"
          onClick={(e) => e.preventDefault()}
          variant="text"
          sx={{
            color: "rgba(210, 104, 110, 0.8)",
            fontSize: "0.75rem",
            px: 1,
          }}
        >
          Contact Us
        </MDButton>
      </Box>
    </Box>
  );
}
