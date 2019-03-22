import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

// @material-ui/core components
import withStyles from '@material-ui/core/styles/withStyles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import footerStyle from 'assets/jss/material-dashboard-pro-react/components/footerStyle';
import TermsConditions from 'app/TermsConditions';

function Footer({ ...props }) {
  const {
    classes, fluid, white,
  } = props;
  const container = cx({
    [classes.container]: !fluid,
    [classes.containerFluid]: fluid,
    [classes.whiteColor]: white,
  });
  const anchor =    classes.a
    + cx({
      [' ' + classes.whiteColor]: white,
    });
  const block = cx({
    [classes.block]: true,
    [classes.whiteColor]: white,
  });
  return (
    <footer className={classes.footer}>
      <div className={container}>
        <div className={classes.left}>
          <List className={classes.list}>
            <ListItem className={classes.inlineBlock}>
              <a href="/" className={block}>
                {'Home'}
              </a>
            </ListItem>
            <ListItem className={classes.inlineBlock}>
              <TermsConditions />
            </ListItem>
          </List>
        </div>
        <p className={classes.right}>
          &copy; {1900 + new Date().getYear()}{' '}
          <a href="https://www.therefugeecentre.org" className={anchor}>
            {'Le Centre des Réfugiés'}
          </a>
        </p>
      </div>
    </footer>
  );
}

Footer.propTypes = {
  classes: PropTypes.object.isRequired,
  fluid: PropTypes.bool,
  white: PropTypes.bool,
};

export default withStyles(footerStyle)(Footer);
