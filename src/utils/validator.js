import * as Yup from "yup";

export const getPasswordValidation = () => {
  return Yup.string()
    .required("Password is required.")
    .min(8, "Password too short")
    .max(20, "Password too long")
    .matches(/^(?=.*[a-z])/, "Must contain at least one lowercase character")
    .matches(/^(?=.*[A-Z])/, "Must contain at least one uppercase character")
    .matches(/^(?=.*[0-9])/, "Must contain at least one number")
    .matches(
      /^(?=.*[!@#%&$*])/,
      "Must contain at least one special character including *",
    );
};

export const getConfirmPasswordValidation = (passwordKey) => {
  return Yup.string()
    .oneOf([Yup.ref(passwordKey), null], "Password doesn't match")
    .required("Confirm password is required.");
};
