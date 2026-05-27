import React, { useEffect, useMemo, useState } from "react";
import {
  Box,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  CircularProgress,
  Chip,
} from "@mui/material";

import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";

// Redux
import { useAppDispatch, useAppSelector } from "../../redux/hooks";

import { fetchInterests } from "../../redux/thunks/lookupThunks";

import { toggleInterest } from "../../redux/slices/interestSlice";

import {
  selectAllInterests,
  selectInterestsStatus,
  selectSelectedInterests,
} from "../../redux/selectors/interestSelectors";
import { useNavigate } from "react-router-dom";
import DashboardLayout from "@/src/Layouts/dashboardLayout";
import MDButton from "@/src/components/MDButton";
import MDTypography from "@/src/components/MDTypography";

const ASSET_BASE_URL = "https://api.woliba.io/storage/";
const FALLBACK_ICON = "https://cdn-icons-png.flaticon.com/512/3048/3048398.png";

const WellnessSelector = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const interests = useAppSelector(selectAllInterests);
  const status = useAppSelector(selectInterestsStatus);
  const selectedIds = useAppSelector(selectSelectedInterests);

  const isLoading = status === "loading";

  const [expanded, setExpanded] = useState(null);

  // Fetch interests once
  useEffect(() => {
    dispatch(fetchInterests());
  }, [dispatch]);

  // Auto expand first category
  useEffect(() => {
    if (interests.length > 0) {
      const firstCategory =
        interests[0]?.interest_type === "Other"
          ? "Other Sports"
          : interests[0]?.interest_type;

      setExpanded(firstCategory);
    }
  }, [interests]);

  // Group interests
  const groupedInterests = useMemo(() => {
    const map = {};

    const safeInterests = Array.isArray(interests) ? interests : [];

    safeInterests.forEach((item) => {
      const type =
        item.interest_type === "Other" ? "Other Sports" : item.interest_type;

      if (!map[type]) map[type] = [];
      map[type].push(item);
    });

    return map;
  }, [interests]);

  const handleBack = () => {
    navigate(-1);
  };

  const handleNext = () => {
    navigate("//wellbeing-pillars");
  };

  return (
    <DashboardLayout>
      <Box
        sx={{
          width: "100%",
          maxWidth: "1000px",
          bgcolor: "white",
          borderRadius: "20px",
          boxShadow: "0px 10px 40px rgba(0, 0, 0, 0.04)",
          overflow: "hidden",
          minHeight: "500px",
          display: "flex",
          flexDirection: "column",
        }}
      >
        {/* Header */}
        <Box sx={{ p: 4, textAlign: "center" }}>
          <MDTypography variant="h6" sx={{ color: "#1E3A5F", fontWeight: 700 }}>
            Select all wellness interests that apply — at least one is required.
          </MDTypography>
        </Box>

        {/* Body */}
        <Box
          sx={{
            flex: 1,
            px: { xs: 2, md: 5 },
            pb: 4,
            overflowY: "auto",
          }}
        >
          {isLoading ? (
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                py: 10,
              }}
            >
              <CircularProgress sx={{ color: "#D2686E" }} />
            </Box>
          ) : (
            Object.entries(groupedInterests).map(([category, items]) => (
              <Accordion
                key={category}
                expanded={expanded === category}
                onChange={(e, isExpanded) =>
                  setExpanded(isExpanded ? category : false)
                }
                disableGutters
                elevation={0}
                sx={{ "&:before": { display: "none" } }}
              >
                {/* Category header */}
                <AccordionSummary
                  expandIcon={<ArrowDropDownIcon sx={{ color: "#D2686E" }} />}
                >
                  <MDTypography
                    sx={{
                      fontSize: "0.9rem",
                      color: "#8292A2",
                      fontWeight: 500,
                    }}
                  >
                    {category}
                  </MDTypography>
                </AccordionSummary>

                {/* Chips */}
                <AccordionDetails>
                  <Box
                    sx={{
                      display: "flex",
                      gap: 1.5,
                      overflowX: "auto",
                      pb: 1,
                    }}
                  >
                    {items.map((item) => {
                      const isSelected = selectedIds.includes(item.id);

                      return (
                        <Chip
                          key={item.id}
                          label={item.name}
                          onClick={() => dispatch(toggleInterest(item.id))}
                          avatar={
                            <Box
                              component="img"
                              src={`${ASSET_BASE_URL}${
                                isSelected
                                  ? item.interest_white_icon
                                  : item.interest_color_icon
                              }`}
                              sx={{
                                width: "16px !important",
                                height: "16px !important",
                              }}
                              onError={(e) => {
                                e.target.src = FALLBACK_ICON;
                              }}
                            />
                          }
                          sx={{
                            height: "32px",
                            borderRadius: "100px",
                            flexShrink: 0,
                            bgcolor: isSelected
                              ? "#D2686E !important"
                              : "transparent",
                            border: `1px solid ${
                              isSelected ? "#D2686E" : "#EEF1F4"
                            }`,
                            color: isSelected ? "white !important" : "#1E3A5F",
                            cursor: "pointer",
                          }}
                        />
                      );
                    })}
                  </Box>
                </AccordionDetails>
              </Accordion>
            ))
          )}
        </Box>

        <Box
          sx={{
            p: 4,
            borderTop: "1px solid #F8F9FA",
            display: "flex",
            justifyContent: "center",
            gap: 2,
          }}
        >
          <MDButton
            variant="outlined"
            startIcon={<ArrowBackIosNewIcon />}
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
      </Box>
    </DashboardLayout>
  );
};

export default WellnessSelector;
