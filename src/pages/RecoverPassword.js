import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

//! User Files

import { recoverPassword } from "../store/actions";
import isEmpty from "../utils/is-empty";

//! Ant Design Imports

import { Alert, Row, Col, Form, Input, Button } from "antd";
import { MailOutlined } from "@ant-design/icons";

const RecoverPassword = (props) => {
  const onFinish = (values) => {
    const { email } = values;
    props.recoverPassword({ email });
  };

  return (
    <Row>
      <Col xs={{ span: 24 }} sm={{ span: 6 }} lg={{ span: 8 }}></Col>
      <Col
        xs={{ span: 24 }}
        sm={{ span: 12 }}
        lg={{ span: 8 }}
        className="form-wrapper"
      >
        <Form
          name="normal_login"
          className="login-form"
          initialValues={{ remember: true }}
          onFinish={onFinish}
        >
          <Row className="app-logo" justify="center">
            <img src="/logo.png" alt="Social App" width={50} height={50} />
          </Row>

          {!isEmpty(props.error) && (
            <Alert message={props.error} type="error" showIcon />
          )}
          {props.success && (
            <Alert
              message="Password reset link has been sent successfully to your mail"
              type="success"
              showIcon
            />
          )}
          <Form.Item
            name="email"
            rules={[
              {
                type: "email",
                message: "The input is not valid email!",
              },
              {
                required: true,
                message: "Please input your email!",
              },
            ]}
          >
            <Input
              size="large"
              prefix={<MailOutlined className="site-form-item-icon" />}
              placeholder="mail@example.com"
              autoComplete="off"
              allowClear
            />
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="login-form-button"
              size="large"
              loading={props.loading}
            >
              Log in
            </Button>
            <Link to="/login">
              <Button type="link" className="login-form-button" size="large">
                Cancel
              </Button>
            </Link>
          </Form.Item>
        </Form>
      </Col>
      <Col xs={{ span: 24 }} sm={{ span: 6 }} lg={{ span: 8 }}></Col>
    </Row>
  );
};

RecoverPassword.propTypes = {
  loading: PropTypes.bool.isRequired,
  error: PropTypes.string,
  success: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => ({
  loading: state.userReducer.recoverPassword.loading,
  error: state.userReducer.recoverPassword.error,
  success: state.userReducer.recoverPassword.success,
});

const mapDispatchToProps = { recoverPassword };

export default connect(mapStateToProps, mapDispatchToProps)(RecoverPassword);
