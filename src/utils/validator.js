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

export const getEmailValidation = () => {
  return Yup.string()
    .required("Email address is required")
    .email("Email address is invalid")
    .matches(
      /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]/,
      "Invalid email address format",
    );
};

export const getNameValidation = () => {
  return Yup.string()
    .trim()
    .strict(true)
    .max(100, "Maximum 100 characters")
    .matches(
      /^[a-zA-Z0-9][a-zA-Z0-9_:-\s]*$/,
      "Must start with a letter or number and only contain alphanumeric characters, underscores (_), hyphens (-), colons (:), and spaces",
    )
    .matches(/^[^\s].*$/, "Cannot start with a space");
};
