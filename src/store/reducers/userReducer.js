import * as ActionTypes from "../actionTypes";
import isEmpty from "../../utils/is-empty";

const initialState = {
  isLoading: false,
  isProfileLoading: false,
  isAuthenticated: false,
  token: localStorage.getItem("authToken"),
  verifyEmail: { loading: false, error: null, success: false },
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
        isProfileLoading: true,
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
        isProfileLoading: false,
        isAuthenticated: false,
        errMess: action.message,
      };

    //! Email verification

    case ActionTypes.VERIFY_START:
      return {
        ...state,
        verifyEmail: {
          ...state.verifyEmail,
          loading: true,
        },
      };
    case ActionTypes.VERIFY_SUCCESS:
      return {
        ...state,
        verifyEmail: {
          ...state.verifyEmail,
          loading: false,
          error: null,
          success: action.payload,
        },
      };
    case ActionTypes.VERIFY_FAILED:
      return {
        ...state,
        verifyEmail: {
          ...state.verifyEmail,
          loading: false,
          success: false,
          error: action.payload,
        },
      };
    //! Login

    case ActionTypes.LOGIN_REQUEST:
      return {
        ...state,
        isLoading: true,
        isProfileLoading: true,
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
        isProfileLoading: false,
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
        isProfileLoading: false,
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
    case ActionTypes.FETCH_USER_DATA_REQUEST:
      return {
        ...state,
        isProfileLoading: true,
      };
    case ActionTypes.SET_USER_DATA:
      return {
        ...state,
        isProfileLoading: false,
        userData: action.payload,
      };
    case ActionTypes.FETCH_USER_DATA_FAILED:
      return {
        ...state,
        isProfileLoading: false,
        userData: null,
      };

    //! Like or Unlike screams

    case ActionTypes.LIKE_SCREAM:
      return {
        ...state,
        userData: {
          ...state.userData,
          likes: [
            ...state.userData.likes,
            {
              userHandle: state.userData.credentials.handle,
              screamId: action.payload.screamId,
            },
          ],
        },
      };

    case ActionTypes.UNLIKE_SCREAM:
      return {
        ...state,
        userData: {
          ...state.userData,
          likes: state.userData.likes.filter(
            (like) => like.screamId !== action.payload.screamId
          ),
        },
      };

    default:
      return state;
  }
};
