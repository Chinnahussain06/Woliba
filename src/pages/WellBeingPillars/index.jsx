import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

// MUI
import { Box, CircularProgress, Divider, useTheme } from "@mui/material";

import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";

// Components
import DashboardLayout from "@/src/Layouts/DashboardLayout";
import DashboardNavbar from "@/src/Layouts/DashboardNavbar";
import Footer from "@/src/Layouts/Footer";

import MDLoader from "@/src/components/MDLoader";
import MDTypography from "@/src/components/MDTypography";
import MDButton from "@/src/components/MDButton";
import MDFormCard from "@/src/components/MDFormCard";
import MDAlert from "@/src/components/MDAlert";

// Redux
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
  selectRegistrationPayload,
  selectError,
} from "@/src/redux/selectors/registrationSelectors";

const WellbeingPillars = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const theme = useTheme();

  const [isSubmitting, setIsSubmitting] = useState(false);

  const pillars = useAppSelector(selectPillars) || [];
  const pillarsLoading = useAppSelector(selectPillarsLoading);
  const apiError = useAppSelector(selectError);

  const selectedIds = useAppSelector(selectSelectedPillars);

  const payload = useAppSelector(selectRegistrationPayload);

  useEffect(() => {
    dispatch(fetchPillars(1));
  }, [dispatch]);

  const handleSelect = (id) => {
    dispatch(togglePillar(id));
  };

  const handleDone = async () => {
    if (selectedIds.length !== 3) return;

    setIsSubmitting(true);

    const result = await dispatch(submitRegistration(payload));

    if (submitRegistration.fulfilled.match(result)) {
      navigate("/welcome");
    } else {
      setIsSubmitting(false);
    }
  };

  if (isSubmitting) {
    return (
      <DashboardLayout>
        <Box
          sx={{
            position: "fixed",
            inset: 0,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            bgcolor: theme.palette.background.default,
            zIndex: 9999,
          }}
        >
          <MDLoader text="Getting your wellness journey ready..." size="20em" />
        </Box>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <Box
        component="main"
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
        <MDFormCard
          title="Select any 3 well-being pillars goal you want to achieve — at least one is required."
          maxWidth="70%"
        >
          <MDAlert message={apiError} onClose={() => dispatch(clearError())} />

          {pillarsLoading ? (
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                py: 8,
              }}
            >
              <CircularProgress
                sx={{
                  color: theme.palette.primary.main,
                }}
              />
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
                      p: "25px 16px",
                      borderRadius: "12px",
                      border: "1.5px solid",

                      borderColor: isSelected
                        ? theme.palette.primary.main
                        : theme.palette.divider,

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
                    {/* Rank Badge */}
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

                    {/* Pillar Info */}
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

          <Divider sx={{ my: 3 }} />

          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              gap: 2,
            }}
          >
            <MDButton
              variant="outlined"
              onClick={() => window.history.back()}
              startIcon={<ArrowBackIosNewIcon sx={{ fontSize: "0.8rem" }} />}
              sx={{
                width: "160px",
                py: 1.4,
              }}
            >
              Back
            </MDButton>

            <MDButton
              variant="contained"
              disabled={selectedIds.length !== 3}
              onClick={handleDone}
              sx={{
                width: "160px",
                py: 1.4,
              }}
            >
              Done
            </MDButton>
          </Box>
        </MDFormCard>
      </Box>

      <Footer />
    </DashboardLayout>
  );
};

export default WellbeingPillars;
