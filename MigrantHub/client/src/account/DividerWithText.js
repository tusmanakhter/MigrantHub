import React from 'react';
import Divider from '@material-ui/core/Divider';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';

const styles = {
  dividerWithText: {
    marginTop: 16,
    marginBottom: 16,
    display: 'flex',
    alignItems: 'center',
  },
  divider: {
    flexShrink: 1,
    width: '100%',
    margin: 5,
  },
  dividerText: {
    margin: '0px 5px 0px 5px',
  },
};

const DividerWithText = (props) => {
  const { classes, text } = props;
  return (
    <div className={classes.dividerWithText}>
      <Divider className={classes.divider} />
      <span className={classes.dividerText}>{text}</span>
      <Divider className={classes.divider} />
    </div>
  );
};

DividerWithText.propTypes = {
  classes: PropTypes.object.isRequired,
  text: PropTypes.string.isRequired,
};

export default withStyles(styles)(DividerWithText);
