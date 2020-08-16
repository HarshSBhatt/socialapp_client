import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

//! User Files

import { likeScream, unlikeScream } from "../store/actions";

//! Ant Design Imports

import { LikeOutlined, LikeFilled } from "@ant-design/icons";

const PRIMARY_COLOR = "#00bcd4";

function LikeButton(props) {
  const { isAuthenticated, userData } = props.userReducer;
  const likedScream = () => {
    if (
      userData.likes &&
      userData.likes.find((like) => like.screamId === props.screamId)
    ) {
      return true;
    } else {
      return false;
    }
  };

  const likeScream = () => {
    props.likeScream(props.screamId);
  };

  const unlikeScream = () => {
    props.unlikeScream(props.screamId);
  };

  return !isAuthenticated ? (
    <div className="not-authorized-to-like">
      <Link to="/login">
        <LikeOutlined />
      </Link>
    </div>
  ) : likedScream() ? (
    <div onClick={unlikeScream}>
      <LikeFilled style={{ color: PRIMARY_COLOR }} />
    </div>
  ) : (
    <div onClick={likeScream}>
      <LikeOutlined />
    </div>
  );
}

LikeButton.propTypes = {
  likeScream: PropTypes.func.isRequired,
  unlikeScream: PropTypes.func.isRequired,
  userReducer: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  userReducer: state.userReducer,
});

const mapDispatchToProps = {
  likeScream,
  unlikeScream,
};

export default connect(mapStateToProps, mapDispatchToProps)(LikeButton);
