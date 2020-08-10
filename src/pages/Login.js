import React from "react";
import { connect } from "react-redux";

const Login = () => {
  return (
    <div>
      <p>Login Page</p>
    </div>
  );
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
