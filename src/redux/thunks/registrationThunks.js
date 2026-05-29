import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../api/api";

const getErrorMessage = (error) => {
  if (!error) return "Something went wrong";

  if (error.response?.data) {
    const resData = error.response.data;
    if (resData?.data?.message) return resData.data.message;
    if (resData?.message) return resData.message;
    if (resData?.error) return resData.error;
  }

  return error.message || "Something went wrong";
};

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

export const fetchInterests = createAsyncThunk(
  "registration/fetchInterests",
  async (_, { rejectWithValue }) => {
    try {
      const res = await api.get("/viewWellnessInterest");
      return res.data?.data?.[0] ?? [];
    } catch (err) {
      return rejectWithValue(getErrorMessage(err));
    }
  },
);

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

export const submitRegistration = createAsyncThunk(
  "registration/submit",
  async (payload, { rejectWithValue }) => {
    try {
      const res = await api.post("/user-registration", payload);

      if (res.data?.status !== "success") {
        return rejectWithValue(
          res.data?.error?.message ?? res.data?.error ?? "Registration failed",
        );
      }

      return res.data;
    } catch (err) {
      return rejectWithValue(getErrorMessage(err));
    }
  },
);
