import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

// MUI
import {
  Box,
  Accordion,
  AccordionSummary,
  AccordionDetails, Chip,
  Divider,
  useTheme
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
import DashboardLayout from "@/src/LayoutsTemp/DashboardLayout";
import DashboardNavbar from "@/src/LayoutsTemp/DashboardNavbar";
import Footer from "@/src/LayoutsTemp/Footer";

//components
import MDButton from "@/src/components/MDButton";
import MDTypography from "@/src/components/MDTypography";
import MDFormCard from "@/src/components/MDFormCard";

//hooks
import { useRegistrationTimer } from "@/src/hooks/useRegistrationTimer";
import InterestsSkeleton from "./components/InterestsSkeleton";

const WellnessSelector = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const theme = useTheme();

  useRegistrationTimer();

  const interests = useAppSelector(selectInterests);
  const status = useAppSelector(selectInterestsStatus);
  const selectedIds = useAppSelector(selectSelectedInterests);

  const [expanded, setExpanded] = useState(null);

  const isLoading = status === "loading";

  useEffect(() => {
    dispatch(fetchInterests());
  }, [dispatch]);

  useEffect(() => {
    if (interests.length > 0 && expanded === null) {
      const firstCategory =
        interests[0]?.interest_type === "Other"
          ? "Other Sports"
          : interests[0]?.interest_type;

      setExpanded(firstCategory);
    }
  }, [interests, expanded]);

  const groupedInterests = useMemo(() => {
    const map = {};

    interests.forEach((item) => {
      const type =
        item.interest_type === "Other" ? "Other Sports" : item.interest_type;

      if (!map[type]) map[type] = [];

      map[type].push(item);
    });

    return map;
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
          title="Select all wellness interests that apply — at least one is
              required."
          maxWidth="70%"
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
                    "&:before": {
                      display: "none",
                    },
                  }}
                >
                  <AccordionSummary
                    expandIcon={
                      isExpanded ? (
                        <ArrowDropUpIcon
                          sx={{
                            color: theme.palette.primary.main,
                          }}
                        />
                      ) : (
                        <ArrowDropDownIcon
                          sx={{
                            color: theme.palette.primary.main,
                          }}
                        />
                      )
                    }
                    sx={{
                      px: 0,
                      minHeight: "48px",
                    }}
                  >
                    <MDTypography
                      variant="subtitle1"
                      sx={{
                        color: theme.palette.text.secondary,
                        fontWeight: 600,
                      }}
                    >
                      {category}
                    </MDTypography>
                  </AccordionSummary>

                  <AccordionDetails
                    sx={{
                      px: 0,
                      pt: 0,
                      pb: 2,
                    }}
                  >
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
                              height: "34px",
                              borderRadius: "100px",
                              border: "1px solid",
                              borderColor: isSelected
                                ? theme.palette.primary.main
                                : theme.palette.divider,

                              bgcolor: isSelected
                                ? `${theme.palette.primary.main} !important`
                                : "transparent",

                              color: isSelected
                                ? `${theme.palette.primary.contrastText} !important`
                                : theme.palette.text.primary,

                              cursor: "pointer",
                              fontSize: "0.8rem",
                              fontWeight: 500,
                              transition: "all 0.15s ease",

                              "&:hover": {
                                borderColor: theme.palette.primary.main,

                                bgcolor: isSelected
                                  ? `${theme.palette.primary.dark} !important`
                                  : `${theme.palette.primary.main}12 !important`,
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
              startIcon={<ArrowBackIosNewIcon sx={{ fontSize: "0.8rem" }} />}
              onClick={handleBack}
              sx={{
                width: "140px",
                py: 1.25,
              }}
            >
              Back
            </MDButton>

            <MDButton
              variant="contained"
              disabled={selectedIds.length === 0}
              onClick={handleNext}
              sx={{
                width: "140px",
                py: 1.25,
              }}
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
