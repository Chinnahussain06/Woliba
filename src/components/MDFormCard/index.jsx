import { Box, Paper } from "@mui/material";
import MDTypography from "@/src/components/MDTypography";

function MDFormCard({ title, subtitle, children, maxWidth = "460px" }) {
  return (
    <Paper
      elevation={0}
      sx={{
        width: "100%",
        maxWidth,
        p: { xs: 4, md: 5 },
        borderRadius: "24px",
        border: "1px solid rgba(226, 232, 240, 0.8)",
        backgroundColor: "rgba(255,255,255,0.95)",
        backdropFilter: "blur(12px)",
        boxShadow: "0px 20px 50px rgba(26,58,95,0.05)",
      }}
    >
      {(title || subtitle) && (
        <Box sx={{ textAlign: "center", mb: 4 }}>
          {title && (
            <MDTypography
              variant="h5"
              sx={{ color: "#1E3A5F", fontWeight: 700 }}
            >
              {title}
            </MDTypography>
          )}
          {subtitle && (
            <MDTypography variant="body2" sx={{ color: "#64748B", mt: 1 }}>
              {subtitle}
            </MDTypography>
          )}
        </Box>
      )}

      {children}
    </Paper>
  );
}

export default MDFormCard;
