import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    setCart: (state, action) => {
      state.items = action.payload;
    },

    addToCart: (state, action) => {
      const item = state.items.find((i) => i._id === action.payload._id);

      if (item) {
        item.quantity += 1;
      } else {
        state.items.push({ ...action.payload, quantity: 1 });
      }

      localStorage.setItem("cart", JSON.stringify(state.items));
    },

    increaseQty: (state, action) => {
      const item = state.items.find((i) => i._id === action.payload);
      if (item) item.quantity += 1;

      localStorage.setItem("cart", JSON.stringify(state.items));
    },

    decreaseQty: (state, action) => {
      const item = state.items.find((i) => i._id === action.payload);
      if (item && item.quantity > 1) item.quantity -= 1;

      localStorage.setItem("cart", JSON.stringify(state.items.quantity));
    },

    removeItem: (state, action) => {
      state.items = state.items.filter((i) => i._id !== action.payload);
      localStorage.setItem("cart", JSON.stringify(state.items));
     
    },

    clearCart: (state) => {
      state.items = [];
      localStorage.removeItem("cart");
    },
  },
});

export const { setCart, addToCart, increaseQty, decreaseQty, removeItem, clearCart } = cartSlice.actions;

export default cartSlice.reducer;
