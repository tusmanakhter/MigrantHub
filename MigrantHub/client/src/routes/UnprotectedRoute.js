import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { AuthConsumer } from 'routes/AuthContext';
import UserTypes from 'lib/UserTypes';

const isLoggedIn = (isAuthenticated, user) => {
  const auth = isAuthenticated('user');
  if (auth === true) {
    if (user.type === UserTypes.ADMIN) {
      return '/admin/dashboard';
    } else if (user.type === UserTypes.MIGRANT) {
      return '/main';
    } else if (user.type === UserTypes.BUSINESS) {
      return '/businessmain';
    }
  } else {
    return false;
  }
};

const UnprotectedRoute = ({ component: Component, type, ...rest }) => (
  <AuthConsumer>
    {({ isAuthenticated, user }) => (
      <Route
        {...rest}
        render={(props) => {
          const path = isLoggedIn(isAuthenticated, user);
          if (path === false) {
            return <Component {...props} />;
          } else {
            return (<Redirect
              to={{
                pathname: path,
                state: { from: props.location },
              }}
            />);
          }
        }
        }
      />
    )}
  </AuthConsumer>
);

export default UnprotectedRoute;
