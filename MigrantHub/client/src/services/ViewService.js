import React, { Component } from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import classNames from "classnames";
import Grid from '@material-ui/core/Grid';
import PropTypes from 'prop-types';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import { Redirect } from 'react-router-dom';
import blue from '@material-ui/core/colors/blue';
import axios from 'axios';
import GoogleMaps from 'components/GoogleMaps/GoogleMaps';
import UserTypes from 'lib/UserTypes';
import SweetAlert from "react-bootstrap-sweetalert";
import sweetAlertStyle from "assets/jss/material-dashboard-pro-react/views/sweetAlertStyle.jsx";
import { AuthConsumer } from 'routes/AuthContext';
import AddToCalendar from 'react-add-to-calendar';
//import Button from '@material-ui/core/Button';

import Button from "components/CustomButtons/Button.jsx";
import Icon from "@material-ui/core/Icon";
// @material-ui/icons
import AddLocation from "@material-ui/icons/AddLocation";
import Dashboard from "@material-ui/icons/Dashboard";

import GridItem from "components/Grid/GridItem.jsx";
import NavPills from "components/NavPills/NavPills.jsx";
import Card from "components/Card/Card.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardBody from "components/Card/CardBody.jsx";
import { cardTitle } from "assets/jss/material-dashboard-pro-react.jsx";

const styles = {
  cardTitle,
  sweetAlertStyle,
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
      event: {
        title: this.props.serviceTitle,
        description: this.props.serviceDescription,
        location: 'Montreal, QC',
        startTime: new Date().toLocaleString(),
        endTime: new Date().toLocaleString(),
      }
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
                      {serviceTitle}
                    </h4>
                  </CardHeader>
                  <CardBody>
                    <NavPills
                      color="rose"
                      horizontal={{
                        tabsGrid: { xs: 12, sm: 12, md: 2 },
                        contentGrid: { xs: 12, sm: 12, md: 8 }
                      }}
                      tabs={[
                        {
                          tabButton: "Description",
                          tabIcon: Dashboard,
                          tabContent: (
                            <span>
                               <p>
                                <b>Service Category:</b> {category}
                              </p>
                              <p>
                                <b>Service SubCategory:</b> {subcategory}
                              </p>
                              <br />
                              <p>
                                <center>{serviceSummary}</center>
                              </p>
                              <br />
                              <p>
                                <center>{serviceDescription}</center>
                              </p>
                              <br />
                              {serviceDate !== undefined && (
                              <p>
                                <b>Start date:</b>
                                {' '}
                                {serviceDate.startDate.substring(0, 10)}
                                {' '}
                                <b>End date:</b>
                                {' '}
                                {serviceDate.endDate.substring(0, 10)}
                              </p>
                                )}
                              {serviceHours.map(item => (
                              <p>
                                {' '}
                                <b>Week Day:</b>
                                {' '}
                                {item.serviceDay}
                                {' '}
                                <b>Start time:</b>
                                {' '}
                                {item.startTime}
                                {' '}
                                <b>End time:</b>
                                {' '}
                                {item.endTime}
                              </p>
                              ))}
                              <p>
                                {serviceLocation !== undefined && (
                                  <p>
                                    <center><h6><b>Location</b></h6></center>
                                    <Grid>
                                      <b>Address:</b>
                                      {' '}
                                      {serviceLocation.address}
                                      <br />
                                      <b>Apartment:</b>
                                      {' '}
                                      {serviceLocation.apartment}
                                      <br />
                                      <b>City:</b>
                                      {' '}
                                      {serviceLocation.city}
                                      <br />
                                      <b>Province:</b>
                                      {' '}
                                      {serviceLocation.province}
                                      <br />
                                      <b>Postal Code:</b>
                                      {' '}
                                      {serviceLocation.postalCode}
                                      <br />
                                      <b>Phone Number:</b>
                                      {' '}
                                      {serviceLocation.phoneNumber}
                                      <br />
                                    </Grid>
                                  </p>
                                )}
                              </p>
                              <hr />
                              <p>Share Now! <br />
                                <Button
                                  justIcon
                                  color="transparent">
                                  <Icon className={classNames(classes.icon, "fab fa-facebook-square")} />
                                </Button>
                                <Button
                                  justIcon
                                  color="transparent">
                                  <Icon className={classNames(classes.icon, "fab fa-google-plus")} />
                                </Button>
                                <Button
                                  justIcon
                                  color="transparent">
                                  <Icon className={classNames(classes.icon, "fab fa-twitter-square")} />
                                </Button>
                              </p>

                              <AddToCalendar event={this.state.event} />
                            </span>
                          )
                        },
                        {
                          tabButton: "Map",
                          tabIcon: AddLocation,
                          tabContent: (
                            <span>
                              <CardBody>
                              {serviceLocation !== undefined ? 
                                <GoogleMaps
                                  location={serviceLocation}
                                />
                              : <GoogleMaps
                                  location="Montreal, QC"
                                />}
                              </CardBody>
                            </span>
                          )
                        }
                      ]}
                    />
                  </CardBody>
                  <DialogActions>
                    {user.type === UserTypes.ADMIN
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

export default withStyles(styles)(ViewService);
