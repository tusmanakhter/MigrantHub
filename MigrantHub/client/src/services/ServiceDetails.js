import React, { Component } from 'react';
import { Redirect, Link } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import 'App.css';
import GoogleMaps from 'components/GoogleMaps/GoogleMaps';
import axios from 'axios';
import qs from 'qs';
import withStyles from '@material-ui/core/styles/withStyles';
import { AuthConsumer } from 'routes/AuthContext';
import UserTypes from 'lib/UserTypes';
import Reviews from 'services/Reviews';
import GridContainer from 'components/Grid/GridContainer.jsx';
import GridItem from 'components/Grid/GridItem.jsx';
import Card from 'components/Card/Card.jsx';
import CardBody from 'components/Card/CardBody.jsx';
import CardIcon from 'components/Card/CardIcon.jsx';
import CardHeader from 'components/Card/CardHeader.jsx';
import { cardTitle } from 'assets/jss/material-dashboard-pro-react.jsx';
import SweetAlert from 'react-bootstrap-sweetalert';
import sweetAlertStyle from 'assets/jss/material-dashboard-pro-react/views/sweetAlertStyle.jsx';
import CircularProgress from '@material-ui/core/CircularProgress';
import Button from 'components/CustomButtons/Button.jsx';
import moment from 'moment';
import CardMedia from '@material-ui/core/CardMedia';

const styles = {
  ...sweetAlertStyle,
  cardIconTitle: {
    ...cardTitle,
    marginTop: '15px',
    marginBottom: '0px',
  },
  gridStyleSmallPadding: {
    marginTop: '2px',
  },
  media: {
    objectFit: 'cover',
    padding: '15px',
    maxWidth: 600,
    minWidth: 600,
    minHeight: 400,
    maxHeight: 400,
  },
};

class ServiceDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
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
      redirect: false,
      dataRetrieved: 'Sorry this is not a valid link to share',
      alert: null,
      event: {
        title: this.props.serviceTitle,
        description: this.props.serviceDescription,
        location: 'Montreal, QC',
        startTime: new Date().toLocaleString(),
        endTime: new Date().toLocaleString(),
      },
      serviceAverageRating: 0,
      serviceRatingCount: 0,
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
    this.setState({ isLoading: true });
    axios.get(`/api/services/${this.state.serviceId}`, {
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
        serviceAverageRating: parsedObj.averageRating,
        serviceRatingCount: parsedObj.countRating,
        isLoading: false,
      });
    });
  }

    handleDelete = () => {
      const { serviceId } = this.state;

      axios.delete(`/api/services/${serviceId}`)
        .then((response) => {
          if (response.status === 200) {
            this.setState({
              redirect: true,
            });
          }
        });
      this.hideAlert();
    };

    warningWithConfirmAndCancelMessage() {
      this.setState({
        alert: (
          <SweetAlert
            warning
            style={{ display: 'block', marginTop: '-100px' }}
            title="Are you sure?"
            onConfirm={() => this.successDelete()}
            onCancel={() => this.cancelDelete()}
            confirmBtnCssClass={
                        `${this.props.classes.button} ${this.props.classes.success}`
                    }
            cancelBtnCssClass={
                        `${this.props.classes.button} ${this.props.classes.danger}`
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
            style={{ display: 'block', marginTop: '-100px' }}
            title="Deleted!"
            onConfirm={() => this.handleDelete()}
            onCancel={() => this.hideAlert()}
            confirmBtnCssClass={
                        `${this.props.classes.button} ${this.props.classes.success}`
                    }
          >
                  Your service has been deleted.
          </SweetAlert>
        ),
      });
    }

    cancelDelete() {
      this.setState({
        alert: (
          <SweetAlert
            danger
            style={{ display: 'block', marginTop: '-100px' }}
            title="Cancelled"
            onConfirm={() => this.hideAlert()}
            onCancel={() => this.hideAlert()}
            confirmBtnCssClass={
                        `${this.props.classes.button} ${this.props.classes.success}`
                    }
          >
                  Your service is safe :)
          </SweetAlert>
        ),
      });
    }

    hideAlert() {
      this.setState({
        alert: null,
      });
    }

    handleReviewUpdate() {
      this.getData(this, this.props);
    }

    render() {
      const {
        classes,
      } = this.props;
      const {
        serviceId, serviceTitle, serviceSummary, serviceDescription, serviceDate, serviceHours,
        location, alert, serviceOwner, redirect, serviceAverageRating, serviceRatingCount, isLoading,
        serviceImageName, serviceImagePath
      } = this.state;
      const icon = { 'calendar-plus-o': 'left' };

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
              <GridItem xs={12} sm={12} md={12} lg={12}>
                <Card>
                  <CardHeader color="rose" icon>
                    <CardIcon color="rose">
                      <h4><b>Service</b></h4>
                    </CardIcon>
                    <h4 className={classes.cardIconTitle}><b>{serviceTitle}</b></h4>
                  </CardHeader>
                  {serviceImagePath != '' && serviceImagePath != undefined &&
                    < GridItem align="center">
                      <CardMedia
                      component="img"
                      alt={serviceTitle}
                      className={classes.media}
                      image={serviceImagePath}
                      title={serviceImageName}
                      />
                    </GridItem>
                  }
                  {isLoading ? (
                    <div>
                      <CircularProgress className={classes.progress} />
                    </div>
                  ) : (
                    <CardBody>
                      <GridItem xs={12} align="left">
                        <h5><b> Summary </b></h5>
                        <p>{serviceSummary}</p>
                      </GridItem>
                      {serviceDescription !== undefined && (
                      <GridItem xs={12} align="left">
                        <h5><b> Description </b></h5>
                        <p>{serviceDescription}</p>
                      </GridItem>
                      )}
                      {location !== undefined && location.address !== '' && (
                        <div style={{}}>
                          <GridItem xs={12} sm={12} md={12} lg={12} align="left">
                            <h5><b> Location </b></h5>
                          </GridItem>
                          <GridItem>
                            <GridContainer xs={12} sm={12} md={12} lg={12} align="left">
                              <GridItem xs={12} sm={4} md={4} lg={6}>
                                {' '}
                                {location.address}
                                {', '}
                                {location.apartment !== '' && (location.apartment)}
                                {' '}
                                {location.city}
                                {', '}
                                {location.province}
                                {', '}
                                {location.postalCode}
                                <br />
                                {'  '}
                                {location.phoneNumber}
                              </GridItem>
                            </GridContainer>
                          </GridItem>
                        </div>
                      )}

                      {serviceDate !== undefined && moment(serviceDate.startDate).format('MMM D YYYY') !== 'Invalid date' && (
                        <GridItem xs={12} sm={8} md={8} lg={4} align="left">
                          <h5><b> Date </b></h5>
                                      From {moment(serviceDate.startDate).format('MMM D YYYY')} until {moment(serviceDate.endDate).format('MMM D YYYY')}
                        </GridItem>
                      )}

                      {serviceHours !== undefined && serviceHours.length !== 0 && (
                        <GridItem xs={12} sm={8} md={8} lg={4} align="left">
                          <h5><b> Time </b></h5>
                          {serviceHours.map((member, index) => (
                            <Grid item xs={12}>
                              {member.serviceDay} from {member.startTime} to {member.endTime}
                            </Grid>
                          ))}
                        </GridItem>
                      )}
                      <Grid container spacing={1}>
                        {location !== undefined && location.address !== '' && (
                          <Grid item lg={6} md={6} sm={12} xs={12} className={classes.gridStyleSmallPadding}>
                            <GoogleMaps
                              location={location}
                            />
                          </Grid>
                        )}
                        <Grid item lg={6} md={6} sm={12} xs={12} className={classes.gridStyleSmallPadding}>
                          <Reviews
                            serviceId={serviceId}
                            serviceTitle={serviceTitle}
                            avgRating={serviceAverageRating}
                            countRating={serviceRatingCount}
                            handleUpdate={() => this.handleReviewUpdate()}
                          />
                        </Grid>
                      </Grid>
                    </CardBody>
                  )}
                </Card>
              </GridItem>
              <Grid item xs={12}>
                {user.type === UserTypes.ADMIN
                          && (
                          <Button onClick={this.warningWithConfirmAndCancelMessage} color="danger">
                                Delete
                          </Button>
                          )
                          }
                {user.username === serviceOwner && (
                  <React.Fragment>
                    <Button onClick={this.warningWithConfirmAndCancelMessage} color="danger">
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
            </div>
          )}
        </AuthConsumer>
      );
    }
}

export default withStyles(styles)(ServiceDetails);
