import React from "react";
import { Formik, Form } from "formik";
import { useNavigate } from "react-router-dom";

// MUI
import { Box, Divider } from "@mui/material";

// Components
import MDLoadingButton from "@/src/components/MDLoadingButton";
import MDFormField from "@/src/components/MDFormField";
import MDFormCard from "@/src/components/MDFormCard";
import MDAlert from "@/src/components/MDAlert";
import DashboardLayout from "@/src/Layouts/DashboardLayout";
import DashboardNavbar from "@/src/Layouts/DashboardNavbar";
import Footer from "@/src/Layouts/Footer";

// Redux
import { useAppDispatch, useAppSelector } from "@/src/redux/hooks";
import { saveUserDetails } from "@/src/redux/thunks/registrationThunks";
import { clearError } from "@/src/redux/slices/registrationSlice";
import {
  selectIsLoading,
  selectError,
  selectCompanyName,
  selectCompanyId,
  selectEmail,
  selectFirstName,
  selectLastName,
} from "@/src/redux/selectors/registrationSelectors";

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

                <Divider sx={{ my: 2 }} />

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
                      "&:hover": { backgroundColor: "#C2555B" },
                    }}
                  >
                    Verify email
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

export default UserDetailsVerification;
