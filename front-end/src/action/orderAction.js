import {
  ADMIN_LIST_ORDER_REQUEST,
  ADMIN_LIST_ORDER_SUCCESS,
  ADMIN_LIST_ORDER_FAIL,
  ORDER_CREATE_FAIL,
  ORDER_CREATE_REQUEST,
  ORDER_CREATE_SUCCESS,
  USER_GET_ORDER,
  LOADING,
  ORDER_DETAILS_FAIL,
  USER_GET_MY_ORDER,
} from "./../constants/orderConstants";
import axios from "axios";

export const createOrder = (order) => async (dispatch, getState) => {
  try {
    dispatch({
      type: ORDER_CREATE_REQUEST,
    });
    const {
      userLogin: { userInfo },
    } = getState();
    console.log(userInfo);
    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.post(`/api/order/`, order, config);
    dispatch({
      type: ORDER_CREATE_SUCCESS,
      payload: data,
    });

    // dispatch({
    //   type: CART_CLEAR_ITEMS,
    // });
    // localStorage.removeItem("cart");
  } catch (error) {
    dispatch({
      type: ORDER_CREATE_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};

export const adminListOrder = (token) => async (dispatch) => {
  try {
    dispatch({
      type: ADMIN_LIST_ORDER_REQUEST,
    });
    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    const { data } = await axios.get(`/api/adminlistorder/`, config);
    dispatch({
      type: ADMIN_LIST_ORDER_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: ADMIN_LIST_ORDER_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};

export const userGetOrder = (token, id) => async (dispatch) => {
  try {
    dispatch({
      type: LOADING,
    });
    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    const { data } = await axios.get(`/api/usergetorder/${id} `, config);
    dispatch({
      type: USER_GET_ORDER,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: ORDER_DETAILS_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};

export const userGetMyOrder = (token) => async (dispatch) => {
  const config = {
    headers: {
      "Content-type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };
  const { data } = await axios.get(`/api/usergetlistorder`, config);
  dispatch({
    type: USER_GET_MY_ORDER,
    payload: data,
  });
};
