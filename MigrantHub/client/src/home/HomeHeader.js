import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { Link } from 'react-router-dom';

const styles = theme => ({
  root: {
    '& a': {
      [theme.breakpoints.down('sm')]: {
        marginRight: 10,
      },
      color: 'white',
      marginRight: 20,
    },
    '& a:hover': {
      color: '#e5e5e5',
    },
  },
  title: {
    display: 'block',
    marginRight: 'auto',
  },
  appBar: {
    [theme.breakpoints.down('sm')]: {
      padding: '0% 1%',
    },
    padding: '0% 7.5%',
    background: '#193446',
  },
  toolbar: {
    [theme.breakpoints.down('sm')]: {
      padding: '0% 1% 0% 2%',
    },
  },
  underline: {
    background: 'white',
    content: '""',
    display: 'block',
    height: '2px',
    opacity: '.5',
    position: 'absolute',
    width: '100%',
  },
});

const HomeHeader = (props) => {
  const { classes } = props;
  return (
    <div className={classes.root}>
      <AppBar position="static" className={classes.appBar}>
        <Toolbar className={classes.toolbar}>
          <Typography variant="h6" color="inherit" className={classes.title}>
            <Link to="/">MigrantHub</Link>
          </Typography>
          <Link to="/login">Log In</Link>
          <Link to="/signup/account-selection">Sign Up</Link>
        </Toolbar>
      </AppBar>
      <div className={classes.underline} />
    </div>
  );
};

HomeHeader.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(HomeHeader);
