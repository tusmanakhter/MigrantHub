import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

// @material-ui/core components
import withStyles from '@material-ui/core/styles/withStyles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import LanguageSwitch from 'components/LanguageSwitch';
import footerStyle from 'assets/jss/material-dashboard-pro-react/components/footerStyle';

function Footer({ ...props }) {
  const {
 classes, fluid, white, rtlActive 
} = props;
  let container = cx({
    [classes.container]: !fluid,
    [classes.containerFluid]: fluid,
    [classes.whiteColor]: white,
  });
  let anchor =    classes.a
    + cx({
      [' ' + classes.whiteColor]: white,
    });
  let block = cx({
    [classes.block]: true,
    [classes.whiteColor]: white,
  });
  return (
    <footer className={classes.footer}>
      <div className={container}>
        <div className={classes.left}>
          <List className={classes.list}>
            <ListItem className={classes.inlineBlock}>
              <a href="/main" className={block}>
                {rtlActive ? 'الصفحة الرئيسية' : 'Home'}
              </a>
            </ListItem>
          </List>
        </div>
        <p className={classes.right}>
          &copy; {1900 + new Date().getYear()}{' '}
          <a href="https://www.therefugeecentre.org" className={anchor}>
            {rtlActive ? '' : 'Le Centre des Réfugiés'}
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
  rtlActive: PropTypes.bool,
};

export default withStyles(footerStyle)(Footer);
