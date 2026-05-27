import React from "react";
import Box from "@mui/material/Box";
import { useTheme } from "@mui/material/styles";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import MDTypography from "@/src/components/MDTypography";
import wolibaLogo from "@/src/assets/images/wolibaLogo.png";

export default function DashboardNavbar() {
  const theme = useTheme();

  return (
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

      {/* Language Selector */}
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
          sx={{ fontSize: "1rem", color: theme.palette.primary.main }}
        />
      </Box>
    </Box>
  );
}
