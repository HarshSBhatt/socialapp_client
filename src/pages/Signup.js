import React from "react";
import { connect } from "react-redux";

const Signup = () => {
  return (
    <div>
      <p>Signup Page</p>
    </div>
  );
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Signup);
