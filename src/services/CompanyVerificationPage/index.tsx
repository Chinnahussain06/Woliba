import React, { useState } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";

// MUI Core Components
import {
  Box,
  Paper,
  InputAdornment,
  IconButton,
  CircularProgress,
  Divider,
  Alert,
} from "@mui/material";

// Generic Brand Components
import MDTypography from "../../components/MDTypography";
import MDButton from "../../components/MDButton";
import MDLoadingButton from "../../components/MDLoadingButton";

// MUI Icons
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

import MDFormField from "../../components/MDFormField";
import DashboardLayout from "../../pages/dashboardLayout";

// Import API manager from centralized api folder
import apiMgr from "../../api/apiMgr";

// Import required custom asset
import loaderScreenGif from "../../assets/Loader scrren GIF.mp4";

export default function CompanyVerificationPage() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [apiError, setApiError] = useState("");

  const step1ValidationSchema = Yup.object().shape({
    companyName: Yup.string()
      .min(3, "Name must be at least 3 characters")
      .required("Company Name is required"),
    companyPassword: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Company Password is required"),
  });

  const handleStep1Submit = async (values: any) => {
    setIsLoading(true);
    setApiError("");
    try {
      const payload = {
        companyName: values.companyName,
        companyPassword: values.companyPassword,
      };

      const response = await apiMgr.verifyCompany(payload);

      // Handle custom API failure response structures gracefully
      if (response && (response.status === false || response.success === false)) {
        throw new Error(response.message || "Invalid Company Name or Password.");
      }

      // Persist in sessionStorage for user details verification step
      sessionStorage.setItem("registration_company_name", values.companyName);
      sessionStorage.setItem("registration_company_password", values.companyPassword);

      // Navigate to the next route
      navigate("/register/user-details-verification");
    } catch (error: any) {
      console.error("verifyCompany error:", error);
      const errorMsg =
        error.response?.data?.message ||
        error.message ||
        "Verification failed. Please check Company Name and Password.";
      setApiError(errorMsg);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <DashboardLayout>
      <Paper
        id="registration-card-container"
        elevation={0}
        sx={{
          width: "100%",
          maxWidth: "460px",
          p: { xs: 4, md: 5 },
          borderRadius: "24px",
          border: "1px solid rgba(226, 232, 240, 0.8)",
          backgroundColor: "rgba(255, 255, 255, 0.95)",
          backdropFilter: "blur(12px)",
          boxShadow: "0px 20px 50px rgba(26, 58, 95, 0.05)",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <MDTypography
          variant="h5"
          id="registration-main-heading"
          sx={{
            color: "#1E3A5F",
            fontWeight: 700,
            textAlign: "center",
            mb: 4,
            letterSpacing: "-0.025em",
          }}
        >
          Registration
        </MDTypography>

        {apiError && (
          <Alert
            severity="error"
            sx={{
              mb: 3,
              borderRadius: "12px",
              fontSize: "0.825rem",
              fontWeight: 500,
              backgroundColor: "rgba(254, 226, 226, 0.9)",
              color: "#991B1B",
              border: "1px solid rgba(239, 68, 68, 0.2)",
              "& .MuiAlert-icon": {
                color: "#EF4444",
              },
            }}
            onClose={() => setApiError("")}
          >
            {apiError}
          </Alert>
        )}

        <Formik
          initialValues={{
            companyName: sessionStorage.getItem("registration_company_name") || "",
            companyPassword: sessionStorage.getItem("registration_company_password") || "",
          }}
          validationSchema={step1ValidationSchema}
          onSubmit={handleStep1Submit}
          enableReinitialize
        >
          {({ isValid, dirty, values }: any) => {
            const canSubmit =
              isValid && (dirty || (values.companyName && values.companyPassword));

            return (
              <Form id="registration-formik-wrap-step1">
                <MDFormField
                  label="Company Name"
                  name="companyName"
                  placeholder="Enter Company Name"
                  required
                />

                <MDFormField
                  label="Company Password"
                  name="companyPassword"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter Company Password"
                  required
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          id="toggle-password-visibility"
                          onClick={() => setShowPassword(!showPassword)}
                          edge="end"
                          sx={{
                            color: "#D2686E",
                            opacity: 0.7,
                            "&:hover": { opacity: 1 },
                          }}
                        >
                          {showPassword ? <Visibility /> : <VisibilityOff />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />

                {/* Faint horizontal separator divider matching design theme */}
                <Divider sx={{ borderColor: "#F1F5F9", borderBottomWidth: 1, my: 3 }} />

                {/* Submit Action Button Row */}
                <Box
                  id="action-btn-row"
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                  }}
                >
                  <MDLoadingButton
                    type="submit"
                    variant="contained"
                    loading={isLoading}
                    disabled={!canSubmit}
                    id="registration-submit-button"
                    sx={{
                      width: "100%",
                      maxWidth: "190px",
                      py: 1.25,
                      px: 3,
                    }}
                  >
                    Next
                  </MDLoadingButton>
                </Box>
              </Form>
            );
          }}
        </Formik>
      </Paper>
    </DashboardLayout>
  );
}
