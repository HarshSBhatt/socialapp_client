import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

//! Call Example
/*
<PrivateRoute
	exact
	path="/favorites"
	component={() => <Favorites favorites={this.props.favorites} deleteFavorite={this.props.deleteFavorite} />}
/>;
*/

function PrivateRoute({ component: Component, ...rest }) {
	return (
		<Route
			{...rest}
			render={(props) =>
				props.auth.isAuthenticated ? (
					<Component {...props} />
				) : (
					<Redirect
						to={{
							pathname: '/login',
							state: { from: props.location }
						}}
					/>
				)}
		/>
	);
}
const mapStateToProps = (state) => ({});
export default connect(mapStateToProps)(PrivateRoute);
/*
<Route
  {...rest}
  render={(props) => {
    if (props.auth.isAuthenticated) {
      return <Redirect to="/login" />;
    } else {
      return <Component {...props} />;
    }
  }}
/>
*/
