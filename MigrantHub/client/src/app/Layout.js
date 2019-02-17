import React from 'react';
import cx from 'classnames';
import PropTypes from 'prop-types';
import SidebarLinks from 'routes/SidebarLinks';
import PerfectScrollbar from 'perfect-scrollbar';
import 'perfect-scrollbar/css/perfect-scrollbar.css';
import withStyles from '@material-ui/core/styles/withStyles';
import Header from 'app/Header';
import Footer from 'app/Footer';
import Sidebar from 'app/Sidebar';
import appStyle from 'assets/jss/material-dashboard-pro-react/layouts/dashboardStyle';
import image from 'assets/img/sidebar-2.jpg';
import logo from 'assets/img/logo-white.svg';
import { withRouter } from 'react-router';

let ps;

class Layout extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      mobileOpen: false,
      miniActive: false,
    };
    this.mainPanel = null;
    this.setMainPanelRef = (element) => {
      this.mainPanel = element;
    };
    this.resizeFunction = this.resizeFunction.bind(this);
    this.sidebarMinimize = this.sidebarMinimize.bind(this);
  }

  componentDidMount() {
    if (navigator.platform.indexOf('Win') > -1) {
      ps = new PerfectScrollbar(this.mainPanel, {
        suppressScrollX: true,
        suppressScrollY: false,
      });
    }
    window.addEventListener('resize', this.resizeFunction);
  }


  componentDidUpdate(prevProps) {
    const { mobileOpen } = this.state;
    const { location } = this.props;

    if (prevProps.location.pathname !== location.pathname) {
      this.mainPanel.scrollTop = 0;
      if (mobileOpen) {
        this.setState({ mobileOpen: false });
      }
    }
  }

  componentWillUnmount() {
    if (navigator.platform.indexOf('Win') > -1) {
      ps.destroy();
    }
    window.removeEventListener('resize', this.resizeFunction);
  }

  getRoute() {
    const { location } = this.props;
    return location.pathname !== '/maps/full-screen-maps';
  }

  handleDrawerToggle = () => {
    const { mobileOpen } = this.state;
    this.setState({ mobileOpen: !mobileOpen });
  };

  sidebarMinimize() {
    const { miniActive } = this.state;
    this.setState({ miniActive: !miniActive });
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
      ' ' +
      cx({
        [classes.mainPanelSidebarMini]: this.state.miniActive,
        [classes.mainPanelWithPerfectScrollbar]:
          navigator.platform.indexOf('Win') > -1
      });
    const { children } = this.props;
    const { mobileOpen, miniActive } = this.state;
    return (
      <React.Fragment>
        <div className={classes.wrapper}>
          <Sidebar
            routes={SidebarLinks}
            logoText="Migrant Hub"
            logo={logo}
            image={image}
            handleDrawerToggle={this.handleDrawerToggle}
            open={mobileOpen}
            color="blue"
            bgColor="black"
            miniActive={miniActive}
            {...rest}
          />
          <div className={mainPanel} ref={this.setMainPanelRef}>
            <Header
              sidebarMinimize={this.sidebarMinimize.bind(this)}
              miniActive={miniActive}
              handleDrawerToggle={this.handleDrawerToggle}
              {...rest}
            />
            <div className={classes.content}>
              {children}
            </div>
            <Footer fluid />
          </div>
        </div>
      </React.Fragment>
    );
  }
}

Layout.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withRouter(withStyles(appStyle)(Layout));
