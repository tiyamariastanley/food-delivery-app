import { createSlice } from "@reduxjs/toolkit";

const CartSlice = createSlice({
  name: "cart",
  initialState: {
    items: localStorage.getItem("restaurantCartItems")
      ? JSON.parse(localStorage.getItem("restaurantCartItems"))
      : [],
  },
  reducers: {
    addItem: (state, action) => {
      console.log(state.items);

      state.items.push(action.payload);
      localStorage.setItem("restaurantCartItems", JSON.stringify(state.items));
    },
    removeItem: (state, action) => {
      // Not fully implemented
      state.items.pop();
      localStorage.setItem("restaurantCartItems", JSON.stringify(state.items));
    },
    clearCart: (state) => {
      state.items.length = 0;
      localStorage.setItem("restaurantCartItems", JSON.stringify([]));
    },
  },
});

export const { addItem, removeItem, clearCart } = CartSlice.actions;
export default CartSlice.reducer;
