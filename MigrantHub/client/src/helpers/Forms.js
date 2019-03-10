import axios from 'axios';
import qs from 'qs';

export function handleChange(event) {
  this.setState({
    [event.target.name]: event.target.value,
  });
}

export async function login(username, password, context) {
  const Auth = context;
  try {
    const result = await
    axios.post('/api/accounts/login',
      qs.stringify({
        username,
        password,
      }));
    if (result.status === 200) {
      await Auth.authenticate();
    }
    return false;
  } catch (e) {
    return true;
  }
}
