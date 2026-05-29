const r = (s) => s.registration;

// COMPANY
export const selectCompanyId = (s) => r(s).companyId;
export const selectCompanyName = (s) => r(s).company_name;

// USER DETAILS
export const selectMail = (s) => r(s).mail;
export const selectFirstName = (s) => r(s).fname;
export const selectLastName = (s) => r(s).lname;

// OTP
export const selectOtpToken = (s) => r(s).otpToken;
export const selectOtpVerified = (s) => r(s).otpVerified;
export const selectRegistrationDeadline = (s) => r(s).registrationDeadline;

// LOGIN CREDENTIALS
export const selectPassword = (s) => r(s).password;
export const selectBirthday = (s) => r(s).birthday;
export const selectPhoneNumber = (s) => r(s).phone_number;
export const selectAcceptedPrivacyPolicy = (s) => r(s).accepted_privacy_policy;

// INTERESTS
export const selectInterests = (s) => r(s).interests;
export const selectSelectedInterests = (s) => r(s).selectedInterests;
export const selectInterestsStatus = (s) => r(s).status;

// PILLARS
export const selectPillars = (s) => r(s).pillars;
export const selectSelectedPillars = (s) => r(s).selectedPillars;
export const selectPillarsLoading = (s) => r(s).status === "loading";

// AUTH
export const selectAuthToken = (s) => r(s).authToken;
export const selectRegistrationComplete = (s) => r(s).registrationComplete;

// STATUS
export const selectStatus = (s) => r(s).status;
export const selectResendStatus = (s) => r(s).resendStatus;
export const selectIsLoading = (s) => r(s).status === "loading";
export const selectError = (s) => r(s).error;
export const selectResendError = (s) => r(s).resendError;
export const selectIsResendLoading = (s) => r(s).resendStatus === "loading";

// FINAL REGISTRATION PAYLOAD
export const selectRegistrationPayload = (s) => ({
  fname: r(s).fname,
  lname: r(s).lname,
  email: r(s).mail,
  password: r(s).password,
  birthday: r(s).birthday,
  phone_number: r(s).phone_number,
  token: r(s).otpToken,
  accepted_privacy_policy: r(s).accepted_privacy_policy,
  areas_of_interest: r(s).selectedInterests,
  wellbeing_pillars: r(s).selectedPillars,
  time_zone: Intl.DateTimeFormat().resolvedOptions().timeZone,
  language_id: 1,
  user_type: 0,
});
