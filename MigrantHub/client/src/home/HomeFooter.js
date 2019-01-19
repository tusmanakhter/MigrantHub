import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { Link } from 'react-router-dom';
import { FaGithub, FaRegCopyright } from 'react-icons/fa';
import LanguageSwitch from 'components/LanguageSwitch';
import { FormattedMessage } from 'react-intl';

const styles = theme => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    background: '#193446',
    color: 'white',
    flexGrow: 1,
    padding: '10px 20px 10px 20px',
    '& a': {
      color: 'white',
      marginRight: 20,
    },
    '& a:hover': {
      color: '#e5e5e5',
    },
    '& h6': {
      marginRight: 15,
    },
    flexWrap: 'wrap',
    [theme.breakpoints.down('sm')]: {
      justifyContent: 'center',
    },
  },
  right: {
    marginLeft: 'auto',
    display: 'flex',
    textAlign: 'center',
    alignItems: 'center',
    [theme.breakpoints.down('sm')]: {
      justifyContent: 'center',
      marginLeft: 'initial',
      textAlign: 'center',
    },
  },
  languageSwitcher: {
    marginRight: 15,
  },
  copyright: {
    display: 'flex',
    alignItems: 'center',
  },
  iconText: {
    margin: 'auto',
    marginLeft: 5,
  },
  center: {
    display: 'flex',
    alignItems: 'center',
  },
});

const HomeFooter = (props) => {
  const { classes } = props;
  return (
    <div className={classes.root}>
      <Typography variant="subtitle2" color="inherit" component={Link} to="/">
        <FormattedMessage
          id="home"
        />
      </Typography>
      <Typography variant="subtitle2" color="inherit">
        <FormattedMessage
          id="footer.privacypolicy"
        />
      </Typography>
      <Typography variant="subtitle2" color="inherit">
        <FormattedMessage
          id="footer.faq"
        />
      </Typography>
      <Typography variant="subtitle2" color="inherit">
        <FormattedMessage
          id="contact"
        />
      </Typography>
      <Typography variant="subtitle2" color="inherit" className={classes.copyright}>
        <FaRegCopyright />
        <p className={classes.iconText}>2019 MigrantHub</p>
      </Typography>
      <div className={classes.right}>
        <div className={classes.languageSwitcher}>
          <LanguageSwitch dark />
        </div>
        <a href="https://github.com/tusmanakhter/MigrantHub" target="_blank" rel="noopener noreferrer" className={classes.center}><FaGithub size="2em" /></a>
      </div>
    </div>
  );
};

HomeFooter.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(HomeFooter);
