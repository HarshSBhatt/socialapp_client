import * as ActionTypes from "../actionTypes";

const initialState = {
  isLoading: false,
  scream: {},
  screams: [],
  isLikeUnlikeRunning: false,
  screamState: { sucess: false, isLoading: false, error: null },
  commentState: { sucess: false, isSubmitting: false, error: null },
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
        error: null,
      };
    case ActionTypes.SCREAMS_FAILED:
      return {
        ...state,
        isLoading: false,
        screams: [],
        error: action.error,
      };

    //! Get single scream

    case ActionTypes.SCREAM_REQUEST:
      return {
        ...state,
        screamState: {
          ...state.screamState,
          isLoading: true,
        },
      };
    case ActionTypes.SET_SCREAM:
      return {
        ...state,
        scream: action.scream,
        screamState: {
          ...state.screamState,
          isLoading: false,
          success: true,
          error: null,
        },
      };
    case ActionTypes.SCREAM_FAILED:
      return {
        ...state,
        screamState: {
          ...state.screamState,
          isLoading: false,
          success: false,
          error: action.error,
        },
      };

    //! Post Scream

    case ActionTypes.POST_SCREAM_STATRT:
      return {
        ...state,
        screamState: {
          ...state.screamState,
          isLoading: true,
        },
      };
    case ActionTypes.POST_SCREAM_SUCCESSS:
      return {
        ...state,
        screams: [action.scream, ...state.screams],
        screamState: {
          ...state.screamState,
          isLoading: false,
          error: null,
        },
      };
    case ActionTypes.POST_SCREAM_FAILED:
      return {
        ...state,
        screamState: {
          ...state.screamState,
          isLoading: false,
          error: action.error,
        },
      };

    //! Post Comment

    case ActionTypes.SUBMIT_COMMENT_START:
      return {
        ...state,
        commentState: {
          ...state.commentState,
          isSubmitting: true,
        },
      };

    case ActionTypes.SUBMIT_COMMENT_SUCCESS:
      const curentScream = state.screams.findIndex(
        (scream) => scream.screamId === action.payload.screamId
      );
      state.screams[curentScream].commentCount++;

      return {
        ...state,
        commentState: {
          ...state.commentState,
          isSubmitting: false,
          success: true,
          error: null,
        },
        screams: [...state.screams],
        scream: {
          ...state.scream,
          commentCount: state.scream.commentCount + 1,
          comments: [action.payload, ...state.scream.comments],
        },
      };
    case ActionTypes.SUBMIT_COMMENT_FAILED:
      return {
        ...state,
        commentState: {
          ...state.commentState,
          isSubmitting: false,
          success: false,
          error: action.error,
        },
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

      if (state.scream.screamId === action.payload.screamId) {
        state.scream = {
          ...action.payload,
          comments: state.scream.comments,
        };
      }

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
