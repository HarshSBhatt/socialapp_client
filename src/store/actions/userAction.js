import axios from "axios";
import jwt_decode from "jwt-decode";

import * as ActionTypes from "../actionTypes";
import { setAuthHeader } from "../../utils/setAuthHeader";
import { openNotificationWithIcon } from "../../utils/CustomNotification";

export const setCurrentUser = (decoded) => {
  return {
    type: ActionTypes.SET_CURRENT_USER,
    payload: decoded,
  };
};

//! Signup User

export const requestSignup = () => {
  return {
    type: ActionTypes.SIGNUP_REQUEST,
  };
};

export const receiveSignup = (token) => {
  return {
    type: ActionTypes.SIGNUP_SUCCESS,
    token,
  };
};

export const signupError = (message) => {
  return {
    type: ActionTypes.SIGNUP_FAILURE,
    message,
  };
};

export const signupUser = (newUserData) => (dispatch) => {
  dispatch(requestSignup());

  axios
    .post("/signup", newUserData)
    .then((res) => {
      const authToken = `Bearer ${res.data.token}`;
      localStorage.setItem("authToken", authToken);

      const decoded = jwt_decode(authToken);
      setAuthHeader(authToken);
      dispatch(receiveSignup(authToken));
      dispatch(setCurrentUser(decoded));
      dispatch(getUserData());
    })
    .catch((err) => {
      dispatch(signupError(err.response.data));
    });
};

//! Login user

export const requestLogin = () => {
  return {
    type: ActionTypes.LOGIN_REQUEST,
  };
};

export const receiveLogin = (token) => {
  return {
    type: ActionTypes.LOGIN_SUCCESS,
    token,
  };
};

export const loginError = (message) => {
  return {
    type: ActionTypes.LOGIN_FAILURE,
    message,
  };
};

export const loginUser = (userData) => (dispatch) => {
  dispatch(requestLogin());

  axios
    .post("/login", userData)
    .then((res) => {
      const authToken = `Bearer ${res.data.token}`;
      localStorage.setItem("authToken", authToken);

      const decoded = jwt_decode(authToken);
      setAuthHeader(authToken);
      dispatch(receiveLogin(authToken));
      dispatch(setCurrentUser(decoded));
      dispatch(getUserData());
    })
    .catch((err) => {
      dispatch(loginError(err.response.data));
    });
};

//! Get User Data

export const requestForUserData = () => {
  return {
    type: ActionTypes.FETCH_USER_DATA_REQUEST,
  };
};

export const setUserData = (userData) => {
  return {
    type: ActionTypes.SET_USER_DATA,
    payload: userData,
  };
};

export const failedToSetUserData = (message) => {
  return {
    type: ActionTypes.FETCH_USER_DATA_FAILED,
    message,
  };
};

export const getUserData = () => (dispatch) => {
  dispatch(requestForUserData());
  axios
    .get("/user")
    .then((res) => {
      dispatch(setUserData(res.data));
    })
    .catch((err) => {
      console.log(err);
      dispatch(failedToSetUserData(err.response));
    });
};

//! Edit User Details

export const editUserDetails = (userDetails) => (dispatch) => {
  axios
    .post("/user", userDetails)
    .then(() => {
      dispatch(getUserData());
      openNotificationWithIcon("success", "Profile updated successfully");
    })
    .catch((err) => {
      console.log(err);
      openNotificationWithIcon(
        "error",
        "Something went wrong. Please try again later!"
      );
    });
};

//! Logs the user out

export const requestLogout = () => {
  return {
    type: ActionTypes.LOGOUT_REQUEST,
  };
};

export const receiveLogout = () => {
  return {
    type: ActionTypes.LOGOUT_SUCCESS,
  };
};

export const logoutUser = () => (dispatch) => {
  delete axios.defaults.headers.common["Authorization"];
  dispatch(requestLogout());
  localStorage.removeItem("authToken");
  dispatch(receiveLogout());
};

//! Upload Profile Picture

export const uploadImage = (formData) => (dispatch) => {
  axios
    .post("/user/image", formData)
    .then(() => {
      dispatch(getUserData());
      openNotificationWithIcon("success", "Image uploaded successfully");
    })
    .catch((err) => {
      console.log(err);
      openNotificationWithIcon("error", "Image upload failed.");
    });
};
