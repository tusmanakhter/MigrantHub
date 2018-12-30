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

class Main extends Component {
    state = {
      appName: 'Migrant Hub',
      appLogo: logo,
      userPic: logo,
      navOptions: [
        { description: 'Services', link: '/categories' },
        { description: 'Events', link: '/events' },
      ],
      navPanelVisibility: true,
      friendPanelVisibility: true,
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
          <div className="App">
            <Grid container spacing={8}>
              <Grid item xs={3}>
                <div className="Panel">{navPanelVisibility && <NavPanel navOptions={navOptions} />}</div>
              </Grid>
              <Grid item xs={6}>
                <div className="Main-feed">
                  <h1>
                      Welcome to your homepage
                  </h1>
                </div>
              </Grid>
              <Grid item xs={3}>
                <div className="Panel">{friendPanelVisibility && <FriendPanel />}</div>
              </Grid>
            </Grid>
          </div>
        </MuiThemeProvider>
      );
    }
}

export default Main;
