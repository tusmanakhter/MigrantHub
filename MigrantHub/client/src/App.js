import React, { Component } from 'react';
import './App.css';
//import SignUpMigrant from './account/SignUpMigrant';
import Home from './home/HomePage';

class App extends Component {

  render() {
    return (
      <div className="App">
          <div>
            <Home/>
          </div>
      </div >
    );
  }
}

export default App;
