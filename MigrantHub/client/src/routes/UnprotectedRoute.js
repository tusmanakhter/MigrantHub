import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import Auth from './Auth';

const isLoggedIn = () => {
  const auth = Auth.isAuthenticated('user');
  if (auth === true) {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user.type === 'admin') {
      return '/admin/dashboard';
    } else if (user.type === 'migrant') {
      return '/main';
    } else if (user.type === 'business') {
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
