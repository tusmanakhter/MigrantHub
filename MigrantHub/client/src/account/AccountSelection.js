import React from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import { Link } from 'react-router-dom';
import { FaCreditCard, FaAddressCard } from 'react-icons/fa';
import { FormattedMessage } from 'react-intl';

const styles = theme => ({
  layout: {
    [theme.breakpoints.down('lg')]: {
      padding: '0% 10% 0% 10%',
    },
    [theme.breakpoints.down('sm')]: {
      padding: '0% 1% 0% 1%',
    },
    flexGrow: 1,
    height: 'auto',
    width: 'auto',
    alignItems: 'center',
    margin: 0,
    padding: '0% 20% 0% 20%',
  },
  title: {
    width: 'auto',
    margin: 20,
  },
  paper: {
    [theme.breakpoints.down('xs')]: {
      padding: `${theme.spacing.unit * 1}px ${theme.spacing.unit * 2}px ${theme.spacing.unit * 2}px`,
    },
    [theme.breakpoints.up('md')]: {
      height: '450px',
    },
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    textAlign: 'left',
    margin: 'auto',
    padding: `${theme.spacing.unit * 5}px ${theme.spacing.unit * 6}px ${theme.spacing.unit * 6}px`,
  },
  icon: {
    marginTop: 5,
    marginRight: 10,
    float: 'left',
  },
  section: {
    marginBottom: 10,
  },
  button: {
    background: '#193446',
    color: 'white',
    margin: 'auto',
    padding: 10,
    boxShadow: 'none',
    width: '100%',
  },
});

const AccountSelection = (props) => {
  const { classes } = props;

  return (
    <React.Fragment>
      <Grid container className={classes.title}>
        <Grid item xs={12}>
          <Typography variant="h5">
            <FormattedMessage id="signup.selection.create" />
          </Typography>
        </Grid>
      </Grid>
      <Grid container spacing={24} className={classes.layout}>
        <Grid item md={6}>
          <Paper className={classes.paper}>
            <div className={classes.section}>
              <FaAddressCard size="3em" className={classes.icon} />
              <Typography variant="h5">
                <FormattedMessage id="signup.selection.personal" />
              </Typography>
              <Typography variant="subtitle1">
                <FormattedMessage id="signup.selection.personalSubtitle" />
              </Typography>
            </div>
            <Typography variant="body2" className={classes.section}>
              <FormattedMessage id="signup.selection.personalDesc" />
            </Typography>
            <ul>
              <li><Typography variant="subtitle2"><FormattedMessage id="signup.selection.personal1" /></Typography></li>
              <li><Typography variant="subtitle2"><FormattedMessage id="signup.selection.personal2" /></Typography></li>
              <li><Typography variant="subtitle2"><FormattedMessage id="signup.selection.personal3" /></Typography></li>
            </ul>
            <Button variant="contained" component={Link} to="/signup/personal" className={classes.button}>
              <FormattedMessage id="signup.selection.personalSignUp" />
            </Button>
          </Paper>
        </Grid>
        <Grid item md={6}>
          <Paper className={classes.paper}>
            <div className={classes.section}>
              <FaCreditCard size="3em" className={classes.icon} />
              <Typography variant="h5">
                <FormattedMessage id="signup.selection.business" />
              </Typography>
              <Typography variant="subtitle1">
                <FormattedMessage id="signup.selection.businessSubtitle" />
              </Typography>
            </div>
            <Typography variant="body2" className={classes.section}>
              <FormattedMessage id="signup.selection.businessDesc" />
            </Typography>
            <ul>
              <li><Typography variant="subtitle2"><FormattedMessage id="signup.selection.business1" /></Typography></li>
              <li><Typography variant="subtitle2"><FormattedMessage id="signup.selection.business2" /></Typography></li>
              <li><Typography variant="subtitle2"><FormattedMessage id="signup.selection.business3" /></Typography></li>
            </ul>
            <Button variant="contained" component={Link} to="/signup/business" className={classes.button}>
              <FormattedMessage id="signup.selection.businessSignUp" />
            </Button>
          </Paper>
        </Grid>
      </Grid>
    </React.Fragment>
  );
};

AccountSelection.propTypes = {
  classes: PropTypes.shape({}).isRequired,
};

export default withStyles(styles)(AccountSelection);
