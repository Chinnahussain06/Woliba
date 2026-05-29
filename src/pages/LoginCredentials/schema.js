import * as Yup from "yup";

import {
  getPasswordValidation,
  getConfirmPasswordValidation,
} from "@/src/utils/validator";

export const form = {
  formId: "login-credentials-form",

  formField: {
    password: {
      name: "password",
      label: "Password",
      placeholder: "Enter password",
      type: "password",
      required: true,
      errorMsg: "Password is required.",
    },

    confirm_password: {
      name: "confirm_password",
      label: "Confirm Password",
      placeholder: "Confirm password",
      type: "password",
      required: true,
      errorMsg: "Confirm password is required.",
    },

    birthday: {
      name: "birthday",
      label: "Date of Birth",
      placeholder: "Select date of birth(YYYY-MM-DD)",
      type: "date",
      required: true,
      errorMsg: "Birthday is required.",
    },

    phone_number: {
      name: "phone_number",
      label: "Phone Number",
      placeholder: "Enter phone number",
      type: "text",
      required: true,
      errorMsg: "Phone number is required.",
    },

    accepted_privacy_policy: {
      name: "accepted_privacy_policy",
      label: "Terms & Privacy Policy",
      placeholder: "I agree to the Terms and Privacy Policy",
      required: true,
      errorMsg: "You must agree to Terms and Privacy Policy.",
    },
  },
};

const {
  formField: {
    password,
    confirm_password,
    birthday,
    phone_number,
    accepted_privacy_policy,
  },
} = form;

export const InitialValues = {
  [password.name]: "",
  [confirm_password.name]: "",
  [birthday.name]: null,
  [phone_number.name]: "",
  [accepted_privacy_policy.name]: false,
};

export const ValidationSchema = Yup.object().shape({
  [password.name]: getPasswordValidation(),

  [confirm_password.name]: getConfirmPasswordValidation(password.name),

  [birthday.name]: Yup.string().required(birthday.errorMsg),

  [phone_number.name]: Yup.string()
    .matches(/^[0-9]{10}$/, "Enter valid 10 digit mobile number")
    .required(phone_number.errorMsg),

  [accepted_privacy_policy.name]: Yup.boolean()
    .oneOf([true], "You must agree to Terms and Privacy Policy")
    .required(accepted_privacy_policy.errorMsg),
});
