import {
  CART_ADD_ITEM,
  CART_REMOVE_ITEM,
  CART_SAVE_SHIPPING_ADDRESS,
  CART_PAYMENT_METHOD,
} from "./../constants/cartConstants";
import {
  CART_CLEAR_ITEMS,
  REMOVE_ADDRESS,
} from "./../constants/orderConstants";
export const cartReducers = (
  state = { cartItems: [], shipping: {}, payment: {} },
  action
) => {
  switch (action.type) {
    case CART_ADD_ITEM:
      const item = action.payload;
      const existItem = state.cartItems.find(
        (x) => x.product._id === item.product._id
      );
      if (existItem) {
        return {
          ...state,
          cartItems: [
            ...state.cartItems.map((x) =>
              x.product._id === item.product._id ? item : x
            ),
          ],
        };
      } else {
        return {
          ...state,
          cartItems: [...state.cartItems, item],
        };
      }
    case CART_SAVE_SHIPPING_ADDRESS:
      return {
        ...state,
        shipping: action.payload,
      };
    case CART_PAYMENT_METHOD:
      return {
        ...state,
        payment: action.payload,
      };
    case CART_REMOVE_ITEM:
      return {
        ...state,
        cartItems: state.cartItems.filter((x) => x.product !== action.payload),
      };
    case CART_CLEAR_ITEMS:
      return {
        ...state,
        cartItems: [],
        shipping: [],
        paymentMethod: {},
      };
    default:
      return state;
  }
};
