import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import logo from './logo.svg';
import './App.css';
import SignUpMigrant from './account/personal/SignUpMigrant';
import SignUpBusiness from './account/business/SignUpMerchant';
import Error from './components/Error';
import Home from './home/HomePage';
//import BusinessIdApi from './account/business/BusinessIdApi';
import AccountTypeMenu from './account/AccountTypeMenu';

class App extends Component {
  state = { users: [] }

  componentDidMount() {
    fetch('/users')
      .then(res => res.json())
      .then(users => this.setState({ users }));
  }

  render() {
    return (
      <div className="App">
        <BrowserRouter>
          <div>
            <AccountTypeMenu />
            <Switch>
              <Route path="/" component={Home} exact />
              <Route path="/BusinessAccount" component={SignUpBusiness} />
              <Route path="/UserAccount" component={SignUpMigrant} />
              <Route component={Error} />
            </Switch>
          </div>
        </BrowserRouter>
      </div >
    );
  }
}

export default App;
