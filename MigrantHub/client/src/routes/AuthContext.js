import React from 'react';
import axios from 'axios';
import PropTypes, { instanceOf } from 'prop-types';
import UserTypes from 'lib/UserTypes';
import { withCookies, Cookies } from 'react-cookie';

const { Provider, Consumer } = React.createContext();

class AuthProviderWrapper extends React.Component {
  constructor(props) {
    super(props);

    const { cookies } = props;

    this.authenticate = () => new Promise((resolve) => {
      axios.get('/api/accounts/').then((response) => {
        let user = {};
        if (response.data.user) {
          user = {
            authenticated: true,
            username: response.data.user._id,
            type: response.data.user.type,
          };
        } else {
          user = {
            authenticated: false,
            username: null,
            type: null,
          };
        }
        cookies.set('user', user, { path: '/' });
        this.setState({ user });
        resolve('done');
      });
    });

    this.unauthenticate = () => new Promise((resolve) => {
      const user = {
        authenticated: false,
        username: null,
        type: null,
      };
      cookies.set('user', user, { path: '/' });
      this.setState({ user });
      resolve('done');
    });

    this.isAuthenticated = (migrant, business, admin) => {
      const user = cookies.get('user');
      let authenticated = false;

      if (migrant) {
        authenticated = user.type === UserTypes.MIGRANT && user.authenticated;
      }

      if (business && !authenticated) {
        authenticated = user.type === UserTypes.BUSINESS && user.authenticated;
      }

      if (admin && !authenticated) {
        authenticated = user.type === UserTypes.ADMIN && user.authenticated;
      }

      if (!migrant && !business && !admin) {
        authenticated = user.authenticated;
      }

      return authenticated;
    };

    const user = cookies.get('user') || null;

    this.state = {
      user,
      authenticate: this.authenticate,
      unauthenticate: this.unauthenticate,
      isAuthenticated: this.isAuthenticated,
    };
  }

  render() {
    const { children } = this.props;
    return (
      <Provider value={this.state}>
        {children}
      </Provider>
    );
  }
}

AuthProviderWrapper.propTypes = {
  children: PropTypes.shape({}).isRequired,
  cookies: instanceOf(Cookies).isRequired,
};

const WrappedAuthProvider = withCookies(AuthProviderWrapper);
export { WrappedAuthProvider as AuthProvider, Consumer as AuthConsumer };
