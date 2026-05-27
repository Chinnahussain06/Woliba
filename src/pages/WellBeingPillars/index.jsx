import React, { useEffect } from "react";
import { Box, CircularProgress, useTheme } from "@mui/material";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";

//components
import DashboardLayout from "@/src/Layouts/dashboardLayout";
import MDLoader from "@/src/components/MDLoader";
import MDTypography from "@/src/components/MDTypography";
import MDButton from "@/src/components/MDButton";

//redux
import { useAppDispatch, useAppSelector } from "@/src/redux/hooks";
import {
  fetchPillars,
  submitRegistration,
} from "@/src/redux/thunks/registrationThunks";
import { togglePillar } from "@/src/redux/slices/registrationSlice";
import {
  selectPillars,
  selectPillarsLoading,
  selectSelectedPillars,
  selectIsLoading,
  selectRegistrationPayload,
} from "@/src/redux/selectors/registrationSelectors";

const WellbeingPillars = () => {
  const dispatch = useAppDispatch();
  const theme = useTheme();

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
            bgcolor: theme.palette.background.paper,
            borderRadius: "24px",
            boxShadow: "0px 10px 40px rgba(0, 0, 0, 0.04)",
            p: { xs: 3, md: 6 },
            mx: "auto",
          }}
        >
          <Box sx={{ mb: 5, textAlign: "center" }}>
            <MDTypography
              variant="h5"
              sx={{
                color: theme.palette.secondary.main,
                fontWeight: 700,
              }}
            >
              Select any 3 well-being pillars goal you want to achieve
            </MDTypography>
          </Box>

          {pillarsLoading ? (
            <Box sx={{ display: "flex", justifyContent: "center", py: 10 }}>
              <CircularProgress sx={{ color: theme.palette.primary.main }} />
            </Box>
          ) : (
            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: {
                  xs: "1fr",
                  sm: "repeat(2, 1fr)",
                  md: "repeat(3, 1fr)",
                },
                gap: "12px",
              }}
            >
              {pillars.map((item) => {
                const isSelected = selectedIds.includes(item.id);
                const rank = selectedIds.indexOf(item.id) + 1;

                return (
                  <Box
                    key={item.id}
                    onClick={() => handleSelect(item.id)}
                    sx={{
                      p: "14px 16px",
                      borderRadius: "12px",
                      border: "1.5px solid",
                      borderColor: theme.palette.divider,
                      bgcolor: theme.palette.background.paper,
                      cursor: "pointer",
                      transition: "all 0.15s ease-in-out",
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "center",
                      gap: "12px",
                      "&:hover": {
                        boxShadow: `0 4px 12px ${theme.palette.primary.main}14`,
                      },
                    }}
                  >
                    <Box
                      sx={{
                        width: 26,
                        height: 26,
                        borderRadius: "6px",
                        bgcolor: isSelected
                          ? theme.palette.primary.main
                          : "transparent",
                        border: "1.5px solid",
                        borderColor: isSelected
                          ? theme.palette.primary.main
                          : theme.palette.divider,
                        color: isSelected
                          ? theme.palette.primary.contrastText
                          : "transparent",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontWeight: 700,
                        fontSize: "0.8rem",
                        flexShrink: 0,
                        transition: "all 0.15s ease",
                      }}
                    >
                      {isSelected ? rank : ""}
                    </Box>
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "4px",
                        flex: 1,
                      }}
                    >
                      <MDTypography
                        variant="body1"
                        sx={{
                          color: theme.palette.secondary.main,
                          fontWeight: 500,
                          lineHeight: 1.3,
                        }}
                      >
                        {item.pillar_title}
                      </MDTypography>

                      <MDTypography
                        variant="body2"
                        sx={{
                          color: theme.palette.text.secondary,
                          lineHeight: 1.5,
                        }}
                      >
                        {item.description}
                      </MDTypography>
                    </Box>
                  </Box>
                );
              })}
            </Box>
          )}

          <Box
            sx={{
              mt: 6,
              pt: 4,
              borderTop: `1.5px solid ${theme.palette.divider}`,
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
