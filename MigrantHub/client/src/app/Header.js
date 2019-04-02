import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import GridItem from 'components/Grid/GridItem.jsx';
// @material-ui/core components
import withStyles from '@material-ui/core/styles/withStyles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Hidden from '@material-ui/core/Hidden';

// material-ui icons
import Menu from '@material-ui/icons/Menu';
import MoreVert from '@material-ui/icons/MoreVert';
import ViewList from '@material-ui/icons/ViewList';

// core components
import Button from 'components/CustomButtons/Button.jsx';

import headerStyle from 'assets/jss/material-dashboard-pro-react/components/headerStyle.jsx';
import HeaderLinks from './HeaderLinks';
import SearchBar from './SearchBar';

function Header({ ...props }) {
  function makeBrand() {
    let name;
    if (name) {
      return name;
    }
    return 'Home Page';
  }
  const { classes, color, rtlActive } = props;
  const appBarClasses = cx({
    [` ${classes[color]}`]: color,
  });
  const sidebarMinimize = `${classes.sidebarMinimize
  } ${
    cx({
      [classes.sidebarMinimizeRTL]: rtlActive,
    })}`;
  return (
    <AppBar position="static" className={classes.appBar + appBarClasses}>
      <Toolbar className={classes.container}>
        <Hidden smDown implementation="css">
          <div className={sidebarMinimize}>
            {props.miniActive ? (
              <Button
                justIcon
                round
                color="white"
                onClick={props.sidebarMinimize}
              >
                <ViewList className={classes.sidebarMiniIcon} />
              </Button>
            ) : (
              <Button
                justIcon
                round
                color="white"
                onClick={props.sidebarMinimize}
              >
                <MoreVert className={classes.sidebarMiniIcon} />
              </Button>
            )}
          </div>
        </Hidden>
        <GridItem className={classes.inlineBlock} xs={12} sm={12} md={8} lg={8}>
          <SearchBar />
        </GridItem>
        <div className={classes.flex} />
        <Hidden smDown implementation="css">
          <HeaderLinks rtlActive={rtlActive} />
        </Hidden>
        <div className={classes.inlineBlock} id="google_translate_element" />
        <Hidden mdUp implementation="css">
          <Button
            className={classes.appResponsive}
            color="transparent"
            justIcon
            aria-label="open drawer"
            onClick={props.handleDrawerToggle}
          >
            <Menu />
          </Button>
        </Hidden>
      </Toolbar>
    </AppBar>
  );
}

Header.propTypes = {
  classes: PropTypes.object.isRequired,
  color: PropTypes.oneOf(['primary', 'info', 'success', 'warning', 'danger']),
  rtlActive: PropTypes.bool,
};

export default withStyles(headerStyle)(Header);
