export const selectCurrentStep = (s) => s.registration.currentStep;

export const selectCompanyId = (s) => s.registration.companyId;

export const selectCompanyName = (s) => s.registration.companyName;

export const selectEmail = (s) => s.registration.email;

export const selectFirstName = (s) => s.registration.firstName;

export const selectLastName = (s) => s.registration.lastName;

export const selectOtpToken = (s) => s.registration.otpToken;

export const selectOtpVerified = (s) => s.registration.otpVerified;

export const selectResendCooldown = (s) => s.registration.resendCooldown;

export const selectIsLoading = (s) => s.registration.isLoading;

export const selectError = (s) => s.registration.error;

export const selectAuthToken = (s) => s.registration.authToken;

export const selectRegistrationComplete = (s) =>
  s.registration.registrationComplete;

/* ADD THESE */

export const selectSuccessMessage = (s) => s.registration.successMessage;

export const selectOtpTimer = (s) => s.registration.otpTimer;

export const selectStatus = (s) => s.registration.status;

export const selectResendStatus = (s) => s.registration.resendStatus;

/* OPTIONAL ALIAS */

export const selectRegistrationEmail = (s) => s.registration.email;

/* Payload Selector */

export const selectRegistrationPayload = (s) => ({
  fname: s.registration.firstName,

  lname: s.registration.lastName,

  password: s.registration.password,

  birthday: s.registration.dob,

  phone_number: s.registration.phone,

  token: s.registration.otpToken,

  accepted_privacy_policy: s.registration.acceptedPolicy,

  areas_of_interest: s.interests.selectedIds,

  wellbeing_pillars: s.pillars.selectedIds,

  time_zone: Intl.DateTimeFormat().resolvedOptions().timeZone,

  language_id: 1,

  user_type: 0,
});
