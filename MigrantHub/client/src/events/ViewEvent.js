import React, { Component } from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import classNames from "classnames";
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import PropTypes from 'prop-types';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
//import Button from '@material-ui/core/Button';
import Button from "components/CustomButtons/Button.jsx";
import Icon from "@material-ui/core/Icon";
import IconButton from '@material-ui/core/IconButton';
import blue from '@material-ui/core/colors/blue';
import { Redirect } from 'react-router-dom';
import axios from 'axios';
import GoogleMaps from 'components/GoogleMaps/GoogleMaps';
import UserTypes from 'lib/UserTypes';
// @material-ui/icons
import AddLocation from "@material-ui/icons/AddLocation";
import Dashboard from "@material-ui/icons/Dashboard";

import GridItem from "components/Grid/GridItem.jsx";
import NavPills from "components/NavPills/NavPills.jsx";
import Card from "components/Card/Card.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardBody from "components/Card/CardBody.jsx";
import { cardTitle } from "assets/jss/material-dashboard-pro-react.jsx";
import SweetAlert from "react-bootstrap-sweetalert";
import sweetAlertStyle from "assets/jss/material-dashboard-pro-react/views/sweetAlertStyle.jsx";
import AddToCalendar from 'react-add-to-calendar';

const styles = {
  cardTitle,
  sweetAlertStyle,
  pageSubcategoriesTitle: {
    color: "#3C4858",
    textDecoration: "none",
    textAlign: "center"
  },
  cardCategory: {
    margin: "0",
    color: "#999999"
  },
  avatar: {
    backgroundColor: blue[100],
    color: blue[600],
  },
  cardIconTitle: {
    ...cardTitle,
    marginTop: "15px",
    marginBottom: "0px"
  }
};

