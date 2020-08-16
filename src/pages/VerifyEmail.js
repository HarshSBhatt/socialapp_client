import React, { Fragment } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

//! User Files

import isEmpty from "../utils/is-empty";
import { logoutUser, sendVerificationMail } from "../store/actions";

//! Ant Design Imports

import { Result, Button, Alert } from "antd";
import { SmileOutlined } from "@ant-design/icons";

const VerifyEmail = (props) => {
  const handleLoginAgain = () => {
    props.logoutUser();
  };

  const handleVerification = () => {
    props.sendVerificationMail();
  };
  const ExtraText = () => {
    return (
      <Fragment>
        <p>
          We have sent verification link in your mail box. please verify to
          proceed further
        </p>
        <p>If you have verified your email then please login again</p>
        <div className="verify-button">
          <Button
            type="primary"
            onClick={handleVerification}
            loading={props.loading}
          >
            Re-send verification email
          </Button>
          <Button type="secondary" onClick={handleLoginAgain}>
            Login
          </Button>
        </div>
      </Fragment>
    );
  };
  return (
    <div className="verify-email-wrapper">
      <Result
        icon={<SmileOutlined />}
        title="Please verify your email before proceeding further!"
        extra={<ExtraText />}
      />
      <div className="error-message">
        {!isEmpty(props.error) && (
          <Alert message={props.error} type="error" showIcon />
        )}
        {props.success && (
          <Alert
            message="Email has been sent successfully"
            type="success"
            showIcon
          />
        )}
      </div>
    </div>
  );
};

VerifyEmail.propTypes = {
  loading: PropTypes.bool.isRequired,
  error: PropTypes.string,
  success: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => ({
  loading: state.userReducer.verifyEmail.loading,
  error: state.userReducer.verifyEmail.error,
  success: state.userReducer.verifyEmail.success,
});

const mapDispatchToProps = { logoutUser, sendVerificationMail };

export default connect(mapStateToProps, mapDispatchToProps)(VerifyEmail);
