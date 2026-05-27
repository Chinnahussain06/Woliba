import React, { useEffect } from "react";
import { Box, Grid, CircularProgress } from "@mui/material";

import DashboardLayout from "../../pages/dashboardLayout";
import MDTypography from "../../components/MDTypography";
import MDButton from "../../components/MDButton";

// Redux
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { fetchPillars } from "../../redux/thunks/lookupThunks";
import { submitRegistration } from "../../redux/thunks/registrationThunks";

import {
  selectPillars,
  selectPillarsLoading,
  selectSelectedPillarIds,
} from "../../redux/selectors/pillarSelectors";

import {
  selectIsLoading,
  selectRegistrationPayload,
} from "../../redux/selectors/registrationSelectors";

import { setSelectedPillarIds } from "../../redux/slices/pillarSlice";

import Loader from "../../components/Loader";

const COLORS = {
  primaryRed: "#D2686E",
  textDark: "#1E3A5F",
  textMuted: "#8292A2",
  borderColor: "#F0F2F5",
  bgSelected: "#F8F9FB",
};

const WellbeingPillars = () => {
  const dispatch = useAppDispatch();

  const pillars = useAppSelector(selectPillars) || [];
  const isLoading = useAppSelector(selectPillarsLoading);
  const selectedIds = useAppSelector(selectSelectedPillarIds);

  const regLoading = useAppSelector(selectIsLoading);
  const payload = useAppSelector(selectRegistrationPayload);

  useEffect(() => {
    dispatch(fetchPillars(1));
  }, [dispatch]);

  const handleSelect = (id) => {
    let updated = [];
    if (selectedIds.includes(id)) {
      updated = selectedIds.filter((item) => item !== id);
    } else {
      if (selectedIds.length >= 3) return;
      updated = [...selectedIds, id];
    }
    dispatch(setSelectedPillarIds(updated));
  };

  const handleDone = () => {
    if (selectedIds.length !== 3) return;
    dispatch(submitRegistration(payload));
  };

  if (regLoading) {
    return (
      <Loader text="Submitting registration..." sx={{ height: "100vh" }} />
    );
  }

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
                      display: "flex",
                      flexDirection: "row",
                      flex: 1, // Rule: Force card to fill Grid height
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
                    {/* Rank Box (1, 2, 3) */}
                    <Box
                      sx={{
                        width: 22,
                        height: 22,
                        mt: 0.3,
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

                    {/* Content */}
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
            onClick={handleDone}
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
              px: 8,
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
