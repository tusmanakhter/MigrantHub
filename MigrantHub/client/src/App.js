import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import SignUpMigrant from './account/SignUpMigrant';

class App extends Component {
  state = { users: [] }

  componentDidMount() {
    fetch('/users')
      .then(res => res.json())
      .then(users => this.setState({ users}));
  }

  render() {
    return (
      <div className="App">
        <SignUpMigrant />
      </div>
    );
  }
}

export default App;
