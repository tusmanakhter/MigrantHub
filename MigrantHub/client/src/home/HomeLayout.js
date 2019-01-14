import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import HomeHeader from 'home/HomeHeader';
import HomeFooter from 'home/HomeFooter';

const styles = {
  content: {
    flex: '1 0 auto',
    display: 'flex',
    flexDirection: 'column',
  },
  footer: {
    flexShrink: 0,
  },
  layout: {
    minHeight: '100vh',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
};

const HomeLayout = (props) => {
  const { classes, children } = props;

  return (
    <React.Fragment>
      <div className={classes.layout}>
        <div className={classes.content}>
          <HomeHeader />
          { children }
        </div>
        <div className={classes.footer}>
          <HomeFooter />
        </div>
      </div>
    </React.Fragment>
  );
};

HomeLayout.propTypes = {
  classes: PropTypes.object.isRequired,
  children: PropTypes.shape({}).isRequired,
};

export default withStyles(styles)(HomeLayout);
