import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

// MUI
import {
  Box,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Chip,
  Divider,
  useTheme,
} from "@mui/material";

import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";

// Redux
import { useAppDispatch, useAppSelector } from "@/src/redux/hooks";
import { fetchInterests } from "@/src/redux/thunks/registrationThunks";
import { toggleInterest } from "@/src/redux/slices/registrationSlice";
import {
  selectInterests,
  selectInterestsStatus,
  selectSelectedInterests,
} from "@/src/redux/selectors/registrationSelectors";

// Components
import DashboardLayout from "@/src/layouts/DashboardLayout";
import DashboardNavbar from "@/src/layouts/DashboardNavbar";
import Footer from "@/src/layouts/Footer";

import MDButton from "@/src/components/MDButton";
import MDTypography from "@/src/components/MDTypography";
import MDFormCard from "@/src/components/MDFormCard";

// Hooks
import { useRegistrationTimer } from "@/src/hooks/useRegistrationTimer";
import InterestsSkeleton from "./components/InterestsSkeleton";

const WellnessSelector = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  useRegistrationTimer();

  const interests = useAppSelector(selectInterests);
  const status = useAppSelector(selectInterestsStatus);
  const selectedIds = useAppSelector(selectSelectedInterests);

  const isLoading = status === "loading";

  const [expanded, setExpanded] = useState(null);

  useEffect(() => {
    dispatch(fetchInterests());
  }, [dispatch]);

  useEffect(() => {
    if (!interests.length || expanded !== null) return;
    
    const first = interests[0]?.interest_type;
    setExpanded(first === "Other" ? "Other Sports" : first);
  }, [interests, expanded]);

  const groupedInterests = useMemo(() => {
    return interests.reduce((acc, item) => {
      const key =
        item.interest_type === "Other" ? "Other Sports" : item.interest_type;

      if (!acc[key]) acc[key] = [];
      acc[key].push(item);

      return acc;
    }, {});
  }, [interests]);

  const handleAccordionChange = (category) => (_, isExpanded) => {
    setExpanded(isExpanded ? category : false);
  };

  const handleBack = () => navigate(-1);

  const handleNext = () => {
    navigate("/register/wellbeing-pillars");
  };

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
          title="Select wellness interests (at least one required)"
          maxWidth={{xs: "100%", sm: "100%", md: "70%"}}
        >
          {isLoading ? (
            <InterestsSkeleton />
          ) : (
            Object.entries(groupedInterests).map(([category, items]) => {
              const isExpanded = expanded === category;

              return (
                <Accordion
                  key={category}
                  expanded={isExpanded}
                  onChange={handleAccordionChange(category)}
                  disableGutters
                  elevation={0}
                  sx={{
                    mb: 1,
                    bgcolor: "transparent",
                    "&:before": { display: "none" },
                  }}
                >
                  <AccordionSummary
                    expandIcon={
                      isExpanded ? (
                        <ArrowDropUpIcon sx={{ color: "primary.main" }} />
                      ) : (
                        <ArrowDropDownIcon sx={{ color: "primary.main" }} />
                      )
                    }
                    sx={{
                      px: 0,
                      minHeight: 48,
                    }}
                  >
                    <MDTypography
                      variant="subtitle1"
                      sx={{
                        color: "text.secondary",
                        fontWeight: 600,
                      }}
                    >
                      {category}
                    </MDTypography>
                  </AccordionSummary>

                  <AccordionDetails sx={{ px: 0, pt: 0, pb: 2 }}>
                    <Box
                      sx={{
                        display: "flex",
                        flexWrap: "wrap",
                        gap: 1,
                      }}
                    >
                      {items.map((item) => {
                        const isSelected = selectedIds.includes(item.id);

                        return (
                          <Chip
                            key={item.id}
                            label={item.name}
                            onClick={() => dispatch(toggleInterest(item.id))}
                            sx={{
                              height: 34,
                              borderRadius: "100px",
                              border: "1px solid",
                              borderColor: isSelected
                                ? "primary.main"
                                : "divider",

                              bgcolor: isSelected
                                ? "primary.main"
                                : "transparent",

                              color: isSelected
                                ? "primary.contrastText"
                                : "text.primary",

                              fontSize: "0.8rem",
                              fontWeight: 500,
                              cursor: "pointer",
                              transition: "0.15s ease",

                              "&:hover": {
                                borderColor: "primary.main",
                                bgcolor: isSelected
                                  ? "primary.dark"
                                  : "primary.light",
                              },

                              "& .MuiChip-label": {
                                px: 1.5,
                              },
                            }}
                          />
                        );
                      })}
                    </Box>
                  </AccordionDetails>
                </Accordion>
              );
            })
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
              disabled={!selectedIds.length}
              onClick={handleNext}
            >
              Next
            </MDButton>
          </Box>
        </MDFormCard>
      </Box>

      <Footer />
    </DashboardLayout>
  );
};

export default WellnessSelector;
