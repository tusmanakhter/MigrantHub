import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';
import validator from 'validator';
import MaskedInput from 'react-text-mask';
import Header from '../components/Header/Header';
import axios from 'axios';
import { Redirect } from 'react-router-dom'

var qs = require('qs');

const visibilities = [
    { value: 'public', label: 'Public' },
    { value: 'private', label: 'Private' }
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
    { value: 'YT', label: 'Yukon' }
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
        display: 'inline-block'
    },
    button: {
        margin: theme.spacing.unit,
    },
    group: {
        flexDirection: 'row'
    },
    formControl: {
        textAlign: 'left'
    },
    select: {
        textAlign: 'left'
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
}

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
}

class CreateEvent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            creator: '',

            visibility: '',
            eventName: '',
            description: '',

            //Image
            eventImage: null,
            eventImageName: '',

            //Event Location 
            location: {
                address : '',
                apartment : '',
                city : '',
                province : '',
                postalCode : '',
                phoneNumber : '',
            },

            //Event Time
            dateStart: '',
            dateEnd:'',
            timeStart: '',
            secondsStart: '',
            timeEnd: '',
            secondsEnd: '',
            repeat: '', 

            //Errors
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
            redirectToAllEvents : false
        };
    }       

    validate = () => {
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
            repeatError: ''
        };

        if (validator.isEmpty(this.state.eventName)) {
            errors.eventNameError = "Event name is required";
            isError = true
        } 

        if (validator.isEmpty(this.state.description)) {
            errors.descriptionError = "Description is required";
            isError = true
        } else if (!validator.isLength(this.state.description, {min:10})) {
            errors.descriptionError = "Description must be at least 10 characters";
            isError = true
        }

        if (validator.isEmpty(this.state.location.address)) {
            errors.addressError = "Address is required";
            isError = true
        }
      
        if (validator.isEmpty(this.state.location.city)) {
            errors.cityError = "City is required";
            isError = true
        } 
      
        if (validator.isEmpty(this.state.location.postalCode)) {
            errors.postalCodeError = "Postal code is required";
            isError = true
        } else if (!validator.isLength(this.state.location.postalCode, {min:7, max:7})) {
            errors.postalCodeError = "Postal code is invalid";
            isError = true
        } 
      
        if (validator.isEmpty(this.state.location.phoneNumber)) {
            errors.phoneNumberError = "Phone number is required";
            isError = true
        } else if (!validator.isLength(this.state.location.phoneNumber, {min:14, max:14})) {
            errors.phoneNumberError = "Phone number is invalid";
            isError = true
        } 

        if (validator.isEmpty(this.state.dateStart)) {
            errors.dateStartError = "Start date is required";
            isError = true
        } else if(validator.isBefore(this.state.dateStart)) {
            errors.dateStartError = "Start date is invalid";
            isError = true;
        }

        if (validator.isEmpty(this.state.dateEnd)) {
            errors.dateEndError  = "End date is required";
            isError = true
        } else if(validator.isBefore(this.state.dateEnd, this.state.dateStart)) {
            errors.dateEndError = "End date is invalid";
            isError = true;
        }

        if (validator.isEmpty(this.state.timeStart)) {
            errors.timeStartError = "Start time is required";
            isError = true
        } 

        if (validator.isEmpty(this.state.timeEnd)) {
            errors.timeEndError = "End time is required";
            isError = true
        } else if (this.state.secondsEnd <= this.state.secondsStart) {
            errors.timeEndError = "End time is invalid";
            isError = true;
        }

        if(this.state.eventImage !== null) {
            if (!validator.matches(this.state.eventImageName, '.(\.jpg|\.jpeg|\.png)$')) {
                errors.eventImageError = "Invalid image format. Should be either .jpg, .jpeg or .png";
                isError = true
            }
        }
        
        this.setState({
            ...this.state,
            ...errors
        })
        
          
        return isError;
    }

    handleChange = event => {
        this.setState({
          [event.target.name]: event.target.value
        })
    }

    handleNext = () => {
        //Converting start/end times to seconds of day for easier validation and storage
        var startTimeHours = parseInt(this.state.timeStart.substring(0,2)) * 3600;
        var startTimeMinutes = parseInt(this.state.timeStart.substring(3,5)) * 60;
        var start = startTimeHours + startTimeMinutes;
        var endTimeHours = parseInt(this.state.timeEnd.substring(0,2)) * 3600;
        var endTimeMinutes =  parseInt(this.state.timeEnd.substring(3,5)) * 60;
        var end = endTimeHours + endTimeMinutes;

        this.state.secondsStart = start;
        this.state.secondsEnd = end;

        //Making sure visibility, province and repeat are instantiated
        if(this.state.visibility === '') this.state.visibility = 'public';
        if(this.state.province === '') this.state.province = 'AB';
        if(this.state.repeat === '') this.state.repeat = 'no';

        let imageName = 'cameraDefault.png';
        if(this.state.eventImage !== null){
            imageName = this.state.eventImage.name
        }

        this.state.eventImageName = imageName;

        let error = this.validate();
        if (!error) {
          this.createEvent(this);
        }
    };

    handleUploadImage = event => {

        if(event.target.files[0] !== undefined) {
            this.setState({
                eventImage: event.target.files[0],
                eventImageName: event.target.files[0].name,
            });
        } else{
            this.setState({
                eventImage: null,
                eventImageName: '',
            });
        }
    }

    handleEditSingleObject = (name, fieldName) => (event) => {
        let obj = {};
        obj[name] = { ...this.state[name] };
        let value = event.target.value;
        obj[name][fieldName] = value;
        this.setState({ [name]: obj[name] });
    };

    // Send event data in post body to add to mongodb
    createEvent(e) {

        let location = {};
        location = e.state.location;
        axios.post('/events/create',
            qs.stringify({
                creator: e.state.creator,
                visibility: e.state.visibility,
                eventName: e.state.eventName,
                description: e.state.description,
                location: location,
                dateStart: e.state.dateStart,
                dateEnd:e.state.dateEnd,
                timeStart: e.state.timeStart,
                secondsStart: e.state.secondsStart,
                timeEnd: e.state.timeEnd,
                secondsEnd: e.state.secondsEnd,
                repeat: e.state.repeat,
                eventImage: e.state.eventImage,
                eventImageName: e.state.eventImageName
            })).then(function (response) {
            e.setState({
                messageFromServer: response.data
            });
            if (response.status === 200) {      
                e.setState({
                  redirectTo: true,
                  redirectToAllEvents: true
                })
              }
        });
    }

    renderRedirectToAllEvents = () => {
        if (this.state.redirectToAllEvents) {
            return <Redirect to='/events' />
        }
    }

    render() {
        const { classes } = this.props;

        return (
            <React.Fragment>
                <Header appName='Migrant Hub' />
                {this.state.messageFromServer.split('\n').map((item, key) => {
                    return <span key={key}>{item}<br/></span>
                })}
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
                            value={this.state.visibility} 
                            onChange={event => this.handleChange(event)}
                            fullWidth>
                                {visibilities.map(option => (
                                    <MenuItem key={option.value} value={option.value} >
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
                            value={this.state.repeat} 
                            onChange={event => this.handleChange(event)}
                            fullWidth>
                                {repeats.map(option => (
                                    <MenuItem key={option.value} value={option.value} >
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
                            value={this.state.eventName} 
                            onChange={event => this.handleChange(event)} 
                            helperText={this.state.eventNameError}
                            error={this.state.eventNameError.length > 0}
                            fullWidth
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField 
                            id="description" 
                            name="description" 
                            label="Description" 
                            value={this.state.description}
                            onChange={event => this.handleChange(event)} 
                            helperText={this.state.descriptionError}
                            error={this.state.descriptionError.length > 0}
                            fullWidth
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField 
                            id="address" 
                            name="address" 
                            label="Address" 
                            value={this.state.location.address} 
                            onChange={this.handleEditSingleObject("location", "address")}
                            helperText={this.state.addressError}
                            error={this.state.addressError.length > 0}
                            fullWidth
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField 
                            id="apartment" 
                            name="apartment" 
                            label="Apartment" 
                            value={this.state.location.apartment} 
                            onChange={this.handleEditSingleObject("location", "apartment")}
                            helperText={this.state.apartmentError}
                            error={this.state.apartmentError.length > 0}
                            fullWidth
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField 
                            id="city" 
                            name="city" 
                            label="City" 
                            value={this.state.location.city} 
                            onChange={this.handleEditSingleObject("location", "city")}
                            helperText={this.state.cityError}
                            error={this.state.cityError.length > 0}
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
                            value={this.state.location.province} 
                            onChange={this.handleEditSingleObject("location", "province")}
                            helperText={this.state.provinceError}
                            error={this.state.provinceError.length > 0}
                            fullWidth>
                                {provinces.map(option => (
                                    <MenuItem key={option.value} value={option.value} >
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
                            value={this.state.location.postalCode} 
                            onChange={this.handleEditSingleObject("location", "postalCode")}
                            helperText={this.state.postalCodeError}
                            error={this.state.postalCodeError.length > 0}
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
                            value={this.state.location.phoneNumber} 
                            placeholder="(123) 123-4567"
                            onChange={this.handleEditSingleObject("location", "phoneNumber")}
                            helperText={this.state.phoneNumberError}
                            error={this.state.phoneNumberError.length > 0}
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
                            value={this.state.dateStart} 
                            onChange={event => this.handleChange(event)}
                            helperText={this.state.dateStartError}
                            error={this.state.dateStartError.length > 0}
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
                            value={this.state.dateEnd} 
                            onChange={event => this.handleChange(event)}
                            helperText={this.state.dateEndError}
                            error={this.state.dateEndError.length > 0}
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
                            value={this.state.timeStart} 
                            onChange={event => this.handleChange(event)}
                            helperText={this.state.timeStartError}
                            error={this.state.timeStartError.length > 0}
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
                            value={this.state.timeEnd} 
                            onChange={event => this.handleChange(event)}
                            helperText={this.state.timeEndError}
                            error={this.state.timeEndError.length > 0}
                            fullWidth
                            InputLabelProps={{
                                shrink: true,
                            }}
                            inputProps={{
                                step: 300,
                            }}
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
                            helperText={this.state.eventImageError}
                            error={this.state.eventImageError.length > 0}
                        />
                    </Grid>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={this.handleNext}
                        className={classes.button}
                    >
                        Create
                    </Button>
                </Grid>
            </React.Fragment>
        );
    }
}

CreateEvent.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(CreateEvent);

