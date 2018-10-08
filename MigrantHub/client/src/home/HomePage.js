import React, { Component } from 'react';

class HomePage extends Component {
  render() {
    return (
      <div>
        <div className="HomePage">
          <h1>WELCOME TO OUR WEBSITE</h1>
        </div>
        <div className="Login">
          <h2>Log In</h2>
          <form action="">
            <div className="container">
              <label><b>Email</b></label>
              <input type="text" placeholder="Enter Email" name="email" required/><br/>
              <label for="psw"><b>Password</b></label>
              <input type="password" placeholder="Enter Password" name="psw" required/><br/>
              <button type="submit">Login</button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default HomePage;

