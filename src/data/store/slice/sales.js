import { createSlice } from "@reduxjs/toolkit";

export const salesSlice = createSlice({
  name: "sales",
  initialState: {
    salesData: null,
  },
  reducers: {
    setSalesData: (state, action) => {
      state.salesData = action.payload;
    },
  },
});

export const { setSalesData } = salesSlice.actions;

export default salesSlice.reducer;
