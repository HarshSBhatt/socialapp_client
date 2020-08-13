import React, { useState, useEffect, Fragment } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

//! User Files

import { editUserDetails } from "../store/actions";

//! Ant Design Imports

import { Tooltip, Button, Modal, Form, Input } from "antd";

const EditDetails = (props) => {
  const [form] = Form.useForm();

  const [userData, setUserData] = useState({
    bio: "",
    website: "",
    location: "",
  });
  const [visible, setVisible] = useState(false);

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

  const handleButtonClick = () => {
    form.setFieldsValue({
      ...userData,
    });
    setVisible(true);
  };

  const handleCancel = () => {
    setVisible(false);
  };

  const onCreate = (values) => {
    const userDetails = {
      website: values.website,
      location: `${values.location[0].toUpperCase()}${values.location.substr(
        1
      )}`,
      bio: `${values.bio[0].toUpperCase()}${values.bio.substr(1)}`,
    };
    props.editUserDetails(userDetails);
    setVisible(false);
  };

  return (
    <Fragment>
      <Tooltip title="Edit profile details" placement="top">
        <Button onClick={handleButtonClick} type="primary">
          Edit Profile
        </Button>
      </Tooltip>

      <Modal
        visible={visible}
        title="Edit your profile information"
        okText="Update"
        cancelText="Cancel"
        onCancel={handleCancel}
        confirmLoading={props.isProfileLoading}
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
