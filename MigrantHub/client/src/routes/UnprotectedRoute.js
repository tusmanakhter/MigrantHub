import React from 'react';
import HomeLayout from 'home/HomeLayout';
import { Route, Redirect } from 'react-router-dom';
import { AuthConsumer } from 'routes/AuthContext';
import UserTypes from 'lib/UserTypes';

const isLoggedIn = (isAuthenticated, user) => {
  const auth = isAuthenticated(false, false, false);
  if (auth === true) {
    if (user.type === UserTypes.ADMIN) {
      return '/admin/dashboard';
    } if (user.type === UserTypes.MIGRANT) {
      return '/main';
    } if (user.type === UserTypes.BUSINESS) {
      return '/businessmain';
    }
  } else {
    return false;
  }
};

const UnprotectedRoute = ({ component: Component, disableLayout, ...rest }) => (
  <AuthConsumer>
    {({ isAuthenticated, user }) => (
      <Route
        {...rest}
        render={(props) => {
          const path = isLoggedIn(isAuthenticated, user);
          if (path === false) {
            if (disableLayout) {
              return (
                <Component {...props} />
              );
            }
            return (
              <HomeLayout>
                <Component {...props} />
              </HomeLayout>
            );
          }
          return (
            <Redirect
              to={{
                pathname: path,
                state: { from: props.location },
              }}
            />
          );
        }
        }
      />
    )}
  </AuthConsumer>
);

export default UnprotectedRoute;
