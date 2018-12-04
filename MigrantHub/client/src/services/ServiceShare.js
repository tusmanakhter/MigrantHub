import React, { Component } from 'react';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import '../App.css';
import Header from '../components/Header/Header';
import GoogleMaps from '../components/GoogleMaps/GoogleMaps';
import axios from 'axios';
import qs from 'qs';

const theme = createMuiTheme({
  palette: {
    primary: { main: '#153345' },
    secondary: { main: '#E2B39A' },
  },
});

class ServiceShare extends Component {
  constructor(props) {
    super(props);
    this.state = {
      serviceId: this.props.serviceId,
      dataRetrieved: 'Sorry this is not a valid link to share'
    };
  }

  componentDidMount(props) {
    this.getData(this, props);
  }

  componentWillReceiveProps(props) {
    this.getData(this, props);
  }

  getData(event, props = this.props) {
    axios.get('/api/services/get/', {
      params: {
        _id: this.props.serviceId,
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
        addLocation: locationExists,
        addServiceDate: serviceDateExists,
        serviceImagePath: parsedObj.serviceImagePath,
        tempServiceImagePath: parsedObj.serviceImagePath,
        serviceImageName: imageName,
        dataRetrieved: 'SHARE THIS LINK',
      });
    });
  }

  render() {
    const {
      appLogo, appName, userPic, serviceId
    } = this.props;

    return (
      <div>
        <MuiThemeProvider theme={theme}>
          <Header
            appLogo={appLogo}
            appName={appName}
            userPic={userPic}
          />

        </MuiThemeProvider>
        <div>
          <h4>{this.state.dataRetrieved}</h4>
          <p>This id of the the service you are looking for : {serviceId}</p>
          <p>Service Title : {this.state.serviceTitle}</p>
          <p>Service Summary: {this.state.serviceSummary}</p>
          <p>Service Location: {this.state.addLocation}</p>
          <p>Service serviceHours: {this.state.serviceHours}</p>
        </div>
      </div>
    );
  }
}

export default ServiceShare;
