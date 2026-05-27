import React from "react";
import { Grid, Typography } from "@mui/material";

import videoSrc from "@/src/assets/images/Loader.mp4";

const MDLoader = ({ size = 80, text = "Loading ..." }) => {
  return (
    <Grid
      container
      direction="column"
      justifyContent="center"
      alignItems="center"
      sx={{ height: "100vh" }}
    >
      <video
        autoPlay
        loop
        muted
        playsInline
        style={{
          width: size,
          height: size,
          objectFit: "contain",
        }}
      >
        <source src={videoSrc} type="video/mp4" />
      </video>

      {text && (
        <Typography sx={{ color: "warning.main", mt: 1 }}>{text}</Typography>
      )}
    </Grid>
  );
};

export default MDLoader;
