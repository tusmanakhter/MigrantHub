import axios from 'axios';
import UserTypes from 'lib/UserTypes';

const auth = {
  authenticate() {
    return new Promise((resolve) => {
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
        localStorage.setItem('user', JSON.stringify(user));
        resolve('done');
      });
    });
  },
  unauthenticate() {
    return new Promise((resolve) => {
      const user = {
        authenticated: false,
        username: null,
        type: null,
      };
      localStorage.setItem('user', JSON.stringify(user));
      resolve('done');
    });
  },
  isAuthenticated(migrant, business, admin) {
    const user = JSON.parse(localStorage.getItem('user'));
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
  },
};

export default auth;
