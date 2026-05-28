import React from "react";
import { Box, Skeleton } from "@mui/material";

const sections = [12, 0, 0, 0, 0, 0, 0];

export default function InterestsSkeleton() {
  return (
    <Box>
      {sections.map((chipsCount, sectionIndex) => (
        <Box
          key={sectionIndex}
          sx={{
            mb: 5,
          }}
        >
          {/* Header */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              mb: 2,
            }}
          >
            <Skeleton variant="text" width={180} height={40} />

            <Skeleton variant="circular" width={20} height={20} />
          </Box>

          {chipsCount > 0 && (
            <Box
              sx={{
                display: "flex",
                flexWrap: "wrap",
                gap: "12px",
              }}
            >
              {[...Array(chipsCount)].map((_, chipIndex) => (
                <Skeleton
                  key={chipIndex}
                  variant="rounded"
                  width={100}
                  height={35}
                  sx={{
                    borderRadius: "999px",
                  }}
                />
              ))}
            </Box>
          )}
        </Box>
      ))}
    </Box>
  );
}
