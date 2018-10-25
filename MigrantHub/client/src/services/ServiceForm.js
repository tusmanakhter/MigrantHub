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
import MaskedInput from 'react-text-mask';
import Header from '../components/Header/Header';
import axios from 'axios';

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
});
class ServiceForm extends Component {

    constructor(props) {
        super(props);
        this.state = {
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
            serviceDescription: '',
            serviceSummary: '',
            serviceTitle: '',
            addLocation: false,
            addServiceDate: false,
            serviceHoursCount: 0,

            // Server response
            messageFromServer: '',
        };
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

    handleSubmit = () => {
        this.createService(this);
    };

    handleEditSingleObject = (name, fieldName) => (event) => {
        let obj = {};
        obj[name] = { ...this.state[name] };
        let value = event.target.value;
        obj[name][fieldName] = value;
        this.setState({ [name]: obj[name] });
    };

    createService(e) {

        let location = {};
        if(this.state.addLocation) {
            location = e.state.location
        }
        let serviceDate = {};
        if(this.state.addServiceDate) {
            serviceDate = e.state.serviceDate
        }

        axios.post('/services/create',qs.stringify({
            location: location,
            serviceHours: e.state.serviceHours,
            serviceDate: serviceDate,
            serviceTitle: e.state.serviceTitle,
            serviceDescription: e.state.serviceDescription,
            serviceSummary: e.state.serviceSummary,
        })).then(response => {

            console.log(response.status);

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
                <Header appName='Migrant Hub' />
                {this.state.messageFromServer.split('\n').map((item, key) => {
                    return <span key={key}>{item}<br/></span>
                })}
                <Typography variant="title" gutterBottom>
                    Create Service Form
                </Typography>
                <Grid container spacing={24}>
                    <Grid item xs={12}>
                        <TextField
                            id="serviceTitle"
                            name="serviceTitle"
                            label="Service Title"
                            value={this.serviceTitle}
                            onChange={event => this.handleChange(event)}
                            fullWidth
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            id="serviceSummary"
                            name="serviceSummary"
                            label="Service Summary"
                            value={this.serviceSummary}
                            onChange={event => this.handleChange(event)}
                            fullWidth
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            id="serviceDescription"
                            name="serviceDescription"
                            label="Service Description"
                            value={this.serviceDescription}
                            onChange={event => this.handleChange(event)}
                            fullWidth
                            multiline={true}
                            rows={12}
                        />
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
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={this.handleSubmit}
                        className={classes.button}
                    >
                        Create
                    </Button>
                </Grid>
            </React.Fragment>
        );
    }
}

ServiceForm.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ServiceForm);
