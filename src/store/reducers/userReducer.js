import * as ActionTypes from "../actionTypes";
import isEmpty from "../../utils/is-empty";

const initialState = {
  isLoading: false,
  isAuthenticated: false,
  token: localStorage.getItem("token"),
  user: {},
  userData: {},
  errMess: null,
};
export const UserReducer = (state = initialState, action) => {
  switch (action.type) {
    //! Signup

    case ActionTypes.SIGNUP_REQUEST:
      return {
        ...state,
        isLoading: true,
        isAuthenticated: false,
      };
    case ActionTypes.SIGNUP_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isAuthenticated: true,
        errMess: "",
        token: action.token,
      };

    case ActionTypes.SIGNUP_FAILURE:
      return {
        ...state,
        isLoading: false,
        isAuthenticated: false,
        errMess: action.message,
      };

    //! Login

    case ActionTypes.LOGIN_REQUEST:
      return {
        ...state,
        isLoading: true,
        isAuthenticated: false,
      };
    case ActionTypes.LOGIN_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isAuthenticated: true,
        errMess: "",
        token: action.token,
      };

    case ActionTypes.LOGIN_FAILURE:
      return {
        ...state,
        isLoading: false,
        isAuthenticated: false,
        errMess: action.message,
      };

    //! Logout

    case ActionTypes.LOGOUT_REQUEST:
      return {
        ...state,
        isLoading: true,
        isAuthenticated: true,
      };
    case ActionTypes.LOGOUT_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isAuthenticated: false,
        token: "",
        user: null,
        userData: null,
      };

    //! User data

    case ActionTypes.SET_CURRENT_USER:
      return {
        ...state,
        isAuthenticated: !isEmpty(action.payload),
        user: action.payload,
      };
    case ActionTypes.SET_USER_DATA:
      return {
        ...state,
        userData: action.payload,
      };
    default:
      return state;
  }
};
