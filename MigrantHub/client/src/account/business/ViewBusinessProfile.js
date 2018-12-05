import React, { Component } from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import axios from 'axios';
import Header from '../../components/Header/Header';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
const qs = require('qs');

const styles = theme => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        padding: theme.spacing.unit * 2,
        textAlign: 'left',
        color: theme.palette.text.secondary,
    },
    label: {
        fontWeight: 'bold',
    }
});

class ViewBusinessProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: '',
      lastName: '',
      address: '',
      apartment: '',
      city: '',
      province: '',
      postalCode: '',
      phoneNumber: '',
      organizationName: '',
      orgType: '',
      department: '',
      serviceType: '',
      description: '',
    };

    this.getAccount = this.getAccount.bind(this);
  }

  componentDidMount() {
    this.getAccount(this);
  }

  componentWillReceiveProps() {
    this.getAccount(this);
  }

  getAccount(e) {
    const user = JSON.parse(localStorage.getItem('user'));
    axios.get('/api/businesses/' + user.username).then((response) => {
      const jsonObj = qs.parse(qs.stringify(response.data));

      if (response.status === 200) {
        e.setState({
          email: jsonObj.email,
          corpId: jsonObj.corpId,
          password: jsonObj.password,
          confirmPassword: jsonObj.confirmPassword,
          firstName: jsonObj.firstName,
          lastName: jsonObj.lastName,
          address: jsonObj.address,
          apartment: jsonObj.apartment,
          city: jsonObj.city,
          province: jsonObj.province,
          postalCode: jsonObj.postalCode,
          phoneNumber: jsonObj.phoneNumber,
          organizationName: jsonObj.organizationName,
          orgType: jsonObj.orgType,
          department: jsonObj.department,
          serviceType: jsonObj.serviceType,
          description: jsonObj.description,
        });
      }
    })
  }

  render() {
    const { classes } = this.props;

    const {
      firstName, lastName, address, apartment, city, province, postalCode, phoneNumber,
      organizationName, department, orgType, serviceType, description,
    } = this.state;

    return (
      <React.Fragment>
        <Header />
          <div className={classes.root}>
              <Grid
                  container spacing={6}
                  direction="column"
                  justify="flex-start"
                  alignItems="stretch"
              >
                  <Grid item xs={12}>
                      <Paper className={classes.paper}>
                          <Typography variant="title" gutterBottom>
                              Contact Information
                          </Typography>
                      </Paper>
                  </Grid>
                  <Grid item xs={12}>
                      <Paper className={classes.paper}>
                          <label className={classes.label}>
                              First Name:
                          </label>
                          {firstName}
                      </Paper>
                  </Grid>
                  <Grid item xs={12}>
                      <Paper className={classes.paper}>
                          <label className={classes.label}>
                              Last Name:
                          </label>
                          {lastName}
                      </Paper>
                  </Grid>
                  <Grid item xs={12}>
                      <Paper className={classes.paper}>
                          <label className={classes.label}>
                              Address:
                          </label>
                          {address}
                      </Paper>
                  </Grid>
                  <Grid item xs={12}>
                      <Paper className={classes.paper}>
                          <label className={classes.label}>
                              Apartment:
                          </label>
                          {apartment}
                      </Paper>
                  </Grid>

                  <Grid item xs={12}>
                      <Paper className={classes.paper}>
                          <label className={classes.label}>
                              City:
                          </label>
                          {city}
                      </Paper>
                  </Grid>
                  <Grid item xs={12}>
                      <Paper className={classes.paper}>
                          <label className={classes.label}>
                              Province:
                          </label>
                          {province}
                      </Paper>
                  </Grid>

                  <Grid item xs={12}>
                      <Paper className={classes.paper}>
                          <label className={classes.label}>
                              Postal Code:
                          </label>
                          {postalCode}
                      </Paper>
                  </Grid>
                  <Grid item xs={12}>
                      <Paper className={classes.paper}>
                          <label className={classes.label}>
                              Phone Number:
                          </label>
                          {phoneNumber}
                      </Paper>
                  </Grid>
              </Grid>
              <Grid
                  container spacing={6}
                  direction="column"
                  justify="flex-start"
                  alignItems="stretch"
              >
                  <Grid item xs={12}>
                      <Paper className={classes.paper}>
                          <Typography variant="title" gutterBottom>
                              About Information
                          </Typography>
                      </Paper>
                  </Grid>
                  <Grid item xs={12}>
                      <Paper className={classes.paper}>
                          <label className={classes.label}>
                              Organization Name:
                          </label>
                          {organizationName}
                      </Paper>
                  </Grid>
                  <Grid item xs={12}>
                      <Paper className={classes.paper}>
                          <label className={classes.label}>
                              Organization Type:
                          </label>
                          {orgType}
                      </Paper>
                  </Grid>
                  <Grid item xs={12}>
                      <Paper className={classes.paper}>
                          <label className={classes.label}>
                              Department:
                          </label>
                          {department}
                      </Paper>
                  </Grid>
                  <Grid item xs={12}>
                      <Paper className={classes.paper}>
                          <label className={classes.label}>
                              Service Type:
                          </label>
                          {serviceType}
                      </Paper>
                  </Grid>

                  <Grid item xs={12}>
                      <Paper className={classes.paper}>
                          <label className={classes.label}>
                              Description:
                          </label>
                          {description}
                      </Paper>
                  </Grid>
              </Grid>
          </div>
      </React.Fragment>
    );
  }
}

ViewBusinessProfile.propTypes = {
  classes: PropTypes.shape({}).isRequired,
};

export default withStyles(styles)(ViewBusinessProfile);
