import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { AuthConsumer } from 'routes/AuthContext';

const ProtectedRoute = ({
  component: Component, migrant, business, admin, ...rest
}) => (
  <AuthConsumer>
    {({ isAuthenticated }) => (
      <Route
        {...rest}
        render={props => (isAuthenticated(migrant, business, admin) === true ? (
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
    )}
  </AuthConsumer>
);

export default ProtectedRoute;
