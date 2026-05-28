import { createSlice } from "@reduxjs/toolkit";
import {
  verifyCompany,
  saveUserDetails,
  submitRegistration,
  verifyOtp,
  resendOtp,
  fetchInterests,
  fetchPillars,
} from "../thunks/registrationThunks";

const OTP_EXPIRY_TIME = 10 * 60 * 1000; // 10 minutes in milliseconds

const initialState = {
  // company details
  companyId: null,
  companyName: "",

  // user details
  email: "",
  firstName: "",
  lastName: "",

  // OTP verification
  otpToken: null,
  otpVerified: false,

  // registration timer (stores timestamp of when the 10-min window expires)
  registrationDeadline: null,

  // profile details
  password: "",
  dob: "",
  phone: "",
  workAnniversary: "",
  acceptedPolicy: false,

  // Interests
  interests: [],
  selectedInterests: [],

  // Pillars
  pillars: [],
  selectedPillars: [],

  // Registration completion
  authToken: null,
  registrationComplete: false,

  // Async State
  status: "idle",
  resendStatus: "idle",
  error: null,
};

const onPending = (state) => {
  state.status = "loading";
  state.error = null;
};

const onRejected = (state, { payload }) => {
  state.status = "failed";
  if (typeof payload === "string") {
    state.error = payload;
  } else if (payload?.message) {
    state.error = payload.message;
  } else {
    state.error = "Something went wrong";
  }
};

const registrationSlice = createSlice({
  name: "registration",
  initialState,

  reducers: {
    // company verification
    setCompanyName: (state, { payload }) => {
      state.companyName = payload;
    },

    // user details
    setEmail: (state, { payload }) => {
      state.email = payload;
    },
    setFirstName: (state, { payload }) => {
      state.firstName = payload;
    },
    setLastName: (state, { payload }) => {
      state.lastName = payload;
    },

    // profile details
    setPassword: (state, { payload }) => {
      state.password = payload;
    },
    setDob: (state, { payload }) => {
      state.dob = payload;
    },
    setPhone: (state, { payload }) => {
      state.phone = payload;
    },
    setWorkAnniversary: (state, { payload }) => {
      state.workAnniversary = payload;
    },
    setAcceptedPolicy: (state, { payload }) => {
      state.acceptedPolicy = payload;
    },

    // Interests
    toggleInterest: (state, { payload }) => {
      if (state.selectedInterests.includes(payload)) {
        state.selectedInterests = state.selectedInterests.filter(
          (id) => id !== payload,
        );
      } else {
        state.selectedInterests.push(payload);
      }
    },

    // Pillars
    togglePillar: (state, { payload }) => {
      if (state.selectedPillars.includes(payload)) {
        state.selectedPillars = state.selectedPillars.filter(
          (id) => id !== payload,
        );
      } else if (state.selectedPillars.length < 3) {
        state.selectedPillars.push(payload);
      }
    },

    // utility
    clearError: (state) => {
      state.error = null;
    },

    resetRegistration: (state) => ({
      ...initialState,
      interests: state.interests,
      pillars: state.pillars,
    }),
  
    // Registration Timer
    setRegistrationDeadline: (state) => {
      state.registrationDeadline = Date.now() + OTP_EXPIRY_TIME;
    },

    // clear deadline
    clearRegistrationDeadline: (state) => {
      state.registrationDeadline = null;
    },
  },

  extraReducers: (builder) => {
    builder

      // company verification
      .addCase(verifyCompany.pending, onPending)
      .addCase(verifyCompany.rejected, onRejected)
      .addCase(verifyCompany.fulfilled, (state, { payload }) => {
        const company = payload?.data?.[0];
        state.status = "success";
        state.companyId = company?.id ?? null;
        state.companyName = company?.company_name ?? "";
      })

      // save user details
      .addCase(saveUserDetails.pending, onPending)
      .addCase(saveUserDetails.rejected, onRejected)
      .addCase(saveUserDetails.fulfilled, (state, { payload, meta }) => {
        state.status = "success";
        state.otpToken = payload?.data?.token ?? null;
        state.email = meta.arg.mail;
        state.firstName = meta.arg.fname;
        state.lastName = meta.arg.lname;
      })

      // OTP verification
      .addCase(verifyOtp.pending, onPending)
      .addCase(verifyOtp.rejected, onRejected)
      .addCase(verifyOtp.fulfilled, (state) => {
        state.status = "success";
        state.otpVerified = true;
        state.registrationDeadline = Date.now() + 10 * 60 * 1000;
      })

      // resend OTP
      .addCase(resendOtp.pending, (state) => {
        state.resendStatus = "loading";
        state.error = null;
      })
      .addCase(resendOtp.rejected, (state, { payload }) => {
        state.resendStatus = "failed";
        state.error = payload ?? "Failed to resend OTP";
      })
      .addCase(resendOtp.fulfilled, (state, { payload }) => {
        state.resendStatus = "success";
        state.otpToken = payload?.data?.token ?? null;
        state.registrationDeadline = null;
      })

      // fetch interests
      .addCase(fetchInterests.pending, onPending)
      .addCase(fetchInterests.rejected, onRejected)
      .addCase(fetchInterests.fulfilled, (state, { payload }) => {
        state.status = "success";
        state.interests = payload ?? [];
      })

      // fetch pillars
      .addCase(fetchPillars.pending, onPending)
      .addCase(fetchPillars.rejected, onRejected)
      .addCase(fetchPillars.fulfilled, (state, { payload }) => {
        state.status = "success";
        state.pillars = payload ?? [];
      })

      // final submission
      .addCase(submitRegistration.pending, onPending)
      .addCase(submitRegistration.rejected, onRejected)
      .addCase(submitRegistration.fulfilled, (state, { payload }) => {
        state.status = "success";
        state.authToken = payload?.data?.token ?? null;
        state.registrationComplete = true;
        state.registrationDeadline = null;
      });
  },
});

export const {
  setCompanyName,
  setEmail,
  setFirstName,
  setLastName,
  setPassword,
  setDob,
  setPhone,
  setWorkAnniversary,
  setAcceptedPolicy,
  toggleInterest,
  togglePillar,
  clearError,
  resetRegistration,
  setRegistrationDeadline,
  clearRegistrationDeadline,
} = registrationSlice.actions;

export default registrationSlice.reducer;
