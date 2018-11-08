import axios from 'axios';

const auth = {
  authenticate() {
    return new Promise((resolve) => {
      axios.get('/account/').then(response => {
        var user = {}
        if (response.data.user) {
          user = { 
            authenticated: true,
            username: response.data.user._id,
            type: response.data.user.type
          }
        } else {
          user = { 
            authenticated: false,
            username: null,
            type: null
          }
        }
        localStorage.setItem('user', JSON.stringify(user));
        resolve("done");
      }).catch((err) => {
        console.log('Error fetching authorized user.');
      });
    });
  },
  unauthenticate() {
    var user = { 
      authenticated: false,
      username: null,
      type: null
    }
    localStorage.setItem('user', JSON.stringify(user));
  },
  isAuthenticated(type) {
    var user = JSON.parse(localStorage.getItem('user'));
    switch(type) {
      case 'admin':
        return user.type === 'admin' && user.authenticated
      case 'migrant':
        return user.type === 'migrant' && user.authenticated
      case 'business':
        return user.type === 'business' && user.authenticated
      case 'user':
        return user.authenticated
      default:
        return false;
    }
  }
}

export default auth;