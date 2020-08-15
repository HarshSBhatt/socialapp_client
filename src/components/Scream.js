import React from "react";
import { connect } from "react-redux";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import PropTypes from "prop-types";

//! User Files

import { ReactComponent as VerifiedIcon } from "../assets/verified_badge.svg";
import { likeScream, unlikeScream } from "../store/actions";
import DeleteScream from "./DeleteScream";

//! Ant Design imports

import { List, Avatar, Space } from "antd";
import { LikeOutlined, CommentOutlined, LikeFilled } from "@ant-design/icons";
import { Link } from "react-router-dom";

const PRIMARY_COLOR = "#00bcd4";

function Scream(props) {
  const { isAuthenticated, userData } = props.userReducer;
  dayjs.extend(relativeTime);

  const LikeButton = ({ screamId }) => {
    const likedScream = () => {
      if (
        userData.likes &&
        userData.likes.find((like) => like.screamId === screamId)
      ) {
        return true;
      } else {
        return false;
      }
    };

    const likeScream = () => {
      props.likeScream(screamId);
    };

    const unlikeScream = () => {
      props.unlikeScream(screamId);
    };

    return !isAuthenticated ? (
      <div>
        <LikeOutlined />
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
  };

  const DeleteButton = ({ userHandle, screamId }) => {
    return (
      isAuthenticated &&
      userHandle === userData.credentials.handle && (
        <DeleteScream screamId={screamId} />
      )
    );
  };
  if (props.loading) return <p>Loading Screams...</p>;
  return (
    <List
      className="scream-list"
      itemLayout="vertical"
      size="large"
      dataSource={props.screams}
      renderItem={(item) => (
        <List.Item
          className="scream-list-content"
          key={item.screamId}
          actions={[
            <Space>
              <LikeButton screamId={item.screamId} />
              {item.likeCount}
            </Space>,
            <Space>
              <CommentOutlined />
              {item.commentCount}
            </Space>,
          ]}
        >
          <List.Item.Meta
            avatar={
              <Avatar src={item.userImage} size={50}>
                {item.userHandle[0].toUpperCase()}
              </Avatar>
            }
            title={
              <div className="username">
                <Link to={`user/${item.userHandle}`}>
                  <div className="user-info">
                    <p>{item.userHandle}</p>{" "}
                    <p className="verified-badge">
                      {item.isVerifiedUser && <VerifiedIcon />}
                    </p>
                  </div>
                </Link>
                <div className="user-actions">
                  <DeleteButton
                    userHandle={item.userHandle}
                    screamId={item.screamId}
                  />
                </div>
              </div>
            }
            description={dayjs(item.createdAt).fromNow()}
          />
          {item.body}
        </List.Item>
      )}
    />
  );
}

Scream.propTypes = {
  loading: PropTypes.bool.isRequired,
  screams: PropTypes.array.isRequired,
  likeScream: PropTypes.func.isRequired,
  unlikeScream: PropTypes.func.isRequired,
  userReducer: PropTypes.object.isRequired,

  isLikeUnlikeRunning: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => ({
  userReducer: state.userReducer,
  isLikeUnlikeRunning: state.dataReducer.isLikeUnlikeRunning,
});

const mapDispatchToProps = {
  likeScream,
  unlikeScream,
};

export default connect(mapStateToProps, mapDispatchToProps)(Scream);
