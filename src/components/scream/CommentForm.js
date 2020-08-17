import React, { Fragment, useState, useEffect } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

//! User Files

import { submitComment } from "../../store/actions";

//! Ant Design Imports

import { Form, Button, Input } from "antd";
import { Link } from "react-router-dom";

const { TextArea } = Input;

const CommentForm = (props) => {
  const {
    screamId,
    isAuthenticated,
    commentState: { success, isSubmitting },
  } = props;
  const [value, setValue] = useState("");

  useEffect(() => {
    console.log("running");
    if (success === true) {
      setValue("");
    }
  }, [success]);

  const handleSubmit = () => {
    props.submitComment(screamId, value);
  };

  const handleChange = (e) => {
    setValue(e.target.value);
  };

  return isAuthenticated ? (
    <Fragment>
      <Form.Item>
        <TextArea rows={4} onChange={handleChange} value={value} />
      </Form.Item>
      <Form.Item>
        <Button
          htmlType="submit"
          loading={isSubmitting}
          onClick={handleSubmit}
          disabled={value.length > 0 ? false : true}
          type="primary"
        >
          {isSubmitting ? "Posting" : "Post Comment"}
        </Button>
      </Form.Item>
    </Fragment>
  ) : (
    <div>
      <Link to="/login">Sign in to comment</Link>
    </div>
  );
};

CommentForm.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
  commentState: PropTypes.object.isRequired,
  screamId: PropTypes.string.isRequired,
  submitComment: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.userReducer.isAuthenticated,
  commentState: state.dataReducer.commentState,
});

const mapDispatchToProps = { submitComment };

export default connect(mapStateToProps, mapDispatchToProps)(CommentForm);
