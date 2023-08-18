import { configureStore } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  customer: null,
  business: null,
};

export const counterSlice = createSlice({
  name: "store",
  initialState,
  reducers: {
    setCustomer: (state, action) => {
      state.customer = action.payload;
    },
    setBusiness: (state, action) => {
      state.business = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setCustomer, setBusiness } = counterSlice.actions;

export default counterSlice.reducer;
