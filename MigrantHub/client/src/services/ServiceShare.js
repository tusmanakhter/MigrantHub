import React, { Component } from 'react';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
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

var gridStyle = {
  backgroundColor: 'white',
  marginTop: '20px',
};

var buttonStyle = {
  color: 'black',
};

class ServiceShare extends Component {
  constructor(props) {
    super(props);
    this.state = {
      serviceId: this.props.serviceId,
      serviceTitle: '',
      serviceSummary: '',
      serviceDescription: '',
      serviceDate: '',
      location: '',
      serviceHours: [],
      serviceImagePath: '',
      tempServiceImagePath: '',
      serviceImageName: '',
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
    axios.get('/api/services/' + this.props.serviceId, {
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
        serviceImagePath: parsedObj.serviceImagePath,
        tempServiceImagePath: parsedObj.serviceImagePath,
        serviceImageName: imageName,
        dataRetrieved: 'You can share this page\'s url!',
      });
    });
  }

  render() {
    const {
      appLogo, appName, userPic, serviceId,
    } = this.props;
    const {
      serviceHours,
    } = this.state;

    return (
      <div>
        <MuiThemeProvider theme={theme}>
          <Header
            appLogo={appLogo}
            appName={appName}
            userPic={userPic}
          />

        </MuiThemeProvider>
        <Grid container spacing={24} style={gridStyle}>
            <Grid item xs={12}>
                <br></br>
                <h4>{this.state.dataRetrieved}</h4>
            </Grid>
            <Grid item xs={12}>
                <h2>{this.state.serviceTitle}</h2>
            </Grid>
            <Grid item xs={12}>
                <h3>{this.state.serviceSummary}</h3>
            </Grid>
            <Grid item xs={12}>
                <h4>{this.state.serviceDescription}</h4>
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
            {this.state.location !== undefined && (
              <Grid item xs={12}>
                <Grid item xs={12}>
                  Address:
                  {' '}
                  {this.state.location.address}
                </Grid>
                <Grid item xs={12}>
                  Apartment:
                  {' '}
                  {this.state.location.apartment}
                </Grid>
                <Grid item xs={12}>
                  City:
                  {' '}
                  {this.state.location.city}
                </Grid>
                <Grid item xs={12}>
                  Province:
                  {' '}
                  {this.state.location.province}
                </Grid>
                <Grid item xs={12}>
                  Postal Code:
                  {' '}
                  {this.state.location.postalCode}
                </Grid>
                <Grid item xs={12}>
                  Phone Number:
                  {' '}
                  {this.state.location.phoneNumber}
                </Grid>
              </Grid>
            )}
            {this.state.location !== undefined && (
              <GoogleMaps
                location={this.state.location}
              />
            )}
            <Grid item xs={12}>
                Service Id : {serviceId}
            </Grid>
        </Grid>
      </div>
    );
  }
}

export default ServiceShare;
