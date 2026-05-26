import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../api/api";

export const verifyOtp = createAsyncThunk(
  "registration/verifyOtp",
  async (payload, { rejectWithValue }) => {
    try {
      const response = await api.post(
        "/verify-otp-for-user-registration",
        payload,
      );
      if (!response.status) return rejectWithValue(response.error_code);
      return true;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  },
);

export const resendOtp = createAsyncThunk(
  "registration/resendOtp",
  async (payload, { rejectWithValue }) => {
    try {
      const data = await api.post("/send-otp-for-user-registration", payload);
      if (!data.status) return rejectWithValue(data.error_code);
      return data.data.token;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  },
);
