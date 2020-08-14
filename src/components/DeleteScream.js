import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

//! User Files

//! Ant Design Imports

import { Button, Popover, Modal } from "antd";
import { MoreOutlined, QuestionCircleOutlined } from "@ant-design/icons";
import { deleteScream } from "../store/actions";

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

  const content = (
    <Button danger type="text" onClick={confirm}>
      Delete
    </Button>
  );

  return (
    <div>
      <Popover content={content} placement="bottomRight" trigger="click">
        <MoreOutlined />
      </Popover>
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
