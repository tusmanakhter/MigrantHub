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
  summary: {
    [theme.breakpoints.down('sm')]: {
      padding: '3%',
    },
    textSize: '10px',
    textAlign: 'center',
    color: 'white',
    padding: '10% 25% 10% 25%',
    background: theme.palette.primary.main,
  },
  aims: {
    [theme.breakpoints.down('sm')]: {
      padding: '3%',
    },
    background: theme.palette.common.white,
    color: 'black',
    padding: '3% 25% 3% 25%',
  },
  about: {
    [theme.breakpoints.down('sm')]: {
      padding: '3%',
    },
    color: 'black',
    padding: '3% 20% 3% 20%',
    background: theme.palette.secondary.light,
  },
  content: {
    marginTop: '5px',
    '& a': {
      color: 'inherit',
    },
    '& a:hover': {
      color: 'inherit',
      textDecoration: 'underline',
    },
  },
});

const HomePage = (props) => {
  const { classes } = props;

  return (
    <div className={classes.root}>
      <Grid container>
        <Grid item xs={12} className={classes.summary}>
        <h1>About Us</h1>
        <h5>We are a group of software engineering students working to create the most innovatif service platform for newcomers in Montreal.
        This project is powered by <b>The Refugee Centre</b>.</h5>
        <hr />
        <h3>Aims</h3>
        <ls>
          <li>Facilitate integration for newcomers</li>
          <li>Promote diversity and inclusion</li>
          <li>Help businesses reach out to newcomers</li>
          <li>Learn about newcomers using the website and guide them using AI technology</li>
        </ls>
        <h3>Objectives</h3>
        <ls>
          <li>Provide certified services to all users for free</li>
          <li>Learn about our users to personalize the types of services they might like</li>
          <li>Assist newcomers in what they are looking for </li>
          <li>Centralize all available services in Montreal into one place</li>
        </ls>
        <hr />
        <h3>Contact MigrantHub</h3>
        <ls>
          <p>Have questions regarding the website? OR Want to help the project? Please feel free to send us an email at:</p>
          <h4>mtl-migranthub@placeholder.com</h4>
        </ls>
        </Grid>
        <Grid item xs={12} className={classes.aims}>
        <h3>Current Members</h3>
        <a href='https://github.com/tusmanakhter'><h5>Tusman Akther</h5></a>
        <a href='https://github.com/CodeTaj'><h5>Tajbid Choudhury</h5></a>
        <a href='https://github.com/miramarhaba'><h5>Mira Marhaba</h5></a> 
        <a href='https://github.com/Smoudii'><h5>Alexandre Masmoudi</h5></a>
        <a href='https://github.com/mazennahle'><h5>Mazen Nahle</h5></a>
        <a href='https://github.com/rajee10'><h5>Rajee Vairamuthu</h5></a>
        <a href='https://github.com/iamlax'><h5>Laxman Velauthapillai</h5></a>
        </Grid>
      </Grid>
    </div>
  );
};

HomePage.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(HomePage);
