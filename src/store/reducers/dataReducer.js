import * as ActionTypes from "../actionTypes";

const initialState = {
  isLoading: false,
  scream: {},
  screams: [],
  isLikeUnlikeRunning: false,
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

    case ActionTypes.LIKEUNLIKE_REQUEST:
      return {
        ...state,
        isLikeUnlikeRunning: true,
      };
    case ActionTypes.LIKE_SCREAM:
    case ActionTypes.UNLIKE_SCREAM:
      const likeUnlikeIndex = state.screams.findIndex(
        (scream) => scream.screamId === action.payload.screamId
      );
      state.screams[likeUnlikeIndex] = action.payload;

      return {
        ...state,
        isLikeUnlikeRunning: false,
      };

    case ActionTypes.LIKEUNLIKE_FAILED:
      return {
        ...state,
        isLikeUnlikeRunning: false,
        error: action.error,
      };

    //! Delete Scream

    case ActionTypes.DELETE_SCREAM_SUCCESS:
      return {
        ...state,
        screams: state.screams.filter(
          (scream) => scream.screamId !== action.payload
        ),
      };

    default:
      return state;
  }
};
