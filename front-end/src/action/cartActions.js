import { CART_ADD_ITEM, CART_REMOVE_ITEM } from "./../constants/cartConstants";
import axios from "axios";
// export const addToCart = (id, qty) => async (dispatch, getState) => {
//   const { data } = await axios.get(`/api/products/${id}`);
//   dispatch({
//     type: CART_ADD_ITEM,
//     payload: {
//       product: data,
//       quantity: parseInt(qty),
//     },
//   });

//   localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
// };

export const addToCart = (id, qty) => async (dispatch, getState) => {
  const { data } = await axios.get(`/api/products/${id}`);
  dispatch({
    type: CART_ADD_ITEM,
    payload: {
      product: data,
      quantity: parseInt(qty),
    },
  });
  localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
};
