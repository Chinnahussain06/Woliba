import React from "react";
import { Box, CircularProgress } from "@mui/material";

export default function MDSectionLoader({ height = 200 }) {
  return (
    <Box
      sx={{
        minHeight: height,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <CircularProgress size={28} />
    </Box>
  );
}
