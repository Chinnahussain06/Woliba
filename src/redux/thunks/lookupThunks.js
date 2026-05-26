import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../api/api";

export const fetchInterests = createAsyncThunk(
  "interests/fetch",
  async (_, { rejectWithValue }) => {
    try {
      const res = await api.get("/viewWellnessInterest");

      console.log("Fetched Interests:", res?.data);

      const data = res?.data?.data?.[0] || []; // ✅ FIX HERE

      console.log("Processed Interests Data:", data);

      return data;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  },
);

export const fetchPillars = createAsyncThunk(
  "pillars/fetch",
  async (languageId = 1, { rejectWithValue }) => {
    try {
      const data = await api.get(`/get-wellbeing-pillars/${languageId}`);
      return data.data;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  },
);
