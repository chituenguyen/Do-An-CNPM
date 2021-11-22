import { createStore, applyMiddleware, combineReducers } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import {
  productDetailReducers,
  productListReducers,
} from "./reducers/productReducers";
import { cartReducers } from "./reducers/cartReducers";
import {
  userGetProfileReducer,
  userReducer,
  userRegisterReducer,
} from "./reducers/userReducers";
import {
  adminListOrder,
  orderCreateReducer,
  orderPayReducer,
  userGetMyOrder,
  userGetOrderReducer,
  orderDeliverReducer,
} from "./reducers/orderReducers";
import {
  adminCreateNewProductReducer,
  adminDeleteProductReducer,
  adminListUserReducer,
  adminUpdateProductReducer,
} from "./reducers/adminReducers";

const reducers = combineReducers({
  productList: productListReducers,
  productDetail: productDetailReducers,
  cart: cartReducers,
  userLogin: userReducer,
  userRegister: userRegisterReducer,
  userProfile: userGetProfileReducer,
  orderCreate: orderCreateReducer,
  adminListOrder: adminListOrder,
  userGetOrder: userGetOrderReducer,
  userGetMyOrder: userGetMyOrder,
  orderPay: orderPayReducer,
  adminListUser: adminListUserReducer,
  adminDeleteProduct: adminDeleteProductReducer,
  adminCreateNewProduct: adminCreateNewProductReducer,
  adminUpdateProductStore: adminUpdateProductReducer,
<<<<<<< HEAD
=======
  orderDeliver: orderDeliverReducer,
>>>>>>> 85b0cf73f4c0ee34885aef455e6393dd184f48fd
});

const cartItemsFromLocalStorage = localStorage.getItem("cartItems")
  ? JSON.parse(localStorage.getItem("cartItems"))
  : [];

const userInfoFromLocalStorage = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : null;

const AddressFromLocalStorage = localStorage.getItem("address")
  ? JSON.parse(localStorage.getItem("address"))
  : {};
const initialState = {
  cart: {
    cartItems: cartItemsFromLocalStorage,
    shipping: AddressFromLocalStorage,
  },
  userLogin: { userInfo: userInfoFromLocalStorage },
};
const middleware = [thunk];

const store = createStore(
  reducers,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
