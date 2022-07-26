import { createSlice } from "@reduxjs/toolkit";

export const deliverySlice = createSlice({
  name: "delivery",
  initialState: {
    deliveryData: null,
    salesDeliveryData: null,
  },
  reducers: {
    setDeliveryData: (state, action) => {
      state.deliveryData = action.payload;
    },
    setSalesDeliveryData: (state, action) => {
      state.salesDeliveryData = action.payload;
    },
  },
});

export const { setDeliveryData, setSalesDeliveryData } = deliverySlice.actions;

export default deliverySlice.reducer;
