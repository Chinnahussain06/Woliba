import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../api/api";

// error handling helper
const getErrorMessage = (error) => {  
  if (error.response?.data) {
    const resData = error.response.data;

    if (resData?.data?.message) {
      return resData.data.message;
    } 
    if (resData?.message) {
      return resData.message;
    }
    if (resData?.error) {
      return resData.error;
    }
  }

  // Fallback
  return error.message || "Something went wrong";
};

// company verification
export const verifyCompany = createAsyncThunk(
  "registration/verifyCompany",
  async (payload, { rejectWithValue }) => {
    try {
      const res = await api.post(
        "/verify-by-company-name-and-password",
        payload,
      );
      return res.data;
    } catch (err) {
      return rejectWithValue(getErrorMessage(err));
    }
  },
);

// save user details & send OTP
export const saveUserDetails = createAsyncThunk(
  "registration/saveUserDetails",
  async (payload, { rejectWithValue }) => {
    try {
      const res = await api.post("/save-user-details-and-send-otp", payload);
      return res.data;
    } catch (err) {
      return rejectWithValue(getErrorMessage(err));
    }
  },
);

// OTP verification
export const verifyOtp = createAsyncThunk(
  "registration/verifyOtp",
  async (payload, { rejectWithValue }) => {
    try {
      const res = await api.post("/verify-otp-for-user-registration", payload);
      return res.data;
    } catch (err) {
      return rejectWithValue(getErrorMessage(err));
    }
  },
);

// Resend OTP
export const resendOtp = createAsyncThunk(
  "registration/resendOtp",
  async (payload, { rejectWithValue }) => {
    try {
      const res = await api.post("/send-otp-for-user-registration", payload);
      return res.data;
    } catch (err) {
      return rejectWithValue(getErrorMessage(err));
    }
  },
);

// fetch interests
export const fetchInterests = createAsyncThunk(
  "registration/fetchInterests",
  async (_, { rejectWithValue }) => {
    try {
      const res = await api.get("/viewWellnessInterest");
      const interests = res.data?.data?.[0] ?? [];
      return interests;
    } catch (err) {
      return rejectWithValue(getErrorMessage(err));
    }
  },
);

// fetch pillars
export const fetchPillars = createAsyncThunk(
  "registration/fetchPillars",
  async (languageId = 1, { rejectWithValue }) => {
    try {
      const res = await api.get(`/get-wellbeing-pillars/${languageId}`);
      return res.data?.data ?? [];
    } catch (err) {
      return rejectWithValue(getErrorMessage(err));
    }
  },
);

// final registration submission
export const submitRegistration = createAsyncThunk(
  "registration/submit",
  async (payload, { rejectWithValue }) => {
    try {
      const res = await api.post("/user-registration", payload);

      if (res.data?.status !== "success") {
        return rejectWithValue(
          getErrorMessage({ response: { data: res.data?.error } }),
        );
      }

      return res.data;
    } catch (err) {
      return rejectWithValue(getErrorMessage(err));
    }
  },
);
