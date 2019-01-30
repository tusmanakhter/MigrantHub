import React, { Component } from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import PropTypes from 'prop-types';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import blue from '@material-ui/core/colors/blue';
import { Redirect } from 'react-router-dom';
import axios from 'axios';
import GoogleMaps from 'components/GoogleMaps/GoogleMaps';
import UserTypes from 'lib/UserTypes';
import SweetAlert from "react-bootstrap-sweetalert";
import sweetAlertStyle from "assets/jss/material-dashboard-pro-react/views/sweetAlertStyle.jsx";
import { AuthConsumer } from 'routes/AuthContext';

const styles = {
  avatar: {
    backgroundColor: blue[100],
    color: blue[600],
  },
};

class ViewService extends Component {
  constructor(props) {
    super(props);
    this.state = {
      redirectTo: false,
      redirectToURL: '',
      redirectState: {},
      alert: null,
      show: false,
    };
    this.hideAlert = this.hideAlert.bind(this);
    this.successDelete = this.successDelete.bind(this);
    this.cancelDetele = this.cancelDetele.bind(this);
  }

  handleEdit = () => {
    const { serviceId } = this.props;
    this.setState({
      redirectTo: true,
      redirectToURL: '/services/create',
      redirectState: {
        editMode: true,
        serviceId,
      },
    });
  }

  handleDelete = () => {
    const { serviceId, onClose, getData } = this.props;
    axios.delete('/api/services/' + serviceId)
      .then((response) => {
        if (response.status === 200) {
          onClose();
          getData();
        }
      });
  };

  warningWithConfirmAndCancelMessage() {
    this.setState({
      alert: (
        <SweetAlert
          warning
          style={{ display: "block", marginTop: "-100px" }}
          title="Are you sure?"
          onConfirm={() => this.successDelete()}
          onCancel={() => this.cancelDetele()}
          confirmBtnCssClass={
            this.props.classes.button + " " + this.props.classes.success
          }
          cancelBtnCssClass={
            this.props.classes.button + " " + this.props.classes.danger
          }
          confirmBtnText="Yes, delete it!"
          cancelBtnText="Cancel"
          showCancel
        >
          You will not be able to recover this service!
        </SweetAlert>
      )
    });
  }

