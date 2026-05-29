import * as Yup from "yup";

import { getPasswordValidation } from "@/src/utils/validator";

export const form = {
  formId: "company-verification-form",

  formField: {
    companyName: {
      name: "companyName",
      label: "Company Name",
      placeholder: "Enter company name",
      type: "text",
      errorMsg: "Company Name is required.",
      required: true,
    },

    companyPassword: {
      name: "companyPassword",
      label: "Company Password",
      placeholder: "Enter company password",
      type: "password",
      errorMsg: "Company Password is required.",
      required: true,
    },
  },
};

const {
  formField: { companyName, companyPassword },
} = form;

export const initialValues = {
  [companyName.name]: "",
  [companyPassword.name]: "",
};

export const validationSchema = Yup.object({
  [companyName.name]: Yup.string()
    .min(3, "Name must be at least 3 characters")
    .required(companyName.errorMsg),

  [companyPassword.name]: getPasswordValidation(),
});
