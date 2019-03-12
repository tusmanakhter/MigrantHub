import React from 'react';
import Layout from 'app/Layout';
import { Route, Redirect } from 'react-router-dom';
import { AuthConsumer } from 'routes/AuthContext';

const ProtectedRoute = ({
  component: Component, migrant, business, admin, disableLayout, ...rest
}) => (
  <AuthConsumer>
    {({ isAuthenticated }) => (
      <Route
        {...rest}
        render={(props) => {
          if (isAuthenticated(migrant, business, admin) === true) {
            if (disableLayout) {
              return (
                <Component {...props} />
              );
            }
            return (
              <Layout>
                <Component {...props} />
              </Layout>
            );
          }
          return (
            <Redirect
              to={{
                pathname: '/login',
                state: { from: props.location },
              }}
            />
          );
        }}
      />
    )}
  </AuthConsumer>
);

export default ProtectedRoute;
