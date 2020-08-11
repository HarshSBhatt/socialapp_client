//! Built-in or Third Party Packages

import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";

//! User Files

import rootReducer from "./reducers";

const middleware = [thunk];
const initialState = {};

export const ConfigureStore = () => {
  const store = createStore(
    rootReducer,
    initialState,
    composeWithDevTools(applyMiddleware(...middleware))
    //! OR compose(applyMiddleware(...middleware), window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())
  );

  return store;
};
