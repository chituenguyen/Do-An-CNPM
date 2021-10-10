import { createStore, applyMiddleware, combineReducers } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import {
  productDetailReducers,
  productListReducers,
} from "./reducers/productReducers";
import { cartReducers } from "./reducers/cartReducers";

const reducers = combineReducers({
  productList: productListReducers,
  productDetail: productDetailReducers,
  cart: cartReducers,
});

const cartItemsFromLocalStorage = localStorage.getItem("cartItems")
  ? JSON.parse(localStorage.getItem("cartItems"))
  : [];
const initialState = {
  cart: { cartItems: cartItemsFromLocalStorage },
};
console.log(initialState);
const middleware = [thunk];

const store = createStore(
  reducers,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
