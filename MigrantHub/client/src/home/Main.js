import React, { Component } from 'react';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import logo from '../logo.svg';
import '../App.css';
import FriendPanel from '../components/FriendPanel/FriendPanel';
import NavPanel from '../components/NavPanel/NavPanel';
import Header from '../components/Header/Header';
import Logout from '../components/Logout';

const theme = createMuiTheme({
  palette: {
    primary: { main: '#153345' },
    secondary: { main: '#E2B39A' },
  },
});

class Main extends Component {
    // TODO get this information from the db as opposed to hardcoding it in
    state = {
      appName: 'Migrant Hub',
      appLogo: logo,
      userName: 'Bob McBobberson',
      userPic: logo,
      friends: [
        { id: 1, name: 'Sandra Sanderson', pic: logo },
        { id: 2, name: 'Tammy Tammifier', pic: logo },
        { id: 3, name: 'Fernando Froodie', pic: logo },
      ],
      navOptions: [
        // TODO calculate what the options are, based on the type of user signed in
        { description: 'Messages', link: '#' },
        { description: 'Friends', link: '#' },
        { description: 'Services', link: '/services' },
        { description: 'Events', link: '/events' },
      ],
      navPanelVisibility: true,
      friendPanelVisibility: true,
    }

    render() {
      const {
        appLogo, appName, userName, userPic, navPanelVisibility,
        navOptions, friendPanelVisibility, friends,
      } = this.state;

      return (
        <MuiThemeProvider theme={theme}>
          <Header
            appLogo={appLogo}
            appName={appName}
            userName={userName}
            userPic={userPic}
          />
          <Logout />
          <div className="App">
            <Grid container spacing={8}>
              <Grid item xs={3}>
                <div className="Panel">{navPanelVisibility && <NavPanel navOptions={navOptions} />}</div>
              </Grid>
              <Grid item xs={6}>
                <div className="Main-feed">
                  <h1>
                                    Welcome to your homepage
                    {userName}
                    {' '}
                                    ! :)
                  </h1>
                </div>
              </Grid>
              <Grid item xs={3}>
                <div className="Panel">{friendPanelVisibility && <FriendPanel friends={friends} />}</div>
              </Grid>
            </Grid>
          </div>
        </MuiThemeProvider>
      );
    }
}

export default Main;
