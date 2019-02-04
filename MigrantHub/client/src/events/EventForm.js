import React, { Component } from 'react';
import Datetime from "react-datetime";
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import MenuItem from '@material-ui/core/MenuItem';
import validator from 'validator';
import axios from 'axios';
import { Redirect } from 'react-router-dom';
import { provinces } from 'lib/SignUpConstants';
import { PhoneMask, PostalCodeMask } from 'lib/Masks';
import Clearfix from "components/Clearfix/Clearfix.jsx";
import moment from 'moment'
import FormData from 'form-data';

// core components
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import CustomInput from "components/CustomInput/CustomInput.jsx";
import Button from "components/CustomButtons/Button.jsx";
import Card from "components/Card/Card.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardText from "components/Card/CardText.jsx";
import CardIcon from "components/Card/CardIcon.jsx";
import CardBody from "components/Card/CardBody.jsx";
import ImageUpload from "components/CustomUpload/ImageUpload.jsx";

// @material-ui/core components
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import { FormHelperText } from '@material-ui/core';

// @material-ui/icons
import Today from "@material-ui/icons/Today";
import Location from "@material-ui/icons/Map";
import AvTimer from "@material-ui/icons/AvTimer";

import extendedFormsStyle from "assets/jss/material-dashboard-pro-react/views/extendedFormsStyle.jsx";
import regularFormsStyle from "assets/jss/material-dashboard-pro-react/views/regularFormsStyle";
import defaultImage from "assets/img/image_placeholder.jpg";
import defaultAvatar from "assets/img/placeholder.jpg";
import qs from 'qs';

const visibilities = [
  { value: 'public', label: 'Public' },
  { value: 'private', label: 'Private' },
];

const repeats = [
  { value: 'no', label: 'No' },
  { value: 'day', label: 'Daily' },
  { value: 'week', label: 'Weekly' },
  { value: 'month', label: 'Monthly' },
  { value: 'year', label: 'Yearly' },
];

const styles = theme => ({
  ...extendedFormsStyle,
  ...regularFormsStyle,
  container: {
    position: 'relative',
  },
  formControl: {
    textAlign: 'left',
  },
  select: {
    textAlign: 'left',
  },
});

class EventForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      file: null,
      imagePreviewUrl: this.props.avatar ? defaultAvatar : defaultImage,
      user: '',
      dateCreated: '',
      eventId: '',
      visibility: '',
      eventName: '',
      description: '',

      // Image
      eventImage: null,
      eventImageName: '',
      eventImagePath: '',
      tempEventImagePath: '',
      setDefaultImage: false,

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
      timeEnd: '',
      repeat: '',

      // Errors
      eventNameError: '',
      visibilityError: '',
      repeatError: '',
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
    this.imageRef=React.createRef();
    this.handleChange = this.handleChange.bind(this);
    this.handleImageChange = this.handleImageChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleRemove = this.handleRemove.bind(this);

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

      axios.get('/api/events/' + eventId, {
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
          dateStart: parsedObj.dateStart.toString().substring(0, 10),
          dateEnd: parsedObj.dateEnd.toString().substring(0, 10),
          timeStart: parsedObj.timeStart,
          timeEnd: parsedObj.timeEnd,
          repeat: parsedObj.repeat,
          eventImagePath: parsedObj.eventImagePath,
          tempEventImagePath: parsedObj.eventImagePath,
          eventImageName: imageName,
          dataRetrieved: true,
        });
      });
    }
  }

  validate = () => {
    const {
      eventName, description, location, dateStart, dateEnd, timeStart,
      timeEnd, eventImageName, eventImage, visibility, repeat
    } = this.state;

    let isError = false;
    const errors = {
      eventNameError: '',
      visibilityError: '',
      repeatError: '',
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

    if (validator.isEmpty(visibility)) {
      errors.visibilityError = 'Visibility field is required';
      isError = true;
    }

    if (validator.isEmpty(repeat)) {
      errors.repeatError = 'Repeat field is required';
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
    } else if (validator.isNumeric(location.city)) {
      errors.cityError = 'City is invalid';
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

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }
  
  handleMoment = (fieldName, momentObj , formatType) => {
    if(momentObj !== moment.isMoment()){
      momentObj = moment(momentObj);
    }
    this.setState({
      [fieldName]: momentObj.format(formatType),
    });
  }

  handleSubmit = () => {
    const {
      timeStart, timeEnd, visibility, province, repeat,
    } = this.state;

    // Converting start/end times to seconds of day for easier validation and storage
    const startTimeHours = parseInt(timeStart.substring(0, 2), 10) * 3600;
    const startTimeMinutes = parseInt(timeStart.substring(3, 5), 10) * 60;
    const start = startTimeHours + startTimeMinutes;
    const endTimeHours = parseInt(timeEnd.substring(0, 2), 10) * 3600;
    const endTimeMinutes = parseInt(timeEnd.substring(3, 5), 10) * 60;
    const end = endTimeHours + endTimeMinutes;
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
    const {
      timeStart, timeEnd, visibility, province, repeat,
    } = this.state;

    // Converting start/end times to seconds of day for easier validation and storage
    const startTimeHours = parseInt(timeStart.substring(0, 2), 10) * 3600;
    const startTimeMinutes = parseInt(timeStart.substring(3, 5), 10) * 60;
    const start = startTimeHours + startTimeMinutes;
    const endTimeHours = parseInt(timeEnd.substring(0, 2), 10) * 3600;
    const endTimeMinutes = parseInt(timeEnd.substring(3, 5), 10) * 60;
    const end = endTimeHours + endTimeMinutes;
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
      this.updateEvent();
    }
  };


  handleAddObject = (name, object) => {
    this.state.eventHoursCount += 1;
    this.setState({
      [name]: this.state[name].concat([object]),
    });
  }

  handleRemoveObject = (name, index) => {
    this.state.eventHoursCount -= 1;
    this.setState({
      [name]: this.state[name].filter((s, _index) => _index !== index),
    });
  }

  handleEditLocationObject = (name, fieldName) => (event) => {
    const obj = {};
    obj[name] = { ...this.state[name] };
    const value = event.target.value;
    obj[name][fieldName] = value;
    this.setState({ [name]: obj[name] });
  }

  handleImageChange(e) {
    e.preventDefault();
    let reader = new FileReader();
    let file = e.target.files[0];
    
    reader.onloadend = () => {
      this.setState({
        file: file,
        eventImageName: file.name,
        imagePreviewUrl: reader.result
      });
    };
    reader.readAsDataURL(file);
  }

  handleRemove() {
    this.setState({
      file: null,
      eventImageName: '',
      imagePreviewUrl: this.props.avatar ? defaultAvatar : defaultImage
    });
    this.imageRef.current.value = null;
  }
    
  handleClick() {
    this.imageRef.current.click();
  }

  // Send event data in post body to add to mongodb
  createEvent = () => {
    const {
      user, dateCreated, visibility, eventName, description, location,
      dateStart, dateEnd, timeStart, timeEnd, repeat, eventImageName, file
    } = this.state;

    let tempImageName = 'montrealCity.png';
    if (eventImageName !== '') {
      tempImageName = eventImageName;
    }
    console.log("EventImageName: "+eventImageName);
    const date = new Date();
    const todaysDate = (`${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`);

    this.state.dateCreated = todaysDate;

    const formData = new FormData();
    formData.append('eventImage', file);
    formData.append('eventDetails', qs.stringify({
      user,
      dateCreated,
      visibility,
      eventName,
      description,
      location,
      dateStart,
      dateEnd,
      timeStart,
      timeEnd,
      repeat,
      eventImageName: tempImageName,
    }));

    axios.post('/api/events/', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    }).then((response) => {
      if (response.status === 200) {
        this.setState({
          redirectTo: true,
          redirectToAllEvents: true,
          messageFromServer: response.data,
        });
      }
    }).catch((error) => {
        this.setState({
            messageFromServer: error.response.data,
        });
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
      dateStart, dateEnd, timeStart, timeEnd, repeat,
      eventImageName, eventImage, eventImagePath, setDefaultImage, file
    } = this.state;

    let tempImageName = eventImageName;

    if (eventImageName === '') {
      tempImageName = 'montrealCity.png';
    } else if (eventImage !== null) {
      tempImageName = eventImage.name;
    }

    if (setDefaultImage) {
      tempImageName = 'montrealCity.png';
    }

    const date = new Date();
    const todaysDate = (`${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`);

    const lastEditDate = todaysDate;

    const formData = new FormData();
    formData.append('eventImage', file);
    formData.append('eventDetails', qs.stringify({
      visibility,
      eventName,
      description,
      location,
      dateStart,
      dateEnd,
      timeStart,
      timeEnd,
      repeat,
      lastEditDate,
      _id: eventId,
      eventImagePath,
      eventImageName: tempImageName,
    }));

    axios.put('/api/events/' + eventId, formData, {
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
      dateEnd, timeStart, timeEnd, repeat, eventNameError, visibilityError, repeatError, descriptionError,
      addressError, apartmentError, cityError, provinceError, postalCodeError,
      phoneNumberError, dateStartError, dateEndError, timeStartError, timeEndError,
      tempEventImagePath, eventImageError, messageFromServer, editMode, setDefaultImage,
      file, imagePreviewUrl
    } = this.state;
    const { classes } = this.props;
    return (
      <React.Fragment>
        <div className={classes.mainContainer}>
          {messageFromServer.split('\n').map((item, key) => (
            <span key={key}>
              {item}
              <br />
            </span>
          ))}
          {this.renderRedirectToAllEvents()}
          <GridItem xs={12} sm={12} md={12}>
            <Card>
              <CardHeader color="success" text>
                <CardText color="success">
                  <h4>Event Form</h4>
                </CardText>
              </CardHeader>
              <CardBody>
                <form>
                  <center>
                    <GridItem xs={12} sm={6} md={6} lg={4}>
                      <ImageUpload
                        id="eventImage"
                        addButtonProps={{
                          color: "grey",
                          round: true
                        }}
                        changeButtonProps={{
                          color: "primary",
                          round: true
                        }}
                        removeButtonProps={{
                          color: "danger",
                          round: true
                        }}
                        handleClick={this.handleClick}
                        handleImageChange={this.handleImageChange}
                        handleRemove={this.handleRemove}
                        file={file}
                        imagePreviewUrl={imagePreviewUrl}
                        imageRef={this.imageRef}
                        helperText={eventImageError}
                        error={eventImageError.length > 0}
                        />
                    </GridItem>
                  </center>
                  <GridContainer>
                    <GridItem xs={12} sm={12} md={12}>
                      <CustomInput
                        className={classes.input}
                        labelText="Event Title"
                        formControlProps={{
                          fullWidth: true
                        }}
                        inputProps={{
                          id:"eventName",
                          name:"eventName",
                          value:eventName,
                          onChange: event => this.handleChange(event),
                        }}
                        fullWidth
                        helperText={eventNameError}
                        error={eventNameError.length > 0}
                      />
                    </GridItem>
                    <GridItem xs={12} sm={6} md={4} lg={4}>
                      <FormControl
                        fullWidth
                        className={classes.selectFormControl}
                      >
                      <InputLabel
                        htmlFor="simple-select"
                        className={classes.selectLabel}
                      >
                        Choose Visibility
                      </InputLabel>
                      <Select
                        MenuProps={{
                          className: classes.selectMenu
                        }}
                        classes={{
                          select: classes.select
                        }}
                        value={visibility}
                        inputProps={{
                          name: "visibility",
                          id: "visibility"
                        }}
                        name="visibility"
                        select
                        label="Visibility"
                        onChange={event => this.handleChange(event)}
                        fullWidth
                      >
                        <MenuItem
                          disabled
                          classes={{ root: classes.selectMenuItem }}
                        >
                        Choose Visibility
                        </MenuItem>
                        {visibilities.map(option => (
                          <MenuItem key={option.value} value={option.value}>
                            {option.label}
                          </MenuItem>
                        ))}
                      </Select>
                      </FormControl>
                      <FormHelperText error={visibilityError.length > 0}>{visibilityError}</FormHelperText>
                    </GridItem>
                    <GridItem xs={12} sm={6} md={4} lg={4}>
                      <FormControl
                        fullWidth
                        className={classes.selectFormControl}
                          name="repeat"
                          select
                          label="Repeat"
                          onChange={event => this.handleChange(event)}
                          fullWidth
                      >
                        <InputLabel
                          htmlFor="simple-select"
                          className={classes.selectLabel}
                        >
                          Select Repeat
                        </InputLabel>
                        <Select
                          MenuProps={{
                            className: classes.selectMenu
                          }}
                          classes={{
                            select: classes.select
                          }}
                          value={repeat}
                          onChange={event => this.handleChange(event)}
                          inputProps={{
                            name: "repeat",
                            id: "repeat"
                          }}
                          >
                            <MenuItem
                              disabled
                              classes={{
                                root: classes.selectMenuItem
                              }}
                            >
                              Select Repeat
                            </MenuItem>
                            {repeats.map(option => (
                              <MenuItem key={option.value} value={option.value}>
                                {option.label}
                              </MenuItem>
                            ))}
                        </Select>
                      </FormControl>
                      <FormHelperText error={repeatError.length > 0}>{repeatError}</FormHelperText>
                    </GridItem>
                    <GridItem xs={12} sm={12} md={12}>
                      <CustomInput
                        labelText="Event Description"
                        formControlProps={{
                          fullWidth: true
                        }}
                        inputProps={{
                          multiline: true,
                          rows: 5,
                          name:"description",
                          id:"description",
                          onChange: event => this.handleChange(event),
                          error:descriptionError.length > 0
                        }}
                        value={description}
                        helperText={descriptionError}
                        error={descriptionError.length > 0}
                      />
                  </GridItem>
                    <GridItem xs={12} sm={12} md={12}>
                    <Card>
                      <CardHeader color="success" icon>
                        <CardIcon color="success">
                          <Today />
                        </CardIcon>
                        <h4 className={classes.cardIconTitle}>Date</h4>
                      </CardHeader>
                      <CardBody>
                        <GridItem>
                        </GridItem>
                        <GridContainer>
                        <GridItem xs={6} sm={6} md={6}>
                        <InputLabel className={classes.label}>Start date</InputLabel>
                        <br />
                      <FormControl fullWidth>
                        <Datetime
                          timeFormat={false}
                          inputProps={{ 
                            placeholder: "MM/DD/YYYY",
                            id:"dateStart",
                            name:"dateStart",
                            }}
                          onChange={(moment) => this.handleMoment("dateStart",moment, 'L')}
                          value={dateStart}
                          locale="en"
                        />
                        <FormHelperText error={dateStartError.length > 0}>{dateStartError}</FormHelperText>
                      </FormControl>
                      </GridItem>
                      <GridItem xs={6} sm={6} md={6}>
                      <InputLabel className={classes.label}>End date</InputLabel>
                        <br />
                      <FormControl fullWidth>
                        <Datetime
                          timeFormat={false}
                          inputProps={{ 
                            placeholder: "MM/DD/YYYY",
                            name:"dateEnd",
                            id:"dateEnd",
                            }}
                            name="dateEnd"
                            id="dateEnd"
                          onChange={(moment) =>  this.handleMoment("dateEnd",moment, 'L')}
                          value={dateEnd}
                          locale="en"
                        />
                        <FormHelperText error={dateEndError.length > 0}>{dateEndError}</FormHelperText>
                      </FormControl>
                      </GridItem>
                      </GridContainer>
                      </CardBody>
                    </Card>
                    </GridItem>
                    <GridItem xs={12} sm={12} md={12}>
                    <Card>
                      <CardHeader color="success" icon>
                        <CardIcon color="success">
                          <AvTimer />
                        </CardIcon>
                        <h4 className={classes.cardIconTitle}>Day Time</h4>
                      </CardHeader>
                      <CardBody>
                        <React.Fragment>
                        <GridContainer>
                          <GridItem xs={12} sm={12} md={6} lg={3} >
                            <InputLabel className={classes.label}>Start Time</InputLabel>
                            <br />
                            <FormControl fullWidth>
                            <Datetime
                              dateFormat={false}
                              inputProps={{ 
                              placeholder: "Start Time",
                              }}
                              id="timeStart"
                              name="timeStart"
                              onChange={(moment) =>  this.handleMoment("timeStart",moment, 'LT')}
                              value={timeStart}
                              helperText={timeStartError}
                              error={timeStartError.length > 0}
                              locale="en"
                            />
                            <FormHelperText error={timeStartError.length > 0}>{timeStartError}</FormHelperText>
                            </FormControl>
                          </GridItem>
                          <GridItem xs={12} sm={12} md={6} lg={3} >
                            <InputLabel className={classes.label}>End Time</InputLabel>
                              <br />
                            <FormControl fullWidth>
                              <Datetime
                                dateFormat={false}
                                inputProps={{ placeholder: "End Time" }}
                                id="timeEnd"
                                name="timeEnd"
                                value={timeEnd}
                                onChange={(moment) =>  this.handleMoment("timeEnd",moment, 'LT')}
                                helperText={timeEndError}
                                error={timeEndError.length > 0}
                                locale="en"
                              />
                              <FormHelperText error={timeEndError.length > 0}>{timeEndError}</FormHelperText>
                            </FormControl>
                          </GridItem>
                        </GridContainer>
                      </React.Fragment>
                      </CardBody>
                    </Card>
                    </GridItem>
                  </GridContainer>
                  <Card>
                    <CardHeader color="success" icon>
                      <CardIcon color="success">
                        <Location />
                      </CardIcon>
                      <h4 className={classes.cardIconTitle}>Location</h4>
                    </CardHeader>
                    <CardBody>
                    <GridItem>
                      <GridContainer>
                        <GridItem xs={4} sm={4} md={4} lg={4}>
                          <CustomInput
                          className={classes.input}
                            labelText="Address"
                            formControlProps={{
                              fullWidth: true
                            }}
                            inputProps={{
                              name:"address",
                              id:"address",
                              value:location.address,
                              onChange: this.handleEditLocationObject('location', 'address'),
                            }}
                            helperText={addressError}
                            error={addressError.length > 0}
                          />
                        </GridItem>
                        <GridItem xs={4} sm={4} md={4} lg={4}>
                          <CustomInput
                            labelText="City"
                            formControlProps={{
                              fullWidth: true
                            }}
                            inputProps={{
                              name:"city",
                              id:"city",
                              value:location.city,
                              onChange: this.handleEditLocationObject('location', 'city'),
                            }}
                            helperText={cityError}
                            error={cityError.length > 0}
                          />
                        </GridItem>
                        <GridItem xs={2} sm={2} md={2} lg={2}>
                          <CustomInput
                            labelText="Apartment"
                            id="apartment"
                            formControlProps={{
                              fullWidth: true
                            }}
                            inputProps={{
                              name:"apartment",
                              id:"apartment",
                              value:location.apartment,
                              onChange: this.handleEditLocationObject('location', 'apartment'),
                            }}
                            helperText={apartmentError}
                            error={apartmentError.length > 0}
                          />
                        </GridItem>
                      </GridContainer>
                      <GridContainer>
                        <GridItem xs={4} sm={4} md={4} lg={4}>
                          <FormControl
                            fullWidth
                            className={classes.selectFormControl}
                          >
                          <InputLabel
                            htmlFor="simple-select"
                            className={classes.selectLabel}
                          >
                            Province
                          </InputLabel>
                          <Select
                            MenuProps={{
                              className: classes.selectMenu
                            }}
                            classes={{
                              select: classes.select
                            }}
                            value={location.province}
                            inputProps={{
                              name: "province",
                            }}
                            id="province"
                            onChange={this.handleEditLocationObject('location', 'province')}
                            name="province"
                            select
                            label="Province/Territory"
                            fullWidth
                            helperText={provinceError}
                            error={provinceError.length > 0}
                          >
                          <MenuItem
                            disabled
                            classes={{
                              root: classes.selectMenuItem
                            }}
                          >
                            Province
                          </MenuItem>
                          {provinces.map(option => (
                            <MenuItem key={option.value} value={option.value}>
                              {option.label}
                            </MenuItem>
                          ))}
                          </Select>
                          </FormControl>
                          <FormHelperText error={provinceError.length > 0}>{provinceError}</FormHelperText>
                        </GridItem>
                        <GridItem xs={4} sm={4} md={4} lg={4}>
                          <CustomInput
                            labelText="Postal Code"
                            formControlProps={{
                              fullWidth: true
                            }}
                            inputProps={{
                              name:"postalCode",
                              id:"postalCode",
                              value:location.postalCode.toUpperCase(),
                              onChange: this.handleEditLocationObject('location', 'postalCode'),
                              inputComponent: PostalCodeMask,
                            }}
                            helperText={postalCodeError}
                            error={postalCodeError.length > 0}
                          />
                        </GridItem>
                        <GridItem xs={4} sm={4} md={12} lg={4}>
                          <CustomInput
                            labelText="Phone Number"
                            id="phoneNumber"
                            formControlProps={{
                              fullWidth: true
                            }}
                            inputProps={{
                              name:"phoneNumber",
                              id:"phoneNumber",
                              value:location.phoneNumber,
                              onChange: this.handleEditLocationObject('location', 'phoneNumber'),
                              inputComponent: PhoneMask,
                            }}
                            helperText={phoneNumberError}
                            error={phoneNumberError.length > 0}
                          />
                        </GridItem>
                      </GridContainer>
                    </GridItem>
                    </CardBody>
                  </Card>
                    {!editMode ? (
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={(event) => this.handleSubmit(event)}
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
                    <Clearfix />
                </form>
              </CardBody>
            </Card>
          </GridItem>
        </div>
      </React.Fragment>
    );
  }
}
  
EventForm.propTypes = {
  classes: PropTypes.shape({}).isRequired,
  location: PropTypes.shape({}).isRequired,
};
  
export default withStyles(styles)(EventForm);
