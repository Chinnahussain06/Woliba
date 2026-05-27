import React from "react";
import { Formik, Form } from "formik";
import { useNavigate } from "react-router-dom";

// MUI
import { Box, Paper, Divider, Alert } from "@mui/material";

// Components
import MDTypography from "@/src/components/MDTypography";
import MDLoadingButton from "@/src/components/MDLoadingButton";
import MDFormField from "@/src/components/MDFormField";
import DashboardLayout from "@/src/Layouts/dashboardLayout";

// Redux
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { saveUserDetails } from "../../redux/thunks/registrationThunks";
import { clearError } from "../../redux/slices/registrationSlice";

import {
  selectIsLoading,
  selectError,
  selectCompanyName,
  selectCompanyId,
  selectEmail,
  selectFirstName,
  selectLastName,
} from "../../redux/selectors/registrationSelectors";

// Schema
import { form, initialValues, userDetailsValidationSchema } from "./schema";

function UserDetailsVerification() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const isLoading = useAppSelector(selectIsLoading);
  const apiError = useAppSelector(selectError);
  const companyName = useAppSelector(selectCompanyName);
  const companyId = useAppSelector(selectCompanyId);

  const email = useAppSelector(selectEmail);
  const firstName = useAppSelector(selectFirstName);
  const lastName = useAppSelector(selectLastName);

  const { formField } = form;
  const { emailId, firstName: fn, lastName: ln, companyName: cn } = formField;

  const handleSubmit = async (values) => {
    await dispatch(
      saveUserDetails({
        company_id: companyId,
        mail: values.emailId,
        fname: values.firstName,
        lname: values.lastName,
      }),
    ).unwrap();

    navigate("/register/otp-verification");
  };

  return (
    <DashboardLayout>
      <Paper
        elevation={0}
        sx={{
          width: "100%",
          maxWidth: 480,
          p: { xs: 4, sm: 5 },
          borderRadius: 4,
          border: "1px solid #E6EAF0",
          backgroundColor: "#fff",
          boxShadow: "0 10px 30px rgba(0,0,0,0.05)",
        }}
      >
        <MDTypography variant="h5" sx={{ textAlign: "center", mb: 4, fontWeight: 700 }}>
          Registration
        </MDTypography>

        {apiError && (
          <Alert
            severity="error"
            onClose={() => dispatch(clearError())}
            sx={{ mb: 3 }}
          >
            {apiError}
          </Alert>
        )}

        <Formik
          initialValues={{
            ...initialValues,
            emailId: email || "",
            firstName: firstName || "",
            lastName: lastName || "",
            companyName: companyName || "",
          }}
          validationSchema={userDetailsValidationSchema}
          onSubmit={handleSubmit}
          enableReinitialize
        >
          {({ dirty }) => (
            <Form>
              <MDFormField
                label={emailId.label}
                name={emailId.name}
                placeholder={emailId.placeholder}
                required
              />

              <MDFormField
                label={fn.label}
                name={fn.name}
                placeholder={fn.placeholder}
                required
              />

              <MDFormField
                label={ln.label}
                name={ln.name}
                placeholder={ln.placeholder}
                required
              />

              <MDFormField
                label={cn.label}
                name={cn.name}
                disabled
                value={companyName}
                required
              />

              <Divider sx={{ my: 4 }} />

              <Box sx={{ display: "flex", justifyContent: "center" }}>
                <MDLoadingButton
                  type="submit"
                  loading={isLoading}
                  disabled={!dirty}
                  sx={{
                    width: "100%",
                    maxWidth: 220,
                    py: 1.5,
                    fontSize: "1rem",
                    fontWeight: 600,
                    backgroundColor: "#D2686E",
                    "&:hover": {
                      backgroundColor: "#C2555B",
                    },
                  }}
                >
                  Verify email
                </MDLoadingButton>
              </Box>
            </Form>
          )}
        </Formik>
      </Paper>
    </DashboardLayout>
  );
}

export default UserDetailsVerification;
