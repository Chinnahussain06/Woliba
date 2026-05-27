import { useEffect, useState } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
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
import MDButton from "@/src/components/MDButton";

function LoginCredentials() {
  const navigate = useNavigate();

  const dispatch = useAppDispatch();

  // Redux State
  const apiError = useAppSelector(selectError);

  // Local State
  const [showPassword, setShowPassword] = useState(false);

  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const loginCredentialsValidationSchema = Yup.object({
    password: Yup.string()
      .min(8, "Password must be at least 8 characters")
      .matches(/[A-Z]/, "Password must contain at least 1 uppercase letter")
      .matches(/[0-9]/, "Password must contain at least 1 number")
      .required("Password is required"),

    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password")], "Passwords must match")
      .required("Confirm password is required"),

    birthday: Yup.string().required("Birthday is required"),

    contactNumber: Yup.string()
      .matches(/^[0-9]{10}$/, "Enter valid 10 digit mobile number")
      .required("Contact number is required"),

    workAnniversary: Yup.number().nullable(),

    agreeToTerms: Yup.boolean()
      .oneOf([true], "You must agree to Terms and Privacy Policy")
      .required("Agreement is required"),
  });

  const handleLoginCredentialsSubmit = async (values) => {
    dispatch(setPassword(values.password));

    dispatch(setDob(values.birthday));

    dispatch(setPhone(values.contactNumber));

    dispatch(setWorkAnniversary(values.workAnniversary || null));

    dispatch(setAcceptedPolicy(values.agreeToTerms));

    navigate("/wellness-selector");
  };

  return (
    <DashboardLayout>
      <Paper
        elevation={0}
        sx={{
          width: "100%",
          maxWidth: "480px",
          p: {
            xs: 4,
            md: 5,
          },
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
            letterSpacing: "-0.025em",
          }}
        >
          Login Credentials
        </MDTypography>

        {/* Error */}
        {apiError && (
          <Alert
            severity="error"
            onClose={() => dispatch(clearError())}
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
            workAnniversary: null,
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
                {/* Password */}
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
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />

                {/* Confirm Password */}
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

                {/* Birthday */}
                <MDDateTimePicker
                  label="Date of Birth"
                  name="birthday"
                  seconds={values.birthday}
                  onChange={(value) => {
                    setFieldValue("birthday", value);
                  }}
                />

                {/* Contact Number */}
                <MDFormField
                  label="Phone Number"
                  name="contactNumber"
                  placeholder="Enter phone number"
                  required
                />

                {/* Work Anniversary */}
                <MDDateTimePicker
                  label="Work Anniversary (Optional)"
                  name="workAnniversary"
                  seconds={values.workAnniversary}
                  onChange={(value) => {
                    setFieldValue("workAnniversary", value);
                  }}
                />

                {/* Terms */}
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
                    startIcon={<ArrowBackIosNew sx={{ fontSize: "0.75rem" }} />}
                      sx={{
                      width: "140px",
                      py: 1.25,
                    }}
                  >
                    Back
                  </MDButton>

                  <MDLoadingButton
                    type="submit"
                    variant="contained"
                    loading={false}
                    disabled={!canSubmit}
                    sx={{
                      width: "140px",
                      py: 1.25,
                    }}
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
