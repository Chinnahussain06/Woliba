import React from "react";
import { Box, Typography } from "@mui/material";

import videoSrc from "@/src/assets/images/Loader.mp4";

const MDLoader = ({ size = 80, text = "Loading ..." }) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <video
        autoPlay
        loop
        muted
        playsInline
        style={{
          width: size,
          height: size,
          objectFit: "cover",
          borderRadius: "50%",
        }}
      >
        <source src={videoSrc} type="video/mp4" />
      </video>
      {text && (
        <Typography
          sx={{
            color: "warning.main",
            mt: 1,
            textAlign: "center",
          }}
        >
          {text}
        </Typography>
      )}
    </Box>
  );
};

export default MDLoader;
