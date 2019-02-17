import React, { Component } from 'react';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import 'App.css';
import GoogleMaps from 'components/GoogleMaps/GoogleMaps';
import axios from 'axios';
import qs from 'qs';
import AddToCalendar from 'react-add-to-calendar';
import Reviews from 'services/Reviews';
import withStyles from '@material-ui/core/styles/withStyles';
import { Link, Redirect } from 'react-router-dom';
import Button from 'components/CustomButtons/Button';
import { cardTitle } from 'assets/jss/material-dashboard-pro-react';
import SweetAlert from 'react-bootstrap-sweetalert';
import sweetAlertStyle from 'assets/jss/material-dashboard-pro-react/views/sweetAlertStyle';
import { AuthConsumer } from 'routes/AuthContext';
import UserTypes from 'lib/UserTypes';

const styles = {
  cardTitle,
  sweetAlertStyle,
};

var gridStyle = {
  backgroundColor: 'white',
  marginTop: '20px',
};

var buttonStyle = {
  color: 'black',
};

class ServiceDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      serviceId: props.match.params.id,
      serviceTitle: '',
      serviceSummary: '',
      serviceDescription: '',
      serviceDate: '',
      location: '',
      serviceHours: [],
      serviceImagePath: '',
      tempServiceImagePath: '',
      serviceImageName: '',
      dataRetrieved: 'Sorry this is not a valid link to share',
      alert: null,
      redirect: false,
    };

    this.hideAlert = this.hideAlert.bind(this);
    this.successDelete = this.successDelete.bind(this);
    this.cancelDelete = this.cancelDelete.bind(this);
    this.warningWithConfirmAndCancelMessage = this.warningWithConfirmAndCancelMessage.bind(this);
  }

  componentDidMount(props) {
    this.getData(this, props);
  }

  componentWillReceiveProps(props) {
    this.getData(this, props);
  }

  getData(event, props = this.props) {
    axios.get('/api/services/' + this.state.serviceId, {
      params: {
        _id: this.state.serviceId,
      },
    }).then((response) => {
      const parsedObj = qs.parse(qs.stringify(response.data));
      let locationExists = false;
      let serviceDateExists = false;
      let tempServiceHours = [];
      let tempServiceDate = {
        startDate: '',
        endDate: '',
      };
      let tempLocation = {
        address: '',
        apartment: '',
        city: '',
        province: '',
        postalCode: '',
        phoneNumber: '',
      };

      if (parsedObj.serviceHours !== undefined) {
        tempServiceHours = parsedObj.serviceHours;
      }
      if (parsedObj.location !== undefined) {
        locationExists = true;
        tempLocation = parsedObj.location;
      }
      if (parsedObj.serviceDate !== undefined) {
        serviceDateExists = true;
        tempServiceDate = {
          startDate: parsedObj.serviceDate.startDate.toString().substring(0, 10),
          endDate: parsedObj.serviceDate.endDate.toString().substring(0, 10),
        };
      }
      const imagePath = parsedObj.serviceImagePath.split('/');
      const imageName = imagePath[imagePath.length - 1];
      this.setState({
        serviceTitle: parsedObj.serviceTitle,
        serviceSummary: parsedObj.serviceSummary,
        serviceDescription: parsedObj.serviceDescription,
        serviceDate: tempServiceDate,
        location: tempLocation,
        serviceHours: tempServiceHours,
        serviceImagePath: parsedObj.serviceImagePath,
        tempServiceImagePath: parsedObj.serviceImagePath,
        serviceImageName: imageName,
        serviceOwner: parsedObj.user,
      });
    });
  }

  handleDelete = () => {
    const { serviceId } = this.state;

    axios.delete('/api/services/' + serviceId)
      .then((response) => {
        if (response.status === 200) {
          this.setState({
            redirect: true,
          });
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
          onCancel={() => this.cancelDelete()}
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
      ),
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
      ),
    });
    this.handleDelete();
  }

  cancelDelete() {
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
      ),
    });
  }

  hideAlert() {
    this.setState({
      alert: null,
    });
  }

  render() {
    const {
      appLogo, appName, userPic,
    } = this.props;
    const {
      serviceId, serviceTitle, serviceSummary, serviceDescription, serviceHours, location, alert, serviceOwner, redirect,
    } = this.state;

    if (redirect) {
      return (
        <Redirect to="/services" />
      );
    }

    return (
      <AuthConsumer>
        {({ user }) => (
      <div>
        {alert}
        <Grid container spacing={24} style={gridStyle}>
          <Grid item xs={12}>
            <h2>{serviceTitle}</h2>
          </Grid>
          <Grid item xs={12}>
            <h3>{serviceSummary}</h3>
          </Grid>
          <Grid item xs={12}>
            <h4>{serviceDescription}</h4>
          </Grid>
          {serviceHours !== undefined && (
            <Grid item xs={12}>
              {serviceHours.map((member, index) => (
                <Grid item xs={12}>
                  <b>{member.serviceDay}s {member.startTime} to {member.endTime}</b>
                </Grid>
              ))}
            </Grid>
          )}
          {location !== undefined && (
            <Grid item xs={12}>
              <Grid item xs={12}>
                Address:
                {' '}
                {location.address}
              </Grid>
              <Grid item xs={12}>
                Apartment:
                {' '}
                {location.apartment}
              </Grid>
              <Grid item xs={12}>
                City:
                {' '}
                {location.city}
              </Grid>
              <Grid item xs={12}>
                Province:
                {' '}
                {location.province}
              </Grid>
              <Grid item xs={12}>
                Postal Code:
                {' '}
                {location.postalCode}
              </Grid>
              <Grid item xs={12}>
                Phone Number:
                {' '}
                {location.phoneNumber}
              </Grid>
            </Grid>
          )}
          {location !== undefined && (
            <GoogleMaps
              location={location}
            />
          )}
          <Grid item xs={12}>
            Service Id : {serviceId}
          </Grid>
          <Grid item xs={12}>
            <Reviews serviceId={serviceId} serviceTitle={serviceTitle} />
          </Grid>
          <Grid item xs={12}>
            {user.type === UserTypes.ADMIN
              && (
                <Button onClick={this.warningWithConfirmAndCancelMessage} color="secondary">
                  Delete
                </Button>
              )
            }
            {user.username === serviceOwner && (
              <React.Fragment>
                <Button onClick={this.warningWithConfirmAndCancelMessage} color="secondary">
                  Delete
                </Button>
                <Button
                  color="primary"
                  component={props => <Link to={{ pathname: '/services/create', state: { editMode: true, serviceId } }} {...props} />}
                >
                  Edit
                </Button>
              </React.Fragment>
            )}
          </Grid>
        </Grid>
      </div>
        )}
      </AuthConsumer>
    );
  }
}

export default withStyles(styles)(ServiceDetails);
