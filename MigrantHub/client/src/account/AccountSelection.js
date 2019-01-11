import React from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import HomeLayout from 'home/HomeLayout';
import { Link } from 'react-router-dom';
import { FaCreditCard, FaAddressCard } from 'react-icons/fa';

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
      <HomeLayout>
        <Grid container className={classes.title}>
          <Grid item xs={12}>
            <Typography variant="h5">Create your MigrantHub account for free!</Typography>
          </Grid>
        </Grid>
        <Grid container spacing={24} className={classes.layout}>
          <Grid item md={6}>
            <Paper className={classes.paper}>
              <div className={classes.section}>
                <FaAddressCard size="3em" className={classes.icon} />
                <Typography variant="h5">Personal</Typography>
                <Typography variant="subtitle1">For people who want to find services</Typography>
              </div>
              <Typography variant="body1" className={classes.section}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Laudantium incidunt ipsa exercitationem dolores nobis, aliquam commodi consequuntur tenetur inventore sapiente perferendis illum sint maxime fugit quidem! Ab possimus culpa eaque.</Typography>
              <ul>
                <li><Typography variant="body2">Its cool</Typography></li>
                <li><Typography variant="body2">Its awesome</Typography></li>
                <li><Typography variant="body2">Its amazing</Typography></li>
              </ul>
              <Button variant="contained" component={Link} to="/signup/personal" className={classes.button}>Sign Up for a Personal Account</Button>
            </Paper>
          </Grid>
          <Grid item md={6}>
            <Paper className={classes.paper}>
              <div className={classes.section}>
                <FaCreditCard size="3em" className={classes.icon} />
                <Typography variant="h5">Business</Typography>
                <Typography variant="subtitle1">For businesses who want to provide services</Typography>
              </div>
              <Typography variant="body1" className={classes.section}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Laudantium incidunt ipsa exercitationem dolores nobis, aliquam commodi consequuntur tenetur inventore sapiente perferendis illum sint maxime fugit quidem! Ab possimus culpa eaque.</Typography>
              <ul>
                <li><Typography variant="body2">Its cool</Typography></li>
                <li><Typography variant="body2">Its awesome</Typography></li>
                <li><Typography variant="body2">Its amazing</Typography></li>
              </ul>
              <Button variant="contained" component={Link} to="/signup/business" className={classes.button}>Sign Up for a Business Account</Button>
            </Paper>
          </Grid>
        </Grid>
      </HomeLayout>
    </React.Fragment>
  );
};

AccountSelection.propTypes = {
  classes: PropTypes.shape({}).isRequired,
};

export default withStyles(styles)(AccountSelection);
