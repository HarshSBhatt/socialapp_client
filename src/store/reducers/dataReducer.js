import * as ActionTypes from "../actionTypes";

const initialState = {
  isLoading: false,
  scream: {},
  screams: [],
  error: null,
};

export const DataReducer = (state = initialState, action) => {
  switch (action.type) {
    //! Get all screams

    case ActionTypes.SCREAMS_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case ActionTypes.SET_SCREAMS:
      return {
        ...state,
        isLoading: false,
        screams: action.screams,
      };
    case ActionTypes.SCREAMS_FAILED:
      return {
        ...state,
        isLoading: false,
        screams: [],
        error: action.error,
      };

    //! Like or Unlike screams

    case ActionTypes.LIKE_SCREAM:
    case ActionTypes.UNLIKE_SCREAM:
      let index = state.screams.findIndex(
        (scream) => scream.screamId === action.payload.screamId
      );
      state.screams[index] = action.payload;

      return {
        ...state,
      };

    default:
      return state;
  }
};
