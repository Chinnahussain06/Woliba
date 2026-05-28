import { useState } from "react";
import { Formik, Form } from "formik";
import { useNavigate } from "react-router-dom";

// MUI
import {
  Box,
  Divider,
  IconButton,
  InputAdornment,
  Checkbox,
  FormControlLabel,
  useTheme,
} from "@mui/material";

// Icons
import VisibilityOutlined from "@mui/icons-material/VisibilityOutlined";
import VisibilityOffOutlined from "@mui/icons-material/VisibilityOffOutlined";
import ArrowBackIosNew from "@mui/icons-material/ArrowBackIosNew";

// Components
import MDFormField from "@/src/components/MDFormField";
import MDLoadingButton from "@/src/components/MDLoadingButton";
import MDTypography from "@/src/components/MDTypography";
import MDDatePicker from "@/src/components/MDDatePicker";
import MDButton from "@/src/components/MDButton";
import MDFormCard from "@/src/components/MDFormCard";
import MDAlert from "@/src/components/MDAlert";
import DashboardLayout from "@/src/LayoutsTemp/DashboardLayout";
import DashboardNavbar from "@/src/LayoutsTemp/DashboardNavbar";
import Footer from "@/src/LayoutsTemp/Footer";

import { useRegistrationTimer } from "@/src/hooks/useRegistrationTimer";

// Redux
import { useAppDispatch, useAppSelector } from "@/src/redux/hooks";
import {
  clearError,
  setPassword,
  setDob,
  setPhone,
  setWorkAnniversary,
  setAcceptedPolicy,
} from "@/src/redux/slices/registrationSlice";
import { selectError } from "@/src/redux/selectors/registrationSelectors";

// Schema
import {
  form,
  InitialValues,
  loginCredentialsValidationSchema,
} from "./schema";

function LoginCredentials() {
  const theme = useTheme();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  useRegistrationTimer();

  const apiError = useAppSelector(selectError);

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const {
    formField: {
      password,
      confirmPassword,
      birthday,
      contactNumber,
      workAnniversary,
      agreeToTerms,
    },
  } = form;

  const handleLoginCredentialsSubmit = (values) => {
    dispatch(setPassword(values[password.name]));
    dispatch(setDob(values[birthday.name]));
    dispatch(setPhone(values[contactNumber.name]));
    dispatch(setWorkAnniversary(values[workAnniversary.name] || null));
    dispatch(setAcceptedPolicy(values[agreeToTerms.name]));

    navigate("/register/wellness-selector");
  };

  return (
    <DashboardLayout>
      <DashboardNavbar />

      <Box
        component="main"
        sx={{
          position: "relative",
          zIndex: 10,
          flex: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          px: 2,
          py: 4,
        }}
      >
        <MDFormCard title="Login Credentials">
          <MDAlert message={apiError} onClose={() => dispatch(clearError())} />

          <Formik
            initialValues={InitialValues}
            validationSchema={loginCredentialsValidationSchema}
            onSubmit={handleLoginCredentialsSubmit}
          >
            {({ values, setFieldValue, isValid, isSubmitting }) => (
              <Form>
                <MDFormField
                  label={password.label}
                  name={password.name}
                  type={showPassword ? "text" : "password"}
                  placeholder={password.placeholder}
                  required
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          onClick={() => setShowPassword(!showPassword)}
                          sx={{ color: theme.palette.primary.main }}
                        >
                          {showPassword ? (
                            <VisibilityOffOutlined />
                          ) : (
                            <VisibilityOutlined />
                          )}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />

                <MDFormField
                  label="Confirm Password"
                  name={confirmPassword.name}
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Confirm password"
                  required
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          onClick={() =>
                            setShowConfirmPassword(!showConfirmPassword)
                          }
                          sx={{ color: theme.palette.primary.main }}
                        >
                          {showConfirmPassword ? (
                            <VisibilityOffOutlined />
                          ) : (
                            <VisibilityOutlined />
                          )}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />

                <MDDatePicker
                  label={birthday.label}
                  placeholder={birthday.placeholder}
                  name={birthday.name}
                  seconds={values[birthday.name]}
                  onChange={(value) => setFieldValue(birthday.name, value)}
                  required
                />

                <MDFormField
                  label={contactNumber.label}
                  name={contactNumber.name}
                  placeholder={contactNumber.placeholder}
                  required
                />

                <MDDatePicker
                  label={workAnniversary.label}
                  name={workAnniversary.name}
                  placeholder={workAnniversary.placeholder}
                  seconds={values[workAnniversary.name]}
                  onChange={(value) =>
                    setFieldValue(workAnniversary.name, value)
                  }
                />

                <Box sx={{ display: "flex", mt: 2, mb: 3 }}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={values[agreeToTerms.name]}
                        onChange={(e) =>
                          setFieldValue(agreeToTerms.name, e.target.checked)
                        }
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
                        I agree to Woliba&apos;s{" "}
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

                <Divider sx={{ my: 3 }} />

                <Box sx={{ display: "flex", gap: 2, justifyContent: "center" }}>
                  <MDButton
                    variant="outlined"
                    onClick={() => navigate("/register/otp-verification")}
                    startIcon={<ArrowBackIosNew />}
                  >
                    Back
                  </MDButton>

                  <MDLoadingButton
                    type="submit"
                    disabled={!isValid || isSubmitting}
                  >
                    Continue
                  </MDLoadingButton>
                </Box>
              </Form>
            )}
          </Formik>
        </MDFormCard>
      </Box>

      <Footer />
    </DashboardLayout>
  );
}

export default LoginCredentials;
