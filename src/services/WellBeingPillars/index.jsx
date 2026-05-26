import React, { useState, useEffect } from "react";
import { Box, Grid, CircularProgress } from "@mui/material";

// Components from your project
import DashboardLayout from "../../pages/dashboardLayout";
import MDTypography from "../../components/MDTypography";
import MDButton from "../../components/MDButton";
import apiMgr from "@/src/api/apiMgr";

const COLORS = {
  primaryRed: "#D2686E",
  textDark: "#1E3A5F",
  textMuted: "#8292A2",
  borderColor: "#F0F2F5",
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
        console.error("API Error:", err);
      } finally {
        setIsLoading(false);
      }
    };
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
          maxWidth: "1200px",
          bgcolor: "white",
          borderRadius: "24px",
          boxShadow: "0px 10px 40px rgba(0, 0, 0, 0.04)",
          p: { xs: 3, md: 6 },
          mx: "auto",
        }}
      >
        {/* Header Section */}
        <Box sx={{ mb: 6, textAlign: "center" }}>
          <MDTypography
            variant="h5"
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
          <Grid
            container
            spacing={2}
            sx={{
              width: "100%",
              margin: 0, // Prevents negative margin horizontal scroll issues
              alignItems: "stretch",
            }}
          >
            {pillars.map((item) => {
              const selectedIndex = selectedIds.indexOf(item.id);
              const isSelected = selectedIndex !== -1;

              return (
                <Grid
                  item
                  key={item.id}
                  xs={12}
                  sm={6}
                  md={4}
                  sx={{ display: "flex" }} // Rule 1: Allow child to fill height
                >
                  <Box
                    onClick={() => handleSelect(item.id)}
                    sx={{
                      display: "flex",
                      flexDirection: "row",
                      flex: 1, // Rule 2: Force child to consume all Grid space
                      height: "100%", // Rule 3: Maintain row height consistency
                      alignItems: "flex-start",
                      gap: 2,
                      p: 2.5,
                      cursor: "pointer",
                      borderRadius: "12px",
                      border: "1.5px solid",
                      borderColor: isSelected
                        ? COLORS.primaryRed
                        : COLORS.borderColor,
                      bgcolor: isSelected ? COLORS.bgSelected : "white",
                      transition: "all 0.2s ease-in-out",
                      "&:hover": {
                        bgcolor: "#F4F7FA",
                        borderColor: isSelected ? COLORS.primaryRed : "#D1D9E6",
                      },
                    }}
                  >
                    {/* Rank Box */}
                    <Box
                      sx={{
                        width: 22,
                        height: 22,
                        mt: 0.4,
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
                          lineHeight: 1.5,
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

        {/* Action Buttons */}
        <Box
          sx={{
            mt: 8,
            pt: 4,
            borderTop: "1.5px solid #F8F9FA",
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
              borderRadius: "10px",
              px: 6,
              textTransform: "none",
              fontWeight: 600,
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
              borderRadius: "10px",
              px: 6,
              boxShadow: "none",
              textTransform: "none",
              fontWeight: 600,
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
