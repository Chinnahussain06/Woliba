import * as Yup from "yup";
import { getEmailValidation, getNameValidation } from "@/src/utils/validator";

export const form = {
  formId: "user-details-verification-form",

  formField: {
    mail: {
      name: "mail",
      label: "Email ID",
      placeholder: "Enter email id",
      type: "email",
      errorMsg: "Email is required.",
      required: true,
    },

    fname: {
      name: "fname",
      label: "First name",
      placeholder: "Enter first name",
      type: "text",
      errorMsg: "First name is required.",
      required: true,
    },

    lname: {
      name: "lname",
      label: "Last name",
      placeholder: "Enter last name",
      type: "text",
      errorMsg: "Last name is required.",
      required: true,
    },

    company_name: {
      name: "company_name",
      label: "Company name",
      type: "text",
      required: true,
      disabled: true,
    },
  },
};

const {
  formField: { mail, fname, lname, company_name },
} = form;

export const initialValues = {
  [mail.name]: "",
  [fname.name]: "",
  [lname.name]: "",
  [company_name.name]: "",
};

export const userDetailsValidationSchema = Yup.object().shape({
  [mail.name]: getEmailValidation(),

  [fname.name]: getNameValidation(),

  [lname.name]: getNameValidation(),

  [company_name.name]: Yup.string().required("Company name is required"),
});
