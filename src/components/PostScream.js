import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

export const PostScream = () => {
  return <div></div>;
};

PostScream.propTypes = {
  prop: PropTypes,
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(PostScream);
