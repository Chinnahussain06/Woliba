import React, { useState, useEffect } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";

// MUI Core Components
import {
  Box,
  Paper,
  Divider,
  Alert,
} from "@mui/material";

// Generic Brand Components
import MDTypography from "../../components/MDTypography";
import MDLoadingButton from "../../components/MDLoadingButton";
import MDFormField from "../../components/MDFormField";
import DashboardLayout from "../../pages/dashboardLayout";

// Import API manager from centralized api folder
import apiMgr from "../../api/apiMgr";

export default function UserDetailsVerificationPage() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const [apiError, setApiError] = useState("");
  const [companyName, setCompanyName] = useState("");

  useEffect(() => {
    const storedName = sessionStorage.getItem("registration_company_name");
    if (!storedName) {
      // Missing required company info -> Redirect back to stage 1
      navigate("/register/company-verification", { replace: true });
    } else {
      setCompanyName(storedName);
    }
  }, [navigate]);

  const userDetailsValidationSchema = Yup.object().shape({
    emailId: Yup.string()
      .email("Please refer to a valid email format")
      .required("Email ID is required"),
    firstName: Yup.string().required("First name is required"),
    lastName: Yup.string().required("Last name is required"),
  });

  const handleUserDetailsSubmit = async (values: any) => {
    setIsLoading(true);
    setApiError("");
    try {
      const payload = {
        emailId: values.emailId,
        firstName: values.firstName,
        lastName: values.lastName,
        companyName: companyName,
      };

      const response = await apiMgr.saveUserDetails(payload);

      // Handle custom API failure response structures gracefully
      if (response && (response.status === false || response.success === false)) {
        throw new Error(response.message || "Failed to save user details.");
      }

      // Save user details for OTP page and the final step
      sessionStorage.setItem("registration_email_id", values.emailId);
      sessionStorage.setItem("registration_first_name", values.firstName);
      sessionStorage.setItem("registration_last_name", values.lastName);

      // Navigate to OTP verification page
      navigate("/register/otp-verification");
    } catch (error: any) {
      console.error("saveUserDetails error:", error);
      const errorMsg =
        error.response?.data?.message ||
        error.message ||
        "Failed to verify details. Please try again.";
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
            emailId: "",
            firstName: "",
            lastName: "",
            companyName: companyName,
          }}
          validationSchema={userDetailsValidationSchema}
          onSubmit={handleUserDetailsSubmit}
          enableReinitialize
        >
          {({ isValid, dirty, values }: any) => {
            const canSubmit =
              isValid &&
              (dirty || (values.emailId && values.firstName && values.lastName));

            return (
              <Form id="registration-formik-wrap">
                <MDFormField
                  label="Email ID"
                  name="emailId"
                  placeholder="Enter email id"
                  required
                />

                <MDFormField
                  label="First name"
                  name="firstName"
                  placeholder="Enter First name"
                  required
                />

                <MDFormField
                  label="Last name"
                  name="lastName"
                  placeholder="Enter Last name"
                  required
                />

                <MDFormField
                  label="Company name"
                  name="companyName"
                  disabled={true}
                  value={companyName}
                  required
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
                    Verify email
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
