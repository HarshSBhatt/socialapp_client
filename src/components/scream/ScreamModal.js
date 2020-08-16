import React, { useState, Fragment } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import dayjs from "dayjs";
import { Link } from "react-router-dom";
//! User Files

import { getOneScream } from "../../store/actions";
import MyButton from "../MyButton";

//! Ant Design Imports
import { ArrowsAltOutlined } from "@ant-design/icons";
import { Modal, Spin, Row, Col, Divider, Typography } from "antd";
import Avatar from "antd/lib/avatar/avatar";

const { Text, Title } = Typography;

const ScreamModal = (props) => {
  const {
    scream: {
      scramId,
      body,
      createdAt,
      likeCount,
      commentCount,
      userImage,
      userHandle,
    },
    isLoading,
  } = props;

  const [modalState, setModalState] = useState({
    visible: false,
    confirmLoading: false,
  });

  const handleButtonClick = () => {
    props.getOneScream(props.screamId);
    setModalState({
      ...modalState,
      visible: true,
    });
  };

  const handleCancel = () => {
    setModalState({
      ...modalState,
      visible: false,
    });
  };

  const modalMarkup = isLoading ? (
    <Spin className="scream-loader" />
  ) : (
    <Fragment>
      <Row className="scream-title">
        <Col span={5} className="user-avatar">
          <Avatar src={userImage} size={65}>
            {userHandle && userHandle[0].toUpperCase()}
          </Avatar>
        </Col>
        <Col span={19} className="user-info">
          <Link to={`/user/${userHandle}`} target="_blank">
            <Title level={4}>@{userHandle}</Title>
          </Link>
          <Text type="secondary">
            {dayjs(createdAt).format("h:mm a, DD MMMM YYYY")}
          </Text>
          <Divider />
          <Text>{body}</Text>
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
