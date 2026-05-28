import React from "react";
import { Alert } from "@mui/material";

 function MDAlert({ message, severity = "error", onClose }) {
  if (!message) return null;

  return (
    <Alert
      severity={severity}
      sx={{ mb: 3, borderRadius: "12px" }}
      onClose={onClose}
    >
      {message}
    </Alert>
  );
}

export default MDAlert;
