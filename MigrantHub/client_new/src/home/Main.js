import React, { Component } from 'react';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import logo from '../logo.svg';
import FriendPanel from '../components/FriendPanel/FriendPanel';
import NavPanel from '../components/NavPanel/NavPanel';
import Header from '../components/Header/Header';
import Sidebar from '../components/Sidebar/Sidebar';
import ServiceCategory from '../services/ServiceCategory';
import ServiceList from '../services/ServiceList';
import SearchBar from '../components/SearchBar';

const styles = theme => ({
  app: {
    marginLeft: 100,
    //marginRight: 36,
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
    SearchBarVisibility: true,
  };

  render() {
    const { classes } = this.props;
    const {
      appLogo, appName, userPic, navPanelVisibility,
      navOptions, friendPanelVisibility, friends, serviceCategoryVisibility, SearchBarVisibility, 
    } = this.state;

    return (
      <div>
        {/* <Header
          appLogo={appLogo}
          appName={appName}
          userPic={userPic}
        /> */}
        <div className={classes.app}>
            <Grid item xs={1}>
                    <div className="Panel">{navPanelVisibility && <NavPanel />}</div>
            </Grid>
            <Grid>
                <Grid item lg={10}>
                  <div className="Main-feed">
                    <div className="">{SearchBarVisibility && <SearchBar />}</div>
                  </div>
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
      </div>
    );
  }
}

export default withStyles(styles)(Main);
