import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

//! User Files

import MyButton from "./MyButton";
import { postScream } from "../store/actions";

//! MUI Imports

import AddIcon from "@material-ui/icons/Add";

//! Ant Design Imports

import { Modal, Form, Input } from "antd";

const PostScream = (props) => {
  console.log(props);
  const [form] = Form.useForm();

  const [modalState, setModalState] = useState({
    visible: false,
    confirmLoading: false,
  });

  useEffect(() => {
    !props.isLoading &&
      setModalState((prevModalState) => {
        return {
          ...prevModalState,
          visible: false,
          confirmLoading: false,
        };
      });
  }, [props.isLoading]);

  const handleButtonClick = () => {
    setModalState({
      ...modalState,
      visible: true,
    });
  };

  const handleCancel = () => {
    form.resetFields();
    setModalState({
      ...modalState,
      visible: false,
    });
  };

  const onCreate = (values) => {
    setModalState({
      ...modalState,
      confirmLoading: true,
    });
    const { body } = values;
    props.postScream({ body });
    form.resetFields();
  };

  return (
    <div className="scream-post-wrapper">
      <MyButton tip="Post a Scream" onClick={handleButtonClick}>
        <AddIcon color="primary" />
      </MyButton>

      <Modal
        visible={modalState.visible}
        title="Post a new scream"
        okText={modalState.confirmLoading ? "Posting" : "Post"}
        cancelText="Cancel"
        onCancel={handleCancel}
        cancelButtonProps={{ hidden: true }}
        className="scream-post-modal"
        confirmLoading={modalState.confirmLoading}
        onOk={() => {
          form
            .validateFields()
            .then((values) => {
              onCreate(values);
            })
            .catch((info) => {
              console.log("Validate Failed:", info);
            });
        }}
      >
        <Form
          form={form}
          layout="vertical"
          name="form_in_modal"
          initialValues={{ modifier: "public" }}
        >
          <Form.Item
            name="body"
            rules={[
              {
                required: true,
                message: "Must not be empty!",
              },
              {
                min: 10,
                message: "Please enter atleast 10 characters",
              },
            ]}
          >
            <Input.TextArea
              autoSize={{ minRows: 3, maxRows: 5 }}
              placeholder="What's on you mind?"
            />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

PostScream.propTypes = {
  postScream: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => ({
  isLoading: state.dataReducer.screamState.isLoading,
});

const mapDispatchToProps = { postScream };

export default connect(mapStateToProps, mapDispatchToProps)(PostScream);
