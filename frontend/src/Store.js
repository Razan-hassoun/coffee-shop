import { createStore } from "redux";
import cartReducer from "./redux/reducers/cart_reducer";
import { combineReducers } from "redux";

const Store = createStore(
  combineReducers({
    cart: cartReducer,
  })
);

export default Store;