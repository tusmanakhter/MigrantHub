import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import Auth from './Auth';
import UserTypes from '../lib/UserTypes';

const isLoggedIn = () => {
  const auth = Auth.isAuthenticated('user');
  if (auth === true) {
    const user = JSON.parse(localStorage.getItem('user'));
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
  <Route
    {...rest}
    render={(props) => {
      const path = isLoggedIn();
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
);

export default UnprotectedRoute;
