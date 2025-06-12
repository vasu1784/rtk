import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./reducer/cartSlice";
console.log(cartReducer, "cartReducer");
const store = configureStore({
  reducer: {
    cart: cartReducer,
  },
});

export default store;
