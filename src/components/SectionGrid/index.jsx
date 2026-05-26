import React, { useState, useEffect } from "react";
import { Box, Grid, CircularProgress } from "@mui/material";

// Project specific components
import DashboardLayout from "../../pages/dashboardLayout";
import MDTypography from "../../components/MDTypography";
import MDButton from "../../components/MDButton";
import apiMgr from "@/src/api/apiMgr";

const COLORS = {
  primaryRed: "#D2686E",
  textDark: "#1E3A5F",
  textMuted: "#8292A2",
  borderColor: "#E0E4EC", // More visible border color
  bgHover: "#F8F9FB",
  bgSelected: "#F8F9FB",
};

const WellbeingPillars = () => {
  const [pillars, setPillars] = useState([]);
  const [selectedIds, setSelectedIds] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchPillars = async () => {
      try {
        setIsLoading(true);
        const response = await apiMgr.getWellbeingPillars(1);
        setPillars(response?.data || []);
      } catch (err) {
        console.error("Fetch Error:", err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchInterests(); // Note: Changed to match your internal function call if different
    fetchPillars();
  }, []);

  const handleSelect = (id) => {
    setSelectedIds((prev) => {
      if (prev.includes(id)) return prev.filter((i) => i !== id);
      if (prev.length < 3) return [...prev, id];
      return prev;
    });
  };

  return (
    <DashboardLayout>
      <Box
        sx={{
          width: "100%",
          maxWidth: "1250px",
          bgcolor: "white",
          borderRadius: "20px",
          boxShadow: "0px 10px 40px rgba(0, 0, 0, 0.04)",
          p: { xs: 2, md: 5 },
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Box sx={{ mb: 6, textAlign: "center" }}>
          <MDTypography
            variant="h6"
            sx={{ color: COLORS.textDark, fontWeight: 700 }}
          >
            Select any 3 well-being pillars goal you want to achieve
          </MDTypography>
        </Box>

        {isLoading ? (
          <Box sx={{ display: "flex", justifyContent: "center", py: 10 }}>
            <CircularProgress sx={{ color: COLORS.primaryRed }} />
          </Box>
        ) : (
          <Grid container spacing={2} alignItems="stretch">
            {pillars.map((item) => {
              const selectedIndex = selectedIds.indexOf(item.id);
              const isSelected = selectedIndex !== -1;

              return (
                <Grid
                  item
                  xs={12}
                  sm={6}
                  md={4}
                  key={item.id}
                  sx={{ display: "flex" }}
                >
                  <Box
                    onClick={() => handleSelect(item.id)}
                    sx={{
                      width: "100%", // Force full width
                      display: "flex",
                      flexDirection: "row", // Horizontal layout for checkbox + text
                      alignItems: "flex-start",
                      gap: 2,
                      p: 2.5,
                      cursor: "pointer",
                      borderRadius: "12px",
                      border: "1.5px solid", // Visible border
                      borderColor: isSelected
                        ? COLORS.primaryRed
                        : COLORS.borderColor,
                      bgcolor: isSelected ? COLORS.bgSelected : "transparent",
                      transition: "all 0.2s ease",
                      "&:hover": {
                        bgcolor: COLORS.bgHover,
                        borderColor: isSelected ? COLORS.primaryRed : "#A0AEC0",
                      },
                    }}
                  >
                    {/* Ranked Checkbox Box */}
                    <Box
                      sx={{
                        width: 22,
                        height: 22,
                        mt: 0.5,
                        flexShrink: 0,
                        borderRadius: "4px",
                        border: isSelected ? "none" : "1.5px solid #CBD5E1",
                        bgcolor: isSelected ? COLORS.primaryRed : "transparent",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      {isSelected && (
                        <MDTypography
                          sx={{
                            color: "white",
                            fontSize: "0.8rem",
                            fontWeight: 700,
                          }}
                        >
                          {selectedIndex + 1}
                        </MDTypography>
                      )}
                    </Box>

                    {/* Text Container */}
                    <Box sx={{ flex: 1 }}>
                      <MDTypography
                        sx={{
                          fontSize: "0.95rem",
                          color: COLORS.textDark,
                          fontWeight: 700,
                          mb: 0.5,
                          lineHeight: 1.2,
                        }}
                      >
                        {item.pillar_title}
                      </MDTypography>
                      <MDTypography
                        sx={{
                          fontSize: "0.75rem",
                          color: COLORS.textMuted,
                          lineHeight: 1.4,
                          fontWeight: 400,
                        }}
                      >
                        {item.description}
                      </MDTypography>
                    </Box>
                  </Box>
                </Grid>
              );
            })}
          </Grid>
        )}

        {/* Footer Buttons */}
        <Box
          sx={{
            mt: 6,
            pt: 3,
            borderTop: "1px solid #F8F9FA",
            display: "flex",
            justifyContent: "center",
            gap: 2,
          }}
        >
          <MDButton
            variant="outlined"
            sx={{
              borderColor: COLORS.primaryRed,
              color: COLORS.primaryRed,
              borderRadius: "8px",
              px: 6,
              textTransform: "none",
            }}
          >
            ‹ Back
          </MDButton>
          <MDButton
            variant="contained"
            disabled={selectedIds.length !== 3}
            sx={{
              bgcolor:
                selectedIds.length === 3
                  ? COLORS.primaryRed
                  : "#E9ECEF !important",
              color:
                selectedIds.length === 3
                  ? "white !important"
                  : "#ADB5BD !important",
              borderRadius: "8px",
              px: 6,
              boxShadow: "none",
              textTransform: "none",
            }}
          >
            Done
          </MDButton>
        </Box>
      </Box>
    </DashboardLayout>
  );
};

export default WellbeingPillars;