  successDelete() {
    this.setState({
      alert: (
        <SweetAlert
          success
          style={{ display: "block", marginTop: "-100px" }}
          title="Deleted!"
          onConfirm={() => this.hideAlert()}
          onCancel={() => this.hideAlert()}
          confirmBtnCssClass={
            this.props.classes.button + " " + this.props.classes.success
          }
        >
          Your service has been deleted.
        </SweetAlert>
      )
    });
    this.handleDelete();
  }
  cancelDetele() {
    this.setState({
      alert: (
        <SweetAlert
          danger
          style={{ display: "block", marginTop: "-100px" }}
          title="Cancelled"
          onConfirm={() => this.hideAlert()}
          onCancel={() => this.hideAlert()}
          confirmBtnCssClass={
            this.props.classes.button + " " + this.props.classes.success
          }
        >
          Your service file is safe :)
        </SweetAlert>
      )
    });
  }

  hideAlert() {
    this.setState({
      alert: null
    });
  }

  render() {
    const {
      classes, serviceTitle, serviceSummary, serviceDescription, serviceLocation, serviceDate,
      serviceHours, open, scroll, editMode, onClose, category, subcategory
    } = this.props;
    const { redirectTo, redirectToURL, redirectState, type } = this.state;

    if (redirectTo) {
      return (
        <Redirect to={{
          pathname: redirectToURL,
          state: redirectState,
        }}
        />
      );
    }

    return (
      <AuthConsumer>
        {({ user }) => (
          <div>
            {this.state.alert}
              <Dialog
                open={open}
                onClose={onClose}
                scroll={scroll}
                aria-labelledby="scroll-dialog-title"
                fullWidth
                maxWidth="lg"
              >
                <DialogTitle id="scroll-dialog-title" variant="title" align="center">{serviceTitle}</DialogTitle>
                <DialogContent>
                  <Typography variant="body1" color="inherit" paragraph align="center">
                      Service Category: {category}
                  </Typography>
                  <Typography variant="body1" color="inherit" paragraph align="center">
                    Service SubCategory: {subcategory}
                  </Typography>
                  <Typography variant="body2" color="inherit" paragraph align="center">
                    {serviceSummary}
                  </Typography>
                  <Typography variant="body1" color="inherit" paragraph align="center">
                    {serviceDescription}
                  </Typography>

                  {serviceDate !== undefined && (
                    <Grid container spacing={12}>
                      <Typography variant="h5" color="inherit" paragraph>
                        Service date:
                    </Typography>
                      <Grid container spacing={12}>
                        <Grid item xs={12}>
                          Start date:
                        {' '}
                          {serviceDate.startDate.substring(0, 10)}
                        </Grid>
                        <Grid item xs={12}>
                          End date:
                        {' '}
                          {serviceDate.endDate.substring(0, 10)}
                        </Grid>
                      </Grid>
                    </Grid>
                  )}
                  {serviceHours.length > 0 ? (
                    <Typography variant="h5" color="inherit" paragraph>
                      <br />
                      Service Hours:
                    </Typography>
                  ) : ''}
                  {serviceHours.map(item => (
                    <Grid justify="center" container item xs>
                      <Grid container spacing={6}>
                        <Grid item xs={2}>
                          {item.serviceDay}
                        </Grid>
                        <Grid item xs={2}>
                          Start time:
                          {' '}
                          {item.startTime}
                        </Grid>
                        <Grid item xs={2}>
                          End time:
                          {' '}
                          {item.endTime}
                        </Grid>
                      </Grid>
                    </Grid>
                  ))}
                  {serviceLocation !== undefined && (
                    <Grid container spacing={12}>
                      <Typography variant="h5" color="inherit" paragraph>
                        <br />
                        Location:
                    </Typography>
                      <Grid container spacing={12}>
                        <Grid item xs={12}>
                          Address:
                        {' '}
                          {serviceLocation.address}
                        </Grid>
                        <Grid item xs={12}>
                          Apartment:
                        {' '}
                          {serviceLocation.apartment}
                        </Grid>
                        <Grid item xs={12}>
                          City:
                        {' '}
                          {serviceLocation.city}
                        </Grid>
                        <Grid item xs={12}>
                          Province:
                        {' '}
                          {serviceLocation.province}
                        </Grid>
                        <Grid item xs={12}>
                          Postal Code:
                        {' '}
                          {serviceLocation.postalCode}
                        </Grid>
                        <Grid item xs={12}>
                          Phone Number:
                        {' '}
                          {serviceLocation.phoneNumber}
                        </Grid>
                      </Grid>
                    </Grid>
                  )}
                  {open && serviceLocation !== undefined && (
                    <GoogleMaps
                      location={serviceLocation}
                    />
                  )}
                </DialogContent>
                <DialogActions>
                  { user.type === UserTypes.ADMIN
                    && (
                      <Button onClick={this.warningWithConfirmAndCancelMessage.bind(this)} color="secondary">
                        Delete
                      </Button>
                    )
                  }}
                  {editMode && (
                    <React.Fragment>
                      <Button onClick={this.warningWithConfirmAndCancelMessage.bind(this)} color="secondary">
                        Delete
                    </Button>
                      <Button onClick={this.handleEdit} color="primary">
                        Edit
                    </Button>
                    </React.Fragment>
                  )}
                  <Button onClick={onClose} color="primary">
                    Cancel
                  </Button>
                </DialogActions>
              </Dialog>
          </div>
        )}
      </AuthConsumer>
    );
  }
}

ViewService.propTypes = {
  serviceId: PropTypes.string.isRequired,
  serviceTitle: PropTypes.string.isRequired,
  serviceSummary: PropTypes.string.isRequired,
  serviceDescription: PropTypes.string.isRequired,
  serviceDate: PropTypes.shape({
    startDate: PropTypes.string.isRequired,
    endDate: PropTypes.string.isRequired,
  }).isRequired,
  serviceLocation: PropTypes.shape({
    address: PropTypes.string.isRequired,
    apartment: PropTypes.string.isRequired,
    city: PropTypes.string.isRequired,
    province: PropTypes.string.isRequired,
    postalCode: PropTypes.string.isRequired,
    phoneNumber: PropTypes.string.isRequired,
  }).isRequired,
  serviceHours: PropTypes.shape([{
    serviceDay: PropTypes.string.isRequired,
    startTime: PropTypes.string.isRequired,
    endTime: PropTypes.string.isRequired,
  }]).isRequired,
  scroll: PropTypes.string.isRequired,
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  editMode: PropTypes.bool.isRequired,
  getData: PropTypes.func.isRequired,
};

export default withStyles(sweetAlertStyle)(ViewService);
