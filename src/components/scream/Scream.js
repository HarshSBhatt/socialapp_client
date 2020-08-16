import React from "react";
import { connect } from "react-redux";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import PropTypes from "prop-types";

//! User Files

import { ReactComponent as VerifiedIcon } from "../../assets/verified_badge.svg";
import DeleteScream from "./DeleteScream";
import ScreamModal from "./ScreamModal";
import LikeButton from "../LikeButton";

//! Ant Design imports

import { List, Avatar, Space } from "antd";
import { CommentOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";

function Scream(props) {
  const { isAuthenticated, userData } = props.userReducer;
  dayjs.extend(relativeTime);

  const DeleteButton = ({ userHandle, screamId }) => {
    return (
      isAuthenticated &&
      userHandle === userData.credentials.handle && (
        <DeleteScream screamId={screamId} />
      )
    );
  };
  if (props.loading) return <p>Loading Screams...</p>;
  if (props.userReducer.isProfileLoading) return <p>Loading Screams...</p>;
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
                  <ScreamModal
                    userHandle={item.userHandle}
                    screamId={item.screamId}
                  />
                  <DeleteButton
                    userHandle={item.userHandle}
                    screamId={item.screamId}
                  />
                </div>
              </div>
            }
            description={dayjs(item.createdAt).fromNow()}
          />
          <div className="scream-body">{item.body}</div>
        </List.Item>
      )}
    />
  );
}

Scream.propTypes = {
  loading: PropTypes.bool.isRequired,
  screams: PropTypes.array.isRequired,
  userReducer: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  userReducer: state.userReducer,
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Scream);
