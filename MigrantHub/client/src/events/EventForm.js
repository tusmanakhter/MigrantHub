import React, { Component } from 'react';
import Datetime from 'react-datetime';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import MenuItem from '@material-ui/core/MenuItem';
import validator from 'validator';
import axios from 'axios';
import { Redirect } from 'react-router-dom';
import { provinces } from 'lib/SignUpConstants';
import { PhoneMask, PostalCodeMask } from 'lib/Masks';
import Clearfix from 'components/Clearfix/Clearfix.jsx';
import moment from 'moment';
import FormData from 'form-data';
import { injectIntl, intlShape, FormattedMessage } from 'react-intl';

// core components
import GridContainer from 'components/Grid/GridContainer.jsx';
import GridItem from 'components/Grid/GridItem.jsx';
import CustomInput from 'components/CustomInput/CustomInput.jsx';
import Button from '@material-ui/core/Button';
import Card from 'components/Card/Card.jsx';
import CardHeader from 'components/Card/CardHeader.jsx';
import CardText from 'components/Card/CardText.jsx';
import CardIcon from 'components/Card/CardIcon.jsx';
import CardBody from 'components/Card/CardBody.jsx';
import ImageUpload from 'components/CustomUpload/ImageUpload.jsx';

// @material-ui/core components
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import { FormHelperText } from '@material-ui/core';

// @material-ui/icons
import Today from '@material-ui/icons/Today';
import Location from '@material-ui/icons/Map';
import AvTimer from '@material-ui/icons/AvTimer';

