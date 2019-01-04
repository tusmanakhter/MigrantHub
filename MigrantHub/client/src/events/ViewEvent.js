import React, { Component } from 'react';
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker
} from "react-google-maps";
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
// @material-ui/icons
import Map from "@material-ui/icons/Map";
import AddLocation from "@material-ui/icons/AddLocation";
import Place from "@material-ui/icons/Place";
import Dashboard from "@material-ui/icons/Dashboard";
import Schedule from "@material-ui/icons/Schedule";
import CardIcon from "components/Card/CardIcon.jsx";

import GridItem from "components/Grid/GridItem.jsx";
import NavPills from "components/NavPills/NavPills.jsx";
import Card from "components/Card/Card.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardBody from "components/Card/CardBody.jsx";
import { cardTitle } from "assets/jss/material-dashboard-pro-react.jsx";

const styles = {
  cardTitle,
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

const RegularMap = withScriptjs(
  withGoogleMap(props => (
    <GoogleMap
      defaultZoom={8}
      defaultCenter={{ lat: 40.748817, lng: -73.985428 }}
      defaultOptions={{
        scrollwheel: false
      }}
    >
      <Marker position={{ lat: 40.748817, lng: -73.985428 }} />
    </GoogleMap>
  ))
);

class ViewEvent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      redirectTo: false,
      redirectToURL: '',
      redirectState: {},
      type: '',
    };
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

  getUser(){
    const user = JSON.parse(localStorage.getItem('user'));
    this.setState({
      type: user.type,
    })
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
        <Dialog
          open={open}
          onClose={onClose}
          style={{backgroundColor: 'transparent'}}
          overlayStyle={{backgroundColor: 'transparent'}}
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
                        </span>
                      )
                    },
                    {
                      tabButton: "Schedule",
                      tabIcon: Schedule,
                      tabContent: (
                        <span>
                            <CardHeader color="rose" icon>
                              <CardIcon color="rose">
                                <AddLocation />
                              </CardIcon>
                              <h4 className={classes.cardIconTitle}>Map</h4>
                            </CardHeader>
                            <CardBody>
                              <RegularMap
                                googleMapURL="https://maps.googleapis.com/maps/api/js?key=YOUR_KEY_HERE"
                                loadingElement={<div style={{ height: `100%` }} />}
                                containerElement={
                                  <div
                                    style={{
                                      height: `280px`,
                                      borderRadius: "6px",
                                      overflow: "hidden"
                                    }}
                                  />
                                }
                                mapElement={<div style={{ height: `100%` }} />}
                              />
                            </CardBody>
                        </span>
                      )
                    }
                  ]}
                />
              </CardBody>
                <DialogActions> 
                  { type === UserTypes.ADMIN
                    && (
                      <Button onClick={this.handleDelete} color="secondary">
                        Delete
                      </Button>
                    )
                  }}
                  {this.props.editMode &&
                    <React.Fragment>
                        <Button onClick={this.handleDelete} color="secondary">
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
