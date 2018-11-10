import React, { Component } from 'react';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';
import validator from 'validator';
import MaskedInput from 'react-text-mask';
import axios from 'axios';
import { Redirect } from 'react-router-dom';
import Header from '../components/Header/Header';

const qs = require('qs');

const visibilities = [
  { value: 'public', label: 'Public' },
  { value: 'private', label: 'Private' },
];

const provinces = [
  { value: 'AB', label: 'Alberta' },
  { value: 'BC', label: 'British Columbia' },
  { value: 'MB', label: 'Manitoba' },
  { value: 'NB', label: 'New Brunswick' },
  { value: 'NL', label: 'Newfoundland and Labrador' },
  { value: 'NS', label: 'Nova Scotia' },
  { value: 'NT', label: 'Northwest Territories' },
  { value: 'NU', label: 'Nunavut' },
  { value: 'ON', label: 'Ontario' },
  { value: 'PE', label: 'Prince Edward Island' },
  { value: 'QC', label: 'Quebec' },
  { value: 'SK', label: 'Saskatchewan' },
  { value: 'YT', label: 'Yukon' },
];

const repeats = [
  { value: 'no', label: 'No' },
  { value: 'day', label: 'Daily' },
  { value: 'week', label: 'Weekly' },
  { value: 'month', label: 'Monthly' },
  { value: 'year', label: 'Yearly' },
];

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
});

