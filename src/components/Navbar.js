import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

//! MUI imports

import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";

const Navbar = () => {
  return (
    <AppBar position="fixed">
      <Toolbar className="navbar-container">
        <Button color="inherit" component={Link} to="/login">
          Login
        </Button>
        <Button color="inherit" component={Link} to="/">
          Home
        </Button>
        <Button color="inherit" component={Link} to="/signup">
          Signup
        </Button>
      </Toolbar>
    </AppBar>
  );
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);
