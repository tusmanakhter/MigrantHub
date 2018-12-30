import React, { Component } from 'react';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import logo from '../logo.svg';
import '../App.css';
import FriendPanel from '../components/FriendPanel/FriendPanel';
import NavPanel from '../components/NavPanel/NavPanel';
import Header from '../components/Header/Header';
import Sidebar from '../components/Sidebar/Sidebar';
import ServiceCategory from '../services/ServiceCategory';
import ServiceList from '../services/ServiceList';

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
      { description: 'Services', link: '/services' },
      { description: 'Events', link: '/events' },
    ],
    navPanelVisibility: true,
    friendPanelVisibility: false,
    serviceCategoryVisibility: true,
  };

  render() {
    const {
      appLogo, appName, userPic, navPanelVisibility,
      navOptions, friendPanelVisibility, friends, serviceCategoryVisibility,
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
            <Grid item xs={1}>
              <div className="Panel">{navPanelVisibility && <NavPanel />}</div>
            </Grid>
            <Grid item lg={10}>
              <div className="Main-feed">
                  <div className="">{serviceCategoryVisibility && <ServiceCategory location = {this.props.location} />}</div>
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