const PhoneMask = (props) => {
  const { inputRef, ...other } = props;

  return (
    <MaskedInput
      {...other}
      mask={['(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]}
      placeholderChar={'\u2000'}
      guide={false}
    />
  );
};

const PostalCodeMask = (props) => {
  const { inputRef, ...other } = props;

  return (
    <MaskedInput
      {...other}
      mask={[/[a-zA-Z]/, /\d/, /[a-zA-Z]/, ' ', /\d/, /[a-zA-Z]/, /\d/]}
      placeholderChar={'\u2000'}
      guide={false}
    />
  );
};

class CreateEvent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      creator: '',
      eventId: '',
      visibility: '',
      eventName: '',
      description: '',

      // Image
      eventImage: null,
      eventImageName: '',
      eventImagePath: '',
      tempEventImagePath: '',

      // Event Location
      location: {
        address: '',
        apartment: '',
        city: '',
        province: '',
        postalCode: '',
        phoneNumber: '',
      },

      // Event Time
      dateStart: '',
      dateEnd: '',
      timeStart: '',
      secondsStart: '',
      timeEnd: '',
      secondsEnd: '',
      repeat: '',

      // Errors
      eventNameError: '',
      descriptionError: '',
      addressError: '',
      apartmentError: '',
      cityError: '',
      provinceError: '',
      postalCodeError: '',
      phoneNumberError: '',
      dateStartError: '',
      dateEndError: '',
      timeStartError: '',
      timeEndError: '',
      repeatError: '',
      eventImageError: '',

      // DB response
      messageFromServer: '',
      redirectToAllEvents: false,
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
    const { editMode, eventId } = state;

    if (!dataRetrieved) {
      this.setState({
        editMode,
        eventId,
      });

      axios.get('/events/get/', {
        params: {
          _id: eventId,
        },
      }).then((response) => {
        const parsedObj = qs.parse(qs.stringify(response.data));
        const imagePath = parsedObj.eventImagePath.split('/');
        const imageName = imagePath[imagePath.length - 1];

        this.setState({
          visibility: parsedObj.visibility,
          eventName: parsedObj.eventName,
          description: parsedObj.description,
          location: parsedObj.location,
          dateStart: parsedObj.dateStart.toString().substring(0,10),
          dateEnd: parsedObj.dateEnd.toString().substring(0,10),
          secondsStart: parsedObj.secondsStart,
          timeStart: parsedObj.timeStart,
          timeEnd: parsedObj.timeEnd,
          secondsEnd: parsedObj.secondsEnd,
          repeat: parsedObj.repeat,
          serviceImagePath: parsedObj.serviceImagePath,
          tempServiceImagePath: parsedObj.serviceImagePath,
          serviceImageName: imageName,
          dataRetrieved: true,
        });
      });
    }
  }

    validate = () => {
      const {
        eventName, description, location, dateStart, dateEnd, timeStart,
        timeEnd, secondsEnd, secondsStart, eventImageName, eventImage,
      } = this.state;

      let isError = false;
      const errors = {
        eventNameError: '',
        descriptionError: '',
        addressError: '',
        apartmentError: '',
        cityError: '',
        provinceError: '',
        postalCodeError: '',
        phoneNumberError: '',
        dateStartError: '',
        dateEndError: '',
        timeStartError: '',
        timeEndError: '',
        repeatError: '',
      };

      if (validator.isEmpty(eventName)) {
        errors.eventNameError = 'Event name is required';
        isError = true;
      }

      if (validator.isEmpty(description)) {
        errors.descriptionError = 'Description is required';
        isError = true;
      } else if (!validator.isLength(description, { min: 10 })) {
        errors.descriptionError = 'Description must be at least 10 characters';
        isError = true;
      }

    
      if (validator.isEmpty(location.address)) {
        errors.addressError = 'Address is required';
        isError = true;
      }

      if (validator.isEmpty(location.city)) {
        errors.cityError = 'City is required';
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
      
      if (validator.isEmpty(dateStart)) {
        errors.dateStartError = 'Start date is required';
        isError = true;
      } else if (validator.isBefore(dateStart)) {
        errors.dateStartError = 'Start date is invalid';
        isError = true;
      }

      if (validator.isEmpty(dateEnd)) {
        errors.dateEndError = 'End date is required';
        isError = true;
      } else if (validator.isBefore(dateEnd, dateStart)) {
        errors.dateEndError = 'End date is invalid';
        isError = true;
      }

      if (validator.isEmpty(timeStart)) {
        errors.timeStartError = 'Start time is required';
        isError = true;
      }

      if (validator.isEmpty(timeEnd)) {
        errors.timeEndError = 'End time is required';
        isError = true;
      } else if (secondsEnd <= secondsStart) {
        errors.timeEndError = 'End time is invalid';
        isError = true;
      }

      if (eventImage !== null) {
        if (!validator.matches(eventImageName, '.([.jpg]|[.jpeg]|[.png])$')) {
          errors.eventImageError = 'Invalid image format. Should be either .jpg, .jpeg or .png';
          isError = true;
        }
      }

      this.setState(prevState => ({
        ...prevState,
        ...errors,
      }));

      return isError;
    }

    objectErrorText = (name, index, field) => (this.state[name][index] === undefined ? '' : this.state[name][index][field])

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

    handleSubmit = () => {
      const {
        timeStart, timeEnd, visibility, province, repeat,
      } = this.state;

      // Converting start/end times to seconds of day for easier validation and storage
      const startTimeHours = parseInt(timeStart.substring(0, 2)) * 3600;
      const startTimeMinutes = parseInt(timeStart.substring(3, 5)) * 60;
      const start = startTimeHours + startTimeMinutes;
      const endTimeHours = parseInt(timeEnd.substring(0, 2)) * 3600;
      const endTimeMinutes = parseInt(timeEnd.substring(3, 5)) * 60;
      const end = endTimeHours + endTimeMinutes;
      this.setState({
        secondsStart: start,
        secondsEnd: end,
      });
      // Making sure visibility, province and repeat are instantiated
      if (visibility === '') {
        this.setState({
          visibility: 'public',
        });
      }
      if (province === '') {
        this.setState({
          province: 'AB',
        });
      }
      if (repeat === '') {
        this.setState({
          repeat: 'no',
        });
      }

      const error = this.validate();
      if (!error) {
        this.createEvent();
      }
    };

    handleUploadImage = (event) => {
      const { tempEventImagePath } = this.state;

      if (tempEventImagePath !== '') {
        URL.revokeObjectURL(tempEventImagePath);
      }

      if (event.target.files[0] !== undefined) {
        this.setState({
          eventImage: event.target.files[0],
          eventImageName: event.target.files[0].name,
          tempEventImagePath: window.URL.createObjectURL(event.target.files[0]),
        });
      } else {
        this.setState({
          eventImage: null,
          eventImageName: '',
          tempEventImagePath: '',
        });
      }
    }

    handleUpdate = () => {
      const error = this.validate();
      if (!error) {
        this.updateEvent();
      }
    };

    handleEditSingleObject = (name, fieldName) => (event) => {
      const obj = {};
      obj[name] = { ...this.state[name] };
      const value = event.target.value;
      obj[name][fieldName] = value;
      this.setState({ [name]: obj[name] });
    };

    // Send event data in post body to add to mongodb
    createEvent = () => {
      const {
        creator, visibility, eventName, description, location,
        dateStart, dateEnd, timeStart, secondsStart, timeEnd, secondsEnd, repeat, eventImage,
      } = this.state;

      let tempImageName = 'cameraDefault.png';
      if (eventImage !== null) {
        tempImageName = eventImage.name;
      }
      
      const formData = new FormData();
      formData.append('eventImage', eventImage);
      formData.append('eventDetails', qs.stringify({
        creator,
        visibility,
        eventName,
        description,
        location,
        dateStart,
        dateEnd,
        timeStart,
        secondsStart,
        timeEnd,
        secondsEnd,
        repeat,
        eventImage,
        eventImageName: tempImageName,
      }));

      axios.post('/events/create', formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }).then((response) => {
        this.setState({
          messageFromServer: response.data,
        });
        if (response.status === 200) {
          this.setState({
            redirectTo: true,
            redirectToAllEvents: true,
          });
        }
      });
    }

    renderRedirectToAllEvents = () => {
      const { redirectToAllEvents } = this.state;
      if (redirectToAllEvents) {
        return <Redirect to="/events" />;
      }
    }

    updateEvent = () => {
      const {
        eventId, visibility, eventName, description, location,
        dateStart, dateEnd, timeStart, secondsStart, timeEnd, secondsEnd, repeat, eventImageName, eventImage,
      } = this.state;

      let tempImageName = 'cameraDefault.png';

      if (eventImage !== '') {
        tempImageName = eventImageName;
      }

      const formData = new FormData();
      formData.append('eventImage', eventImage);
      formData.append('eventDetails', qs.stringify({
        visibility,
        eventName,
        description,
        location,
        dateStart,
        dateEnd,
        timeStart,
        secondsStart,
        timeEnd,
        secondsEnd,
        repeat,
        _id: eventId,
        eventImage,
        eventImageName: tempImageName,
      }));

      axios.post('/events/update', formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }).then((response) => {
        this.setState({
          messageFromServer: response.data,
        });
        if (response.status === 200) {
          this.setState({
            redirectTo: true,
            redirectToAllEvents: true,
          });
        }
      }).catch((error) => {
        this.setState({
          messageFromServer: error.response.data,
        });
      });
    }

    render() {
      const {
        visibility, eventName, description, location, dateStart,
        dateEnd, timeStart, timeEnd, repeat, eventNameError, descriptionError,
        addressError, apartmentError, cityError, provinceError, postalCodeError,
        phoneNumberError, dateStartError, dateEndError, timeStartError, timeEndError, tempServiceImagePath,
        eventImageError, messageFromServer, editMode,
      } = this.state;
      const { classes } = this.props;
      return (
        <React.Fragment>
          <Header appName="Migrant Hub" />
          {messageFromServer.split('\n').map((item, key) => (
            <span key={key}>
              {item}
              <br />
            </span>
          ))}
          {this.renderRedirectToAllEvents()}
          <Typography variant="title" gutterBottom>
                Create Event Form
          </Typography>
          <Grid container spacing={24}>
            <Grid item xs={6}>
              <TextField
                id="visibility"
                name="visibility"
                label="Visibility"
                select
                className={classes.select}
                value={visibility}
                onChange={event => this.handleChange(event)}
                fullWidth
              >
                {visibilities.map(option => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={6}>
              <TextField
                id="repeat"
                name="repeat"
                label="Repeat"
                select
                className={classes.select}
                value={repeat}
                onChange={event => this.handleChange(event)}
                fullWidth
              >
                {repeats.map(option => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={12}>
              <TextField
                type="text"
                id="eventName"
                name="eventName"
                label="Event Name"
                value={eventName}
                onChange={event => this.handleChange(event)}
                helperText={eventNameError}
                error={eventNameError.length > 0}
                fullWidth
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                id="description"
                name="description"
                label="Description"
                value={description}
                onChange={event => this.handleChange(event)}
                helperText={descriptionError}
                error={descriptionError.length > 0}
                fullWidth
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                id="address"
                name="address"
                label="Address"
                value={location.address}
                onChange={this.handleEditSingleObject('location', 'address')}
                helperText={addressError}
                error={addressError.length > 0}
                fullWidth
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                id="apartment"
                name="apartment"
                label="Apartment"
                value={location.apartment}
                onChange={this.handleEditSingleObject('location', 'apartment')}
                helperText={apartmentError}
                error={apartmentError.length > 0}
                fullWidth
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                id="city"
                name="city"
                label="City"
                value={location.city}
                onChange={this.handleEditSingleObject('location', 'city')}
                helperText={cityError}
                error={cityError.length > 0}
                fullWidth
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                id="province"
                name="province"
                label="Province"
                select
                className={classes.select}
                value={location.province}
                onChange={this.handleEditSingleObject('location', 'province')}
                helperText={provinceError}
                error={provinceError.length > 0}
                fullWidth
              >
                {provinces.map(option => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={12}>
              <TextField
                id="postalCode"
                name="postalCode"
                label="Postal Code"
                value={location.postalCode}
                onChange={this.handleEditSingleObject('location', 'postalCode')}
                helperText={postalCodeError}
                error={postalCodeError.length > 0}
                InputProps={{
                  inputComponent: PostalCodeMask,
                }}
                fullWidth
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                id="phoneNumber"
                name="phoneNumber"
                label="Phone Number"
                value={location.phoneNumber}
                placeholder="(123) 123-4567"
                onChange={this.handleEditSingleObject('location', 'phoneNumber')}
                helperText={phoneNumberError}
                error={phoneNumberError.length > 0}
                InputProps={{
                  inputComponent: PhoneMask,
                }}
                fullWidth
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                type="date"
                id="dateStart"
                name="dateStart"
                label="Start Date"
                className={classes.textField}
                value={dateStart}
                onChange={event => this.handleChange(event)}
                helperText={dateStartError}
                error={dateStartError.length > 0}
                InputLabelProps={{
                  shrink: true,
                }}
                fullWidth
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                type="date"
                id="dateEnd"
                name="dateEnd"
                label="End Date"
                className={classes.textField}
                value={dateEnd}
                onChange={event => this.handleChange(event)}
                helperText={dateEndError}
                error={dateEndError.length > 0}
                InputLabelProps={{
                  shrink: true,
                }}
                fullWidth
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                id="timeStart"
                name="timeStart"
                className={classes.textField}
                label="Start Time"
                type="time"
                value={timeStart}
                onChange={event => this.handleChange(event)}
                helperText={timeStartError}
                error={timeStartError.length > 0}
                fullWidth
                InputLabelProps={{
                  shrink: true,
                }}
                inputProps={{
                  step: 300,
                }}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                id="timeEnd"
                name="timeEnd"
                className={classes.textField}
                label="End Time"
                type="time"
                value={timeEnd}
                onChange={event => this.handleChange(event)}
                helperText={timeEndError}
                error={timeEndError.length > 0}
                fullWidth
                InputLabelProps={{
                  shrink: true,
                }}
                inputProps={{
                  step: 300,
                }}
              />
            </Grid>
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
                </Typography>
                <TextField
                  id="eventImage"
                  type="file"
                  onChange={event => this.handleUploadImage(event)}
                  helperText={eventImageError}
                  error={eventImageError.length > 0}
                />
              </Grid>
            </Grid>
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

CreateEvent.propTypes = {
  classes: PropTypes.shape({}).isRequired,
  location: PropTypes.shape({}).isRequired,
  editMode: PropTypes.bool.isRequired,
};

export default withStyles(styles)(CreateEvent);
