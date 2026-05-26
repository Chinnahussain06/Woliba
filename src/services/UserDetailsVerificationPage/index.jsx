import React, { useEffect } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";

// MUI Core Components
import { Box, Paper, Divider, Alert } from "@mui/material";

// Generic Brand Components
import MDTypography from "../../components/MDTypography";
import MDLoadingButton from "../../components/MDLoadingButton";
import MDFormField from "../../components/MDFormField";
import DashboardLayout from "../../pages/dashboardLayout";

// Redux
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { saveUserDetails } from "../../redux/thunks/registrationThunks";
import { clearError } from "../../redux/slices/registrationSlice";
import {
  selectIsLoading,
  selectError,
  selectCompanyName,
  selectEmail,
  selectFirstName,
  selectLastName,
  selectCompanyId,
} from "../../redux/selectors/registrationSelectors";

const userDetailsValidationSchema = Yup.object().shape({
  emailId: Yup.string()
    .email("Please refer to a valid email format")
    .required("Email ID is required"),
  firstName: Yup.string()
    .matches(
      /^[a-zA-Z\s]+$/,
      "First name cannot contain numbers or special characters",
    )
    .required("First name is required"),
  lastName: Yup.string()
    .matches(
      /^[a-zA-Z\s]+$/,
      "Last name cannot contain numbers or special characters",
    )
    .required("Last name is required"),
});

export default function UserDetailsVerificationPage() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const isLoading = useAppSelector(selectIsLoading);
  const apiError = useAppSelector(selectError);
  const companyName = useAppSelector(selectCompanyName);
  const companyId = useAppSelector(selectCompanyId);

  const email = useAppSelector(selectEmail);
  const firstName = useAppSelector(selectFirstName);
  const lastName = useAppSelector(selectLastName);

  const handleUserDetailsSubmit = async (values) => {
    const result = await dispatch(
      saveUserDetails({
        company_id: companyId,
        mail: values.emailId,
        fname: values.firstName,
        lname: values.lastName,
      }),
    ).unwrap();

    console.log("SUCCESS:", result);

    navigate("/register/otp-verification");
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
              "& .MuiAlert-icon": { color: "#EF4444" },
            }}
            onClose={() => dispatch(clearError())}
          >
            {apiError}
          </Alert>
        )}

        <Formik
          initialValues={{
            emailId: email || "",
            firstName: firstName || "",
            lastName: lastName || "",
            companyName: companyName || "",
          }}
          validationSchema={userDetailsValidationSchema}
          onSubmit={handleUserDetailsSubmit}
          enableReinitialize
        >
          {({ isValid, dirty, values }) => {
            const canSubmit =
              isValid &&
              (dirty ||
                (values.emailId && values.firstName && values.lastName));

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
                  disabled
                  value={companyName}
                  required
                />

                <Divider
                  sx={{ borderColor: "#F1F5F9", borderBottomWidth: 1, my: 3 }}
                />

                <Box
                  id="action-btn-row"
                  sx={{ display: "flex", justifyContent: "center" }}
                >
                  <MDLoadingButton
                    type="submit"
                    variant="contained"
                    loading={isLoading}
                    disabled={!canSubmit}
                    id="registration-submit-button"
                    sx={{ width: "100%", maxWidth: "190px", py: 1.25, px: 3 }}
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
