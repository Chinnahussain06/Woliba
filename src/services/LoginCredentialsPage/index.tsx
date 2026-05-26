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
  IconButton,
  InputAdornment,
  Checkbox,
  FormControlLabel,
} from "@mui/material";

// MUI Icons
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import CalendarToday from "@mui/icons-material/CalendarToday";
import ArrowBackIosNew from "@mui/icons-material/ArrowBackIosNew";
import CheckCircle from "@mui/icons-material/CheckCircle";

// Generic Brand Components
import MDTypography from "../../components/MDTypography";
import MDLoadingButton from "../../components/MDLoadingButton";
import MDButton from "../../components/MDButton";
import MDFormField from "../../components/MDFormField";
import DashboardLayout from "../../pages/dashboardLayout";

// Centralized API integration
import apiMgr from "../../api/apiMgr";

export default function LoginCredentialsPage() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [apiError, setApiError] = useState("");

  // Eyeball visibility toggles for password and confirmPassword fields
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Retrieve previous stage fields from SessionStorage to construct registration payload
  const companyName = sessionStorage.getItem("registration_company_name") || "";
  const companyPassword = sessionStorage.getItem("registration_company_password") || "";
  const emailId = sessionStorage.getItem("registration_email_id") || "";
  const firstName = sessionStorage.getItem("registration_first_name") || "";
  const lastName = sessionStorage.getItem("registration_last_name") || "";

  useEffect(() => {
    // Missing prerequisite registry details -> Redirect back to stage 1
    if (!emailId || !companyName) {
      navigate("/register/company-verification", { replace: true });
    }
  }, [emailId, companyName, navigate]);

  const loginCredentialsValidationSchema = Yup.object().shape({
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password")], "Passwords must match")
      .required("Confirm password is required"),
    birthday: Yup.string()
      .required("Birthday is required"),
    contactNumber: Yup.string()
      .required("Contact number is required"),
    agreeToTerms: Yup.boolean()
      .oneOf([true], "You must agree to Woliba's Terms of Service and Privacy Policy")
      .required("Agreement is required"),
  });

  const handleLoginCredentialsSubmit = async (values: any) => {
    setIsLoading(true);
    setApiError("");
    try {
      // Build unified registration payload
      const payload = {
        companyName,
        companyPassword,
        emailId,
        firstName,
        lastName,
        password: values.password,
        birthday: values.birthday,
        contactNumber: values.contactNumber,
      };

      const response = await apiMgr.userRegistration(payload);

      if (response && (response.status === false || response.success === false)) {
        throw new Error(response.message || "Registration failed. Please try again.");
      }

      setIsSuccess(true);
      // Clean up registration storage upon ultimate completion
      sessionStorage.clear();
    } catch (err: any) {
      console.error("userRegistration error:", err);
      setApiError(err.message || "An error occurred during registration. Please check your inputs.");
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
          maxWidth: "480px",
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
        {!isSuccess ? (
          <>
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
              Login Credentials
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
                password: "",
                confirmPassword: "",
                birthday: "",
                contactNumber: "",
                agreeToTerms: false,
              }}
              validationSchema={loginCredentialsValidationSchema}
              onSubmit={handleLoginCredentialsSubmit}
            >
              {({ isValid, dirty, values, setFieldValue }) => {
                const canSubmit = isValid && dirty;

                return (
                  <Form id="login-credentials-form">
                    <MDFormField
                      label="Password"
                      name="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter password"
                      required
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton
                              onClick={() => setShowPassword(!showPassword)}
                              edge="end"
                              id="toggle-password-visibility"
                              sx={{ color: "#9EA9BA" }}
                            >
                              {showPassword ? <VisibilityOff /> : <Visibility />}
                            </IconButton>
                          </InputAdornment>
                        ),
                      }}
                    />

                    <MDFormField
                      label="Confirm password"
                      name="confirmPassword"
                      type={showConfirmPassword ? "text" : "password"}
                      placeholder="Enter password"
                      required
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton
                              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                              edge="end"
                              id="toggle-confirm-password-visibility"
                              sx={{ color: "#9EA9BA" }}
                            >
                              {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                            </IconButton>
                          </InputAdornment>
                        ),
                      }}
                    />

                    <MDFormField
                      label="Birthday"
                      name="birthday"
                      placeholder="Select date of birth [MM/DD/YYYY]"
                      required
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <CalendarToday sx={{ color: "#D2686E", fontSize: "1.1rem" }} />
                          </InputAdornment>
                        ),
                      }}
                    />

                    <MDFormField
                      label="Contact number"
                      name="contactNumber"
                      placeholder="Enter contact number"
                      required
                    />

                    <Box sx={{ display: "flex", alignItems: "flex-start", gap: 0.5, mt: 1, mb: 3 }}>
                      <FormControlLabel
                        id="checkbox-wrapper-label"
                        control={
                          <Checkbox
                            id="terms-conditions-agree"
                            checked={values.agreeToTerms}
                            onChange={(e) => setFieldValue("agreeToTerms", e.target.checked)}
                            sx={{
                              p: 0.5,
                              mr: 0.5,
                              color: "#CBD5E1",
                              "&.Mui-checked": {
                                color: "#D2686E",
                              },
                            }}
                          />
                        }
                        label={
                          <MDTypography
                            variant="caption"
                            sx={{
                              color: "#64748B",
                              fontSize: "0.75rem",
                              lineHeight: 1.4,
                              display: "inline",
                              fontWeight: 500,
                            }}
                          >
                            I agree to Woliba's{" "}
                            <span style={{ color: "#D2686E", textDecoration: "underline", cursor: "pointer", fontWeight: 600 }}>
                              Terms of Service
                            </span>{" "}
                            and{" "}
                            <span style={{ color: "#D2686E", textDecoration: "underline", cursor: "pointer", fontWeight: 600 }}>
                              Privacy Policy
                            </span>
                            .
                          </MDTypography>
                        }
                        sx={{
                          margin: 0,
                          alignItems: "flex-start",
                        }}
                      />
                    </Box>

                    {/* Faint divider */}
                    <Divider sx={{ borderColor: "#F1F5F9", borderBottomWidth: 1, my: 3 }} />

                    {/* Buttons Footer Actions row matches design */}
                    <Box
                      id="action-btn-row"
                      sx={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        gap: 2,
                      }}
                    >
                      <MDButton
                        variant="outlined"
                        onClick={() => navigate("/register/otp-verification")}
                        sx={{
                          width: "120px",
                          py: 1.25,
                          borderColor: "#D2686E",
                          color: "#D2686E",
                          "&:hover": {
                            borderColor: "#B15156",
                            backgroundColor: "rgba(210, 104, 110, 0.04)",
                          },
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          gap: 1,
                        }}
                      >
                        <ArrowBackIosNew sx={{ fontSize: "0.75rem" }} />
                        Back
                      </MDButton>

                      <MDLoadingButton
                        type="submit"
                        variant="contained"
                        loading={isLoading}
                        disabled={!canSubmit}
                        sx={{
                          width: "140px",
                          py: 1.25,
                        }}
                      >
                        Next
                      </MDLoadingButton>
                    </Box>
                  </Form>
                );
              }}
            </Formik>
          </>
        ) : (
          /* Completion details card view on successful registration */
          <Box sx={{ textAlign: "center", py: 3 }}>
            <Box sx={{ mb: 2 }}>
              <CheckCircle sx={{ fontSize: "4.5rem", color: "#10B981" }} />
            </Box>
            <MDTypography
              variant="h5"
              sx={{ color: "#1E3A5F", fontWeight: 700, mb: 1 }}
            >
              Registration Complete!
            </MDTypography>
            <MDTypography
              variant="body2"
              sx={{ color: "#5A6E85", mb: 4, px: 2, lineHeight: 1.6 }}
            >
              Your account for <strong>{companyName}</strong> has been successfully created.
              Welcome to the Woliba Wellbeing ecosystem!
            </MDTypography>

            <Divider sx={{ mb: 3 }} />

            <MDButton
              variant="contained"
              onClick={() => {
                setIsSuccess(false);
                navigate("/register/company-verification");
              }}
              sx={{
                width: "100%",
                maxWidth: "200px",
                py: 1.25,
              }}
            >
              Go to Home page
            </MDButton>
          </Box>
        )}
      </Paper>
    </DashboardLayout>
  );
}
