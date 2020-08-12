//! Built-in or Third Party Packages

import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

//! User Files

function Main(props) {
  return <div>Harsh</div>;
}

const mapStateToProps = (state) => ({});

const mapDispatchToProps = (dispatch) => ({});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));
