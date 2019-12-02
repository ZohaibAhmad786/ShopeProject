import React from 'react';
import { Provider } from "react-redux";
import { createStore, combineReducers,applyMiddleware } from "redux";
import productReducers from "./store/reducers/products";
import ShopNavigator from './navigation/ShopNavigator';
import cartReducer from "./store/reducers/cart";
import {composeWithDevTools} from 'redux-devtools-extension'
import orderReducer from './store/reducers/orders';
import ReduxThunk from "redux-thunk";
import authReducer from './store/reducers/auth';
import NavigationContainer from './navigation/NavigationContainer';


const rootReducer = combineReducers({
  products: productReducers,
  cart: cartReducer,
  orders:orderReducer,
  auth:authReducer
});
const store = createStore(rootReducer,applyMiddleware(ReduxThunk));

export default function App() {
  return (
    <Provider
      store={store}
    >
      <ShopNavigator  />
    </Provider>
  );
}


