//! Built-in or Third Party Packages

import { combineReducers } from "redux";

//! User Files

import { DataReducer } from "./dataReducer";
import { UserReducer } from "./userReducer";

export default combineReducers({
  dataReducer: DataReducer,
  userReducer: UserReducer,
});
