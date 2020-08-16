import React, { useState, useEffect, Fragment } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

//! User Files

import { editUserDetails } from "../../store/actions";

//! Ant Design Imports

import { Tooltip, Button, Modal, Form, Input } from "antd";

const EditDetails = (props) => {
  const [form] = Form.useForm();

  const [userData, setUserData] = useState({
    bio: "",
    website: "",
    location: "",
  });

  const [modalState, setModalState] = useState({
    visible: false,
    confirmLoading: false,
  });

  const mapUserDetailsToState = (credentials) => {
    setUserData({
      bio: credentials.bio ? credentials.bio : "",
      website: credentials.website ? credentials.website : "",
      location: credentials.location ? credentials.location : "",
    });
  };

  useEffect(() => {
    mapUserDetailsToState(props.credentials);
  }, [props.credentials]);

  useEffect(() => {
    !props.isProfileLoading &&
      setModalState((prevModalState) => {
        return {
          ...prevModalState,
          visible: false,
          confirmLoading: false,
        };
      });
  }, [props.isProfileLoading]);

  const handleButtonClick = () => {
    setModalState({
      ...modalState,
      visible: true,
    });
    form.setFieldsValue({
      ...userData,
    });
  };

  const handleCancel = () => {
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
    const userDetails = {
      website: values.website,
      location: `${values.location[0].toUpperCase()}${values.location.substr(
        1
      )}`,
      bio: `${values.bio[0].toUpperCase()}${values.bio.substr(1)}`,
    };
    props.editUserDetails(userDetails);
  };

  return (
    <Fragment>
      <Tooltip title="Edit profile details" placement="top">
        <Button onClick={handleButtonClick} type="primary">
          Edit Profile
        </Button>
      </Tooltip>

      <Modal
        visible={modalState.visible}
        title="Edit your profile information"
        okText={modalState.confirmLoading ? "Updating" : "Update"}
        cancelText="Cancel"
        onCancel={handleCancel}
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
          <Form.Item name="website" label="Website">
            <Input />
          </Form.Item>
          <Form.Item name="location" label="Location">
            <Input />
          </Form.Item>
          <Form.Item name="bio" label="Bio">
            <Input.TextArea autoSize={{ minRows: 3, maxRows: 5 }} />
          </Form.Item>
        </Form>
      </Modal>
    </Fragment>
  );
};

EditDetails.propTypes = {
  editUserDetails: PropTypes.func.isRequired,
  isProfileLoading: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => ({
  isProfileLoading: state.userReducer.isProfileLoading,
  credentials: state.userReducer.userData.credentials,
});

const mapDispatchToProps = { editUserDetails };

export default connect(mapStateToProps, mapDispatchToProps)(EditDetails);
