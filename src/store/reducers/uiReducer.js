import * as ActionTypes from "../actionTypes";

const initialState = {
  isLoading: false,
  errors: null,
};

export const UiReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.SET_ERRORS:
      return {
        ...state,
        isLoading: false,
        errors: action.payload,
      };
    case ActionTypes.CLEAR_ERRORS:
      return {
        ...state,
        isLoading: false,
        errors: null,
      };
    case ActionTypes.LOADING_UI:
      return {
        ...state,
        isLoading: true,
      };
    default:
      return state;
  }
};
