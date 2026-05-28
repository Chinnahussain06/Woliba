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

    confirmPassword: {
      name: "confirmPassword",
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

    contactNumber: {
      name: "contactNumber",
      label: "Phone Number",
      placeholder: "Enter phone number",
      type: "text",
      required: true,
      errorMsg: "Contact number is required.",
    },

    workAnniversary: {
      name: "workAnniversary",
      label: "Work Anniversary",
      placeholder: "Select work anniversary(YYYY-MM-DD)",
      type: "date",
      required: false,
      errorMsg: "Work anniversary is required.",
    },

    agreeToTerms: {
      name: "agreeToTerms",
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
    confirmPassword,
    birthday,
    contactNumber,
    workAnniversary,
    agreeToTerms,
  },
} = form;

export const InitialValues = {
  [password.name]: "",
  [confirmPassword.name]: "",
  [birthday.name]: null,
  [contactNumber.name]: "",
  [workAnniversary.name]: null,
  [agreeToTerms.name]: false,
};

export const loginCredentialsValidationSchema = Yup.object().shape({
  [password.name]: getPasswordValidation(),
  [confirmPassword.name]: getConfirmPasswordValidation(password.name),
  [birthday.name]: Yup.string().required(birthday.errorMsg),

  [contactNumber.name]: Yup.string()
    .matches(/^[0-9]{10}$/, "Enter valid 10 digit mobile number")
    .required(contactNumber.errorMsg),

  [workAnniversary.name]: Yup.string().nullable(),

  [agreeToTerms.name]: Yup.boolean()
    .oneOf([true], "You must agree to Terms and Privacy Policy")
    .required(agreeToTerms.errorMsg),
});
