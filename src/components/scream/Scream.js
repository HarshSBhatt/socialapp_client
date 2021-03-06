import React from "react";
import { connect } from "react-redux";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

//! User Files

import { ReactComponent as VerifiedIcon } from "../../assets/verified_badge.svg";
import DeleteScream from "./DeleteScream";
import ScreamModal from "./ScreamModal";
import LikeButton from "./LikeButton";
import isEmpty from "../../utils/is-empty";
import ScreamSkeleton from "../utils/ScreamSkeleton";

//! Ant Design imports

import { List, Avatar, Space } from "antd";
import { CommentOutlined } from "@ant-design/icons";

function Scream(props) {
  const { isAuthenticated, userData, screamIdParam } = props;
  dayjs.extend(relativeTime);

  const DeleteButton = ({ userHandle, screamId }) => {
    return (
      isAuthenticated &&
      userHandle === userData.credentials.handle && (
        <DeleteScream screamId={screamId} />
      )
    );
  };
  if (props.loading) return <ScreamSkeleton />;
  if (isAuthenticated && isEmpty(userData)) return <ScreamSkeleton />;
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
                <Link to={`/user/${item.userHandle}`}>
                  <div className="user-info">
                    <p>{item.userHandle}</p>{" "}
                    <p className="verified-badge">
                      {item.isVerifiedUser && <VerifiedIcon />}
                    </p>
                  </div>
                </Link>
                <div className="user-actions">
                  {screamIdParam === item.screamId ? (
                    <ScreamModal
                      userHandle={item.userHandle}
                      screamId={item.screamId}
                      openModal={true}
                    />
                  ) : (
                    <ScreamModal
                      userHandle={item.userHandle}
                      screamId={item.screamId}
                      openModal={false}
                    />
                  )}
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
  isAuthenticated: PropTypes.bool.isRequired,
  userData: PropTypes.object.isRequired,
  screamIdParam: PropTypes.string,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.userReducer.isAuthenticated,
  userData: state.userReducer.userData,
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Scream);
