//! Built-in or Third Party Packages

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
