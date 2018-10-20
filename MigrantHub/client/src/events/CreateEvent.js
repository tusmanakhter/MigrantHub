import React, { Component } from 'react';
import PropTypes from 'prop-types';
import validator from 'validator';
import withStyles from '@material-ui/core/styles/withStyles';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Paper from '@material-ui/core/Paper';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

import axios from 'axios';
import { create } from 'jss';

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

class CreatEvent extends Component {
    constructor(props){
        super(props);
        this.child = React.createRef();
    }

    state = {
        creator: '',

        visibility: '',
        eventName: '',
        description: '',

        //Event Location 
        address: '',
        apartment: '',
        city: '',
        province: '',
        postalCode: '',
        phoneNumber: '',

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
        timeEnd: '',
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

        // DB response
        messageFromServer: ''
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
        } else if (!validator.isAlpha(this.state.eventName)) {
            errors.eventNameError = "Event name is not valid";
            isError = true
        }

        if (validator.isEmpty(this.state.description)) {
            errors.descriptionError = "Description is required";
            isError = true
        } else if (!validator.isAlpha(this.state.description)) {
            errors.descriptionError = "Description is not valid";
            isError = true
        } else if (!validator.isLength(this.state.description, {min:10})) {
            errors.descriptionError = "Description must be at least 10 characters";
            isError = true
        }

        if (validator.isEmpty(this.state.address)) {
            errors.addressError = "Address is required";
            isError = true
        }
      
        if (validator.isEmpty(this.state.city)) {
            errors.cityError = "City is required";
            isError = true
        } else if (!validator.isAlpha(this.state.city)) {
            errors.cityError = "This is not a valid city"
            isError = true
        }
      
        if (validator.isEmpty(this.state.province)) {
            errors.provinceError = "Province is required";
            isError = true
        }
      
        if (validator.isEmpty(this.state.postalCode)) {
            errors.postalCodeError = "Postal code is required";
            isError = true
        } else if (!validator.isLength(this.state.postalCode, {min:7, max:7})) {
            errors.postalCodeError = "Postal code is invalid";
            isError = true
        }
      
        if (validator.isEmpty(this.state.phoneNumber)) {
            errors.phoneNumberError = "Phone number is required";
            isError = true
        } else if (!validator.isLength(this.state.phoneNumber, {min:14, max:14})) {
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

        let error = this.validate();
        if (!error) {
          this.createEvent(this);
        }
    };

    // Send event data in post body to add to mongodb
    createEvent(e) {

    }

