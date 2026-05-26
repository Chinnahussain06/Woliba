import { useState, useEffect } from "react";
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
import ArrowBackIosNew from "@mui/icons-material/ArrowBackIosNew";
import CheckCircle from "@mui/icons-material/CheckCircle";

// API
import apiMgr from "../../api/apiMgr";

// Components
import MDButton from "../../components/MDButton";
import MDFormField from "../../components/MDFormField";
import MDLoadingButton from "../../components/MDLoadingButton";
import MDTypography from "../../components/MDTypography";
import DashboardLayout from "../../pages/dashboardLayout";
import MDDateTimePicker from "@/src/components/DateTimePicker";

export default function LoginCredentialsPage() {
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [apiError, setApiError] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Session Storage Data
  const companyName = sessionStorage.getItem("registration_company_name") || "";

  const companyPassword =
    sessionStorage.getItem("registration_company_password") || "";

  const emailId = sessionStorage.getItem("registration_email_id") || "";

  const firstName = sessionStorage.getItem("registration_first_name") || "";

  const lastName = sessionStorage.getItem("registration_last_name") || "";

  // Redirect if previous steps are missing
  useEffect(() => {
    if (!emailId || !companyName) {
      navigate("/register/company-verification", {
        replace: true,
      });
    }
  }, [emailId, companyName, navigate]);

  // Validation
  const loginCredentialsValidationSchema = Yup.object({
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),

    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password")], "Passwords must match")
      .required("Confirm password is required"),

    birthday: Yup.number().required("Birthday is required"),

    contactNumber: Yup.string()
      .matches(/^[0-9]{10}$/, "Enter valid 10 digit mobile number")
      .required("Contact number is required"),

    agreeToTerms: Yup.boolean()
      .oneOf([true], "You must agree to Terms and Privacy Policy")
      .required("Agreement is required"),
  });

  // Submit
  const handleLoginCredentialsSubmit = async (values) => {
    setIsLoading(true);
    setApiError("");

    try {
      const payload = {
        companyName,
        companyPassword,
        emailId,
        firstName,
        lastName,

        password: values.password,

        birthday: values.birthday
          ? new Date(values.birthday * 1000).toISOString().split("T")[0]
          : "",

        contactNumber: values.contactNumber,
      };

      const response = await apiMgr.userRegistration(payload);

      if (
        response &&
        (response.status === false || response.success === false)
      ) {
        throw new Error(
          response.message || "Registration failed. Please try again.",
        );
      }

      setIsSuccess(true);

      // Remove only registration-related data
      [
        "registration_company_name",
        "registration_company_password",
        "registration_email_id",
        "registration_first_name",
        "registration_last_name",
      ].forEach((key) => sessionStorage.removeItem(key));
    } catch (err) {
      console.error("userRegistration error:", err);

      setApiError(
        err?.response?.data?.message ||
          err?.message ||
          "An error occurred during registration.",
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <DashboardLayout>
      <Paper
        elevation={0}
        sx={{
          width: "100%",
          maxWidth: "480px",
          p: { xs: 4, md: 5 },
          borderRadius: "24px",
          border: "1px solid rgba(226, 232, 240, 0.8)",
          backgroundColor: "rgba(255,255,255,0.95)",
          backdropFilter: "blur(12px)",
          boxShadow: "0px 20px 50px rgba(26,58,95,0.05)",
          display: "flex",
          flexDirection: "column",
        }}
      >
        {!isSuccess ? (
          <>
            <MDTypography
              variant="h5"
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
                onClose={() => setApiError("")}
                sx={{
                  mb: 3,
                  borderRadius: "12px",
                  fontSize: "0.825rem",
                  fontWeight: 500,
                }}
              >
                {apiError}
              </Alert>
            )}

            <Formik
              initialValues={{
                password: "",
                confirmPassword: "",
                birthday: null,
                contactNumber: "",
                agreeToTerms: false,
              }}
              validationSchema={loginCredentialsValidationSchema}
              onSubmit={handleLoginCredentialsSubmit}
            >
              {({ isValid, values, setFieldValue }) => {
                const canSubmit =
                  isValid &&
                  values.password &&
                  values.confirmPassword &&
                  values.birthday &&
                  values.contactNumber &&
                  values.agreeToTerms;

                return (
                  <Form>
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
                              edge="end"
                              onClick={() => setShowPassword(!showPassword)}
                              sx={{
                                color: "#9EA9BA",
                              }}
                            >
                              {showPassword ? (
                                <VisibilityOff />
                              ) : (
                                <Visibility />
                              )}
                            </IconButton>
                          </InputAdornment>
                        ),
                      }}
                    />

                    <MDFormField
                      label="Confirm Password"
                      name="confirmPassword"
                      type={showConfirmPassword ? "text" : "password"}
                      placeholder="Confirm password"
                      required
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton
                              edge="end"
                              onClick={() =>
                                setShowConfirmPassword(!showConfirmPassword)
                              }
                              sx={{
                                color: "#9EA9BA",
                              }}
                            >
                              {showConfirmPassword ? (
                                <VisibilityOff />
                              ) : (
                                <Visibility />
                              )}
                            </IconButton>
                          </InputAdornment>
                        ),
                      }}
                    />

                    <MDDateTimePicker
                      label="Birthday"
                      name="birthday"
                      seconds={values.birthday}
                      onChange={(value) => {
                        setFieldValue("birthday", value);
                      }}
                    />

                    <MDFormField
                      label="Contact Number"
                      name="contactNumber"
                      placeholder="Enter contact number"
                      required
                    />

                    <MDFormField
                      label="Work Anniversary"
                      name="workAnniversary"
                      placeholder="Enter work anniversary"
                      required
                    />

                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "flex-start",
                        mt: 1,
                        mb: 3,
                      }}
                    >
                      <FormControlLabel
                        sx={{
                          margin: 0,
                          alignItems: "flex-start",
                        }}
                        control={
                          <Checkbox
                            checked={values.agreeToTerms}
                            onChange={(e) =>
                              setFieldValue("agreeToTerms", e.target.checked)
                            }
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
                              fontWeight: 500,
                            }}
                          >
                            I agree to the{" "}
                            <span
                              style={{
                                color: "#D2686E",
                                textDecoration: "underline",
                                cursor: "pointer",
                                fontWeight: 600,
                              }}
                            >
                              Terms of Service
                            </span>{" "}
                            and{" "}
                            <span
                              style={{
                                color: "#D2686E",
                                textDecoration: "underline",
                                cursor: "pointer",
                                fontWeight: 600,
                              }}
                            >
                              Privacy Policy
                            </span>
                            .
                          </MDTypography>
                        }
                      />
                    </Box>

                    <Divider
                      sx={{
                        borderColor: "#F1F5F9",
                        my: 3,
                      }}
                    />

                    {/* Buttons */}
                    <Box
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
                            backgroundColor: "rgba(210,104,110,0.04)",
                          },

                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          gap: 1,
                        }}
                      >
                        <ArrowBackIosNew
                          sx={{
                            fontSize: "0.75rem",
                          }}
                        />
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
                        Register
                      </MDLoadingButton>
                    </Box>
                  </Form>
                );
              }}
            </Formik>
          </>
        ) : (
          <Box
            sx={{
              textAlign: "center",
              py: 3,
            }}
          >
            <Box sx={{ mb: 2 }}>
              <CheckCircle
                sx={{
                  fontSize: "4.5rem",
                  color: "#10B981",
                }}
              />
            </Box>

            <MDTypography
              variant="h5"
              sx={{
                color: "#1E3A5F",
                fontWeight: 700,
                mb: 1,
              }}
            >
              Registration Complete!
            </MDTypography>

            <MDTypography
              variant="body2"
              sx={{
                color: "#5A6E85",
                mb: 4,
                px: 2,
                lineHeight: 1.6,
              }}
            >
              Your account for <strong>{companyName}</strong> has been
              successfully created.
            </MDTypography>

            <Divider sx={{ mb: 3 }} />

            <MDButton
              variant="contained"
              onClick={() => navigate("/register/company-verification")}
              sx={{
                width: "100%",
                maxWidth: "200px",
                py: 1.25,
              }}
            >
              Go To Home Page
            </MDButton>
          </Box>
        )}
      </Paper>
    </DashboardLayout>
  );
}
