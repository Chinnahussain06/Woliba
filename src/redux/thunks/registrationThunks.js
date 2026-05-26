import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../api/api";

export const verifyCompany = createAsyncThunk(
  "registration/verifyCompany",
  async (payload, { rejectWithValue }) => {
    try {
      const response = await api.post(
        "/verify-by-company-name-and-password",
        payload,
      );
      return response?.data;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  },
);

export const saveUserDetails = createAsyncThunk(
  "registration/saveUserDetails",

  async (payload, { rejectWithValue }) => {
    try {
      const response = await api.post(
        "/save-user-details-and-send-otp",
        payload,
      );

      return response.data;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  },
);

export const submitRegistration = createAsyncThunk(
  "registration/submit",
  async (payload, { rejectWithValue }) => {
    try {
      const data = await api.post("/user-registration", payload);
      if (data.status !== "success") return rejectWithValue(data.error);
      return data.data;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  },
);
