import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

// MUI
import {
  Box,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  CircularProgress,
  Chip,
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
import DashboardLayout from "@/src/Layouts/dashboardLayout";
import MDButton from "@/src/components/MDButton";
import MDTypography from "@/src/components/MDTypography";

const WellnessSelector = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const theme = useTheme();

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

  const handleAccordionChange = (category) => (e, isExpanded) => {
    setExpanded(isExpanded ? category : false);
  };

  const handleBack = () => navigate(-1);
  const handleNext = () => navigate("/register/wellbeing-pillars");

  return (
    <DashboardLayout>
      <Box
        sx={{
          width: "100%",
          maxWidth: "1000px",
          bgcolor: theme.palette.background.paper,
          borderRadius: "20px",
          boxShadow: "0px 10px 40px rgba(0, 0, 0, 0.04)",
          overflow: "hidden",
          minHeight: "500px",
          display: "flex",
          flexDirection: "column",
          mx: "auto",
        }}
      >
        <Box sx={{ p: 4, textAlign: "center" }}>
          <MDTypography
            variant="h6"
            sx={{ color: theme.palette.secondary.main, fontWeight: 700 }}
          >
            Select all wellness interests that apply — at least one is required.
          </MDTypography>
        </Box>

        <Box
          sx={{
            flex: 1,
            px: { xs: 2, md: 5 },
            pb: 4,
            overflowY: "auto",
          }}
        >
          {isLoading ? (
            <Box sx={{ display: "flex", justifyContent: "center", py: 10 }}>
              <CircularProgress sx={{ color: theme.palette.primary.main }} />
            </Box>
          ) : (
            Object.entries(groupedInterests).map(
              ([category, items], index, arr) => {
                const isExpanded = expanded === category;

                return (
                  <Accordion
                    key={category}
                    expanded={isExpanded}
                    onChange={handleAccordionChange(category)}
                    disableGutters
                    elevation={0}
                    sx={{
                      "&:before": { display: "none" },
                    }}
                  >
                    <AccordionSummary
                      expandIcon={
                        isExpanded ? (
                          <ArrowDropUpIcon
                            fontSize="medium"
                            sx={{
                              color: theme.palette.primary.main,
                            }}
                          />
                        ) : (
                          <ArrowDropDownIcon
                            fontSize="medium"
                            sx={{
                              color: theme.palette.primary.main,
                            }}
                          />
                        )
                      }
                      sx={{ px: 0, minHeight: "48px" }}
                    >
                      <MDTypography
                        variant="subtitle1"
                        sx={{
                          color: theme.palette.text.secondary,
                          fontWeight: 500,
                        }}
                      >
                        {category}
                      </MDTypography>
                    </AccordionSummary>

                    <AccordionDetails sx={{ px: 0, pt: 0, pb: 2 }}>
                      <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
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
              },
            )
          )}
        </Box>

        <Box
          sx={{
            p: 4,
            borderTop: `1px solid ${theme.palette.divider}`,
            display: "flex",
            justifyContent: "center",
            gap: 2,
          }}
        >
          <MDButton
            variant="outlined"
            startIcon={<ArrowBackIosNewIcon sx={{ fontSize: "0.8rem" }} />}
            onClick={handleBack}
            sx={{ width: "140px", py: 1.25 }}
          >
            Back
          </MDButton>

          <MDButton
            variant="contained"
            disabled={selectedIds.length === 0}
            onClick={handleNext}
            sx={{ width: "140px", py: 1.25 }}
          >
            Next
          </MDButton>
        </Box>
      </Box>
    </DashboardLayout>
  );
};

export default WellnessSelector;
