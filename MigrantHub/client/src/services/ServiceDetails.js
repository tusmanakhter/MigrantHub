import React, { Component } from 'react';
import { Redirect, Link } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import 'App.css';
import GoogleMaps from 'components/GoogleMaps/GoogleMaps';
import axios from 'axios';
import qs from 'qs';
import PropTypes from 'prop-types';
import AddToCalendar from 'react-add-to-calendar';
import withStyles from "@material-ui/core/styles/withStyles";
import { AuthConsumer } from 'routes/AuthContext';
import UserTypes from 'lib/UserTypes';
import Reviews from 'services/Reviews';
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import Card from "components/Card/Card.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CardIcon from "components/Card/CardIcon.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import { cardTitle } from "assets/jss/material-dashboard-pro-react.jsx";
import SweetAlert from "react-bootstrap-sweetalert";
import sweetAlertStyle from "assets/jss/material-dashboard-pro-react/views/sweetAlertStyle.jsx";
import Button from "components/CustomButtons/Button.jsx";


const styles = {
  ...sweetAlertStyle,
  cardIconTitle: {
    ...cardTitle,
    marginTop: "15px",
    marginBottom: "0px",
  },
  gridStyle: {
    backgroundColor: 'white',
    marginTop: '20px',
  }
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
      redirect: false,
      dataRetrieved: 'Sorry this is not a valid link to share',
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
    this.cancelDelete = this.cancelDelete.bind(this);
    this.warningWithConfirmAndCancelMessage = this.warningWithConfirmAndCancelMessage.bind(this);
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
      classes, editMode, onClose
    } = this.props;
    const {
      serviceId, serviceTitle, serviceSummary, serviceDescription, serviceHours, location, alert, serviceOwner, redirect,
    } = this.state;
    let icon = { 'calendar-plus-o': 'left'};

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
        <CardBody>
          <GridItem xs={12} align='left'>
          <h5><b> Summary </b></h5>
            <p>{serviceSummary}</p>
          </GridItem>
          <GridItem xs={12} align='left'>
          <h5><b> Description </b></h5>
            <p>{serviceDescription}</p>
          </GridItem>
          {location !== undefined  && location.address !== '' && (
            <div>
            <GridItem xs={12} sm={12} md={12} lg={12} align='left'>
              <h5><b> Location </b></h5>
            </GridItem>
            <GridItem>
            <GridContainer xs={12} sm={12} md={12} lg={12} align='left'>
              <GridItem xs={12} sm={4} md={4} lg={2}>
              <h6>Address</h6>
                {' '}
                {location.address}
              </GridItem>
              {location.apartment !=='' && (
                <GridItem xs={12} sm={2} md={2} lg={2}>
                <h6>Apartment</h6>
                  {' '}
                  {location.apartment}
                </GridItem>
              )}
              <GridItem xs={12} sm={4} md={4} lg={3}>
              <h6>City</h6>
                {' '}
                {location.city}
              </GridItem>
              <GridItem  xs={12} sm={4} md={4} lg={2}>
              <h6>Province</h6>
                {' '}
                {location.province}
              </GridItem>
              <GridItem xs={12} sm={4} md={4} lg={2}>
              <h6>Postal Code</h6>
                {' '}
                {location.postalCode}
              </GridItem>
              <GridItem xs={12} sm={4} md={4} lg={2}>
                <h6>Phone Number</h6>
                {' '}
                {location.phoneNumber}
              </GridItem>
              </GridContainer>
              </GridItem>
            </div>
          )}
          
          {serviceHours !== undefined && serviceHours.length !== 0 && (
            <GridItem xs={12} sm={8} md={8} lg={4} align='left'>
              <h5><b> Time </b></h5>
              {serviceHours.map((member, index) => (
                <Grid item xs={12}>
                  {member.serviceDay} from {member.startTime} to {member.endTime}
                </Grid>
              ))}
            </GridItem>
          )}
          { location !== undefined  && location.address !== '' && serviceHours !== undefined && serviceHours.length !== 0 && (
            <GridItem xs={12} sm={8} md={8} lg={4} align='left'>
              <Card><AddToCalendar event={this.state.event} buttonTemplate={icon}/></Card>
            </GridItem>
          )}
          {location !== undefined && location.address !== '' && (
            <GoogleMaps
              location={location}
            />
          )}
          <Reviews serviceId={serviceId} serviceTitle={serviceTitle} />
          </CardBody>
        </Card>
        </GridItem>
        
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
ServiceDetails.propTypes = {
  onClose: PropTypes.func.isRequired,
  editMode: PropTypes.bool.isRequired,
};
export default withStyles(styles)(ServiceDetails);