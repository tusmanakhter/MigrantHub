import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { IntlConsumer } from 'locales/IntlContext';
import Button from '@material-ui/core/Button';

const styles = {
  buttonDark: {
    color: 'white',
  },
  buttonLight: {
    color: 'black',
  },
};

const LanguageSwitch = (props) => {
  const { classes, dark } = props;
  let button = '';
  if (dark === true) {
    button = classes.buttonDark;
  } else {
    button = classes.buttonLight;
  }

  return (
    <IntlConsumer>
      {({ switchToEnglish, switchToFrench, locale }) => (
        <React.Fragment>
          {locale === 'en'
          && (
            <Button className={button} onClick={switchToFrench}>
              Français
            </Button>
          )
          }
          {locale === 'fr'
          && (
            <Button className={button} onClick={switchToEnglish}>
              English
            </Button>
          )
          }
        </React.Fragment>
      )}
    </IntlConsumer>
  );
};

LanguageSwitch.propTypes = {
  classes: PropTypes.object.isRequired,
  dark: PropTypes.bool.isRequired,
};

export default withStyles(styles)(LanguageSwitch);
