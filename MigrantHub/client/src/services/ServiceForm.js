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
import validator from 'validator';
import MaskedInput from 'react-text-mask';
import Header from '../components/Header/Header';
import axios from 'axios';
import { Redirect } from 'react-router-dom'

var FormData = require('form-data');
var qs = require('qs');

const dayOfTheWeek = [
    { value: 'monday', label: 'Monday' },
    { value: 'tuesday', label: 'Tuesday' },
    { value: 'wednesday', label: 'Wednesday' },
    { value: 'thursday', label: 'Thursday' },
    { value: 'friday', label: 'Friday' },
    { value: 'saturday', label: 'Saturday' },
    { value: 'sunday', label: 'Sunday' }
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

const serviceHoursObject = { serviceDay: '', startTime: '', endTime: ''};

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
    paper: {
        width: "100%",
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

    }
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
            serviceHours: [],
            serviceDate: {
                startDate: '',
                endDate: '',
            },
            location: {
                address : '',
                apartment : '',
                city : '',
                province : '',
                postalCode : '',
                phoneNumber : '',
            },
            serviceImage: null,
            serviceImageName: '',
            serviceImagePath: '',
            tempServiceImagePath: '',
            titleError: '',
            serviceDescription: '',
            serviceSummary: '',
            serviceTitle: '',
            addLocation: false,
            addServiceDate: false,
            serviceHoursCount: 0,
            dataRetrieved: false,

            // Server response
            messageFromServer: '',
            redirectToAllServices : false,
        };
        if(this.props.location.state) {
            this.getData = this.getData.bind(this);
        }
    }

    componentDidMount() {
        if(this.props.location.state) {
            this.getData(this);
        }
    }

    componentWillReceiveProps(nextProps) {
        if(this.props.location.state) {
            this.getData(this);
        }
    }

    handleAddObject = (name, object) => {
        this.state.serviceHoursCount+=1;
        this.setState({
            [name]: this.state[name].concat([object]),
        });
    }

    handleRemoveObject = (name, index) => {
        this.state.serviceHoursCount-=1;
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

    handleChange = event => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    handleAddLocation = () => {
        this.setState({
            addLocation: !this.state.addLocation,
        });
    }

    handleAddServiceDate = () => {
        this.setState({
            addServiceDate: !this.state.addServiceDate,
        });
    }

    handleUploadImage = event => {

        if(this.state.tempServiceImagePath !== '' ){
            URL.revokeObjectURL(this.state.tempServiceImagePath)
        }

        if(event.target.files[0] !== undefined) {
            this.setState({
                serviceImage: event.target.files[0],
                serviceImageName: event.target.files[0].name,
                tempServiceImagePath: window.URL.createObjectURL(event.target.files[0]),
            });
        } else{
            this.setState({
                serviceImage: null,
                serviceImageName: '',
                tempServiceImagePath: '',
            });
        }
    }

    handleSubmit = () => {
        let error = this.validate();
        if (!error) {
            this.createService(this);
        }
    };

    handleUpdate = () => {
        let error = this.validate();
        if (!error) {
            this.updateService(this);
        }
    };

    handleEditSingleObject = (name, fieldName) => (event) => {
        let obj = {};
        obj[name] = { ...this.state[name] };
        let value = event.target.value;
        obj[name][fieldName] = value;
        this.setState({ [name]: obj[name] });
    };

    renderRedirectToAllServices = () => {
        if (this.state.redirectToAllServices) {
            return <Redirect to='/services' />
        }
    }

    getData(event){
        if (!this.state.dataRetrieved) {
            let serviceId = '';
            if (this.props.location.state) {
                event.setState({
                    editMode: this.props.location.state.editMode,
                    serviceId: this.props.location.state.serviceId,
                });
                serviceId = this.props.location.state.serviceId;

                axios.get('/services/get/', {
                    params: {
                        _id: serviceId
                    }
                }).then(function (response) {
                    let parsedObj = qs.parse(qs.stringify(response.data));
                    let locationExists = false;
                    let serviceDateExists = false;
                    let tempServiceHours = [];
                    let serviceDate = {
                        startDate: '',
                        endDate: '',
                    };
                    let location = {
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
                        location = parsedObj.location;
                    }
                    if (parsedObj.serviceDate !== undefined) {
                        serviceDateExists = true;
                        serviceDate = {
                            startDate: parsedObj.serviceDate.startDate.toString().substring(0, 10),
                            endDate: parsedObj.serviceDate.endDate.toString().substring(0, 10),
                        }
                    }

                    let imagePath = parsedObj.serviceImagePath.split('/')
                    let imageName = imagePath[imagePath.length-1];

                    event.setState({
                        serviceTitle: parsedObj.serviceTitle,
                        serviceSummary: parsedObj.serviceSummary,
                        serviceDescription: parsedObj.serviceDescription,
                        serviceDate: serviceDate,
                        location: location,
                        serviceHours: tempServiceHours,
                        addLocation: locationExists,
                        addServiceDate: serviceDateExists,
                        serviceImagePath: parsedObj.serviceImagePath,
                        tempServiceImagePath: parsedObj.serviceImagePath,
                        serviceImageName: imageName,
                        dataRetrieved: true,
                    });
                }).catch(error => {

                })
            }
        }
    }

    validate = () => {
        let isError = false;
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

        if (validator.isEmpty(this.state.serviceTitle)) {
            errors.serviceTitleError = "Title is required";
            isError = true
        }
        if (validator.isEmpty(this.state.serviceSummary)) {
            errors.serviceSummaryError = "Service summary is required";
            isError = true
        }
        if (validator.isEmpty(this.state.serviceDescription)) {
            errors.serviceDescriptionError = "Service description is required";
            isError = true
        }
        if(this.state.serviceImage !== null) {
            if (!validator.matches(this.state.serviceImageName, '.(\.jpg|\.jpeg|\.png)$')) {
                errors.serviceImageError = "Invalid image format. Should be either .jpg, .jpeg or .png";
                isError = true
            }
        }

        if(this.state.addServiceDate) {
            let date = new Date();
            let todaysDate= (date.getFullYear()+'-'+(date.getMonth()+1)+'-'+date.getDate());
            if (validator.isEmpty(this.state.serviceDate.startDate)) {
                errors.startDateError = "Start date is required";
                isError = true
            } else if(validator.isBefore(this.state.serviceDate.startDate, todaysDate)) {
                errors.startDateError = "Start date is invalid";
                isError = true;
            }
            if (validator.isEmpty(this.state.serviceDate.endDate)) {
                errors.endDateError = "End date is required";
                isError = true
            } else if(validator.isBefore(this.state.serviceDate.endDate, this.state.serviceDate.startDate)) {
                errors.endDateError = "End date should be after start date";
                isError = true;
            }
        }

        if(this.state.addLocation) {
            if (validator.isEmpty(this.state.location.address)) {
                errors.addressError = "Address is required";
                isError = true
            }
            if (validator.isEmpty(this.state.location.city)) {
                errors.cityError = "City is required";
                isError = true
            } else if (!validator.isAlpha(this.state.location.city)) {
                errors.cityError = "This is not a valid city"
                isError = true
            }
            if (validator.isEmpty(this.state.location.province)) {
                errors.provinceError = "Province is required";
                isError = true
            }
            if (validator.isEmpty(this.state.location.postalCode)) {
                errors.postalCodeError = "Postal code is required";
                isError = true
            } else if (!validator.isLength(this.state.location.postalCode, {min: 7, max: 7})) {
                errors.postalCodeError = "Postal code is invalid";
                isError = true
            }
            if (validator.isEmpty(this.state.location.phoneNumber)) {
                errors.phoneNumberError = "Phone number is required";
                isError = true
            } else if (!validator.isLength(this.state.location.phoneNumber, {min: 14, max: 14})) {
                errors.phoneNumberError = "Phone number is invalid";
                isError = true
            }
        }

        this.state.serviceHours.forEach((member, index) => {
            errors.serviceHoursError = errors.serviceHoursError.concat([JSON.parse(JSON.stringify(serviceHoursObject))]);

            if (validator.isEmpty(member.startTime)) {
                errors.serviceHoursError[index].startTime = "Start time is required";
                isError = true
            }
            if (validator.isEmpty(member.endTime)) {
                errors.serviceHoursError[index].endTime = "End time is required";
                isError = true
            }else if (member.endTime <= member.startTime) {
                errors.serviceHoursError[index].endTime = "End time should be after start time";
                isError = true;
            }
            if (validator.isEmpty(member.serviceDay)) {
                errors.serviceHoursError[index].serviceDay = "Service day is required";
                isError = true
            }
        });

        this.setState({
            ...this.state,
            ...errors
        })

        return isError;
    }

    objectErrorText = (name, index, field) => {
        return this.state[name][index] === undefined ? "" : this.state[name][index][field]
    }

    createService(e) {

        let imageName = 'cameraDefault.png';
        if(e.state.serviceImageName !== ''){
            imageName = e.state.serviceImageName
        }
        let location = {};
        if(this.state.addLocation) {
            location = e.state.location
        }
        let serviceDate = {};
        if(this.state.addServiceDate) {
            serviceDate = e.state.serviceDate
        }
        let formData = new FormData();
        formData.append('serviceImage', e.state.serviceImage);
        formData.append('serviceDetails', qs.stringify({
            location: location,
            serviceHours: e.state.serviceHours,
            serviceDate: serviceDate,
            serviceTitle: e.state.serviceTitle,
            serviceDescription: e.state.serviceDescription,
            serviceSummary: e.state.serviceSummary,
            serviceImageName: imageName,
        }));

        axios.post('/services/create',formData,
            {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            }).then(response => {

            if (response.status === 200) {
                this.setState({
                    messageFromServer: response.data,
                    redirectToAllServices: true
                })
            }
        }).catch(error => {
            e.setState({
                messageFromServer: error.response.data
            });
        })
    }

    updateService(e) {
        let imageName = e.state.serviceImageName;
        let location = {};
        let serviceDate = {};

        if(e.state.serviceImageName = ''){
            imageName = 'cameraDefault.png';
        }else if(e.state.serviceImage !== null){
            imageName = e.state.serviceImage.name
        }

        if(this.state.addLocation) {
            location = e.state.location
        }

        if(this.state.addServiceDate) {
            serviceDate = e.state.serviceDate
        }

        let formData = new FormData();
        formData.append('serviceImage', e.state.serviceImage);
        formData.append('serviceDetails', qs.stringify({
            location: location,
            serviceHours: e.state.serviceHours,
            serviceDate: serviceDate,
            serviceTitle: e.state.serviceTitle,
            serviceDescription: e.state.serviceDescription,
            serviceSummary: e.state.serviceSummary,
            serviceImageName: imageName,
            _id: e.state.serviceId,
            serviceImagePath: e.state.serviceImagePath,
        }));
        axios.post('/services/update',formData,
            {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            }).then(response => {

            if (response.status === 200) {
                this.setState({
                    messageFromServer: response.data,
                    redirectToAllServices: true
                })
            }
        }).catch(error => {

            e.setState({
                messageFromServer: error.response.data
            });

        })
    }

    render() {
        const { classes } = this.props;

        return (
            <React.Fragment>
                <Header />
                {this.state.messageFromServer.split('\n').map((item, key) => {
                    return <span key={key}>{item}<br/></span>
                })}
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
                            value={this.state.serviceTitle}
                            onChange={event => this.handleChange(event)}
                            fullWidth
                            helperText={this.state.serviceTitleError}
                            error={this.state.serviceTitleError.length > 0}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            id="serviceSummary"
                            name="serviceSummary"
                            label="Service Summary"
                            value={this.state.serviceSummary}
                            onChange={event => this.handleChange(event)}
                            fullWidth
                            helperText={this.state.serviceSummaryError}
                            error={this.state.serviceSummaryError.length > 0}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            id="serviceDescription"
                            name="serviceDescription"
                            label="Service Description"
                            value={this.state.serviceDescription}
                            onChange={event => this.handleChange(event)}
                            fullWidth
                            multiline={true}
                            rows={12}
                            helperText={this.state.serviceDescriptionError}
                            error={this.state.serviceDescriptionError.length > 0}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <Grid container spacing={24}>
                            <Grid item xs={12}>
                                <img
                                    src={this.state.tempServiceImagePath}
                                    alt={this.state.tempServiceImagePath}
                                    className={classes.img}/>
                            </Grid>
                            <Grid item xs={12}>
                                <Typography variant="subheading" gutterBottom className={classes.row} align="left">
                                    Select image to upload (Optional) <br /><br />
                                </Typography>
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    id="serviceImage"
                                    type="file"
                                    onChange={event => this.handleUploadImage(event)}
                                    helperText={this.state.serviceImageError}
                                    error={this.state.serviceImageError.length > 0}
                                />
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography variant="subheading" gutterBottom className={classes.row} align="left">
                            Add Service date (Optional)
                        </Typography>
                        <Button variant="fab" mini color="primary"
                                aria-label="Add Service date"
                                onClick={event => this.handleAddServiceDate()}
                                className={classes.button}>
                            {this.state.addServiceDate ? <DeleteIcon /> : <AddIcon />}
                        </Button>
                    </Grid>

                    {this.state.addServiceDate == true && (
                        <Paper className={classes.paper}>
                            <Grid container spacing={24} item xs={6}>
                                <Grid item xs={6}>
                                    <TextField
                                        id="startDate"
                                        name="startDate"
                                        label="Start Date"
                                        type="date"
                                        value={this.state.serviceDate.startDate}
                                        className={classes.textField}
                                        onChange={this.handleEditSingleObject("serviceDate", "startDate")}
                                        fullWidth
                                        helperText={this.state.startDateError}
                                        error={this.state.startDateError.length > 0}
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
                                        value={this.state.serviceDate.endDate}
                                        className={classes.textField}
                                        onChange={this.handleEditSingleObject("serviceDate", "endDate")}
                                        fullWidth
                                        helperText={this.state.endDateError}
                                        error={this.state.endDateError.length > 0}
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
                        <Button variant="fab" mini color="primary"
                                aria-label="Add Location"
                                onClick={event => this.handleAddLocation()}
                                className={classes.button}>
                            {this.state.addLocation ? <DeleteIcon /> : <AddIcon />}
                        </Button>
                    </Grid>

                    {this.state.addLocation == true && (
                        <Paper className={classes.paper}>
                            <Grid item xs={6}>
                                <TextField
                                    id="address"
                                    name="address"
                                    label="Street Address"
                                    placeholder="Street and number"
                                    value={this.state.location.address}
                                    onChange={this.handleEditSingleObject("location", "address")}
                                    fullWidth
                                    helperText={this.state.addressError}
                                    error={this.state.addressError.length > 0}
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <TextField
                                    id="apartment"
                                    name="apartment"
                                    label="Apartment"
                                    placeholder="Apartment, suite, unit, building, floor, etc."
                                    value={this.state.location.apartment}
                                    onChange={this.handleEditSingleObject("location", "apartment")}
                                    fullWidth
                                    helperText={this.state.apartmentError}
                                    error={this.state.apartmentError.length > 0}
                                />
                            </Grid>
                            <Grid item xs={6} sm={3}>
                                <TextField
                                    id="city"
                                    name="city"
                                    label="City"
                                    value={this.state.location.city}
                                    onChange={this.handleEditSingleObject("location", "city")}
                                    fullWidth
                                    helperText={this.state.cityError}
                                    error={this.state.cityError.length > 0}
                                />
                            </Grid>
                            <Grid item xs={6} sm={3}>
                                <TextField
                                    id="province"
                                    name="province"
                                    select
                                    label="Province/Territory"
                                    value={this.state.location.province}
                                    className={classes.select}
                                    onChange={this.handleEditSingleObject("location", "province")}
                                    fullWidth
                                    helperText={this.state.provinceError}
                                    error={this.state.provinceError.length > 0}
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
                                    value={this.state.location.postalCode}
                                    onChange={this.handleEditSingleObject("location", "postalCode")}
                                    fullWidth
                                    InputProps={{
                                        inputComponent: PostalCodeMask,
                                    }}
                                    helperText={this.state.postalCodeError}
                                    error={this.state.postalCodeError.length > 0}
                                />
                            </Grid>
                            <Grid item xs={6} sm={3}>
                                <TextField
                                    id="phoneNumber"
                                    name="phoneNumber"
                                    label="Phone Number"
                                    value={this.state.location.phoneNumber}
                                    onChange={this.handleEditSingleObject("location", "phoneNumber")}
                                    fullWidth
                                    helperText={this.state.phoneNumberError}
                                    error={this.state.phoneNumberError.length > 0}
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
                        {this.state.serviceHoursCount < 7 && (

                            <Button variant="fab" mini color="secondary"
                                    aria-label="Add"
                                    onClick={event => this.handleAddObject("serviceHours", serviceHoursObject)}
                                    className={classes.button}>
                                <AddIcon />
                            </Button>
                        )}
                    </Grid>
                    {this.state.serviceHours.map((member, index) => (
                        <React.Fragment key={index}>
                            <Paper className={classes.paper}>
                                <Typography variant="subheading" align="left" gutterBottom>
                                </Typography>
                                <Grid justify="center" alignItems="center" container item xs>
                                    <Grid container spacing={24} item xs={11}>
                                        <Grid item xs={12} sm={4}>
                                            <TextField
                                                id="serviceDay"
                                                name="serviceDay"
                                                select
                                                label="ServiceDay"
                                                value={member.serviceDay}
                                                onChange={this.handleEditObject("serviceHours", index)}
                                                className={classes.select}
                                                helperText={this.objectErrorText("serviceHoursError", index, "serviceDay")}
                                                error={this.objectErrorText("serviceHoursError", index, "serviceDay").length > 0}
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
                                                onChange={this.handleEditObject("serviceHours", index)}
                                                helperText={this.objectErrorText("serviceHoursError", index, "startTime")}
                                                error={this.objectErrorText("serviceHoursError", index, "startTime").length > 0}
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
                                                onChange={this.handleEditObject("serviceHours", index)}
                                                helperText={this.objectErrorText("serviceHoursError", index, "endTime")}
                                                error={this.objectErrorText("serviceHoursError", index, "endTime").length > 0}
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
                                        <Button variant="fab" mini aria-label="Delete"
                                                onClick={(event) => this.handleRemoveObject("serviceHours", index, event)}
                                                className={classes.button}>
                                            <DeleteIcon />
                                        </Button>
                                    </Grid>
                                </Grid>
                            </Paper>
                        </React.Fragment>
                    ))}
                    {!this.state.editMode ? (
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={this.handleSubmit}
                            className={classes.button}
                        >
                            Create
                        </Button>
                    ) :(
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
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ServiceForm);
