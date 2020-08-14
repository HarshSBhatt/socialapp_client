import axios from "axios";

import * as ActionTypes from "../actionTypes";

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

export const successToLikeScream = (data) => {
  return {
    type: ActionTypes.LIKE_SCREAM,
    payload: data,
  };
};

export const likeScream = (screamId) => (dispatch) => {
  axios
    .get(`/scream/${screamId}/like`)
    .then((res) => {
      dispatch(successToLikeScream(res.data));
    })
    .catch((err) => {
      console.log(err);
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
  axios
    .get(`/scream/${screamId}/unlike`)
    .then((res) => {
      dispatch(successToUnlikeScream(res.data));
    })
    .catch((err) => {
      console.log(err);
    });
};
