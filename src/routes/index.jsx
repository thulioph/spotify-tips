import React from 'react';
import { Route, Redirect } from 'react-router-dom';

export const PublicRoute = ({ component: Component,...rest }) => {
	return (
		<Route {...rest} render={(props) => (
			<Component {...props} />
		)} />
	)
};

export const PrivateRoute = ({ component: Component, logged = null, ...rest }) => {
	if (!logged) {
		return (
			<Route {...rest} render={(props) => (
				<Redirect to={{
					pathname: '/login',
					state: { from: props.location }
				}} />
			)} />
		);
	}

	return (
		<Route {...rest} render={(props) => (
			<Component {...props} />
		)} />
	);
};