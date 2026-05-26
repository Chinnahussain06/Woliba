import React, { useState, useEffect, useMemo } from "react";
import {
  Box,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  CircularProgress,
  Chip,
} from "@mui/material";
import DashboardLayout from "../../pages/dashboardLayout";
import MDTypography from "../../components/MDTypography";
import MDButton from "../../components/MDButton";
import apiMgr from "@/src/api/apiMgr";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";

const ASSET_BASE_URL = "https://api.woliba.io/storage/";
const FALLBACK_ICON = "https://cdn-icons-png.flaticon.com/512/3048/3048398.png";

const WellnessSelector = () => {
  const [interests, setInterests] = useState([]);
  const [selectedIds, setSelectedIds] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [expanded, setExpanded] = useState(null);

  useEffect(() => {
    const fetchInterests = async () => {
      try {
        setIsLoading(true);
        const response = await apiMgr.viewWellnessInterest();
        const dataArray = response?.data?.[0] || response?.[0] || [];
        setInterests(dataArray);
        if (dataArray.length > 0)
          setExpanded(
            dataArray[0].interest_type === "Other"
              ? "Other Sports"
              : dataArray[0].interest_type,
          );
      } catch (err) {
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchInterests();
  }, []);

  const groupedInterests = useMemo(() => {
    const map = {};
    interests.forEach((item) => {
      let type =
        item.interest_type === "Other" ? "Other Sports" : item.interest_type;
      if (!map[type]) map[type] = [];
      map[type].push(item);
    });
    return map;
  }, [interests]);

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
        <Box sx={{ p: 4, textAlign: "center" }}>
          <MDTypography variant="h6" sx={{ color: "#1E3A5F", fontWeight: 700 }}>
            Select all wellness interests that apply — at least one is required.
          </MDTypography>
        </Box>

        <Box sx={{ flex: 1, px: { xs: 2, md: 5 }, pb: 4, overflowY: "auto" }}>
          {isLoading ? (
            <Box sx={{ display: "flex", justifyContent: "center", py: 10 }}>
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
                sx={{
                  "&:before": { display: "none" },
                }}
              >
                <AccordionSummary
                  expandIcon={
                    <ArrowDropDownIcon
                      fontSize="medium"
                      sx={{
                        color: "#D2686E",
                      }}
                    />
                  }
                  sx={{ px: 1 }}
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

                <AccordionDetails sx={{ px: 0, pb: 3 }}>
                  {/* SINGLE ROW HORIZONTAL SCROLLER */}
                  <Box
                    sx={{
                      display: "flex",
                      gap: 1.5,
                      overflowX: "auto",
                      pb: 1,
                      px: 1,
                      "&::-webkit-scrollbar": { height: "4px" },
                      "&::-webkit-scrollbar-thumb": {
                        bgcolor: "#eee",
                        borderRadius: "10px",
                      },
                    }}
                  >
                    {items.map((item) => {
                      const isSelected = selectedIds.includes(item.id);
                      return (
                        <Chip
                          key={item.id}
                          label={item.name}
                          onClick={() =>
                            setSelectedIds((prev) =>
                              isSelected
                                ? prev.filter((i) => i !== item.id)
                                : [...prev, item.id],
                            )
                          }
                          avatar={
                            <Box
                              component="img"
                              // Switches to white icon when selected
                              src={`${ASSET_BASE_URL}${isSelected ? item.interest_white_icon : item.interest_color_icon}`}
                              sx={{
                                width: "16px !important",
                                height: "16px !important",
                                borderRadius: "0 !important",
                              }}
                              onError={(e) => {
                                e.target.src = FALLBACK_ICON;
                              }}
                            />
                          }
                          sx={{
                            height: "32px",
                            borderRadius: "100px",
                            flexShrink: 0, // Prevents chips from squishing
                            // SOLID RED STYLE ON SELECTION
                            bgcolor: isSelected
                              ? "#D2686E !important"
                              : "transparent",
                            border: `1px solid ${isSelected ? "#D2686E" : "#EEF1F4"}`,
                            color: isSelected ? "white !important" : "#1E3A5F",
                            "& .MuiChip-label": {
                              fontSize: "0.85rem",
                              fontWeight: 500,
                              px: 2,
                            },
                            "&:hover": {
                              bgcolor: isSelected
                                ? "#C05258 !important"
                                : "#F8F9FA",
                            },
                            transition: "all 0.2s ease",
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
            sx={{ borderColor: "#D2686E", color: "#D2686E", px: 6 }}
          >
            ‹ Back
          </MDButton>
          <MDButton
            variant="contained"
            disabled={selectedIds.length === 0}
            sx={{
              bgcolor:
                selectedIds.length > 0
                  ? "#D2686E !important"
                  : "#E9ECEF !important",
              color: "white !important",
              px: 6,
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
