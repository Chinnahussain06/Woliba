import { createSlice } from "@reduxjs/toolkit";

import { fetchInterests } from "../thunks/lookupThunks";

const initialState = {
  all: [],
  selectedIds: [],
  status: "idle",
  error: null,
};

const interestSlice = createSlice({
  name: "interests",

  initialState,

  reducers: {
    toggleInterest: (state, action) => {
      const id = action.payload;

      if (state.selectedIds.includes(id)) {
        state.selectedIds = state.selectedIds.filter((item) => item !== id);
      } else {
        state.selectedIds.push(id);
      }
    },

    clearInterests: (state) => {
      state.selectedIds = [];
    },
  },

  extraReducers: (builder) => {
    builder

      .addCase(fetchInterests.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })

      .addCase(fetchInterests.fulfilled, (state, action) => {
        state.status = "success";

        state.all = action.payload || [];
      })

      .addCase(fetchInterests.rejected, (state, action) => {
        state.status = "failed";

        state.error = action.payload || "Failed to fetch interests";
      });
  },
});

export const { toggleInterest, clearInterests } = interestSlice.actions;

export default interestSlice.reducer;
