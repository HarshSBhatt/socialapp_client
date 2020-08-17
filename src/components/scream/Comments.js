import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { Link } from "react-router-dom";

//! User Files

import { ReactComponent as VerifiedIcon } from "../../assets/verified_badge.svg";

//! Ant Design Imports

import { Comment, List } from "antd";

const Comments = (props) => {
  const { comments } = props;
  console.log(comments);
  dayjs.extend(relativeTime);

  return (
    <div className="comments-wrapper">
      <List
        className="comment-list"
        header={
          comments.length < 2
            ? `${comments.length} response`
            : `${comments.length} responses`
        }
        itemLayout="horizontal"
        dataSource={comments}
        locale={{ emptyText: "Be the first one to comment!" }}
        renderItem={(item) => (
          <li>
            <Comment
              className="comment-details"
              author={
                <Link to={`/user/${item.userHandle}`}>
                  <p className="user-name">{item.userHandle}</p>
                  {item.isVerified && (
                    <p className="verified-badge">
                      <VerifiedIcon />
                    </p>
                  )}
                </Link>
              }
              avatar={item.userImage}
              content={item.body}
              datetime={dayjs(item.createdAt).format("h:mm a, DD MMMM YYYY")}
            />
          </li>
        )}
      />
    </div>
  );
};

Comments.propTypes = {
  comments: PropTypes.array.isRequired,
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Comments);
