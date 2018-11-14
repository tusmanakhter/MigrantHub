import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import Auth from './Auth';

const ProtectedRoute = ({ component: Component, type, ...rest }) => (
  <Route
    {...rest}
    render={props => (Auth.isAuthenticated(type) === true ? (
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
