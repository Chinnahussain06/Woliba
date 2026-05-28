import React, { useState, useEffect } from "react";
import { Formik, Form } from "formik";
import { useNavigate } from "react-router-dom";

// MUI
import {
  Box,
  InputAdornment,
  IconButton,
  Divider,
  useTheme,
} from "@mui/material";
import VisibilityOutlined from "@mui/icons-material/VisibilityOutlined";
import VisibilityOffOutlined from "@mui/icons-material/VisibilityOffOutlined";

// Components
import MDLoadingButton from "@/src/components/MDLoadingButton";
import MDFormField from "@/src/components/MDFormField";
import MDFormCard from "@/src/components/MDFormCard";
import MDAlert from "@/src/components/MDAlert";
import DashboardLayout from "@/src/layouts/DashboardLayout";
import DashboardNavbar from "@/src/layouts/DashboardNavbar";
import Footer from "@/src/layouts/Footer";

// Redux
import { useAppDispatch, useAppSelector } from "@/src/redux/hooks";
import { clearError } from "@/src/redux/slices/registrationSlice";
import { verifyCompany } from "@/src/redux/thunks/registrationThunks";
import {
  selectIsLoading,
  selectError,
} from "@/src/redux/selectors/registrationSelectors";

// Schema
import { form, initialValues, companyValidations } from "./schema";

function CompanyVerification() {
  const theme = useTheme();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const isLoading = useAppSelector(selectIsLoading);
  const apiError = useAppSelector(selectError);

  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    return () => {
      dispatch(clearError());
    };
  }, [dispatch]);

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
      console.error("Company Verification Failed:", err);
    }
  };

  const { formField } = form;
  const { companyName: companyNameField, companyPassword: passwordField } =
    formField;

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
        <MDFormCard title="Registration">
          <MDAlert message={apiError} onClose={() => dispatch(clearError())} />

          <Formik
            initialValues={initialValues}
            validationSchema={companyValidations[0]}
            onSubmit={handleSubmit}
          >
            {({ isSubmitting, dirty }) => (
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
                          edge="end"
                          sx={{ color: theme.palette.primary.main }}
                        >
                          {showPassword ? (
                            <VisibilityOutlined />
                          ) : (
                            <VisibilityOffOutlined />
                          )}
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
                    sx={{ width: "100%", maxWidth: "190px" }}
                  >
                    Next
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

export default CompanyVerification;
