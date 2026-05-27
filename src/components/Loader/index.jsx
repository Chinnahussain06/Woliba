import React from "react";
import { CircularProgress, Grid, Typography } from "@mui/material";

const Loader = ({ size = 80, text = "Loading ..." }) => {
  const videoSrc = require("../../assets/loader_screen.mp4");

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

export default Loader;
