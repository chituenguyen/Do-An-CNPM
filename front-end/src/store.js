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
} from "./reducers/orderReducers";

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
