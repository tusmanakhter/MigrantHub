import React from "react";
import classNames from "classnames";
import PropTypes from "prop-types";
import withStyles from "@material-ui/core/styles/withStyles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Hidden from "@material-ui/core/Hidden";
import Menu from "@material-ui/icons/Menu";
import HeaderLinks from "components/Header/HeaderLinks.jsx";
import headerStyle from "assets/jss/material-dashboard-react/components/headerStyle.jsx";
import Typography from '@material-ui/core/Typography';

function Header({ ...props }) {
  const { classes, color } = props;
  const appBarClasses = classNames({
    [" " + classes[color]]: color
  });
  return (
      <div>
        <AppBar className={classes.appBar + appBarClasses}>
          <Toolbar className={classes.container}>
            <div className={classes.flex}>
              {/* Here we create navbar brand, based on route name */}
            </div>
            <Hidden smDown implementation="css">
              <HeaderLinks />
            </Hidden>
            <Hidden mdUp implementation="css">
              <IconButton
                color="inherit"
                aria-label="open drawer"
                onClick={props.handleDrawerToggle}
              >
                <Menu />
              </IconButton>
            </Hidden>
          </Toolbar>
        </AppBar>
        <Typography variant="h3" align='center'>
          Migrant Hub
        </Typography>
        <br />
      </div>
  );
}

Header.propTypes = {
  classes: PropTypes.object.isRequired,
  color: PropTypes.oneOf(["primary", "info", "success", "warning", "danger"])
};

export default withStyles(headerStyle)(Header);
