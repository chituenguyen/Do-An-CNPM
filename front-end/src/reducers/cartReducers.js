import { CART_ADD_ITEM, CART_REMOVE_ITEM } from "./../constants/cartConstants";
export const cartReducers = (state = { cartItems: [] }, action) => {
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
    //   case CART_REMOVE_ITEM:
    //     return { loading: false, products: action.payload };
    default:
      return state;
  }
};
// export const cartReducers = (state = { cartItem: [] }, action) => {
//   switch (action.type) {
//     case CART_ADD_ITEM:
//       const item = action.payload;
//       const existItem = state.cartItem.find(
//         (x) => x.product._id == item.product._id
//       );
//       if (existItem) {
//         return {
//           ...state,
//           cartItems: [
//             ...state.cartItems.map((x) =>
//               x.product._id === item.product._id ? item : x
//             ),
//           ],
//         };
//       } else {
//         return {
//           ...state,
//           cartItems: [...state.cartItems, item],
//         };
//       }
//     default:
//       return state;
//   }
// };
