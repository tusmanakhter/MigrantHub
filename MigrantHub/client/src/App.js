import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import SignUpMigrant from './account/personal/SignUpMigrant';
import SignUpBusiness from './account/business/SignUpMerchant';
import Main from './home/Main';
import Error from './components/Error';
import Home from './home/HomePage';
import Login from './account/Login';
import TempError from './account/TempError';
import TempHome from './account/TempHome';
import AccountTypeMenu from './account/AccountTypeMenu';

class App extends Component {
  render() {
    return (
      <div className="App">
        <BrowserRouter>
          <div>
            <AccountTypeMenu />
            <Switch>
              <Route path="/" component={Home} exact />
              <Route path="/Main" component={Main} exact />
              <Route path="/BusinessAccount" component={SignUpBusiness} />
              <Route path="/UserAccount" component={SignUpMigrant} />
              <Route path="/Login" component={Login} />
              <Route path="/TempHome" component={TempHome} />
              <Route path="/TempError" component={TempError} />
              <Route component={Error} />
            </Switch>
          </div>
        </BrowserRouter>
      </div >
    );
  }
}

export default App;
