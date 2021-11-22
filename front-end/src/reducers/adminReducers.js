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
  ADMIN_CREATE_NEW_PRODUCT_RESET,
  ADMIN_UPDATE_PRODUCT_REQUEST,
  ADMIN_UPDATE_PRODUCT_SUCCESS,
  ADMIN_UPDATE_PRODUCT_FAIL,
  ADMIN_UPDATE_PRODUCT_RESET,
} from "./../constants/adminConstants";

export const adminListUserReducer = (state = { users: [] }, action) => {
  switch (action.type) {
    case ADMIN_LIST_USER_REQUEST:
      return {
        loading: true,
        users: [],
      };
    case ADMIN_LIST_USER_SUCCESS:
      return {
        loading: false,
        users: action.payload,
      };
    case ADMIN_LIST_USER_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const adminDeleteProductReducer = (state = {}, action) => {
  switch (action.type) {
    case ADMIN_DELETE_PRODUCT_REQUEST:
      return {
        loading: true,
      };
    case ADMIN_DELETE_PRODUCT_SUCCESS:
      return {
        loading: false,
        success: true,
      };
    case ADMIN_DELETE_PRODUCT_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const adminCreateNewProductReducer = (state = {}, action) => {
  switch (action.type) {
    case ADMIN_CREATE_NEW_PRODUCT_REQUEST:
      return {
        loading: true,
      };
    case ADMIN_CREATE_NEW_PRODUCT_SUCCESS:
      return {
        loading: false,
        success: true,
        product: action.payload,
      };
    case ADMIN_CREATE_NEW_PRODUCT_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case ADMIN_CREATE_NEW_PRODUCT_RESET:
      return {};
    default:
      return state;
  }
};

export const adminUpdateProductReducer = (state = {}, action) => {
  switch (action.type) {
    case ADMIN_UPDATE_PRODUCT_REQUEST:
      return {
        loading: true,
      };
    case ADMIN_UPDATE_PRODUCT_SUCCESS:
      return {
        loading: false,
        success: true,
      };
    case ADMIN_UPDATE_PRODUCT_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case ADMIN_UPDATE_PRODUCT_RESET:
      return {};
    default:
      return state;
  }
};
