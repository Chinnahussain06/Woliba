import * as Yup from "yup";

import { getPasswordValidation } from "@/src/utils/validator";

export const form = {
  formId: "company-verification-form",

  formField: {
    company_name: {
      name: "company_name",
      label: "Company Name",
      placeholder: "Enter company name",
      type: "text",
      errorMsg: "Company Name is required.",
      required: true,
    },

    password: {
      name: "password",
      label: "Company Password",
      placeholder: "Enter company password",
      type: "password",
      errorMsg: "Company Password is required.",
      required: true,
    },
  },
};

const {
  formField: { company_name, password },
} = form;

export const initialValues = {
  [company_name.name]: "",
  [password.name]: "",
};

export const validationSchema = Yup.object({
  [company_name.name]: Yup.string()
    .min(3, "Name must be at least 3 characters")
    .required(company_name.errorMsg),

  [password.name]: getPasswordValidation(),
});
