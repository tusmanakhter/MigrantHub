import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import DeleteIcon from '@material-ui/icons/Delete';
import Paper from '@material-ui/core/Paper';
import Checkbox from '@material-ui/core/Checkbox';
import validator from 'validator';
import axios from 'axios';
import { Redirect } from 'react-router-dom';
import FormData from 'form-data';
import qs from 'qs';
import Header from '../components/Header/Header';
import { provinces } from '../lib/SignUpConstants';
import { PhoneMask, PostalCodeMask } from '../lib/Masks';

const dayOfTheWeek = [
  { value: 'monday', label: 'Monday' },
  { value: 'tuesday', label: 'Tuesday' },
  { value: 'wednesday', label: 'Wednesday' },
  { value: 'thursday', label: 'Thursday' },
  { value: 'friday', label: 'Friday' },
  { value: 'saturday', label: 'Saturday' },
  { value: 'sunday', label: 'Sunday' },
];

const serviceHoursObject = { serviceDay: '', startTime: '', endTime: '' };

const styles = theme => ({
  container: {
    position: 'relative',
  },
  row: {
    display: 'inline-block',
  },
  button: {
    margin: theme.spacing.unit,
  },
  group: {
    flexDirection: 'row',
  },
  formControl: {
    textAlign: 'left',
  },
  select: {
    textAlign: 'left',
  },
  paper: {
    width: '100%',
    marginTop: theme.spacing.unit,
    marginBottom: theme.spacing.unit,
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
    paddingLeft: theme.spacing.unit * 2,
    [theme.breakpoints.up(600 + theme.spacing.unit * 3 * 2)]: {
      marginTop: theme.spacing.unit,
      marginBottom: theme.spacing.unit,
      paddingTop: theme.spacing.unit * 3,
      paddingBottom: theme.spacing.unit * 3,
      paddingLeft: theme.spacing.unit * 3,
    },
    layout: {
      marginLeft: theme.spacing.unit,
      marginRight: theme.spacing.unit,
    },
  },
  timeContainer: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 200,
  },
  rightIcon: {
    marginLeft: theme.spacing.unit,
  },
  img: {
    width: 400,
    length: 300,

  },
});
class ServiceForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      serviceHoursError: [],
      serviceDescriptionError: '',
      serviceSummaryError: '',
      serviceTitleError: '',
      addressError: '',
      apartmentError: '',
      cityError: '',
      provinceError: '',
      postalCodeError: '',
      phoneNumberError: '',
      serviceImageError: '',
      startDateError: '',
      endDateError: '',
      serviceId: '',
      serviceHours: [],
      serviceDate: {
        startDate: '',
        endDate: '',
      },
      location: {
        address: '',
        apartment: '',
        city: '',
        province: '',
        postalCode: '',
        phoneNumber: '',
      },
      serviceImage: null,
      serviceImageName: '',
      serviceImagePath: '',
      tempServiceImagePath: '',
      setDefaultImage: false,
      serviceDescription: '',
      serviceSummary: '',
      serviceTitle: '',
      addLocation: false,
      addServiceDate: false,
      serviceHoursCount: 0,
      dataRetrieved: false,

      // Server response
      messageFromServer: '',
      redirectToAllServices: false,
    };

    const { location } = this.props;
    if (location.state) {
      this.getData = this.getData.bind(this);
    }
  }

  componentDidMount() {
    const { location } = this.props;
    if (location.state) {
      this.getData(this);
    }
  }

  componentWillReceiveProps() {
    const { location } = this.props;
    if (location.state) {
      this.getData(this);
    }
  }

  getData() {
    const { dataRetrieved } = this.state;
    const { location } = this.props;
    const { state } = location;
    const { editMode, serviceId } = state;

    if (!dataRetrieved) {
      this.setState({
        editMode,
        serviceId,
      });

      axios.get('/api/services/get/', {
        params: {
          _id: serviceId,
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
          dataRetrieved: true,
        });
      });
    }
  }

    handleAddObject = (name, object) => {
      this.state.serviceHoursCount += 1;
      this.setState({
        [name]: this.state[name].concat([object]),
      });
    }

    handleRemoveObject = (name, index) => {
      this.state.serviceHoursCount -= 1;
      this.setState({
        [name]: this.state[name].filter((s, _index) => _index !== index),
      });
    }

    handleEditObject= (name, index) => (event) => {
      this.setState({
        [name]: this.state[name].map((s, _index) => {
          if (_index !== index) return s;
          return { ...s, [event.target.name]: event.target.value };
        }),
      });
    }

    handleChange = (event) => {
      this.setState({
        [event.target.name]: event.target.value,
      });
    }

    handleAddLocation = () => {
      this.setState(prevState => ({
        addLocation: !prevState.addLocation,
      }));
    }

    handleAddServiceDate = () => {
      this.setState(prevState => ({
        addServiceDate: !prevState.addServiceDate,
      }));
    }

    handleUploadImage = (event) => {
      const { tempServiceImagePath } = this.state;

      if (tempServiceImagePath !== '') {
        URL.revokeObjectURL(tempServiceImagePath);
      }

      if (event.target.files[0] !== undefined) {
        this.setState({
          serviceImage: event.target.files[0],
          serviceImageName: event.target.files[0].name,
          tempServiceImagePath: window.URL.createObjectURL(event.target.files[0]),
        });
      } else {
        this.setState({
          serviceImage: null,
          serviceImageName: '',
          tempServiceImagePath: '',
        });
      }
    }

    handleSubmit = () => {
      const error = this.validate();
      if (!error) {
        this.createService();
      }
    };

    handleUpdate = () => {
      const error = this.validate();
      if (!error) {
        this.updateService();
      }
    };

    handleEditSingleObject = (name, fieldName) => (event) => {
      const obj = {};
      obj[name] = { ...this.state[name] };
      const value = event.target.value;
      obj[name][fieldName] = value;
      this.setState({ [name]: obj[name] });
    };

    renderRedirectToAllServices = () => {
      const { redirectToAllServices } = this.state;
      if (redirectToAllServices) {
        return <Redirect to="/services" />;
      }
    }

    validate = () => {
      let isError = false;

      const {
        serviceTitle, serviceSummary, serviceDescription, serviceHours, serviceDate,
        location, addLocation, addServiceDate, serviceImageName, serviceImage,
      } = this.state;

      const errors = {
        serviceHoursError: [],
        serviceTitleError: '',
        serviceDescriptionError: '',
        serviceSummaryError: '',
        addressError: '',
        apartmentError: '',
        cityError: '',
        provinceError: '',
        postalCodeError: '',
        phoneNumberError: '',
        serviceImageError: '',
        startDateError: '',
        endDateError: '',
      };

      if (validator.isEmpty(serviceTitle)) {
        errors.serviceTitleError = 'Title is required';
        isError = true;
      }
      if (validator.isEmpty(serviceSummary)) {
        errors.serviceSummaryError = 'Service summary is required';
        isError = true;
      }
      if (validator.isEmpty(serviceDescription)) {
        errors.serviceDescriptionError = 'Service description is required';
        isError = true;
      }
      if (serviceImage !== null) {
        if (!validator.matches(serviceImageName, '.([.jpg]|[.jpeg]|[.png])$')) {
          errors.serviceImageError = 'Invalid image format. Should be either .jpg, .jpeg or .png';
          isError = true;
        }
      }

      if (addServiceDate) {
        const date = new Date();
        const todaysDate = (`${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`);
        if (validator.isEmpty(serviceDate.startDate)) {
          errors.startDateError = 'Start date is required';
          isError = true;
        } else if (validator.isBefore(serviceDate.startDate, todaysDate)) {
          errors.startDateError = 'Start date is invalid';
          isError = true;
        }
        if (validator.isEmpty(serviceDate.endDate)) {
          errors.endDateError = 'End date is required';
          isError = true;
        } else if (validator.isBefore(serviceDate.endDate, serviceDate.startDate)) {
          errors.endDateError = 'End date should be after start date';
          isError = true;
        }
      }

      if (addLocation) {
        if (validator.isEmpty(location.address)) {
          errors.addressError = 'Address is required';
          isError = true;
        }
        if (validator.isEmpty(location.city)) {
          errors.cityError = 'City is required';
          isError = true;
        } else if (!validator.isAlpha(location.city)) {
          errors.cityError = 'This is not a valid city';
          isError = true;
        }
        if (validator.isEmpty(location.province)) {
          errors.provinceError = 'Province is required';
          isError = true;
        }
        if (validator.isEmpty(location.postalCode)) {
          errors.postalCodeError = 'Postal code is required';
          isError = true;
        } else if (!validator.isLength(location.postalCode, { min: 7, max: 7 })) {
          errors.postalCodeError = 'Postal code is invalid';
          isError = true;
        }
        if (validator.isEmpty(location.phoneNumber)) {
          errors.phoneNumberError = 'Phone number is required';
          isError = true;
        } else if (!validator.isLength(location.phoneNumber, { min: 14, max: 14 })) {
          errors.phoneNumberError = 'Phone number is invalid';
          isError = true;
        }
      }

      serviceHours.forEach((member, index) => {
        errors.serviceHoursError = errors.serviceHoursError.concat([JSON.parse(
          JSON.stringify(serviceHoursObject),
        )]);

        if (validator.isEmpty(member.startTime)) {
          errors.serviceHoursError[index].startTime = 'Start time is required';
          isError = true;
        }
        if (validator.isEmpty(member.endTime)) {
          errors.serviceHoursError[index].endTime = 'End time is required';
          isError = true;
        } else if (member.endTime <= member.startTime) {
          errors.serviceHoursError[index].endTime = 'End time should be after start time';
          isError = true;
        }
        if (validator.isEmpty(member.serviceDay)) {
          errors.serviceHoursError[index].serviceDay = 'Service day is required';
          isError = true;
        }
      });

      this.setState(prevState => ({
        ...prevState,
        ...errors,
      }));

      return isError;
    }

    objectErrorText = (name, index, field) => (this.state[name][index] === undefined ? '' : this.state[name][index][field])

    createService = () => {
      const {
        serviceTitle, serviceSummary, serviceDescription, serviceHours, serviceDate,
        location, addLocation, addServiceDate, serviceImageName, serviceImage,
      } = this.state;

      let tempImageName = 'cameraDefault.png';
      let tempLocation = {};
      let tempServiceDate = {};

      if (serviceImageName !== '') {
        tempImageName = serviceImageName;
      }
      if (addLocation) {
        tempLocation = location;
      }
      if (addServiceDate) {
        tempServiceDate = serviceDate;
      }
      const formData = new FormData();
      formData.append('serviceImage', serviceImage);
      formData.append('serviceDetails', qs.stringify({
        location: tempLocation,
        serviceHours,
        serviceDate: tempServiceDate,
        serviceTitle,
        serviceDescription,
        serviceSummary,
        serviceImageName: tempImageName,
      }));

      axios.post('/api/services/', formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }).then((response) => {
        if (response.status === 200) {
          this.setState({
            redirectToAllServices: true,
          });
        }
      }).catch((error) => {
        this.setState({
          messageFromServer: error.response.data,
        });
      });
    }

    updateService = () => {
      const {
        serviceId, serviceTitle, serviceSummary, serviceDescription, serviceHours, serviceDate,
        location, addLocation, addServiceDate, serviceImageName, serviceImage, serviceImagePath,
        setDefaultImage,
      } = this.state;

      let tempImageName = serviceImageName;
      let tempLocation = {};
      let tempServiceDate = {};

      if (serviceImageName === '') {
        tempImageName = 'cameraDefault.png';
      } else if (serviceImage !== null) {
        tempImageName = serviceImage.name;
      }

      if (setDefaultImage) {
        tempImageName = 'cameraDefault.png';
      }

      if (addLocation) {
        tempLocation = location;
      }
      if (addServiceDate) {
        tempServiceDate = serviceDate;
      }

      const formData = new FormData();
      formData.append('serviceImage', serviceImage);
      formData.append('serviceDetails', qs.stringify({
        location: tempLocation,
        serviceHours,
        serviceDate: tempServiceDate,
        serviceTitle,
        serviceDescription,
        serviceSummary,
        serviceImageName: tempImageName,
        _id: serviceId,
        serviceImagePath,
      }));
      axios.put('/api/services/' + serviceId, formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }).then((response) => {
        if (response.status === 200) {
          this.setState({
            redirectToAllServices: true,
          });
        }
      }).catch((error) => {
        this.setState({
          messageFromServer: error.response.data,
        });
      });
    }

    render() {
      const { classes } = this.props;
      const {
        serviceTitleError, serviceDescriptionError, serviceSummaryError, addressError,
        apartmentError, cityError, provinceError, postalCodeError, phoneNumberError,
        serviceImageError, startDateError, endDateError, serviceTitle, serviceSummary,
        serviceDescription, tempServiceImagePath, serviceHours, serviceDate, location,
        addLocation, addServiceDate, serviceHoursCount, messageFromServer, editMode,
        setDefaultImage,
      } = this.state;

      return (
        <React.Fragment>
          <Header />
          {messageFromServer}
          {this.renderRedirectToAllServices()}
          <Typography variant="title" gutterBottom>
                    Create Service Form
          </Typography>
          <Grid container spacing={24}>
            <Grid item xs={12}>
              <TextField
                id="serviceTitle"
                name="serviceTitle"
                label="Service Title"
                value={serviceTitle}
                onChange={event => this.handleChange(event)}
                fullWidth
                helperText={serviceTitleError}
                error={serviceTitleError.length > 0}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                id="serviceSummary"
                name="serviceSummary"
                label="Service Summary"
                value={serviceSummary}
                onChange={event => this.handleChange(event)}
                fullWidth
                helperText={serviceSummaryError}
                error={serviceSummaryError.length > 0}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                id="serviceDescription"
                name="serviceDescription"
                label="Service Description"
                value={serviceDescription}
                onChange={event => this.handleChange(event)}
                fullWidth
                multiline
                rows={12}
                helperText={serviceDescriptionError}
                error={serviceDescriptionError.length > 0}
              />
            </Grid>
            <Grid item xs={12}>
              <Grid container spacing={24}>
                <Grid item xs={12}>
                  <img
                    src={tempServiceImagePath}
                    alt={tempServiceImagePath}
                    className={classes.img}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Typography variant="subheading" gutterBottom className={classes.row} align="left">
                                    Select image to upload (Optional)
                    {' '}
                    <br />
                    <br />
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  {editMode ? (
                    <Checkbox
                      id="setDefaultImage"
                      name="setDefaultImage"
                      value={setDefaultImage}
                      onChange={event => this.handleChange(event)}
                    />
                  ) : (<br />) }
                    Set to default picture
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    id="serviceImage"
                    type="file"
                    onChange={event => this.handleUploadImage(event)}
                    helperText={serviceImageError}
                    error={serviceImageError.length > 0}
                  />
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="subheading" gutterBottom className={classes.row} align="left">
                            Add Service date (Optional)
              </Typography>
              <Button
                variant="fab"
                mini
                color="primary"
                aria-label="Add Service date"
                onClick={event => this.handleAddServiceDate()}
                className={classes.button}
              >
                {addServiceDate ? <DeleteIcon /> : <AddIcon />}
              </Button>
            </Grid>

            {addServiceDate === true && (
            <Paper className={classes.paper}>
              <Grid container spacing={24} item xs={6}>
                <Grid item xs={6}>
                  <TextField
                    id="startDate"
                    name="startDate"
                    label="Start Date"
                    type="date"
                    value={serviceDate.startDate}
                    className={classes.textField}
                    onChange={this.handleEditSingleObject('serviceDate', 'startDate')}
                    fullWidth
                    helperText={startDateError}
                    error={startDateError.length > 0}
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    id="endDate"
                    name="endDate"
                    label="End Date"
                    type="date"
                    value={serviceDate.endDate}
                    className={classes.textField}
                    onChange={this.handleEditSingleObject('serviceDate', 'endDate')}
                    fullWidth
                    helperText={endDateError}
                    error={endDateError.length > 0}
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                </Grid>
              </Grid>
            </Paper>
            )}

            <Grid item xs={12}>
              <Typography variant="subheading" gutterBottom className={classes.row} align="left">
                            Add Location (Optional, but recommended)
              </Typography>
              <Button
                variant="fab"
                mini
                color="primary"
                aria-label="Add Location"
                onClick={event => this.handleAddLocation()}
                className={classes.button}
              >
                {addLocation ? <DeleteIcon /> : <AddIcon />}
              </Button>
            </Grid>

            {addLocation === true && (
            <Paper className={classes.paper}>
              <Grid item xs={6}>
                <TextField
                  id="address"
                  name="address"
                  label="Street Address"
                  placeholder="Street and number"
                  value={location.address}
                  onChange={this.handleEditSingleObject('location', 'address')}
                  fullWidth
                  helperText={addressError}
                  error={addressError.length > 0}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  id="apartment"
                  name="apartment"
                  label="Apartment"
                  placeholder="Apartment, suite, unit, building, floor, etc."
                  value={location.apartment}
                  onChange={this.handleEditSingleObject('location', 'apartment')}
                  fullWidth
                  helperText={apartmentError}
                  error={apartmentError.length > 0}
                />
              </Grid>
              <Grid item xs={6} sm={3}>
                <TextField
                  id="city"
                  name="city"
                  label="City"
                  value={location.city}
                  onChange={this.handleEditSingleObject('location', 'city')}
                  fullWidth
                  helperText={cityError}
                  error={cityError.length > 0}
                />
              </Grid>
              <Grid item xs={6} sm={3}>
                <TextField
                  id="province"
                  name="province"
                  select
                  label="Province/Territory"
                  value={location.province}
                  className={classes.select}
                  onChange={this.handleEditSingleObject('location', 'province')}
                  fullWidth
                  helperText={provinceError}
                  error={provinceError.length > 0}
                >
                  {provinces.map(option => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
              <Grid item xs={6} sm={3}>
                <TextField
                  id="postalCode"
                  name="postalCode"
                  label="Postal Code"
                  value={location.postalCode}
                  onChange={this.handleEditSingleObject('location', 'postalCode')}
                  fullWidth
                  InputProps={{
                    inputComponent: PostalCodeMask,
                  }}
                  helperText={postalCodeError}
                  error={postalCodeError.length > 0}
                />
              </Grid>
              <Grid item xs={6} sm={3}>
                <TextField
                  id="phoneNumber"
                  name="phoneNumber"
                  label="Phone Number"
                  value={location.phoneNumber}
                  onChange={this.handleEditSingleObject('location', 'phoneNumber')}
                  fullWidth
                  helperText={phoneNumberError}
                  error={phoneNumberError.length > 0}
                  InputProps={{
                    inputComponent: PhoneMask,
                  }}
                />
              </Grid>
            </Paper>
            )}
            <Grid item xs={12}>
              <Typography variant="subheading" gutterBottom className={classes.row} align="left">
                            Add service hours (Optional)
              </Typography>
              {serviceHoursCount < 7 && (

              <Button
                variant="fab"
                mini
                color="secondary"
                aria-label="Add"
                onClick={event => this.handleAddObject('serviceHours', serviceHoursObject)}
                className={classes.button}
              >
                <AddIcon />
              </Button>
              )}
            </Grid>
            {serviceHours.map((member, index) => (
              <React.Fragment key={index}>
                <Paper className={classes.paper}>
                  <Typography variant="subheading" align="left" gutterBottom />
                  <Grid justify="center" alignItems="center" container item xs>
                    <Grid container spacing={24} item xs={11}>
                      <Grid item xs={12} sm={4}>
                        <TextField
                          id="serviceDay"
                          name="serviceDay"
                          select
                          label="ServiceDay"
                          value={member.serviceDay}
                          onChange={this.handleEditObject('serviceHours', index)}
                          className={classes.select}
                          helperText={this.objectErrorText('serviceHoursError', index, 'serviceDay')}
                          error={this.objectErrorText('serviceHoursError', index, 'serviceDay').length > 0}
                          fullWidth
                        >
                          {dayOfTheWeek.map(option => (
                            <MenuItem key={option.value} value={option.value}>
                              {option.label}
                            </MenuItem>
                          ))}
                        </TextField>
                      </Grid>
                      <Grid item xs={12} sm={4}>
                        <TextField
                          id="startTime"
                          name="startTime"
                          label="Start Time"
                          value={member.startTime}
                          className={classes.textField}
                          type="time"
                          defaultValue="08:30"
                          onChange={this.handleEditObject('serviceHours', index)}
                          helperText={this.objectErrorText('serviceHoursError', index, 'startTime')}
                          error={this.objectErrorText('serviceHoursError', index, 'startTime').length > 0}
                          fullWidth
                          InputLabelProps={{
                            shrink: true,
                          }}
                          inputProps={{
                            step: 300,
                          }}
                        />
                      </Grid>
                      <Grid item xs={12} sm={4}>
                        <TextField
                          id="endTime"
                          name="endTime"
                          label="End Time"
                          value={member.endTime}
                          className={classes.textField}
                          type="time"
                          onChange={this.handleEditObject('serviceHours', index)}
                          helperText={this.objectErrorText('serviceHoursError', index, 'endTime')}
                          error={this.objectErrorText('serviceHoursError', index, 'endTime').length > 0}
                          fullWidth
                          InputLabelProps={{
                            shrink: true,
                          }}
                          inputProps={{
                            step: 300,
                          }}
                        />
                      </Grid>
                    </Grid>
                    <Grid item xs={1}>
                      <Button
                        variant="fab"
                        mini
                        aria-label="Delete"
                        onClick={event => this.handleRemoveObject('serviceHours', index, event)}
                        className={classes.button}
                      >
                        <DeleteIcon />
                      </Button>
                    </Grid>
                  </Grid>
                </Paper>
              </React.Fragment>
            ))}
            {!editMode ? (
              <Button
                variant="contained"
                color="primary"
                onClick={this.handleSubmit}
                className={classes.button}
              >
                            Create
              </Button>
            ) : (
              <Button
                variant="contained"
                color="primary"
                onClick={this.handleUpdate}
                className={classes.button}
              >
                            Edit
              </Button>
            )}
          </Grid>
        </React.Fragment>
      );
    }
}

ServiceForm.propTypes = {
  classes: PropTypes.shape({}).isRequired,
  location: PropTypes.shape({}).isRequired,
};

export default withStyles(styles)(ServiceForm);
