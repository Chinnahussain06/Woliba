const r = (s) => s.registration;

export const selectCompanyId = (s) => r(s).companyId;
export const selectCompanyName = (s) => r(s).companyName;
export const selectEmail = (s) => r(s).email;
export const selectFirstName = (s) => r(s).firstName;
export const selectLastName = (s) => r(s).lastName;

export const selectOtpToken = (s) => r(s).otpToken;
export const selectOtpVerified = (s) => r(s).otpVerified;

export const selectRegistrationDeadline = (s) => r(s).registrationDeadline;

export const selectPassword = (s) => r(s).password;
export const selectDob = (s) => r(s).dob;
export const selectPhoneNumber = (s) => r(s).phone;
export const selectWorkAnniversary = (s) => r(s).workAnniversary;
export const selectAcceptedPrivacyPolicy = (s) => r(s).acceptedPolicy;

export const selectInterests = (s) => r(s).interests;
export const selectSelectedInterests = (s) => r(s).selectedInterests;
export const selectInterestsStatus = (s) => r(s).status;

export const selectPillars = (s) => r(s).pillars;
export const selectSelectedPillars = (s) => r(s).selectedPillars;
export const selectPillarsLoading = (s) => r(s).status === "loading";

export const selectAuthToken = (s) => r(s).authToken;
export const selectRegistrationComplete = (s) => r(s).registrationComplete;

export const selectStatus = (s) => r(s).status;
export const selectResendStatus = (s) => r(s).resendStatus;

export const selectIsLoading = (s) => r(s).status === "loading";
export const selectError = (s) => r(s).error;

export const selectResendError = (s) => r(s).resendError;
export const selectIsResendLoading = (s) => r(s).resendStatus === "loading";

export const selectRegistrationPayload = (s) => ({
  fname: r(s).firstName,
  lname: r(s).lastName,
  email: r(s).email,
  password: r(s).password,
  birthday: r(s).dob,
  phone_number: r(s).phone,
  token: r(s).otpToken,
  accepted_privacy_policy: r(s).acceptedPolicy,
  areas_of_interest: r(s).selectedInterests,
  wellbeing_pillars: r(s).selectedPillars,
  time_zone: Intl.DateTimeFormat().resolvedOptions().timeZone,
  language_id: 1,
  user_type: 0,
});
