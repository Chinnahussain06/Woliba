import React, { useEffect } from "react";
import { Box, Grid, CircularProgress } from "@mui/material";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";

// Layouts & Components
import DashboardLayout from "@/src/Layouts/dashboardLayout";
import MDLoader from "@/src/components/MDLoader";
import MDTypography from "@/src/components/MDTypography";
import MDButton from "@/src/components/MDButton";

// Redux
import { useAppDispatch, useAppSelector } from "@/src/redux/hooks";
import { fetchPillars, submitRegistration } from "@/src/redux/thunks/registrationThunks";
import { togglePillar } from "@/src/redux/slices/registrationSlice";

// Selectors
import {
  selectPillars,
  selectPillarsLoading,
  selectSelectedPillars,
  selectIsLoading,
  selectRegistrationPayload,
} from "@/src/redux/selectors/registrationSelectors";

const COLORS = {
  primaryRed: "#D2686E",
  textDark: "#1E3A5F",
  textMuted: "#8292A2",
  borderColor: "#E2E8F0",
  bgSelected: "#FEF2F2",
};

const WellbeingPillars = () => {
  const dispatch = useAppDispatch();

  const pillars = useAppSelector(selectPillars) || [];
  const pillarsLoading = useAppSelector(selectPillarsLoading);
  const selectedIds = useAppSelector(selectSelectedPillars);
  const submitLoading = useAppSelector(selectIsLoading);
  const payload = useAppSelector(selectRegistrationPayload);

  useEffect(() => {
    dispatch(fetchPillars(1));
  }, [dispatch]);

  const handleSelect = (id) => {
    dispatch(togglePillar(id));
  };

  const handleDone = () => {
    if (selectedIds.length !== 3) return;
    dispatch(submitRegistration(payload));
  };

  return (
    <DashboardLayout>
      {submitLoading ? (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            minHeight: "70vh",
          }}
        >
          <MDLoader text="Submitting registration..." size="5em" />
        </Box>
      ) : (
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
          <Box sx={{ mb: 6, textAlign: "center" }}>
            <MDTypography
              variant="h5"
              sx={{ color: COLORS.textDark, fontWeight: 700 }}
            >
              Select any 3 well-being pillars goal you want to achieve
            </MDTypography>
          </Box>

          {pillarsLoading ? (
            <Box sx={{ display: "flex", justifyContent: "center", py: 10 }}>
              <CircularProgress sx={{ color: COLORS.primaryRed }} />
            </Box>
          ) : (
            <Grid container spacing={3}>
              {pillars.map((item) => {
                const isSelected = selectedIds.includes(item.id);
                const rank = selectedIds.indexOf(item.id) + 1;

                return (
                  <Grid item xs={12} sm={6} md={4} key={item.id}>
                    <Box
                      onClick={() => handleSelect(item.id)}
                      sx={{
                        height: "100%",
                        p: 3,
                        borderRadius: "16px",
                        border: "2px solid",
                        borderColor: isSelected ? COLORS.primaryRed : COLORS.borderColor,
                        bgcolor: isSelected ? COLORS.bgSelected : "white",
                        cursor: "pointer",
                        transition: "all 0.2s ease-in-out",
                        display: "flex",
                        flexDirection: "column",
                        "&:hover": {
                          borderColor: isSelected ? COLORS.primaryRed : "#CBD5E1",
                          boxShadow: "0 4px 12px rgba(210, 104, 110, 0.1)",
                        },
                      }}
                    >
                      {/* Number Indicator */}
                      <Box
                        sx={{
                          width: 28,
                          height: 28,
                          borderRadius: "8px",
                          bgcolor: isSelected ? COLORS.primaryRed : "#F1F5F9",
                          color: isSelected ? "white" : "#64748B",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          fontWeight: 700,
                          fontSize: "0.9rem",
                          mb: 2,
                          flexShrink: 0,
                        }}
                      >
                        {isSelected ? rank : ""}
                      </Box>

                      {/* Title */}
                      <MDTypography
                        sx={{
                          fontSize: "1.05rem",
                          color: COLORS.textDark,
                          fontWeight: 700,
                          mb: 1.5,
                          lineHeight: 1.3,
                        }}
                      >
                        {item.pillar_title}
                      </MDTypography>

                      {/* Description */}
                      <MDTypography
                        sx={{
                          fontSize: "0.875rem",
                          color: COLORS.textMuted,
                          lineHeight: 1.5,
                          flex: 1,
                        }}
                      >
                        {item.description}
                      </MDTypography>
                    </Box>
                  </Grid>
                );
              })}
            </Grid>
          )}

          {/* Buttons */}
          <Box
            sx={{
              mt: 8,
              pt: 4,
              borderTop: "1.5px solid #F1F5F9",
              display: "flex",
              justifyContent: "center",
              gap: 2,
            }}
          >
            <MDButton
              variant="outlined"
              onClick={() => window.history.back()}
              startIcon={<ArrowBackIosNewIcon sx={{ fontSize: "0.8rem" }} />}
              sx={{ width: "160px", py: 1.4 }}
            >
              Back
            </MDButton>

            <MDButton
              variant="contained"
              disabled={selectedIds.length !== 3}
              onClick={handleDone}
              sx={{ width: "160px", py: 1.4 }}
            >
              Done
            </MDButton>
          </Box>
        </Box>
      )}
    </DashboardLayout>
  );
};

export default WellbeingPillars;