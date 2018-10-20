import React, { Component } from 'react';
import PropTypes from 'prop-types';
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

const repeatble = [
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
        timeEnd: '',
        repeatable: '', //No, Daily, Weekly, Monthly, Annualy

        // DB response
        messageFromServer: ''
    }

    handleChange = event => {
        this.setState({
          [event.target.name]: event.target.value
        })
      }

    render() {

        const { classes } = this.props;

        const handleChange = this.props.handleChange;
        const visibility = this.props.visibility;
        const eventName = this.props.firstName;
        const description = this.props.lastName;
        const address = this.props.address;
        const apartment = this.props.apartment;
        const city = this.props.city;
        const province = this.props.province;
        const postalCode = this.props.postalCode;
        const phoneNumber = this.props.phoneNumber;
        const dateStart = this.props.dateStart;
        const dateEnd = this.props.dateEnd;
        const timeStart = this.props.timeStart;
        const timeEnd = this.props.timeEnd;
        const repeatable = this.props.repeatable;

        return (
            //TODOS:
            // - Handle Errors
            // - Validate input data
            // - Handle onChange
            <div>
                <h3>Event Information</h3>
                <form method="POST" action="">

                    <label>Visibility: </label>
                    <select id="visibility" name="visibility" label="Visibility"
                    value={this.state.visibility} placeholder={this.state.visibilityError} 
                    onChange={event => this.handleChange(event)} fullWidth>
                        {visibilities.map(option => (
                        <option key={option.value} value={option.value}>
                            {option.label}
                        </option>
                        ))}
                    </select>
                    <br></br>
                    <br></br>

                    <label>Event Name: </label>
                    <input type="text" id="eventName" name="eventName" label="Name"
                    value={this.state.eventName} placeholder={this.state.eventNameError} 
                    onChange={event => this.handleChange(event)} fullWidth />
                    <br></br>
                    <br></br>

                    <label>Description: </label>
                    <textarea id="description" name="description" label="Description" 
                    value={this.state.description} placeholder={this.state.descriptionError} 
                    onChange={event => this.handleChange(event)} fullWidth />
                    <br></br>
                    <br></br>

                    <label>Address: </label>
                    <input type="text" id="address" name="address" label="Address" 
                    value={this.state.address} placeholder={this.state.addressError} 
                    onChange={event => this.handleChange(event)}/>
                    <br></br>
                    <br></br>

                    <label>Apartment: </label>
                    <input type="text" id="apartment" name="apartment" label="Apartment" 
                    value={this.state.apartment} placeholder={this.state.apartmentError} 
                    onChange={event => this.handleChange(event)}/>
                    <br></br>
                    <br></br>

                    <label>City: </label>
                    <input type="text" id="city" name="city" label="City" 
                    value={this.state.city} placeholder={this.state.cityError} 
                    onChange={event => this.handleChange(event)}/>
                    <br></br>
                    <br></br>

                    <label>Province: </label>
                    <select id="province" name="province" label="Province"
                    value={this.state.province} placeholder={this.state.provinceError} 
                    onChange={event => this.handleChange(event)} fullWidth>
                        {provinces.map(option => (
                        <option key={option.value} value={option.value}>
                            {option.label}
                        </option>
                        ))}
                    </select>
                    <br></br>
                    <br></br>

                    <label>Postal Code: </label>
                    <input type="text" id="postalCode" name="postalCode" label="Postal Code" 
                    value={this.state.postalCode} placeholder={this.state.postalCodeError}
                    pattern="[/[a-zA-Z]/, /\d/, /[a-zA-Z]/, ' ', /\d/, /[a-zA-Z]/, /\d/]" 
                    onChange={event => this.handleChange(event)}/>
                    <br></br>
                    <br></br>
                    
                    <label>Phone Number: </label>
                    <input type="text" id="phoneNumber" name="phoneNumber" label="Phone Number" 
                    value={this.state.phoneNumber} placeholder={this.state.phoneNumberError}
                    pattern="['(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]" 
                    onChange={event => this.handleChange(event)}/>
                    <br></br>
                    <br></br>

                    <label>Start Date: </label>
                    <input type="date" id="dateStart" name="dateStart" label="Start Date"
                    value={this.state.dateStart} placeholder={this.state.dateStartError} 
                    onChange={event => this.handleChange(event)} />
                    <br></br>
                    <br></br>

                    <label>End Date: </label>
                    <input type="date" id="dateEnd" name="dateEnd" label="End Date"
                    value={this.state.dateEnd} placeholder={this.state.dateEndError} 
                    onChange={event => this.handleChange(event)} />
                    <br></br>
                    <br></br>

                    <label>Start Time: </label>
                    <input type="time" id="timeStart" name="timeStart" label="Start Time"
                    value={this.state.timeStart} placeholder={this.state.timeStartError}
                    onChange={event => this.handleChange(event)} />
                    <br></br>
                    <br></br>

                    <label>End Time: </label>
                    <input type="time" id="timeEnd" name="timeEnd" label="End Time"
                    value={this.state.timeEnd} placeholder={this.state.timeEndError} 
                    onChange={event => this.handleChange(event)}/>
                    <br></br>
                    <br></br>

                    <label>Repeatable: </label>                   
                    <select id="repeatable" name="repeatable" label="Repeatable"
                    value={this.state.repeatable} placeholder={this.state.repeatableError} 
                    onChange={event => this.handleChange(event)} fullWidth>
                        <option value="no">No</option>
                        <option value="daily">Daily</option>
                    </select>
                    <br></br>
                    <br></br>

                    <input type="submit" value="Create"/>
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