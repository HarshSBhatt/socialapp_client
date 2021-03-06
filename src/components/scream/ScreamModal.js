import React, { useState, useEffect, Fragment } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import dayjs from "dayjs";
import { Link } from "react-router-dom";

//! User Files

import { getOneScream } from "../../store/actions";
import MyButton from "../layout/MyButton";
import LikeButton from "./LikeButton";
import Comments from "./Comments";
import CommentForm from "./CommentForm";

//! Ant Design Imports

import { ArrowsAltOutlined, CommentOutlined } from "@ant-design/icons";
import { Modal, Spin, Row, Col, Divider, Typography, Space } from "antd";
import Avatar from "antd/lib/avatar/avatar";

const { Text, Title } = Typography;

const ScreamModal = (props) => {
  const {
    scream: {
      screamId,
      body,
      createdAt,
      likeCount,
      commentCount,
      userImage,
      userHandle,
      comments,
    },
    isLoading,
  } = props;

  const [modalState, setModalState] = useState({
    visible: false,
    confirmLoading: false,
    oldPath: "",
    newPath: "",
  });

  const handleButtonClick = () => {
    let oldPath = window.location.pathname;
    const { userHandle, screamId } = props;
    let newPath = `/user/${userHandle}/scream/${screamId}`;

    if (oldPath === newPath) {
      oldPath = `/user/${userHandle}`;
    }

    window.history.pushState(null, `Post from ${userHandle}`, newPath);

    props.getOneScream(props.screamId);
    setModalState({
      ...modalState,
      visible: true,
      oldPath,
      newPath,
    });
  };

  const handleCancel = () => {
    window.history.pushState(null, null, modalState.oldPath);

    setModalState({
      ...modalState,
      visible: false,
    });
  };
  useEffect(() => {
    if (props.openModal) {
      handleButtonClick();
    }
  }, [props.openModal]);

  const modalMarkup = isLoading ? (
    <Spin className="scream-loader" />
  ) : (
    <Fragment>
      <Row className="scream-title">
        <Col className="user-avatar">
          <Avatar src={userImage} size={65}>
            {userHandle && userHandle[0].toUpperCase()}
          </Avatar>
        </Col>
        <Col className="user-info">
          <Link to={`/user/${userHandle}`} target="_blank">
            <Title level={4}>@{userHandle}</Title>
          </Link>
          <Text type="secondary">
            {dayjs(createdAt).format("h:mm a, DD MMMM YYYY")}
          </Text>
        </Col>
      </Row>
      <Divider />
      <Row className="scream-body">
        <Col span={24}>
          <Text>{body}</Text>
        </Col>
      </Row>
      <Row className="like-comment-row">
        <Space>
          <LikeButton screamId={screamId} />
          {likeCount}
        </Space>
        <Space>
          <CommentOutlined />
          {commentCount}
        </Space>
      </Row>
      <Divider />
      <Row className="scream-comment-form">
        <CommentForm screamId={screamId} />
      </Row>
      <Row className="scream-comments">
        <Col span={24}>
          <Comments comments={comments} />
        </Col>
      </Row>
    </Fragment>
  );
  return (
    <div className="expand-scream-wrapper">
      <MyButton tip="Expand Scream" onClick={handleButtonClick}>
        <ArrowsAltOutlined />
      </MyButton>

      <Modal
        visible={modalState.visible}
        title={userHandle}
        onCancel={handleCancel}
        okButtonProps={{ hidden: true }}
        cancelButtonProps={{ hidden: true }}
        className="scream-details"
      >
        {modalMarkup}
      </Modal>
    </div>
  );
};

ScreamModal.propTypes = {
  getOneScream: PropTypes.func.isRequired,
  screamId: PropTypes.string.isRequired,
  userHandle: PropTypes.string.isRequired,
  scream: PropTypes.object.isRequired,
  isLoading: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => ({
  isLoading: state.dataReducer.screamState.isLoading,
  scream: state.dataReducer.scream,
});

const mapDispatchToProps = { getOneScream };

export default connect(mapStateToProps, mapDispatchToProps)(ScreamModal);
