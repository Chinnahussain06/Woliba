import { useState } from "react";
import { Formik, Form } from "formik";
import { useNavigate } from "react-router-dom";

// MUI
import { Box, InputAdornment, IconButton, Divider } from "@mui/material";
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
import { form, initialValues, validationSchema } from "./schema";

function CompanyVerification() {
  const navigate = useNavigate();

  const dispatch = useAppDispatch();

  const isLoading = useAppSelector(selectIsLoading);
  const apiError = useAppSelector(selectError);

  const [showPassword, setShowPassword] = useState(false);

  const { formField } = form;

  const { company_name, password } = formField;

  const handleSubmit = async (values) => {
    dispatch(clearError());

    const resultAction = await dispatch(verifyCompany(values));

    if (verifyCompany.fulfilled.match(resultAction)) {
      navigate("/register/user-details-verification");
    }
  };

  return (
    <DashboardLayout>
      <DashboardNavbar />

      <Box
        component="main"
        sx={{
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
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ isSubmitting, isValid }) => (
              <Form>
                <MDFormField
                  label={company_name.label}
                  name={company_name.name}
                  placeholder={company_name.placeholder}
                  required
                />

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
                          edge="end"
                          sx={{ color: "primary.main" }}
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

                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                  }}
                >
                  <MDLoadingButton
                    type="submit"
                    loading={isLoading}
                    loadingText="Verifying..."
                    disabled={!isValid || isSubmitting || isLoading}
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
