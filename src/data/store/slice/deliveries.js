import { createSlice } from "@reduxjs/toolkit";

export const deliverySlice = createSlice({
  name: "delivery",
  initialState: {
    deliveryData: null,
  },
  reducers: {
    setDeliveryData: (state, action) => {
      state.deliveryData = action.payload;
    },
  },
});

export const { setDeliveryData } = deliverySlice.actions;

export default deliverySlice.reducer;
