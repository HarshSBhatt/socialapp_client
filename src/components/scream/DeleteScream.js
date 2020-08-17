import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

//! User Files

import { deleteScream } from "../../store/actions";
import MyButton from "../layout/MyButton";

//! Ant Design Imports

import { Modal } from "antd";
import { QuestionCircleOutlined, DeleteOutlined } from "@ant-design/icons";

const DeleteScream = (props) => {
  const { screamId } = props;
  function confirm() {
    Modal.confirm({
      title: "Are you sure you want to delete?",
      icon: <QuestionCircleOutlined />,
      okText: "Delete",
      cancelText: "Cancel",
      centered: true,
      onOk() {
        props.deleteScream(screamId);
      },
      onCancel() {},
    });
  }

  return (
    <div className="delete-scream-wrapper">
      <MyButton tip="Delete" onClick={confirm}>
        <DeleteOutlined />
      </MyButton>
    </div>
  );
};

DeleteScream.propTypes = {
  deleteScream: PropTypes.func.isRequired,
  screamId: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = { deleteScream };

export default connect(mapStateToProps, mapDispatchToProps)(DeleteScream);
