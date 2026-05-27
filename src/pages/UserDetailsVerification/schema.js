import * as Yup from "yup";

export const form = {
  formId: "user-details-verification-form",
  formField: {
    emailId: {
      name: "emailId",
      label: "Email ID",
      placeholder: "Enter email id",
      type: "email",
      errorMsg: "Email is required.",
      required: true,
    },

    firstName: {
      name: "firstName",
      label: "First name",
      placeholder: "Enter first name",
      type: "text",
      errorMsg: "First name is required.",
      required: true,
    },

    lastName: {
      name: "lastName",
      label: "Last name",
      placeholder: "Enter last name",
      type: "text",
      errorMsg: "Last name is required.",
      required: true,
    },

    companyName: {
      name: "companyName",
      label: "Company name",
      type: "text",
      required: true,
      disabled: true,
    },
  },
};

const {
  formField: { emailId, firstName, lastName, companyName },
} = form;

export const initialValues = {
  [emailId.name]: "",
  [firstName.name]: "",
  [lastName.name]: "",
  [companyName.name]: "",
};

export const userDetailsValidationSchema = Yup.object().shape({
  [emailId.name]: Yup.string()
    .email("Please enter a valid email format")
    .required("Email ID is required"),

  [firstName.name]: Yup.string()
    .matches(
      /^[a-zA-Z\s]+$/,
      "First name cannot contain numbers or special characters",
    )
    .required("First name is required"),

  [lastName.name]: Yup.string()
    .matches(
      /^[a-zA-Z\s]+$/,
      "Last name cannot contain numbers or special characters",
    )
    .required("Last name is required"),

  [companyName.name]: Yup.string().required("Company name is required"),
});
