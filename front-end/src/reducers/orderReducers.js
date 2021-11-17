import {
  ORDER_CREATE_FAIL,
  ORDER_CREATE_REQUEST,
  ORDER_CREATE_SUCCESS,
  ADMIN_LIST_ORDER_REQUEST,
  ADMIN_LIST_ORDER_SUCCESS,
  ADMIN_LIST_ORDER_FAIL,
  USER_GET_ORDER,
  LOADING,
  ORDER_DETAILS_FAIL,
  USER_GET_MY_ORDER,
  ORDER_PAY_REQUEST,
  ORDER_PAY_SUCCESS,
  ORDER_PAY_FAIL,
  ORDER_PAY_RESET,
} from "./../constants/orderConstants";
export const orderCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case ORDER_CREATE_REQUEST:
      return {
        loading: true,
      };
    case ORDER_CREATE_SUCCESS:
      return {
        loading: false,
        success: true,
        order: action.payload,
      };
    case ORDER_CREATE_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    // case ORDER_CREATE_RESET:
    //     return {}
    default:
      return state;
  }
};

export const adminListOrder = (state = { order: [] }, action) => {
  switch (action.type) {
    case ADMIN_LIST_ORDER_REQUEST:
      return {
        loading: true,
        order: [],
      };
    case ADMIN_LIST_ORDER_SUCCESS:
      return {
        loading: false,
        order: action.payload,
      };
    case ADMIN_LIST_ORDER_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const userGetOrderReducer = (
  state = { loading: true, orderItems: [], shippingAddress: {}, user: {} },
  action
) => {
  switch (action.type) {
    case LOADING:
      return {
        ...state,
      };
    case USER_GET_ORDER:
      return {
        loading: false,
        order: action.payload,
      };
    case ORDER_DETAILS_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const userGetMyOrder = (
  state = { order: [], loading: true },
  action
) => {
  switch (action.type) {
    case USER_GET_MY_ORDER:
      return {
        loading: false,
        order: action.payload,
      };

    default:
      return state;
  }
};

export const orderPayReducer = (state = {}, action) => {
  switch (action.type) {
    case ORDER_PAY_REQUEST:
      return {
        loading: true,
      };
    case ORDER_PAY_SUCCESS:
      return {
        loading: false,
        success: true,
      };
    case ORDER_PAY_FAIL:
      return {
        loading: false,
        error: action.payload,
      };

    case ORDER_PAY_RESET:
      return {};
    default:
      return state;
  }
};
