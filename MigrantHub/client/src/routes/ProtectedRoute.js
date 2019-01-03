import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import Auth from './Auth';

const ProtectedRoute = ({
  component: Component, migrant, business, admin, ...rest
}) => (
  <Route
    {...rest}
    render={props => (Auth.isAuthenticated(migrant, business, admin) === true ? (
      <Component {...props} />
    ) : (
      <Redirect
        to={{
          pathname: '/login',
          state: { from: props.location },
        }}
      />
    ))
    }
  />
);

export default ProtectedRoute;
