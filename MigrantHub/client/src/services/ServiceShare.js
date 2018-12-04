import React, { Component } from 'react';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import logo from '../logo.svg';
import '../App.css';
import FriendPanel from '../components/FriendPanel/FriendPanel';
import NavPanel from '../components/NavPanel/NavPanel';
import Header from '../components/Header/Header';

const theme = createMuiTheme({
  palette: {
    primary: { main: '#153345' },
    secondary: { main: '#E2B39A' },
  },
});

class ServiceShare extends Component {
  state = {
    appName: 'Migrant Hub',
    appLogo: logo,
    userPic: logo,
  };

  render() {
    const {
      appLogo, appName, userPic, navPanelVisibility,
      navOptions, friendPanelVisibility, friends,
    } = this.state;

    return (
      <MuiThemeProvider theme={theme}>
        <Header
          appLogo={appLogo}
          appName={appName}
          userPic={userPic}
        />
        THIS IS A SHAREABLE LINK
      </MuiThemeProvider>
    );
  }
}

export default ServiceShare;