import extendedFormsStyle from 'assets/jss/material-dashboard-pro-react/views/extendedFormsStyle.jsx';
import regularFormsStyle from 'assets/jss/material-dashboard-pro-react/views/regularFormsStyle';
import defaultImage from 'assets/img/image_placeholder.jpg';
import defaultAvatar from 'assets/img/placeholder.jpg';
import { toast } from 'react-toastify';

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
    this.imageRef = React.createRef();
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

      axios.get(`/api/events/${eventId}`, {
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
    const { intl } = this.props;
    const {
      eventName, description, location, dateStart, dateEnd, timeStart,
      timeEnd, eventImageName, eventImage, visibility, repeat,
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
      errors.eventNameError = `${intl.formatMessage({ id: 'form.title' })}  ${intl.formatMessage({ id: 'isrequired' })}`;
      isError = true;
    }

    if (validator.isEmpty(visibility)) {
      errors.visibilityError = `${intl.formatMessage({ id: 'form.visibility' })}  ${intl.formatMessage({ id: 'isrequired' })}`;
      isError = true;
    }

    if (validator.isEmpty(repeat)) {
      errors.repeatError = `${intl.formatMessage({ id: 'form.repeat' })}  ${intl.formatMessage({ id: 'isrequired' })}`;
      isError = true;
    }

    if (validator.isEmpty(description)) {
      errors.descriptionError = `${intl.formatMessage({ id: 'form.description' })}  ${intl.formatMessage({ id: 'isrequired' })}`;
      isError = true;
    } else if (!validator.isLength(description, { min: 10 })) {
      errors.descriptionError = `${intl.formatMessage({ id: 'form.description' })}  ${intl.formatMessage({ id: 'form.min.char.10' })}`;
      isError = true;
    }

    if (validator.isEmpty(location.address)) {
      errors.addressError = `${intl.formatMessage({ id: 'contact.address' })}  ${intl.formatMessage({ id: 'isrequired' })}`;
      isError = true;
    }

    if (validator.isEmpty(location.city)) {
      errors.cityError = `${intl.formatMessage({ id: 'contact.city' })}  ${intl.formatMessage({ id: 'isrequired' })}`;
      isError = true;
    } else if (validator.isNumeric(location.city)) {
      errors.cityError = `${intl.formatMessage({ id: 'contact.city' })}  ${intl.formatMessage({ id: 'notvalid' })}`;
      isError = true;
    }

    if (validator.isEmpty(location.province)) {
      errors.provinceError = `${intl.formatMessage({ id: 'contact.province' })}  ${intl.formatMessage({ id: 'isrequired' })}`;
      isError = true;
    }

    if (validator.isEmpty(location.postalCode)) {
      errors.postalCodeError = `${intl.formatMessage({ id: 'contact.postal' })}  ${intl.formatMessage({ id: 'isrequired' })}`;
      isError = true;
    } else if (!validator.isLength(location.postalCode, { min: 7, max: 7 })) {
      errors.postalCodeError = `${intl.formatMessage({ id: 'contact.postal' })}  ${intl.formatMessage({ id: 'notvalid' })}`;
      isError = true;
    }

    if (validator.isEmpty(location.phoneNumber)) {
      errors.phoneNumberError = `${intl.formatMessage({ id: 'contact.phone' })}  ${intl.formatMessage({ id: 'isrequired' })}`;
      isError = true;
    } else if (!validator.isLength(location.phoneNumber, { min: 14, max: 14 })) {
      errors.phoneNumberError = `${intl.formatMessage({ id: 'contact.phone' })}  ${intl.formatMessage({ id: 'notvalid' })}`;
      isError = true;
    }

    if (validator.isEmpty(dateStart)) {
      errors.dateStartError = `${intl.formatMessage({ id: 'form.day.start' })}  ${intl.formatMessage({ id: 'isrequired' })}`;
      isError = true;
    } else if (validator.isBefore(dateStart)) {
      errors.dateStartError = `${intl.formatMessage({ id: 'form.day.start' })}  ${intl.formatMessage({ id: 'notvalid' })}`;
      isError = true;
    }

    if (validator.isEmpty(dateEnd)) {
      errors.dateEndError = `${intl.formatMessage({ id: 'form.day.end' })}  ${intl.formatMessage({ id: 'isrequired' })}`;
      isError = true;
    } else if (validator.isBefore(dateEnd, dateStart)) {
      errors.dateEndError = `${intl.formatMessage({ id: 'form.day.end' })}  ${intl.formatMessage({ id: 'notvalid' })}`;
      isError = true;
    }

    if (validator.isEmpty(timeStart)) {
      errors.timeStartError = `${intl.formatMessage({ id: 'form.time.start' })}  ${intl.formatMessage({ id: 'isrequired' })}`;
      isError = true;
    }

    if (validator.isEmpty(timeEnd)) {
      errors.timeEndError = `${intl.formatMessage({ id: 'form.time.end' })}  ${intl.formatMessage({ id: 'isrequired' })}`;
      isError = true;
    }

    if (eventImage !== null) {
      if (!validator.matches(eventImageName, '.([.jpg]|[.jpeg]|[.png])$')) {
        errors.eventImageError = `${intl.formatMessage({ id: 'form.image' })}  ${intl.formatMessage({ id: 'notvalid' })} .jpg, .jpeg or .png`;
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

  handleMoment = (fieldName, momentObj, formatType) => {
    if (momentObj !== moment.isMoment()) {
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

  handleEditLocationObject = (name, fieldName) => (event) => {
    const obj = {};
    obj[name] = { ...this.state[name] };
    const value = event.target.value;
    obj[name][fieldName] = value;
    this.setState({ [name]: obj[name] });
  }

  handleImageChange(e) {
    e.preventDefault();
    const reader = new FileReader();
    const file = e.target.files[0];

    reader.onloadend = () => {
      this.setState({
        file,
        eventImageName: file.name,
        imagePreviewUrl: reader.result,
      });
    };
    reader.readAsDataURL(file);
  }

  handleRemove() {
    this.setState({
      file: null,
      eventImageName: '',
      imagePreviewUrl: this.props.avatar ? defaultAvatar : defaultImage,
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
      dateStart, dateEnd, timeStart, timeEnd, repeat, eventImageName, file,
    } = this.state;

    let tempImageName = 'montrealCity.png';
    if (eventImageName !== '') {
      tempImageName = eventImageName;
    }
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
      eventImageName, eventImage, eventImagePath, setDefaultImage, file,
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

    axios.put(`/api/events/${eventId}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    }).then((response) => {
      this.setState({
        messageFromServer: response.data,
      });
      if (response.status === 200) {
        toast.success('Updated event!');
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
      eventImageError, messageFromServer, editMode,
      file, imagePreviewUrl,
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
          <GridContainer>
            <GridItem lg={12} md={12} sm={12} xs={12}>
              <Card>
                <CardHeader color="rose" text>
                  <CardText color="rose">
                    <h4><FormattedMessage id="event.form" /></h4>
                  </CardText>
                </CardHeader>
                <CardBody>
                  <form>
                    <GridContainer>
                      <GridItem lg={4} md={4} sm={12} xs={12}>
                        <ImageUpload
                          id="eventImage"
                          addButtonProps={{
                            color: 'grey',
                            round: true,
                          }}
                          changeButtonProps={{
                            color: 'success',
                            round: true,
                          }}
                          removeButtonProps={{
                            color: 'danger',
                            round: true,
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
                      <GridItem lg={8} md={8} sm={12} xs={12}>
                        <GridContainer>
                          <GridItem lg={4} md={4} sm={12} xs={12}>
                            <CustomInput
                              className={classes.input}
                              labelText={<FormattedMessage id="form.title" />}
                              formControlProps={{
                                fullWidth: true,
                              }}
                              inputProps={{
                                id: 'eventName',
                                name: 'eventName',
                                value: eventName,
                                onChange: event => this.handleChange(event),
                              }}
                              fullWidth
                              helperText={eventNameError}
                              error={eventNameError.length > 0}
                            />
                          </GridItem>
                          <GridItem lg={4} md={4} sm={12} xs={12}>
                            <FormControl
                              fullWidth
                              className={classes.selectFormControl}
                            >
                              <InputLabel
                                htmlFor="simple-select"
                                className={classes.selectLabel}
                              >
                                <FormattedMessage id="form.select.visibility" />
                              </InputLabel>
                              <Select
                                MenuProps={{
                                  className: classes.selectMenu,
                                }}
                                classes={{
                                  select: classes.select,
                                }}
                                value={visibility}
                                inputProps={{
                                  name: 'visibility',
                                  id: 'visibility',
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
                                  <FormattedMessage id="form.select.visibility" />
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
                          <GridItem lg={4} md={4} sm={12} xs={12}>
                            <FormControl
                              fullWidth
                              className={classes.selectFormControl}
                              name="repeat"
                              select
                              label="Repeat"
                              onChange={event => this.handleChange(event)}
                            >
                              <InputLabel
                                htmlFor="simple-select"
                                className={classes.selectLabel}
                              >
                                <FormattedMessage id="form.select.repeat" />
                              </InputLabel>
                              <Select
                                MenuProps={{
                                  className: classes.selectMenu,
                                }}
                                classes={{
                                  select: classes.select,
                                }}
                                value={repeat}
                                onChange={event => this.handleChange(event)}
                                inputProps={{
                                  name: 'repeat',
                                  id: 'repeat',
                                }}
                              >
                                <MenuItem
                                  disabled
                                  classes={{
                                    root: classes.selectMenuItem,
                                  }}
                                >
                                  <FormattedMessage id="form.select.repeat" />
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
                          <GridItem lg={12} md={12} sm={12} xs={12}>
                            <CustomInput
                              labelText={<FormattedMessage id="form.description" />}
                              formControlProps={{
                                fullWidth: true,
                              }}
                              inputProps={{
                                multiline: true,
                                rows: 5,
                                name: 'description',
                                id: 'description',
                                onChange: event => this.handleChange(event),
                                error: descriptionError.length > 0,
                              }}
                              value={description}
                              helperText={descriptionError}
                              error={descriptionError.length > 0}
                            />
                          </GridItem>
                        </GridContainer>
                      </GridItem>
                      <GridItem lg={6} md={6} sm={12} xs={12}>
                        <GridContainer>
                          <GridItem lg={12} md={12} sm={12} xs={12}>
                            <Card>
                              <CardHeader color="rose" icon>
                                <CardIcon color="rose">
                                  <Today />
                                </CardIcon>
                                <h4 className={classes.cardIconTitle}><FormattedMessage id="form.date" /></h4>
                              </CardHeader>
                              <CardBody>
                                <GridItem />
                                <GridContainer>
                                  <GridItem lg={6} md={6} sm={12} xs={12}>
                                    <InputLabel className={classes.label}><FormattedMessage id="form.day.start" /></InputLabel>
                                    <br />
                                    <FormControl fullWidth>
                                      <Datetime
                                        timeFormat={false}
                                        inputProps={{
                                          placeholder: 'MM/DD/YYYY',
                                          id: 'dateStart',
                                          name: 'dateStart',
                                        }}
                                        onChange={moment => this.handleMoment('dateStart', moment, 'L')}
                                        value={dateStart}
                                        locale="en"
                                      />
                                      <FormHelperText error={dateStartError.length > 0}>{dateStartError}</FormHelperText>
                                    </FormControl>
                                  </GridItem>
                                  <GridItem lg={6} md={6} sm={12} xs={12}>
                                    <InputLabel className={classes.label}><FormattedMessage id="form.day.end" /></InputLabel>
                                    <br />
                                    <FormControl fullWidth>
                                      <Datetime
                                        timeFormat={false}
                                        inputProps={{
                                          placeholder: 'MM/DD/YYYY',
                                          name: 'dateEnd',
                                          id: 'dateEnd',
                                        }}
                                        name="dateEnd"
                                        id="dateEnd"
                                        onChange={moment => this.handleMoment('dateEnd', moment, 'L')}
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
                          <GridItem lg={12} md={12} sm={12} xs={12}>
                            <Card>
                              <CardHeader color="rose" icon>
                                <CardIcon color="rose">
                                  <AvTimer />
                                </CardIcon>
                                <h4 className={classes.cardIconTitle}><FormattedMessage id="form.time" /></h4>
                              </CardHeader>
                              <CardBody>
                                <React.Fragment>
                                  <GridContainer>
                                    <GridItem lg={6} md={6} sm={12} xs={12}>
                                      <InputLabel className={classes.label}><FormattedMessage id="form.time.start" /></InputLabel>
                                      <br />
                                      <FormControl fullWidth>
                                        <Datetime
                                          dateFormat={false}
                                          inputProps={{
                                            placeholder: 'HH:MM AM/PM',
                                          }}
                                          id="timeStart"
                                          name="timeStart"
                                          onChange={moment => this.handleMoment('timeStart', moment, 'LT')}
                                          value={timeStart}
                                          helperText={timeStartError}
                                          error={timeStartError.length > 0}
                                          locale="en"
                                        />
                                        <FormHelperText error={timeStartError.length > 0}>{timeStartError}</FormHelperText>
                                      </FormControl>
                                    </GridItem>
                                    <GridItem lg={6} md={6} sm={12} xs={12}>
                                      <InputLabel className={classes.label}><FormattedMessage id="form.time.end" /></InputLabel>
                                      <br />
                                      <FormControl fullWidth>
                                        <Datetime
                                          dateFormat={false}
                                          inputProps={{ placeholder: 'HH:MM AM/PM' }}
                                          id="timeEnd"
                                          name="timeEnd"
                                          value={timeEnd}
                                          onChange={moment => this.handleMoment('timeEnd', moment, 'LT')}
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
                      </GridItem>
                      <GridItem lg={6} md={6} sm={12} xs={12}>
                        <Card>
                          <CardHeader color="rose" icon>
                            <CardIcon color="rose">
                              <Location />
                            </CardIcon>
                            <h4 className={classes.cardIconTitle}>Location</h4>
                          </CardHeader>
                          <CardBody>
                            <GridItem>
                              <GridContainer>
                                <GridItem lg={4} md={4} sm={12} xs={12}>
                                  <CustomInput
                                    className={classes.input}
                                    labelText={<FormattedMessage id="contact.address" />}
                                    formControlProps={{
                                      fullWidth: true,
                                    }}
                                    inputProps={{
                                      name: 'address',
                                      id: 'address',
                                      value: location.address,
                                      onChange: this.handleEditLocationObject('location', 'address'),
                                    }}
                                    helperText={addressError}
                                    error={addressError.length > 0}
                                  />
                                </GridItem>
                                <GridItem lg={4} md={4} sm={12} xs={12}>
                                  <CustomInput
                                    labelText={<FormattedMessage id="contact.city" />}
                                    formControlProps={{
                                      fullWidth: true,
                                    }}
                                    inputProps={{
                                      name: 'city',
                                      id: 'city',
                                      value: location.city,
                                      onChange: this.handleEditLocationObject('location', 'city'),
                                    }}
                                    helperText={cityError}
                                    error={cityError.length > 0}
                                  />
                                </GridItem>
                                <GridItem lg={4} md={4} sm={12} xs={12}>
                                  <CustomInput
                                    labelText={<FormattedMessage id="contact.apartment" />}
                                    id="apartment"
                                    formControlProps={{
                                      fullWidth: true,
                                    }}
                                    inputProps={{
                                      name: 'apartment',
                                      id: 'apartment',
                                      value: location.apartment,
                                      onChange: this.handleEditLocationObject('location', 'apartment'),
                                    }}
                                    helperText={apartmentError}
                                    error={apartmentError.length > 0}
                                  />
                                </GridItem>
                              </GridContainer>
                              <GridContainer>
                                <GridItem lg={4} md={4} sm={12} xs={12}>
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
                                        className: classes.selectMenu,
                                      }}
                                      classes={{
                                        select: classes.select,
                                      }}
                                      value={location.province}
                                      inputProps={{
                                        name: 'province',
                                      }}
                                      id="province"
                                      onChange={this.handleEditLocationObject('location', 'province')}
                                      name="province"
                                      select
                                      label={<FormattedMessage id="contact.province" />}
                                      fullWidth
                                      helperText={provinceError}
                                      error={provinceError.length > 0}
                                    >
                                      <MenuItem
                                        disabled
                                        classes={{
                                          root: classes.selectMenuItem,
                                        }}
                                      >
                                        <FormattedMessage id="contact.province" />
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
                                <GridItem lg={4} md={4} sm={12} xs={12}>
                                  <CustomInput
                                    labelText={<FormattedMessage id="contact.postal" />}
                                    formControlProps={{
                                      fullWidth: true,
                                    }}
                                    inputProps={{
                                      name: 'postalCode',
                                      id: 'postalCode',
                                      value: location.postalCode.toUpperCase(),
                                      onChange: this.handleEditLocationObject('location', 'postalCode'),
                                      inputComponent: PostalCodeMask,
                                    }}
                                    helperText={postalCodeError}
                                    error={postalCodeError.length > 0}
                                  />
                                </GridItem>
                                <GridItem lg={4} md={4} sm={12} xs={12}>
                                  <CustomInput
                                    labelText={<FormattedMessage id="contact.phone" />}
                                    id="phoneNumber"
                                    formControlProps={{
                                      fullWidth: true,
                                    }}
                                    inputProps={{
                                      name: 'phoneNumber',
                                      id: 'phoneNumber',
                                      value: location.phoneNumber,
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
                      </GridItem>
                    </GridContainer>
                    {!editMode ? (
                      <Button
                        variant="contained"
                        color="secondary"
                        onClick={event => this.handleSubmit(event)}
                        className={classes.button}
                      >
                        Create
                      </Button>
                    ) : (
                      <Button
                        variant="contained"
                        color="secondary"
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
          </GridContainer>
        </div>
      </React.Fragment>
    );
  }
}

EventForm.propTypes = {
  classes: PropTypes.shape({}).isRequired,
  location: PropTypes.shape({}).isRequired,
  intl: intlShape.isRequired,
};

export default withStyles(styles)(injectIntl(EventForm));
