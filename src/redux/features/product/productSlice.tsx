import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CartProduct } from "../../../types/cart/product";

const initialState: CartProduct[] = [];

const productSlice = createSlice({
  name: "product",
  initialState: {
    cart: initialState,
  },
  reducers: {
    addToCart: (state, action) => {
      action.payload;
      state.cart.push(action.payload);
    },

    editCart: (state, action) => {
      state.cart[action.payload.index] = action.payload.val;
    },

    setCart: (state, action: PayloadAction<CartProduct[]>) => {
      state.cart = action.payload;
    },

    removeFromCart: (state, action: PayloadAction<{ id: string }>) => {
      state.cart = state.cart.filter((item) => item.id !== action.payload.id);
    },
  },
});

export const { addToCart, removeFromCart, editCart, setCart } =
  productSlice.actions;
export default productSlice.reducer;
