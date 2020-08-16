import React, { Fragment } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

//! user Files

import MyButton from "./MyButton";
import PostScream from "./PostScream";

//! MUI imports

import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";
import HomeIcon from "@material-ui/icons/Home";
import Notifications from "@material-ui/icons/Notifications";

const Navbar = (props) => {
  const { isAuthenticated } = props;

  return (
    <AppBar position="fixed">
      <Toolbar className="navbar-container">
        {isAuthenticated ? (
          <Fragment>
            <PostScream />
            <Link to="/">
              <MyButton tip="Home">
                <HomeIcon color="primary" />
              </MyButton>
            </Link>
            <MyButton tip="Notifications">
              <Notifications color="primary" />
            </MyButton>
          </Fragment>
        ) : (
          <Fragment>
            <Button color="inherit" component={Link} to="/login">
              Login
            </Button>
            <Button color="inherit" component={Link} to="/">
              Home
            </Button>
            <Button color="inherit" component={Link} to="/signup">
              Signup
            </Button>
          </Fragment>
        )}
      </Toolbar>
    </AppBar>
  );
};

Navbar.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.userReducer.isAuthenticated,
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);
