import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import FriendPanel from './components/FriendPanel/index'
import NavPanel from './components/NavPanel/index'
import Header from './components/Header/index'

const theme = createMuiTheme({
  palette: {
    primary: { main: '#E2B39A' },
    secondary: { main: '#153345' },
  },
});

class App extends Component {
  //TODO get this information from the db as opposed to hardcoding it in
  state = { 
    appName: 'Migrant Hub',
    appLogo: logo,
    userName: 'Bob McBobberson',
    userPic: logo,
    friends: [
      {id: 1, name: "Sandra Sanderson", pic: logo}, 
      {id: 2, name: "Tammy Tammifier", pic: logo}, 
      {id: 3, name: "Fernando Froodie", pic: logo}
    ],
    navOptions: [
      //TODO calculate what the options are, based on the type of user signed in
      {description: "Messages", link: "#"},
      {description: "Friends", link: "#"},
      {description: "Services", link: "#"},
    ],
    navPanelVisibility: true,
    friendPanelVisibility: true,
    searchBarVisibility: true,
  }

  render() {
    return (
      <MuiThemeProvider theme={theme}>
        <Header appLogo={this.state.appLogo} appName={this.state.appName} userName={this.state.userName} userPic={this.state.userPic} />
        <div className="App">
          <div className="Panel">{this.state.navPanelVisibility && <NavPanel navOptions={this.state.navOptions} />}</div>
          <div className="Main-feed"><h1>Welcome to your homepage {this.state.userName} ! :)</h1></div>
          <div className="Panel">{this.state.friendPanelVisibility && <FriendPanel friends={this.state.friends} />}</div>
        </div>
      </MuiThemeProvider>
    );
  }
}

export default App;
