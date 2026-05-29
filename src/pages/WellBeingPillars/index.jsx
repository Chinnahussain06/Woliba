import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

// MUI
import { Box, Divider, useTheme } from "@mui/material";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";

// Layout
import DashboardLayout from "@/src/layouts/DashboardLayout";
import DashboardNavbar from "@/src/layouts/DashboardNavbar";
import Footer from "@/src/layouts/Footer";

// Components
import MDFormCard from "@/src/components/MDFormCard";
import MDTypography from "@/src/components/MDTypography";
import MDButton from "@/src/components/MDButton";
import MDAlert from "@/src/components/MDAlert";
import MDLoader from "@/src/components/MDLoader";

// Hooks
import { useRegistrationTimer } from "@/src/hooks/useRegistrationTimer";

// Redux
import { useAppDispatch, useAppSelector } from "@/src/redux/hooks";
import {
  fetchPillars,
  submitRegistration,
} from "@/src/redux/thunks/registrationThunks";
import { togglePillar, clearError } from "@/src/redux/slices/registrationSlice";
import {
  selectPillars,
  selectPillarsLoading,
  selectSelectedPillars,
  selectRegistrationPayload,
  selectError,
} from "@/src/redux/selectors/registrationSelectors";

// Skeleton
import PillarsSkeleton from "./components/PillarsSkeleton";

const WellbeingPillars = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const theme = useTheme();

  useRegistrationTimer();

  const [isSubmitting, setIsSubmitting] = useState(false);

  const pillars = useAppSelector(selectPillars) || [];
  const loading = useAppSelector(selectPillarsLoading);
  const apiError = useAppSelector(selectError);

  const selectedIds = useAppSelector(selectSelectedPillars);
  const payload = useAppSelector(selectRegistrationPayload);

  useEffect(() => {
    dispatch(fetchPillars(1));
  }, [dispatch]);

  const handleSelect = (id) => {
    dispatch(togglePillar(id));
  };

  const handleBack = () => {
    navigate(-1);
  };

  const handleSubmit = async () => {
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
          flex: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          px: 2,
          py: 4,
        }}
      >
        <MDFormCard
          title="Select 3 well-being pillars you want to focus on"
          maxWidth={{ xs: "100%", sm: "100%", md: "70%" }}
        >
          <MDAlert message={apiError} onClose={() => dispatch(clearError())} />

          {loading ? (
            <PillarsSkeleton />
          ) : (
            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: {
                  xs: "1fr",
                  sm: "repeat(2, 1fr)",
                  md: "repeat(3, 1fr)",
                },
                gap: 1.5,
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
                      p: "20px 16px",
                      borderRadius: "12px",
                      border: "1.5px solid",
                      borderColor: isSelected ? "primary.main" : "divider",

                      bgcolor: "background.paper",
                      cursor: "pointer",

                      display: "flex",
                      alignItems: "center",
                      gap: 1.5,

                      transition: "0.15s ease",

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
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",

                        border: "1.5px solid",
                        borderColor: isSelected ? "primary.main" : "divider",

                        bgcolor: isSelected ? "primary.main" : "transparent",

                        color: isSelected
                          ? "primary.contrastText"
                          : "transparent",

                        fontWeight: 700,
                        fontSize: "0.8rem",
                      }}
                    >
                      {isSelected ? rank : ""}
                    </Box>

                    <Box sx={{ flex: 1 }}>
                      <MDTypography
                        variant="body1"
                        sx={{
                          color: "secondary.main",
                          fontWeight: 500,
                          lineHeight: 1.3,
                        }}
                      >
                        {item.pillar_title}
                      </MDTypography>

                      <MDTypography
                        variant="body2"
                        sx={{
                          color: "text.secondary",
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
              startIcon={<ArrowBackIosNewIcon sx={{ fontSize: 14 }} />}
              onClick={handleBack}
            >
              Back
            </MDButton>

            <MDButton
              variant="contained"
              disabled={selectedIds.length !== 3}
              onClick={handleSubmit}
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