class ViewEvent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      redirectTo: false,
      redirectToURL: '',
      redirectState: {},
      type: '',
      alert: null,
      show: false,
      event: {
        title: this.props.eventName,
        description: this.props.description,
        location: this.props.location.address,
        startTime: this.props.dateStart.substring(0, 11) + this.props.timeStart + ":00-04:00",
        endTime: this.props.dateEnd.substring(0, 11) + this.props.timeEnd + ":00-04:00"
      }
    };
    this.hideAlert = this.hideAlert.bind(this);
    this.successDelete = this.successDelete.bind(this);
    this.cancelDetele = this.cancelDetele.bind(this);
  }

  componentDidMount() {
    this.getUser();
  }

  handleEdit = () => {
    const { eventId } = this.props;
    this.setState({
      redirectTo: true,
      redirectToURL: '/events/create',
      redirectState: {
        editMode: true,
        eventId,
      },
    });
  }

  handleDelete = () => {
    const { eventId, onClose, getData } = this.props;
    axios.delete('/api/events/' + eventId)
      .then(response => {
        if (response.status === 200) {
          onClose();
          getData();
        }
      });
  };

  getUser() {
    const user = JSON.parse(localStorage.getItem('user'));
    this.setState({
      type: user.type,
    })
  }

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
      classes, eventName, description, dateStart, dateEnd, timeStart, timeEnd,
      location, open, scroll, onClose,
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
      <div>
        {this.state.alert}
        <Dialog
          open={open}
          onClose={onClose}
          style={{ backgroundColor: 'transparent' }}
          overlayStyle={{ backgroundColor: 'transparent' }}
          PaperProps={{
            style: {
              backgroundColor: 'transparent',
              boxShadow: 'none',
            },
          }}
          scroll={scroll}
          aria-labelledby="scroll-dialog-title"
          fullWidth
          maxWidth="lg"
          xs={12} sm={12} md={6}
        >
          <GridItem>
            <Card>
              <CardHeader>
                <h4 className={classes.cardTitle}>
                  {eventName} <small> {dateStart.substring(0, 10)}</small>
                </h4>
              </CardHeader>
              <CardBody>
                <NavPills
                  color="rose"
                  horizontal={{
                    tabsGrid: { xs: 12, sm: 12, md: 4 },
                    contentGrid: { xs: 12, sm: 12, md: 8 }
                  }}
                  tabs={[
                    {
                      tabButton: "Description",
                      tabIcon: Dashboard,
                      tabContent: (
                        <span>
                          <p>
                            <center>{description}</center>
                          </p>
                          <br />
                          <p>
                            <b>Start date:</b>
                            {' '}
                            {dateStart.substring(0, 10)}
                            {' '}
                            <b>End date:</b>
                            {' '}
                            {dateEnd.substring(0, 10)}
                            {' '}
                            <b>Start time:</b>
                            {' '}
                            {timeStart}
                            {' '}
                            <b>End time:</b>
                            {' '}
                            {timeEnd}
                          </p>
                          <p>
                            {location !== undefined && (
                              <p>
                                <center><h6><b>Location</b></h6></center>
                                <Grid>
                                  <b>Address:</b>
                                  {' '}
                                  {location.address}
                                  <br />
                                  <b>Apartment:</b>
                                  {' '}
                                  {location.apartment}
                                  <br />
                                  <b>City:</b>
                                  {' '}
                                  {location.city}
                                  <br />
                                  <b>Province:</b>
                                  {' '}
                                  {location.province}
                                  <br />
                                  <b>Postal Code:</b>
                                  {' '}
                                  {location.postalCode}
                                  <br />
                                  <b>Phone Number:</b>
                                  {' '}
                                  {location.phoneNumber}
                                  <br />
                                </Grid>
                              </p>
                            )}
                          </p>
                          <hr />
                          <p>Share Now!</p>
                          <AddToCalendar event={this.state.event}
                            buttonWrapperClass={renderProps => (
                              <Button onClick={renderProps.onClick}
                                justIcon
                                color="transparent">
                                <Icon className={classNames(classes.icon, "fab fa-google-plus")} />
                              </Button>
                            )}
                          />
                        </span>
                      )
                    },
                    {
                      tabButton: "Map",
                      tabIcon: AddLocation,
                      tabContent: (
                        <span>
                          <CardBody>
                            <GoogleMaps
                              location={location}
                            />
                          </CardBody>
                        </span>
                      )
                    }
                  ]}
                />
              </CardBody>
              <DialogActions>
                {type === UserTypes.ADMIN
                  && (
                    <Button onClick={this.warningWithConfirmAndCancelMessage.bind(this)} color="secondary">
                      Delete
                      </Button>
                  )
                }}
                  {this.props.editMode &&
                  <React.Fragment>
                    <Button onClick={this.warningWithConfirmAndCancelMessage.bind(this)} color="secondary">
                      Delete
                        </Button>
                    <Button onClick={this.handleEdit} color="primary">
                      Edit
                        </Button>
                  </React.Fragment>
                }
                <Button onClick={onClose} color="primary">
                  Cancel
                  </Button>
              </DialogActions>
            </Card>
          </GridItem>
        </Dialog>

      </div>
    );
  }
}

ViewEvent.propTypes = {
  classes: PropTypes.shape({}).isRequired,
  eventId: PropTypes.string.isRequired,
  eventName: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  dateStart: PropTypes.string.isRequired,
  dateEnd: PropTypes.string.isRequired,
  timeStart: PropTypes.string.isRequired,
  timeEnd: PropTypes.string.isRequired,
  location: PropTypes.shape({
    address: PropTypes.string.isRequired,
    apartment: PropTypes.string.isRequired,
    city: PropTypes.string.isRequired,
    province: PropTypes.string.isRequired,
    postalCode: PropTypes.string.isRequired,
    phoneNumber: PropTypes.string.isRequired,
  }).isRequired,
  scroll: PropTypes.string.isRequired,
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  editMode: PropTypes.bool.isRequired,
  getData: PropTypes.func.isRequired,
};
export default withStyles(styles)(ViewEvent);
