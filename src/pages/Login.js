import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Link, Redirect } from "react-router-dom";
import PropTypes from "prop-types";

//! User Files

import { loginUser } from "../store/actions";
import { getRedirectionPath } from "../utils/getRedirectionPath";

//! Ant Design Imports

import { Alert, Row, Col, Form, Input, Button, Checkbox } from "antd";
import {
  MailOutlined,
  LockOutlined,
  EyeInvisibleOutlined,
  EyeTwoTone,
} from "@ant-design/icons";

const Login = (props) => {
  const [error, setError] = useState({});

  useEffect(() => {
    if (props.userReducer.errMess) {
      setError(props.userReducer.errMess);
    }
  }, [props.userReducer.errMess]);

  const onFinish = (values) => {
    props.loginUser({
      email: values.email.toLowerCase(),
      password: values.password,
      remember: values.remember,
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
          {error.general && (
            <Alert
              message={error.general}
              type="error"
              showIcon
              closable
              onClose={onClose}
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
          <Form.Item
            name="password"
            rules={[{ required: true, message: "Please input your password!" }]}
          >
            <Input.Password
              size="large"
              prefix={<LockOutlined className="site-form-item-icon" />}
              // type="password"
              iconRender={(visible) =>
                visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
              }
              placeholder="Password"
            />
          </Form.Item>
          <Form.Item className="form-flow">
            <Form.Item name="remember" valuePropName="checked" noStyle>
              <Checkbox>Remember me</Checkbox>
            </Form.Item>

            <Link className="login-form-forgot" to="/forgot-password">
              Forgot password
            </Link>
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="login-form-button"
              size="large"
              loading={props.userReducer.isLoading}
            >
              Log in
            </Button>
            Don't have an account? <Link to="/signup">register now!</Link>
          </Form.Item>
        </Form>
      </Col>
      <Col xs={{ span: 24 }} sm={{ span: 6 }} lg={{ span: 8 }}></Col>
    </Row>
  );
};

Login.propTypes = {
  userReducer: PropTypes.object.isRequired,
  loginUser: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  userReducer: state.userReducer,
});

const mapDispatchToProps = (dispatch) => ({
  loginUser: (userData) => dispatch(loginUser(userData)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
