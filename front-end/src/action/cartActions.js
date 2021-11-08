import { CART_ADD_ITEM, CART_REMOVE_ITEM } from "./../constants/cartConstants";
import axios from "axios";
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

export const removeItem = (id) => {
  let cartItemsTemp = JSON.parse(localStorage.getItem("cartItems"))
  let cartItems = cartItemsTemp.filter(product => product.product._id !== id )
  localStorage.setItem("cartItems", JSON.stringify(cartItems));
};
