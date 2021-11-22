import {
  ADMIN_CREATE_NEW_PRODUCT_FAIL,
  ADMIN_CREATE_NEW_PRODUCT_REQUEST,
  ADMIN_CREATE_NEW_PRODUCT_SUCCESS,
  ADMIN_DELETE_PRODUCT_FAIL,
  ADMIN_DELETE_PRODUCT_REQUEST,
  ADMIN_DELETE_PRODUCT_SUCCESS,
  ADMIN_LIST_USER_FAIL,
  ADMIN_LIST_USER_REQUEST,
  ADMIN_LIST_USER_SUCCESS,
  ADMIN_UPDATE_PRODUCT_FAIL,
  ADMIN_UPDATE_PRODUCT_REQUEST,
  ADMIN_UPDATE_PRODUCT_SUCCESS,
} from "./../constants/adminConstants";
import axios from "axios";

export const adminListUserAction = (token) => async (dispatch) => {
  try {
    dispatch({
      type: ADMIN_LIST_USER_REQUEST,
    });
    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    const { data } = await axios.get(`/api/users/`, config);
    dispatch({
      type: ADMIN_LIST_USER_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: ADMIN_LIST_USER_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};

export const adminDeleteProductAction = (id, token) => async (dispatch) => {
  try {
    dispatch({
      type: ADMIN_DELETE_PRODUCT_REQUEST,
    });
    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    const { data } = await axios.delete(
      `/api/admindeleteproduct/${id}`,
      config
    );
    dispatch({
      type: ADMIN_DELETE_PRODUCT_SUCCESS,
    });
  } catch (error) {
    dispatch({
      type: ADMIN_DELETE_PRODUCT_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};
export const adminCreateNewProductAction = (token) => async (dispatch) => {
  try {
    dispatch({
      type: ADMIN_CREATE_NEW_PRODUCT_REQUEST,
    });
    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    console.log(token);
    const { data } = await axios.post(`/api/admincreatenewproduct`, {}, config);
    dispatch({
      type: ADMIN_CREATE_NEW_PRODUCT_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: ADMIN_CREATE_NEW_PRODUCT_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};

export const adminUpdateProductAction =
  (product, token) => async (dispatch) => {
    console.log(product);
    try {
      dispatch({
        type: ADMIN_UPDATE_PRODUCT_REQUEST,
      });
      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };
      const { data } = await axios.put(
        `/api/adminupdateproduct/${product._id}`,
        { product },
        config
      );
      dispatch({
        type: ADMIN_UPDATE_PRODUCT_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: ADMIN_UPDATE_PRODUCT_FAIL,
        payload:
          error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message,
      });
    }
  };
