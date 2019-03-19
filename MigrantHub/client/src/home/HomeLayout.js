import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { Link } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';
import { FaGithub, FaRegCopyright } from 'react-icons/fa';

const styles = theme => ({
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
  header: {
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
  headerLinks: {
    fontSize: '18px',
  },
  title: {
    display: 'block',
    marginRight: 'auto',
    [theme.breakpoints.down('xs')]: {
      marginRight: 'initial',
    },
  },
  appBar: {
    padding: '0% 7.5%',
    background: theme.palette.primary.main,
  },
  toolbar: {
    [theme.breakpoints.down('xs')]: {
      padding: '0% 1% 0% 2%',
      display: 'flex',
      flexDirection: 'column',
      textAlign: 'center',
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
  root: {
    display: 'flex',
    alignItems: 'center',
    background: theme.palette.primary.main,
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
    zoom: 0.8,
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

class HomeLayout extends Component {

  componentDidMount() {
    const script = document.createElement('script');
    script.src = '//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
    script.async = true;
    document.head.appendChild(script);
    const script2 = document.createElement('script');
    script2.appendChild(document.createTextNode("function googleTranslateElementInit() {new google.translate.TranslateElement({pageLanguage: 'en', layout: google.translate.TranslateElement.InlineLayout.SIMPLE}, 'google_translate_element');}"));
    document.head.appendChild(script2);
  }

  render() {
    const { classes, children } = this.props;

    return (
      <React.Fragment>
        <div className={classes.layout}>
          <div className={classes.content}>
            <div className={classes.header}>
              <AppBar position="static" className={classes.appBar}>
                <Toolbar className={classes.toolbar}>
                  <Typography variant="h6" color="inherit" className={classes.title}>
                    <Link to="/">MigrantHub</Link>
                  </Typography>
                  <div className={classes.headerLinks}>
                    <Link to="/login">
                      <FormattedMessage id="login" />
                    </Link>
                    <Link to="/signup/personal">
                      <FormattedMessage id="signup" />
                    </Link>
                  </div>
                  <div className={classes.languageSwitcher}>
                    <div id="google_translate_element" />
                  </div>
                </Toolbar>
              </AppBar>
              <div className={classes.underline} />
            </div>
            { children }
          </div>
          <div className={classes.footer}>
            <div className={classes.root}>
              <Typography variant="subtitle2" color="inherit" component={Link} to="/">
                <FormattedMessage id="home" />
              </Typography>
              <Typography variant="subtitle2" color="inherit">
                <FormattedMessage id="footer.privacypolicy" />
              </Typography>
              <Typography variant="subtitle2" color="inherit">
                <FormattedMessage id="footer.faq" />
              </Typography>
              <Typography variant="subtitle2" color="inherit">
                <FormattedMessage id="contact" />
              </Typography>
              <Typography variant="subtitle2" color="inherit" className={classes.copyright}>
                <FaRegCopyright />
                <p className={classes.iconText}>2019 MigrantHub</p>
              </Typography>
              <div className={classes.right}>
                <a href="https://github.com/tusmanakhter/MigrantHub" target="_blank" rel="noopener noreferrer" className={classes.center}><FaGithub size="2em" /></a>
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
};

HomeLayout.propTypes = {
  classes: PropTypes.object.isRequired,
  children: PropTypes.shape({}).isRequired,
};

export default withStyles(styles)(HomeLayout);
