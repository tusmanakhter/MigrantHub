import React from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import { Link as RouterLink } from 'react-router-dom';
import { Close } from '@material-ui/icons';
import logo from 'assets/img/logo_transparent.png';
import { withRouter } from 'react-router';

const styles = theme => ({
  root: {
    minHeight: '100vh',
    height: 'auto',
    display: 'flex',
    flexDirection: 'column',
    background: theme.palette.common.white,
  },
  layout: {
    fontSize: 16,
    flex: '1 0 auto',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    [theme.breakpoints.down('s')]: {
      width: 288,
      paddingBottom: 10,
      marginTop: -95,
    },
    [theme.breakpoints.down('xs')]: {
      width: 288,
      paddingBottom: 5,
      marginTop: 0,
    },
    width: 380,
    marginTop: -115,
  },
  close: {
    color: 'inherit',
    '& a:hover': {
      color: 'black',
      transform: 'scale(1.1)',
    },
  },
  header: {
    [theme.breakpoints.down('xs')]: {
      padding: 10,
    },
    padding: 20,
    flexShrink: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});

const LoginSignupLayout = (props) => {
  const { classes, history, children } = props;

  return (
    <div className={classes.root}>
      <div className={classes.header}>
        <RouterLink to="/">
          <img src={logo} alt="Home" height="75" width="75" />
        </RouterLink>
        <div className={classes.close}>
          <a role="button" onClick={() => history.goBack()} className={classes.close}>
            <Close fontSize="large" />
          </a>
        </div>
      </div>
      <div className={classes.layout}>
        <div className={classes.content}>
          {children}
        </div>
      </div>
    </div>
  );
};

LoginSignupLayout.propTypes = {
  history: PropTypes.shape({}).isRequired,
  classes: PropTypes.object.isRequired,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};

export default withRouter(withStyles(styles)(LoginSignupLayout));
