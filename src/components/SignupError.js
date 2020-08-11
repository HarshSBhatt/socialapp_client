import React from "react";
import { Alert } from "antd";

function SignupError({ error, onClose }) {
  return (
    <Alert message={error} type="error" showIcon closable onClose={onClose} />
  );
}

export default SignupError;
