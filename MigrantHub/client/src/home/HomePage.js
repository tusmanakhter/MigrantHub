import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
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
    textSize:"10px",
    textAlign: 'center',
    color: 'white',
    padding: '10% 25% 7% 25%',
    background: theme.palette.primary.main,
  },
  business: {
    [theme.breakpoints.down('sm')]: {
      padding: '3%',
    },
    background: theme.palette.common.white,
    color: 'black',
    padding: '3% 20% 3% 20%',
  },
  about: {
    [theme.breakpoints.down('sm')]: {
      padding: '3%',
    },
    color: 'black',
    padding: '3% 20% 3% 20%',
    background: theme.palette.secondary.light,
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
    textDecoration: 'underline',
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
    background: theme.palette.common.white,
    color: theme.palette.primary.main,
    width: 150,
  },
  aboutButton: {
    borderColor: theme.palette.common.white,
    color: theme.palette.common.white,
    width: 150,
  },
  businessButton: {
    background: theme.palette.secondary.main,
    color: 'white',
  },
});

const HomePage = (props) => {
  const { classes } = props;

  return (
    <div className={classes.root}>
      <Grid container>
        <Grid item xs={12} className={classes.top}>
          <Grid item xs={12}>
            <Typography variant="h5" color="inherit" gutterBottom>
              <FormattedMessage id="home.title" />
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography color="inherit" gutterBottom>
              <FormattedMessage id="home.subtitle" />
            </Typography>
          </Grid>
          <Grid item xs={12} className={classes.buttons}>
            <Button variant="contained" component={Link} to="/signup/personal" className={[classes.button, classes.signUpButton].join(' ')}>
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
          <Typography gutterBottom>
            <FormattedMessage id="home.businessInfo" />
          </Typography>
          <Grid item xs={12} className={classes.buttons}>
            <Button variant="contained" component={Link} to="/signup/business" className={[classes.button, classes.businessButton].join(' ')}>
              <FormattedMessage id="home.signupBusiness" />
            </Button>
          </Grid>
        </Grid>
        <Grid item xs={12} className={classes.about}>
          <div className={classes.underline}>
            <Typography variant="h5" gutterBottom>
              <FormattedMessage id="home.aboutus" />
            </Typography>
          </div>
          <div className={classes.content}>
            <Typography gutterBottom>
              <FormattedHTMLMessage id="home.aboutus1" />
            </Typography>
          </div>
        </Grid>
      </Grid>
    </div>
  );
};

HomePage.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(HomePage);
