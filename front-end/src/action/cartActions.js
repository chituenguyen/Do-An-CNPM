import {
  CART_ADD_ITEM,
  CART_PAYMENT_METHOD,
  CART_REMOVE_ITEM,
  CART_SAVE_SHIPPING_ADDRESS,
} from "./../constants/cartConstants";
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

export const saveShippingAddress = (data) => (dispatch) => {
  dispatch({
    type: CART_SAVE_SHIPPING_ADDRESS,
    payload: data,
  });

  localStorage.setItem("address", JSON.stringify(data));
};

export const savePaymentMethod = (data) => (dispatch) => {
  dispatch({
    type: CART_PAYMENT_METHOD,
    payload: data,
  });

  localStorage.setItem("payment", JSON.stringify(data));
};
export const removeItem = (id) => {
  let cartItemsTemp = JSON.parse(localStorage.getItem("cartItems"));
  let cartItems = cartItemsTemp.filter((product) => product.product._id !== id);
  localStorage.setItem("cartItems", JSON.stringify(cartItems));
};
