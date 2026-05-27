import * as Yup from "yup";
import { getEmailValidation, getNameValidation } from "@/src/utils/validator";

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
  [emailId.name]: getEmailValidation(),

  [firstName.name]: getNameValidation(),

  [lastName.name]: getNameValidation(),

  [companyName.name]: Yup.string().required("Company name is required"),
});
