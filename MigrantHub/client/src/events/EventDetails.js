import React, { Component } from 'react';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import 'App.css';
import GoogleMaps from 'components/GoogleMaps/GoogleMaps';
import axios from 'axios';
import qs from 'qs';
import AddToCalendar from 'react-add-to-calendar';
import withStyles from '@material-ui/core/styles/withStyles';
import { Link, Redirect } from 'react-router-dom';
import Button from 'components/CustomButtons/Button';
import { cardTitle } from 'assets/jss/material-dashboard-pro-react';
import SweetAlert from 'react-bootstrap-sweetalert';
import sweetAlertStyle from 'assets/jss/material-dashboard-pro-react/views/sweetAlertStyle';
import { AuthConsumer } from 'routes/AuthContext';
import UserTypes from 'lib/UserTypes';
import moment from 'moment';

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

class EventDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      eventId: props.match.params.id,
      eventName: '',
      eventDescription: '',
      location: '',
      dateStart: '',
      dateEnd: '',
      timeStart: '',
      timeEnd: '',
      eventImagePath: '',
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

  getData() {
    axios.get('/api/events/' + this.state.eventId, {
      params: {
        _id: this.state.eventId,
      },
    }).then((response) => {
      const parsedObj = qs.parse(qs.stringify(response.data));

      let tempLocation = {
        address: '',
        apartment: '',
        city: '',
        province: '',
        postalCode: '',
        phoneNumber: '',
      };

      if (parsedObj.location !== undefined) {
        tempLocation = parsedObj.location;
      }

      this.setState({
        eventName: parsedObj.eventName,
        eventDescription: parsedObj.description,
        location: tempLocation,
        dateStart: parsedObj.dateStart,
        dateEnd: parsedObj.dateEnd,
        timeStart: parsedObj.timeStart,
        timeEnd: parsedObj.timeEnd,
        eventImagePath: parsedObj.eventImagePath,
        eventOwner: parsedObj.user,
      });
    });
  }

  handleDelete = () => {
    const { eventId } = this.state;

    axios.delete('/api/events/' + eventId)
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
          You will not be able to recover this event!
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
          Your event has been deleted.
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
          Your event is safe :)
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
      eventId, eventName, eventDescription, dateStart, dateEnd, timeStart, timeEnd, location, eventOwner, alert, redirect,
    } = this.state;

    if (redirect) {
      return (
        <Redirect to="/events" />
      );
    }

    return (
      <AuthConsumer>
        {({ user }) => (
          <div>
            {alert}
            <Grid container spacing={24} style={gridStyle}>
              <Grid item xs={12}>
                <h2>{eventName}</h2>
              </Grid>
              <Grid item xs={12}>
                <h3>{eventDescription}</h3>
              </Grid>
              <Grid item xs={12}>
                <h3>{moment(dateStart).format('MMM D YYYY')} @ {moment(timeStart).format('H:MM')}</h3>
              </Grid>
              <Grid item xs={12}>
                <h3>{moment(dateEnd).format('MMM D YYYY')} @ {moment(timeEnd).format('H:MM')}</h3>
              </Grid>
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
                <Grid item xs={12}>
                  <GoogleMaps
                    location={location}
                  />
                </Grid>
              )}
              <Grid item xs={12}>
                Event Id : {eventId}
              </Grid>
              <Grid item xs={12}>
                <AddToCalendar />
              </Grid>
              <Grid item xs={12}>
                {user.type === UserTypes.ADMIN
                  && (
                    <Button onClick={this.warningWithConfirmAndCancelMessage} color="secondary">
                      Delete
                    </Button>
                  )
                }
                {user.username === eventOwner && (
                  <React.Fragment>
                    <Button onClick={this.warningWithConfirmAndCancelMessage} color="secondary">
                      Delete
                    </Button>
                    <Button
                      color="primary"
                      component={props => <Link to={{ pathname: '/events/create', state: { editMode: true, eventId } }} {...props} />}
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

export default withStyles(styles)(EventDetails);
