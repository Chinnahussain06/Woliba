import { createSlice } from "@reduxjs/toolkit";
import { fetchPillars } from "../thunks/lookupThunks";

const initialState = {
  all: [],
  selectedIds: [],
  status: "idle",
  error: null,
};

const pillarSlice = createSlice({
  name: "pillars",
  initialState,
  reducers: {
    togglePillar: (state, action) => {
      const id = action.payload;

      if (state.selectedIds.includes(id)) {
        state.selectedIds = state.selectedIds.filter((x) => x !== id);
      } else {
        if (state.selectedIds.length < 3) {
          state.selectedIds.push(id);
        }
      }
    },

    setSelectedPillarIds: (state, action) => {
      state.selectedIds = action.payload;
    },

    clearPillars: (state) => {
      state.selectedIds = [];
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchPillars.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchPillars.fulfilled, (state, action) => {
        state.status = "succeeded";

        // IMPORTANT FIX: adjust to API shape
        state.all = action.payload?.data || action.payload || [];
      })
      .addCase(fetchPillars.rejected, (state) => {
        state.status = "failed";
      });
  },
});

export const { togglePillar, clearPillars, setSelectedPillarIds } =
  pillarSlice.actions;

export default pillarSlice.reducer;
