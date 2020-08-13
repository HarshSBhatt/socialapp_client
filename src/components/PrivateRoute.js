//! Built-in or Third Party Packages

import React from "react";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";

//! Call Example
/*
<PrivateRoute
	exact
	path="/favorites"
	component={() => <Favorites favorites={this.props.favorites} deleteFavorite={this.props.deleteFavorite} />}
/>;
*/

function PrivateRoute({ component: Component, isAuthenticated, ...rest }) {
  return (
    <Route
      {...rest}
      render={(props) =>
        isAuthenticated ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: props.location },
            }}
          />
        )
      }
    />
  );
}

const mapStateToProps = (state) => ({
  isAuthenticated: state.userReducer.isAuthenticated,
});

PrivateRoute.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
};

export default connect(mapStateToProps)(PrivateRoute);
