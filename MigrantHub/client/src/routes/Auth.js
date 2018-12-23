import axios from 'axios';
import UserTypes from '../lib/UserTypes';

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
    const user = {
      authenticated: false,
      username: null,
      type: null,
    };
    localStorage.setItem('user', JSON.stringify(user));
  },
  isAuthenticated(type) {
    const user = JSON.parse(localStorage.getItem('user'));
    switch (type) {
      case UserTypes.ADMIN:
        return user.type === UserTypes.ADMIN && user.authenticated;
      case UserTypes.MIGRANT:
        return user.type === UserTypes.MIGRANT && user.authenticated;
      case UserTypes.BUSINESS:
        return user.type === UserTypes.BUSINESS && user.authenticated;
      case 'user':
        return user.authenticated;
      default:
        return false;
    }
  },
};

export default auth;
