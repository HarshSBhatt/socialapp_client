import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Link, Redirect } from "react-router-dom";
import PropTypes from "prop-types";

//! User Files

import SignupError from "../components/SignupError";
import { signupUser } from "../store/actions";
import { getRedirectionPath } from "../utils/getRedirectionPath";

//! Ant Design Imports

import { Row, Col, Form, Input, Button, Tooltip } from "antd";
import {
  MailOutlined,
  LockOutlined,
  EyeInvisibleOutlined,
  EyeTwoTone,
  UserOutlined,
  QuestionCircleOutlined,
} from "@ant-design/icons";

const Signup = (props) => {
  const [error, setError] = useState({});

  useEffect(() => {
    if (props.userReducer.errMess) {
      setError(props.userReducer.errMess);
    }
  }, [props.userReducer.errMess]);

  const onKeyPress = (e) => {
    const specialCharRegex = new RegExp("[a-zA-Z0-9._']");
    const pressedKey = String.fromCharCode(!e.charCode ? e.which : e.charCode);
    if (!specialCharRegex.test(pressedKey)) {
      e.preventDefault();
      return false;
    }
  };

  const onFinish = (values) => {
    props.signupUser({
      handle: values.handle.toLowerCase(),
      email: values.email.toLowerCase(),
      password: values.password,
      confirmPassword: values.confirmPassword,
    });
  };

  const onClose = () => {
    setError({});
  };

  if (props.userReducer.isAuthenticated) {
    const redirectPath = getRedirectionPath(props.location);
    return <Redirect to={redirectPath} />;
  }

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
          {error.email && <SignupError error={error.email} onClose={onClose} />}
          {error.password && (
            <SignupError error={error.password} onClose={onClose} />
          )}
          {error.confirmPassword && (
            <SignupError error={error.confirmPassword} onClose={onClose} />
          )}
          {error.handle && (
            <SignupError error={error.handle} onClose={onClose} />
          )}

          {console.log(Object.keys(error))}
          <Form.Item
            name="handle"
            rules={[
              {
                required: true,
                message: "Please input your handle!",
                whitespace: true,
              },
              {
                min: 3,
                message: "Handle must be greater than 3 characters",
              },
              {
                max: 15,
                message: "Handle must be less than 15 characters",
              },
            ]}
          >
            <Input
              size="large"
              prefix={<UserOutlined className="site-form-item-icon" />}
              placeholder="john.doe"
              autoComplete="off"
              onKeyPress={onKeyPress}
              suffix={
                <Tooltip title="What do you want others to call you?">
                  <QuestionCircleOutlined />
                </Tooltip>
              }
            />
          </Form.Item>
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
          <Form.Item
            name="password"
            rules={[
              { required: true, message: "Please input your password!" },
              {
                pattern: /^(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])(?=.*[a-z]).{8,}$/,
                message:
                  "Must contain atleast 8 characters with 1 lowercase, uppercase, number & special character",
              },
            ]}
          >
            <Input.Password
              size="large"
              prefix={<LockOutlined className="site-form-item-icon" />}
              placeholder="Password"
              iconRender={(visible) =>
                visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
              }
            />
          </Form.Item>

          <Form.Item
            name="confirmPassword"
            dependencies={["password"]}
            // hasFeedback
            rules={[
              {
                required: true,
                message: "Please confirm your password!",
              },
              ({ getFieldValue }) => ({
                validator(rule, value) {
                  if (!value || getFieldValue("password") === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(
                    "The two passwords that you entered do not match!"
                  );
                },
              }),
            ]}
          >
            <Input.Password
              size="large"
              prefix={<LockOutlined className="site-form-item-icon" />}
              // type="password"
              iconRender={(visible) =>
                visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
              }
              placeholder="Confirm Password"
            />
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="login-form-button"
              size="large"
              loading={props.userReducer.isLoading}
            >
              Sign up
            </Button>
            Already have an acoount? <Link to="/login">login now!</Link>
          </Form.Item>
        </Form>
      </Col>
      <Col xs={{ span: 24 }} sm={{ span: 6 }} lg={{ span: 8 }}></Col>
    </Row>
  );
};

Signup.propTypes = {
  userReducer: PropTypes.object.isRequired,
  signupUser: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  userReducer: state.userReducer,
});

const mapDispatchToProps = (dispatch) => ({
  signupUser: (newUserData) => dispatch(signupUser(newUserData)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Signup);
