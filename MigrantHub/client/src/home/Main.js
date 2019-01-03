import React from "react";
import cx from "classnames";
import PropTypes from "prop-types";
import { Switch, Route, Redirect } from "react-router-dom";
import Grid from '@material-ui/core/Grid';
import ServiceCategory from 'services/ServiceCategory';
import SearchBar from 'components/SearchBar';
import FriendPanel from 'components/FriendPanel/FriendPanel';

import dashboardRoutes from "routes/dashboard.jsx";

// creates a beautiful scrollbar
import PerfectScrollbar from "perfect-scrollbar";
import "perfect-scrollbar/css/perfect-scrollbar.css";

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";

// core components
import Header from "components/Header/Header.jsx";
import Footer from "components/Footer/Footer.jsx";
import Sidebar from "components/Sidebar/Sidebar.jsx";

//import dashboardRoutes from "routes/dashboard.jsx";

import appStyle from "assets/jss/material-dashboard-pro-react/layouts/dashboardStyle.jsx";

import image from "assets/img/sidebar-2.jpg";
import logo from "assets/img/logo-white.svg";

const switchRoutes = (
  <Switch>
    {dashboardRoutes.map((prop, key) => {
      if (prop.redirect)
        return <Redirect from={prop.path} to={prop.pathTo} key={key} />;
      if (prop.collapse)
        return prop.views.map((prop, key) => {
          return (
            <Route path={prop.path} component={prop.component} key={key} />
          );
        });
      return <Route path={prop.path} component={prop.component} key={key} />;
    })}
  </Switch>
);

var ps;

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      mobileOpen: false,
      miniActive: false,
      SearchBarVisibility:true,
      serviceCategoryVisibility: true,
      friendPanelVisibility:false,
    };
    this.resizeFunction = this.resizeFunction.bind(this);
  }
  componentDidMount() {
    if (navigator.platform.indexOf("Win") > -1) {
      ps = new PerfectScrollbar(this.refs.mainPanel, {
        suppressScrollX: true,
        suppressScrollY: false
      });
      document.body.style.overflow = "hidden";
    }
    window.addEventListener("resize", this.resizeFunction);
  }
  componentWillUnmount() {
    if (navigator.platform.indexOf("Win") > -1) {
      ps.destroy();
    }
    window.removeEventListener("resize", this.resizeFunction);
  }
  componentDidUpdate(e) {
    if (e.history.location.pathname !== e.location.pathname) {
      this.refs.mainPanel.scrollTop = 0;
      if (this.state.mobileOpen) {
        this.setState({ mobileOpen: false });
      }
    }
  }
  handleDrawerToggle = () => {
    this.setState({ mobileOpen: !this.state.mobileOpen });
  };
  getRoute() {
    return this.props.location.pathname !== "/maps/full-screen-maps";
  }
  sidebarMinimize() {
    this.setState({ miniActive: !this.state.miniActive });
  }
  resizeFunction() {
    if (window.innerWidth >= 960) {
      this.setState({ mobileOpen: false });
    }
  }
  render() {
    const { classes, ...rest } = this.props;
    const mainPanel =
      classes.mainPanel +
      " " +
      cx({
        [classes.mainPanelSidebarMini]: this.state.miniActive,
        [classes.mainPanelWithPerfectScrollbar]:
          navigator.platform.indexOf("Win") > -1
      });
    const {
        appLogo, appName, userPic, navPanelVisibility,
        navOptions, friendPanelVisibility, friends, serviceCategoryVisibility, SearchBarVisibility,
      } = this.state;
    return (
      <div className={classes.wrapper}>
        <Sidebar
          routes={dashboardRoutes}
          logoText={"Migrant Hub"}
          logo={logo}
          image={image}
          handleDrawerToggle={this.handleDrawerToggle}
          open={this.state.mobileOpen}
          color="blue"
          bgColor="black"
          miniActive={this.state.miniActive}
          {...rest}
        />
        <div className={mainPanel} ref="mainPanel">
          <Header
            sidebarMinimize={this.sidebarMinimize.bind(this)}
            miniActive={this.state.miniActive}
            routes={dashboardRoutes}
            handleDrawerToggle={this.handleDrawerToggle}
            {...rest}
          />

            <div className={classes.content}>
              {/* MAIN PAGE CONTENT */}
              <Grid item lg={12}>
                 <div className="Main-feed">
                   <div className="">{SearchBarVisibility && <SearchBar />}</div>
                 </div>
              </Grid>
              <Grid item lg={12}>
                 <div className="Main-feed">
                   <div className="">{serviceCategoryVisibility && <ServiceCategory location={this.props.location} />}</div>
                 </div>
              </Grid>

              <Grid item lg={12}>
                 <div className="Panel">{friendPanelVisibility && <FriendPanel />}</div>
              </Grid>

            </div>
          
          <Footer fluid />
        </div>
      </div>
    );
  }
}

Dashboard.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(appStyle)(Dashboard);



// import React, { Component } from 'react';
// import { withStyles } from '@material-ui/core/styles';
// import Grid from '@material-ui/core/Grid';
// import Typography from '@material-ui/core/Typography';
// import logo from 'logo.svg';
// import FriendPanel from 'components/FriendPanel/FriendPanel';
// import NavPanel from 'components/NavPanel/NavPanel';
// import ServiceCategory from 'services/ServiceCategory';
// import SearchBar from 'components/SearchBar';
// import Header from "components/Header/Header.jsx";

// const styles = theme => ({
//   app: {
//     marginLeft: 75,
//     //marginRight: 36,
//   },
// });

// class Main extends Component {
//   state = {
//     appName: 'Migrant Hub',
//     appLogo: logo,
//     userPic: logo,
//     navOptions: [
//       { description: 'Services', link: '/services' },
//       { description: 'Events', link: '/events' },
//     ],
//     navPanelVisibility: true,
//     friendPanelVisibility: false,
//     serviceCategoryVisibility: true,
//     SearchBarVisibility: true,
//   };

//   handleDrawerToggle = () => {
//     this.setState({ mobileOpen: !this.state.mobileOpen });
//   };

//   render() {
//     const { classes, ...rest } = this.props;
//     const {
//       appLogo, appName, userPic, navPanelVisibility,
//       navOptions, friendPanelVisibility, friends, serviceCategoryVisibility, SearchBarVisibility,
//     } = this.state;

//     return (
//       <div>
//         <Header
//           handleDrawerToggle={this.handleDrawerToggle}
//           {...rest}
//         />
//         <Typography variant="subtitles" gutterBottom>
//           Welcome to your dashboard! We will guide you through to find what you need.
//       </Typography>
//         <Grid
//           container
//           spacing={0}
//           direction="column"
//           alignItems="center"
//           justify="center"
//           style={{ minHeight: '100vh' }}
//         >
//           <div className={classes.app}>
//             <Grid item xs={1}>
//               <div className="Panel">{navPanelVisibility && <NavPanel />}</div>
//             </Grid>
//             <Grid>
//               <Grid item lg={12}>
//                 <div className="Main-feed">
//                   <div className="">{SearchBarVisibility && <SearchBar />}</div>
//                 </div>
//               </Grid>
//               <Grid item lg={12}>
//                 <div className="Main-feed">
//                   <div className="">{serviceCategoryVisibility && <ServiceCategory location={this.props.location} />}</div>
//                 </div>
//               </Grid>

//               <Grid item lg={12}>
//                 <div className="Panel">{friendPanelVisibility && <FriendPanel />}</div>
//               </Grid>
//             </Grid>
//           </div>
//         </Grid>
//       </div>
//     );
//   }
// }

// export default withStyles(styles)(Main);
