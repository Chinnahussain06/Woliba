import React, { useState } from "react";
import { Formik, Form } from "formik";
import { useNavigate } from "react-router-dom";

// MUI
import {
  Box,
  Paper,
  InputAdornment,
  IconButton,
  Divider,
  Alert,
} from "@mui/material";

// Icons
import VisibilityOutlined from "@mui/icons-material/VisibilityOutlined";
import VisibilityOffOutlined from "@mui/icons-material/VisibilityOffOutlined";

// Theme
import { palette } from "@/src/assets/theme/base/palette";

// Components
import MDTypography from "@/src/components/MDTypography";
import MDLoadingButton from "@/src/components/MDLoadingButton";
import MDFormField from "@/src/components/MDFormField";
import DashboardLayout from "@/src/Layouts/dashboardLayout";

// Redux
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { verifyCompany } from "../../redux/thunks/registrationThunks";
import { clearError } from "../../redux/slices/registrationSlice";
import {
  selectIsLoading,
  selectError,
  selectCompanyName,
} from "../../redux/selectors/registrationSelectors";

// Schema
import { form, initialValues, companyValidations } from "./schema";


function CompanyVerification() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const isLoading = useAppSelector(selectIsLoading);
  const apiError = useAppSelector(selectError);
  const companyName = useAppSelector(selectCompanyName);

  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (values) => {
    try {
      await dispatch(
        verifyCompany({
          company_name: values.companyName,
          password: values.companyPassword,
        }),
      ).unwrap();

      navigate("/register/user-details-verification");
    } catch (err) {
      console.log("ERROR:", err);
    }
  };

  const { formField } = form;
  const { companyName: companyNameField, companyPassword: passwordField } =
    formField;

  return (
    <DashboardLayout>
      <Paper
        elevation={0}
        sx={{
          width: "100%",
          maxWidth: "460px",
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
          Registration
        </MDTypography>

        {apiError && (
          <Alert
            severity="error"
            sx={{ mb: 3, borderRadius: "12px" }}
            onClose={() => dispatch(clearError())}
          >
            {apiError}
          </Alert>
        )}

        <Formik
          initialValues={{
            ...initialValues,
            companyName: companyName || "",
          }}
          validationSchema={companyValidations[0]}
          onSubmit={handleSubmit}
          enableReinitialize
        >
          {({ dirty, isSubmitting }) => {
            return (
              <Form>
                <MDFormField
                  label={companyNameField.label}
                  name={companyNameField.name}
                  placeholder={companyNameField.placeholder}
                  required
                />

                <MDFormField
                  label={passwordField.label}
                  name={passwordField.name}
                  type={showPassword ? "text" : "password"}
                  placeholder={passwordField.placeholder}
                  required
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          onClick={() => setShowPassword(!showPassword)}
                          sx={{ color: palette.primary.main}}
                        >
                          {showPassword ? <VisibilityOutlined /> : <VisibilityOffOutlined />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />

                <Divider sx={{ my: 3 }} />

                <Box sx={{ display: "flex", justifyContent: "center" }}>
                  <MDLoadingButton
                    type="submit"
                    loading={isLoading}
                    disabled={isSubmitting || !dirty}
                    sx={{
                      width: "100%",
                      maxWidth: "190px",
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

export default CompanyVerification;
