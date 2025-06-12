import { useSelector } from "react-redux";
import { useEffect } from "react";

const CartLogger = () => {
  const cartItems = useSelector((state) => state.cart.cartItems);

  useEffect(() => {
    console.log("Live cart items:", cartItems);
  }, [cartItems]); // log every time cartItems changes

  return null; // No UI needed, just logging
};

export default CartLogger;
