//! Built-in or Third Party Packages

import { combineReducers } from "redux";

//! User Files

import { DataReducer } from "./dataReducer";
import { UserReducer } from "./userReducer";
import { UiReducer } from "./uiReducer";

export default combineReducers({
  dataReducer: DataReducer,
  userReducer: UserReducer,
  uiReducer: UiReducer,
});
