import axios from "axios";

import * as ActionTypes from "../actionTypes";
import { openNotificationWithIcon } from "../../utils/CustomNotification";

//! Get all screams

export const requestForGetScreams = () => {
  return {
    type: ActionTypes.SCREAMS_REQUEST,
  };
};

export const setScreams = (screams) => {
  return {
    type: ActionTypes.SET_SCREAMS,
    screams,
  };
};

export const failedToGetScreams = (error) => {
  return {
    type: ActionTypes.SCREAMS_FAILED,
    error,
  };
};
export const getScreams = () => (dispatch) => {
  dispatch(requestForGetScreams());
  axios
    .get("/screams")
    .then((res) => {
      dispatch(setScreams(res.data));
    })
    .catch((err) => {
      dispatch(failedToGetScreams(err.response.data));
      console.log(err);
    });
};

//! Get single scream

export const requestForGetOneScream = () => {
  return {
    type: ActionTypes.SCREAM_REQUEST,
  };
};

export const setOneScream = (scream) => {
  return {
    type: ActionTypes.SET_SCREAM,
    scream,
  };
};

export const failedToGetOneScream = (error) => {
  return {
    type: ActionTypes.SCREAM_FAILED,
    error,
  };
};
export const getOneScream = (screamId) => (dispatch) => {
  dispatch(requestForGetOneScream());
  axios
    .get(`/scream/${screamId}`)
    .then((res) => {
      dispatch(setOneScream(res.data));
    })
    .catch((err) => {
      dispatch(failedToGetOneScream(err.response.data));
      console.log(err);
    });
};

//! Post Scream

export const requestToPostScream = () => {
  return {
    type: ActionTypes.POST_SCREAM_STATRT,
  };
};
export const postScreamSuccess = (scream) => {
  return {
    type: ActionTypes.POST_SCREAM_SUCCESSS,
    scream,
  };
};
export const failedToPostScream = (error) => {
  return {
    type: ActionTypes.POST_SCREAM_FAILED,
    error,
  };
};

export const postScream = (newScream) => (dispatch) => {
  dispatch(requestToPostScream());
  axios
    .post("/scream", newScream)
    .then((res) => {
      dispatch(postScreamSuccess(res.data));
      openNotificationWithIcon("success", "Post created successfully");
    })
    .catch((err) => {
      dispatch(failedToPostScream(err.response.data));
      openNotificationWithIcon(
        "error",
        "Something went wrong. Please try again later!"
      );
      console.log(err);
    });
};

//! Like Screams

export const likeUnlikeRequest = () => {
  return {
    type: ActionTypes.LIKEUNLIKE_REQUEST,
  };
};

export const likeUnlikeFailed = (error) => {
  return {
    type: ActionTypes.LIKEUNLIKE_FAILED,
    error,
  };
};

export const successToLikeScream = (data) => {
  return {
    type: ActionTypes.LIKE_SCREAM,
    payload: data,
  };
};

export const likeScream = (screamId) => (dispatch) => {
  dispatch(likeUnlikeRequest());
  axios
    .get(`/scream/${screamId}/like`)
    .then((res) => {
      dispatch(successToLikeScream(res.data));
    })
    .catch((err) => {
      console.log(err);
      dispatch(likeUnlikeFailed(err.response.data));
    });
};

//! Unlike Screams

export const successToUnlikeScream = (data) => {
  return {
    type: ActionTypes.UNLIKE_SCREAM,
    payload: data,
  };
};

export const unlikeScream = (screamId) => (dispatch) => {
  dispatch(likeUnlikeRequest());
  axios
    .get(`/scream/${screamId}/unlike`)
    .then((res) => {
      dispatch(successToUnlikeScream(res.data));
    })
    .catch((err) => {
      console.log(err);
      dispatch(likeUnlikeFailed(err.response.data));
    });
};

//! Delete Scream

export const receiveDelete = (screamId) => {
  return {
    type: ActionTypes.DELETE_SCREAM_SUCCESS,
    payload: screamId,
  };
};

export const deleteScream = (screamId) => (dispatch) => {
  axios
    .delete(`/scream/${screamId}`)
    .then(() => {
      dispatch(receiveDelete(screamId));
      openNotificationWithIcon("success", "Post deleted successfully!");
    })
    .catch((err) => {
      console.log(err);
      openNotificationWithIcon(
        "error",
        "Something went wrong. Please try again later!"
      );
    });
};
