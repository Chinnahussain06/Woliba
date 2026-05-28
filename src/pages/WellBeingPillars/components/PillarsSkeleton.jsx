import React from "react";
import { Box, Skeleton } from "@mui/material";

export default function PillarsSkeleton() {
  return (
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
      {[...Array(9)].map((_, index) => (
        <Box
          key={index}
          sx={{
            p: "20px",
            borderRadius: "16px",
            border: "1px solid",
            borderColor: "#E2E8F0",
            backgroundColor: "#fff",
            display: "flex",
            alignItems: "center",
            gap: 2,
            minHeight: "120px",
          }}
        >
          {/* Checkbox Skeleton */}
          <Skeleton
            variant="rounded"
            width={32}
            height={32}
            sx={{
              borderRadius: "8px",
              flexShrink: 0,
            }}
          />

          <Box sx={{ flex: 1 }}>
            <Skeleton variant="text" width="65%" height={34} sx={{ mb: 0.5 }} />

            <Skeleton variant="text" width="90%" height={24} />

            <Skeleton variant="text" width="70%" height={24} />
          </Box>
        </Box>
      ))}
    </Box>
  );
}
