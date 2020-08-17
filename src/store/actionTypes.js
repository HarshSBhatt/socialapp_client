//! ---------------------User Reducer-------------------------

//! Signup

export const SIGNUP_REQUEST = "SIGNUP_REQUEST";
export const SIGNUP_SUCCESS = "SIGNUP_SUCCESS";
export const SIGNUP_FAILURE = "SIGNUP_FAILURE";

//! Login

export const LOGIN_REQUEST = "LOGIN_REQUEST";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_FAILURE = "LOGIN_FAILURE";

//! Logout

export const LOGOUT_REQUEST = "LOGOUT_REQUEST";
export const LOGOUT_SUCCESS = "LOGOUT_SUCCESS";
export const LOGOUT_FAILURE = "LOGOUT_FAILURE";

//! User data

export const SET_CURRENT_USER = "SET_CURRENT_USER";
export const SET_AUTHENTICATED = "SET_AUTHENTICATED";
export const SET_UNAUTHENTICATED = "SET_UNAUTHENTICATED";
export const FETCH_USER_DATA_REQUEST = "FETCH_USER_DATA_REQUEST";
export const SET_USER_DATA = "SET_USER_DATA";
export const FETCH_USER_DATA_FAILED = "FETCH_USER_DATA_FAILED";

//! Notifications

export const MARKED_NOTIFICATIONS_READ = "MARKED_NOTIFICATIONS_READ";

//! ---------------------Data Reducer-------------------------

//! All screams
export const SCREAMS_REQUEST = "SCREAMS_REQUEST";
export const SET_SCREAMS = "SET_SCREAMS";
export const SCREAMS_FAILED = "SCREAMS_FAILED";

//! Single scream

export const SCREAM_REQUEST = "SCREAM_REQUEST";
export const SET_SCREAM = "SET_SCREAM";
export const SCREAM_FAILED = "SCREAM_FAILED";

//! Various actions on scream

export const LIKE_SCREAM = "LIKE_SCREAM";
export const UNLIKE_SCREAM = "UNLIKE_SCREAM";
export const LIKEUNLIKE_REQUEST = "LIKEUNLIKE_REQUEST";
export const LIKEUNLIKE_FAILED = "LIKEUNLIKE_FAILED";

//! Add or Delete scream

export const POST_SCREAM_STATRT = "POST_SCREAM_STATRT";
export const POST_SCREAM_SUCCESSS = "POST_SCREAM_SUCCESS";
export const POST_SCREAM_FAILED = "POST_SCREAM_FAILED";

export const DELETE_SCREAM_SUCCESS = "DELETE_SCREAM_SUCCESS";

//! Submit Comments

export const SUBMIT_COMMENT_START = "SUBMT_COMMENT_START";
export const SUBMIT_COMMENT_SUCCESS = "SUBMT_COMMENT_SUCCESS";
export const SUBMIT_COMMENT_FAILED = "SUBMT_COMMENT_FAILED";

//! ---------------------Security Reducer-------------------------

//! Email verification

export const VERIFY_START = "VERIFY_START";
export const VERIFY_SUCCESS = "VERIFY_SUCCESS";
export const VERIFY_FAILED = "VERIFY_FAILED";

//! Recover password

export const RECOVERY_START = "RECOVERY_START";
export const RECOVERY_SUCCESS = "RECOVERY_SUCCESS";
export const RECOVERY_FAILED = "RECOVERY_FAILED";
