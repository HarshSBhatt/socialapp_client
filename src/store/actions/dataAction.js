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

export const failedToGetScream = (error) => {
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
      dispatch(failedToGetScream(err.response.data));
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
