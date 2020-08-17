import React from "react";
import { connect } from "react-redux";
import { Route, Switch, Redirect } from "react-router-dom";
import PropTypes from "prop-types";

//! User Files

import Login from "../pages/Login";
import Signup from "../pages/Signup";
import Home from "../pages/Home";
import User from "../pages/User";
import RecoverPassword from "../pages/RecoverPassword";
import VerifyEmail from "../pages/VerifyEmail";
// import PrivateRoute from "../components/PrivateRoute";
import isEmpty from "../utils/is-empty";

function Routing(props) {
  // console.log(props.isAuthenticated);
  // console.log(props.user);
  const { isAuthenticated, user } = props;

  let routes;

  if (isAuthenticated && !isEmpty(user) && !user.email_verified) {
    routes = (
      <Switch>
        <Route exact path="/verify-email" component={VerifyEmail} />
        <Redirect to="/verify-email" />
      </Switch>
    );
  } else if (isAuthenticated && !isEmpty(user) && user.email_verified) {
    routes = (
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/signup" component={Signup} />
        <Route exact path="/user/:handle" component={User} />
        <Redirect to="/" />
      </Switch>
    );
  } else {
    routes = (
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/signup" component={Signup} />
        <Route exact path="/user/:handle" component={User} />
        <Route exact path="/forgot-password" component={RecoverPassword} />
        <Redirect to="/login" />
      </Switch>
    );
  }
  return <div className="container">{routes}</div>;
}

Routing.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
  user: PropTypes.object,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.userReducer.isAuthenticated,
  user: state.userReducer.user,
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Routing);
