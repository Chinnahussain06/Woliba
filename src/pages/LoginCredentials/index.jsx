import { useState } from "react";
import { Formik, Form } from "formik";
import { useNavigate } from "react-router-dom";

// MUI
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

// Icons
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import ArrowBackIosNew from "@mui/icons-material/ArrowBackIosNew";

// Components
import MDFormField from "../../components/MDFormField";
import MDLoadingButton from "../../components/MDLoadingButton";
import MDTypography from "@/src/components/MDTypography";
import DashboardLayout from "../../Layouts/dashboardLayout";
import MDDateTimePicker from "@/src/components/MDDateTimePicker";
import MDButton from "@/src/components/MDButton";

// Redux
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import {
  clearError,
  setPassword,
  setDob,
  setPhone,
  setWorkAnniversary,
  setAcceptedPolicy,
} from "../../redux/slices/registrationSlice";

import { selectError } from "../../redux/selectors/registrationSelectors";

// Schema
import {
  form,
  InitialValues,
  loginCredentialsValidationSchema,
} from "./schema";

function LoginCredentials() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

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
        <MDTypography
          variant="h5"
          sx={{
            color: "#1E3A5F",
            fontWeight: 700,
            textAlign: "center",
            mb: 4,
          }}
        >
          Login Credentials
        </MDTypography>

        {/* Error */}
        {apiError && (
          <Alert
            severity="error"
            onClose={() => dispatch(clearError())}
            sx={{ mb: 3, borderRadius: "12px" }}
          >
            {apiError}
          </Alert>
        )}

        <Formik
          initialValues={InitialValues}
          validationSchema={loginCredentialsValidationSchema}
          onSubmit={handleLoginCredentialsSubmit}
        >
          {({ values, setFieldValue, isValid, isSubmitting }) => {
            return (
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
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
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
                  label={birthday.label}
                  placeholder={birthday.placeholder}
                  name={birthday.name}
                  seconds={values[birthday.name]}
                  onChange={(value) => setFieldValue(birthday.name, value)}
                  required={true}
                />

                <MDFormField
                  label={contactNumber.label}
                  name={contactNumber.name}
                  placeholder={contactNumber.placeholder}
                  required
                />

                <MDDateTimePicker
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
            );
          }}
        </Formik>
      </Paper>
    </DashboardLayout>
  );
}

export default LoginCredentials;
