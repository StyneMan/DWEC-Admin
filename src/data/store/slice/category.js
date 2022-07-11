import { createSlice } from "@reduxjs/toolkit";

export const categorySlice = createSlice({
  name: "category",
  initialState: {
    categoryData: null,
  },
  reducers: {
    setCategoryData: (state, action) => {
      state.categoryData = action.payload;
    },
  },
});

export const { setCategoryData } = categorySlice.actions;

export default categorySlice.reducer;
