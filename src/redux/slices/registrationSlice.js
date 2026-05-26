import { createSlice } from "@reduxjs/toolkit";

import {
  verifyCompany,
  saveUserDetails,
  submitRegistration,
} from "../thunks/registrationThunks";

import { resendOtp, verifyOtp } from "../thunks/otpThunks";

const initialState = {
  // Step Handling
  currentStep: 1,

  // Company
  companyName: "",
  companyId: null,

  // User Details
  email: "",
  firstName: "",
  lastName: "",

  // OTP
  otpToken: null,
  otp: Array(6).fill(""),
  otpVerified: false,
  resendCooldown: 180,

  // Login Credentials
  password: "",
  dob: "",
  phone: "",
  workAnniversary: "",
  acceptedPolicy: false,

  // Final Registration
  authToken: null,
  registrationComplete: false,

  // API States
  isLoading: false,
  error: null,
  successMessage: null,

  // API Status
  status: "idle",
  resendStatus: "idle",
};

const pending = (state) => {
  state.isLoading = true;
  state.status = "loading";
  state.error = null;
};

const rejected = (state, action) => {
  state.isLoading = false;
  state.status = "failed";

  state.error = action.payload || "Something went wrong";
};

const registrationSlice = createSlice({
  name: "registration",

  initialState,

  reducers: {
    // Basic Setters
    setCompanyName: (state, action) => {
      state.companyName = action.payload;
    },

    setEmail: (state, action) => {
      state.email = action.payload;
    },

    setFirstName: (state, action) => {
      state.firstName = action.payload;
    },

    setLastName: (state, action) => {
      state.lastName = action.payload;
    },

    setPassword: (state, action) => {
      state.password = action.payload;
    },

    setDob: (state, action) => {
      state.dob = action.payload;
    },

    setPhone: (state, action) => {
      state.phone = action.payload;
    },

    setWorkAnniversary: (state, action) => {
      state.workAnniversary = action.payload;
    },

    setAcceptedPolicy: (state, action) => {
      state.acceptedPolicy = action.payload;
    },

    setCurrentStep: (state, action) => {
      state.currentStep = action.payload;
    },

    setOtpDigit: (state, action) => {
      const { index, value } = action.payload;

      state.otp[index] = value;
    },

    setOtpTimer: (state, action) => {
      state.resendCooldown = action.payload;
    },

    tickResendTimer: (state) => {
      if (state.resendCooldown > 0) {
        state.resendCooldown -= 1;
      }
    },

    clearError: (state) => {
      state.error = null;
    },

    clearSuccessMessage: (state) => {
      state.successMessage = null;
    },

    resetRegistration: () => initialState,
  },

  extraReducers: (builder) => {
    builder

      // ========================================
      // VERIFY COMPANY
      // ========================================

      .addCase(verifyCompany.pending, pending)

      .addCase(verifyCompany.rejected, rejected)

      .addCase(verifyCompany.fulfilled, (state, action) => {
        state.isLoading = false;

        state.status = "success";

        const company = action.payload?.data?.[0];

        state.companyId = company?.id || null;

        state.companyName = company?.company_name || "";

        state.currentStep = 2;
      })

      // ========================================
      // SAVE USER DETAILS
      // ========================================

      .addCase(saveUserDetails.pending, pending)

      .addCase(saveUserDetails.rejected, rejected)

      .addCase(saveUserDetails.fulfilled, (state, action) => {
        state.isLoading = false;

        state.status = "success";

        // API RESPONSE:
        // action.payload.data.token

        state.otpToken = action.payload?.data?.token || null;

        // Save user details
        state.email = action.meta.arg.mail;

        state.firstName = action.meta.arg.fname;

        state.lastName = action.meta.arg.lname;

        state.successMessage =
          action.payload?.data?.message || "OTP sent successfully";

        state.currentStep = 3;
      })

      // ========================================
      // VERIFY OTP
      // ========================================

      .addCase(verifyOtp.pending, pending)

      .addCase(verifyOtp.rejected, rejected)

      .addCase(verifyOtp.fulfilled, (state, action) => {
        state.isLoading = false;

        state.status = "success";

        state.otpVerified = true;

        state.successMessage =
          action.payload?.data || "OTP verified successfully";

        state.currentStep = 4;
      })

      // ========================================
      // RESEND OTP
      // ========================================

      .addCase(resendOtp.pending, (state) => {
        state.resendStatus = "loading";

        state.error = null;
      })

      .addCase(resendOtp.rejected, (state, action) => {
        state.resendStatus = "failed";

        state.error = action.payload || "Failed to resend OTP";
      })

      .addCase(resendOtp.fulfilled, (state, action) => {
        state.resendStatus = "success";

        // IMPORTANT
        // resend API returns NEW token

        state.otpToken = action.payload?.data?.token || null;

        state.otp = Array(6).fill("");

        state.resendCooldown = 180;

        state.successMessage =
          action.payload?.data?.message || "OTP resent successfully";
      })

      // ========================================
      // FINAL REGISTRATION
      // ========================================

      .addCase(submitRegistration.pending, pending)

      .addCase(submitRegistration.rejected, rejected)

      .addCase(submitRegistration.fulfilled, (state, action) => {
        state.isLoading = false;

        state.status = "success";

        state.authToken = action.payload?.data?.token || null;

        state.registrationComplete = true;

        state.currentStep = 7;

        state.successMessage = "Registration completed successfully";
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
  setCurrentStep,
  setOtpDigit,
  setOtpTimer,
  tickResendTimer,
  clearError,
  clearSuccessMessage,
  resetRegistration,
} = registrationSlice.actions;

export default registrationSlice.reducer;
