import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import HomeLayout from 'home/HomeLayout';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { Link } from 'react-router-dom';
import { FormattedMessage, FormattedHTMLMessage } from 'react-intl';

const styles = theme => ({
  root: {
    color: 'white',
    flexGrow: '1',
    display: 'flex',
  },
  label: {
    textTransform: 'none',
  },
  top: {
    [theme.breakpoints.down('sm')]: {
      padding: '3%',
    },
    textAlign: 'center',
    color: 'white',
    padding: '10% 25% 7% 25%',
    background: '#193446',
  },
  business: {
    [theme.breakpoints.down('sm')]: {
      padding: '3%',
    },
    color: 'black',
    padding: '3% 20% 3% 20%',
  },
  about: {
    [theme.breakpoints.down('sm')]: {
      padding: '3%',
    },
    color: 'black',
    padding: '3% 20% 3% 20%',
    background: '#e9c77b',
  },
  button: {
    margin: theme.spacing.unit,
    boxShadow: 'none',
  },
  buttons: {
    [theme.breakpoints.down('sm')]: {
      marginTop: 5,
    },
    marginTop: 50,
  },
  underline: {
    content: ' ',
    display: 'block',
    width: '100px',
    margin: '10px 0',
    border: '2px solid',
  },
  content: {
    marginTop: '10px',
    '& a': {
      color: 'inherit',
    },
    '& a:hover': {
      color: 'inherit',
      textDecoration: 'underline',
    },
  },
  signUpButton: {
    background: '#e9c77b',
    color: '#193446',
    width: 150,
  },
  aboutButton: {
    borderColor: '#e9c77b',
    color: '#e9c77b',
    width: 150,
  },
  businessButton: {
    background: '#193446',
    color: 'white',
  },
});

const HomePage = (props) => {
  const { classes } = props;

  return (
    <HomeLayout>
      <div className={classes.root}>
        <Grid container>
          <Grid item xs={12} className={classes.top}>
            <Grid item xs={12}>
              <Typography variant="h2" color="inherit" gutterBottom>
                <FormattedMessage id="home.title" />
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="h6" color="inherit" gutterBottom>
                <FormattedMessage id="home.subtitle" />
              </Typography>
            </Grid>
            <Grid item xs={12} className={classes.buttons}>
              <Button variant="contained" component={Link} to="/signup/account-selection" className={[classes.button, classes.signUpButton].join(' ')}>
                <FormattedMessage id="signup" />
              </Button>
              <Button variant="outlined" className={[classes.button, classes.aboutButton].join(' ')}>
                <FormattedMessage id="home.aboutus" />
              </Button>
            </Grid>
          </Grid>
          <Grid item xs={12} className={classes.business}>
            <Typography variant="h5" gutterBottom>
              <FormattedMessage id="home.askBusiness" />
            </Typography>
            <Typography variant="subtitle1" gutterBottom>
              <FormattedMessage id="home.businessInfo" />
            </Typography>
            <Grid item xs={12} className={classes.buttons}>
              <Button variant="contained" component={Link} to="/signup/business" className={[classes.button, classes.businessButton].join(' ')}>
                <FormattedMessage id="home.signupBusiness" />
              </Button>
            </Grid>
          </Grid>
          <Grid item xs={12} className={classes.about}>
            <Typography variant="h4" align="left" gutterBottom>
              <FormattedMessage id="home.aboutus" />
            </Typography>
            <div className={classes.underline} />
            <div className={classes.content}>
              <Typography variant="h6" align="left" gutterBottom>
                <FormattedHTMLMessage id="home.aboutus1" />
              </Typography>
            </div>
          </Grid>
        </Grid>
      </div>
    </HomeLayout>
  );
};

HomePage.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(HomePage);
