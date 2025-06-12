import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cartItems: [],
};

console.log(initialState, "cartItem");
const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart(state, action) {
      const existingItem = state.cartItems.find(
        (item) => item.id === action.payload.id
      );
      console.log(existingItem, "existingItem........");
      if (existingItem) {
        existingItem.qnty += 1;
      } else {
        state.cartItems.push({ ...action.payload, qnty: 1 });
      }
    },
    removeFromCart(state, action) {
      state.cartItems = state.cartItems.filter(
        (item) => item.id !== action.payload
      );
    },
    incrementQuantity(state, action) {
      const item = state.cartItems.find((item) => item.id === action.payload);
      if (item) {
        item.qnty += 1;
      }
    },
    decrementQuantity(state, action) {
      const item = state.cartItems.find((item) => item.id === action.payload);
      if (item && item.qnty > 1) {
        item.qnty -= 1;
      } else if (item && item.qnty === 1) {
        // optional: remove item if quantity becomes 0
        state.cartItems = state.cartItems.filter(
          (item) => item.id !== action.payload
        );
      }
    },
    clearCart(state) {
      state.cartItems = [];
    },
  },
});

export const { addToCart, removeFromCart, clearCart,incrementQuantity, decrementQuantity  } = cartSlice.actions;
export default cartSlice.reducer;