    render() {

        return (
            <div>
                <h3>Event Information</h3>
                <form>
                    <label>Visibility: </label>
                    <select 
                    id="visibility"
                    name="visibility" 
                    label="Visibility"
                    value={this.state.visibility} 
                    onChange={event => this.handleChange(event)}>
                        {visibilities.map(option => (
                        <option key={option.value} value={option.value}>
                            {option.label}
                        </option>
                        ))}
                    </select>
                    <br></br>
                    <br></br>

                    <label>Event Name: </label>
                    <input 
                    type="text"
                    id="eventName" 
                    name="eventName" 
                    label="Name"
                    value={this.state.eventName} 
                    onChange={event => this.handleChange(event)} 
                    error={this.state.eventNameError.length > 0}/>
                    <label style={{color: 'red'}}>  {this.state.eventNameError}</label>
                    <br></br>
                    <br></br>

                    <label>Description: </label>
                    <textarea 
                    id="description" 
                    name="description" 
                    label="Description" 
                    value={this.state.description}
                    onChange={event => this.handleChange(event)} 
                    error={this.state.descriptionError.length > 0}/>
                    <label style={{color: 'red'}}>  {this.state.descriptionError}</label>
                    <br></br>
                    <br></br>

                    <label>Address: </label>
                    <input 
                    type="text" 
                    id="address" 
                    name="address" 
                    label="Address" 
                    value={this.state.address} 
                    placeholder={this.state.addressError} 
                    onChange={event => this.handleChange(event)}
                    error={this.state.addressError.length > 0}/>
                    <label style={{color: 'red'}}>  {this.state.addressError}</label>
                    <br></br>
                    <br></br>

                    <label>Apartment: </label>
                    <input 
                    type="text" 
                    id="apartment" 
                    name="apartment" 
                    label="Apartment" 
                    value={this.state.apartment} 
                    placeholder={this.state.apartmentError} 
                    onChange={event => this.handleChange(event)}
                    error={this.state.apartmentError.length > 0}/>
                    <label style={{color: 'red'}}>  {this.state.apartmentError}</label>
                    <br></br>
                    <br></br>

                    <label>City: </label>
                    id="city" 
                    name="city" 
                    label="City" 
                    value={this.state.city} 
                    placeholder={this.state.cityError} 
                    onChange={event => this.handleChange(event)}
                    error={this.state.cityError.length > 0}/>
                    <label style={{color: 'red'}}>  {this.state.cityError}</label>
                    <br></br>
                    <br></br>

                    <label>Province: </label>
                    <select 
                    id="province" 
                    name="province" 
                    label="Province"
                    value={this.state.province} 
                    placeholder={this.state.provinceError} 
                    onChange={event => this.handleChange(event)} 
                    error={this.state.provinceError.length > 0}>
                        {provinces.map(option => (
                        <option key={option.value} value={option.value}>
                            {option.label}
                        </option>
                        ))}
                    </select>
                    <label style={{color: 'red'}}>  {this.state.provinceError}</label>
                    <br></br>
                    <br></br>

                    <label>Postal Code: </label>
                    <input 
                    type="text" 
                    id="postalCode" 
                    name="postalCode" 
                    label="Postal Code" 
                    value={this.state.postalCode} 
                    placeholder={this.state.postalCodeError}
                    pattern="[/[a-zA-Z]/, /\d/, /[a-zA-Z]/, ' ', /\d/, /[a-zA-Z]/, /\d/]" 
                    onChange={event => this.handleChange(event)}
                    error={this.state.postalCodeError.length > 0}/>
                    <label style={{color: 'red'}}>  {this.state.postalCodeError}</label>
                    <br></br>
                    <br></br>
                    
                    <label>Phone Number: </label>
                    <input 
                    type="text" 
                    id="phoneNumber" 
                    name="phoneNumber" 
                    label="Phone Number" 
                    value={this.state.phoneNumber} 
                    placeholder={this.state.phoneNumberError}
                    pattern="['(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]" 
                    onChange={event => this.handleChange(event)}
                    error={this.state.phoneNumberError.length > 0}/>
                    <label style={{color: 'red'}}>  {this.state.phoneNumberError}</label>
                    <br></br>
                    <br></br>

                    <label>Start Date: </label>
                    <input 
                    type="date" 
                    id="dateStart" 
                    name="dateStart" 
                    label="Start Date"
                    value={this.state.dateStart} 
                    placeholder={this.state.dateStartError} 
                    onChange={event => this.handleChange(event)}
                    error={this.state.dateStart.length > 0}/>
                    <label style={{color: 'red'}}>  {this.state.dateStartError}</label>
                    <br></br>
                    <br></br>

                    <label>End Date: </label>
                    <input 
                    type="date" 
                    id="dateEnd" 
                    name="dateEnd" 
                    label="End Date"
                    value={this.state.dateEnd} 
                    placeholder={this.state.dateEndError} 
                    onChange={event => this.handleChange(event)}
                    error={this.state.dateEnd.length > 0}/>
                    <label style={{color: 'red'}}>  {this.state.dateEndError}</label>
                    <br></br>
                    <br></br>

                    <label>Start Time: </label>
                    <input 
                    type="time" 
                    id="timeStart" 
                    name="timeStart" 
                    label="Start Time"
                    value={this.state.timeStart} 
                    placeholder={this.state.timeStartError}
                    onChange={event => this.handleChange(event)}
                    error={this.state.timeStart.length > 0}/>
                    <label style={{color: 'red'}}>  {this.state.timeStartError}</label>
                    <br></br>
                    <br></br>

                    <label>End Time: </label>
                    <input 
                    type="time" 
                    id="timeEnd" 
                    name="timeEnd" 
                    label="End Time"
                    value={this.state.timeEnd} 
                    placeholder={this.state.timeEndError} 
                    onChange={event => this.handleChange(event)}
                    error={this.state.timeEnd.length > 0}/>
                    <label style={{color: 'red'}}>  {this.state.timeEndError}</label>
                    <br></br>
                    <br></br>

                    <label>Repeat: </label>                   
                    <select 
                    id="repeat" 
                    name="repeat" 
                    label="Repeat"
                    value={this.state.repeat} 
                    placeholder={this.state.repeatError} 
                    onChange={event => this.handleChange(event)} fullWidth>
                        {repeats.map(option => (
                        <option key={option.value} value={option.value}>
                            {option.label}
                        </option>
                        ))}
                    <br></br>
                    <br></br>

                    <label>Repeat: </label>                   
                    <select 
                    id="repeat" 
                    name="repeat" 
                    label="Repeat"
                    value={this.state.repeat} 
                    placeholder={this.state.repeatError} 
                    onChange={event => this.handleChange(event)} fullWidth>
                        {repeats.map(option => (
                        <option key={option.value} value={option.value}>
                            {option.label}
                        </option>
                        ))}
                    </select>
                    <br></br>
                    <br></br>

                    <input 
                    type="button" 
                    value="Create" 
                    onClick={this.handleNext}/>
                    <br></br>
                    <br></br>
                </form>
            </div>
        );
    }
}

CreatEvent.propTypes = {
    classes: PropTypes.object.isRequired,
  };

export default (CreatEvent);

