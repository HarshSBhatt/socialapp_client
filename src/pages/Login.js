import React, { useState } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import axios from "axios";

//! Ant Design Imports

import { Alert, Row, Col, Form, Input, Button, Checkbox } from "antd";
import {
  MailOutlined,
  LockOutlined,
  EyeInvisibleOutlined,
  EyeTwoTone,
} from "@ant-design/icons";

const Login = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState({});

  const onFinish = (values) => {
    setLoading(true);
    axios
      .post("/login", values)
      .then((res) => {
        setLoading(false);
        setError({});
        console.log(res.data);
      })
      .catch((err) => {
        setLoading(false);
        setError(err.response.data);
      });
  };

  const onClose = () => {
    setError({});
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
              loading={loading}
            >
              Log in
            </Button>
            Or <Link to="/signup">register now!</Link>
          </Form.Item>
        </Form>
      </Col>
      <Col xs={{ span: 24 }} sm={{ span: 6 }} lg={{ span: 8 }}></Col>
    </Row>
  );
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
