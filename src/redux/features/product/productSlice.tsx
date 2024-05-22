import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState = {
  cart: [] as CartItem[],
};

interface CartItem {
  id: string;
}

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<CartItem>) => {
      state.cart.push(action.payload);
    },
    removeFromCart: (state, action: PayloadAction<{ id: string }>) => {
      state.cart = state.cart.filter((item) => item.id !== action.payload.id);
    },
  },
});

export const { addToCart, removeFromCart } = productSlice.actions;
export default productSlice.reducer;
