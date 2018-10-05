import React from 'react';
import FormComponent from '../FormComponent';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import {withFormik, Form, Field} from 'formik';
import * as Yup from 'yup';
import {render} from 'react-dom';

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

const ContactInfoUI = ({
                           values,
                           errors,
                           touched,
                           handleChange,
                           handleBlur
                       }) => (
      <React.Fragment>
      <Typography variant="title" gutterBottom>
        Contact Information
      </Typography>
      <Grid container spacing={24}>
        <Grid item xs={12} sm={6}>
            <TextField
              id="firstName"
              name="firstName"
              label="First Name"
              value={values.firstName}
              onChange={handleChange}
              onBlur={handleBlur}
              fullWidth
            />
            {touched.firstName && errors.firstName && <div>{errors.firstName}</div>}
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            id="lastName" 
            name="lastName"
            label="Last Name"
            value={values.lastName}
            onChange={handleChange}
            onBlur={handleBlur}
            fullWidth
          />
          {touched.lastName && errors.lastName && <div>{errors.lastName}</div>}

        </Grid>
        <Grid item xs={12}>
          <TextField
            id="address" 
            name="address"
            label="Street Address"
            placeholder="Street and number"
            value={values.address}
            onChange={handleChange}
            onBlur={handleBlur}
            fullWidth
          />
          {touched.address && errors.address && <div>{errors.address}</div>}
        </Grid>
        <Grid item xs={12}>
          <TextField
            id="apartment" 
            name="apartment"
            label="Apartment"
            placeholder="Apartment, suite, unit, building, floor, etc."
            value={values.apartment}
            onChange={handleChange}
            onBlur={handleBlur}
            fullWidth
          />
          {touched.apartment && errors.apartment && <div>{errors.apartment}</div>}
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            id="city" 
            name="city"
            label="City"
            value={values.city}
            onChange={handleChange}
            onBlur={handleBlur}
            fullWidth
          />
          {touched.city && errors.city && <div>{errors.city}</div>}
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            id="province"
            name="province"
            select
            label="Province/Territory"
            value={values.province}
            onChange={handleChange}
            onBlur={handleBlur}
            fullWidth
            helperText="Please select a province/territory"
          >
            {provinces.map(option => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
            {touched.province && errors.province && <div>{errors.province}</div>}

        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            id="postalCode" 
            name="postalCode"
            label="Postal Code"
            value={values.postalCode}
            onChange={handleChange}
            onBlur={handleBlur}
            fullWidth
          />
            {touched.postalCode && errors.postalCode && <div>{errors.postalCode}</div>}
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            id="phoneNumber"
            name="phoneNumber"
            label="Phone Number"
            value={values.phoneNumber}
            onChange={handleChange}
            onBlur={handleBlur}
            fullWidth
          />
            {touched.phoneNumber && errors.phoneNumber && <div>{errors.phoneNumber}</div>}
        </Grid>
      </Grid>
      </React.Fragment>
);


const ContactInfo = withFormik({
    mapPropsToValues({}){
        return{
        }
    },
    validationSchema: Yup.object().shape({
        firstName: Yup.string().required('First Name is required'),
        lastName: Yup.string().required('Last Name is required'),
        address: Yup.string().required('Address is required'),
        apartment: Yup.string().required('Apartment is required'),
        city: Yup.string().required('City is required'),
        province: Yup.string().required('Province is required'),
        postalCode: Yup.string().matches(/[A-Za-z][0-9][A-Za-z] [0-9][A-Za-z][0-9]/, 'Format: A1B 2C3').required('Postal Code is required'),
        phoneNumber:Yup.string().matches(/\d{3}[\\-]\\d{3}[\\-]\\d{4}/, 'Format: 123-456-7890').required('Phone Number is required'),

    }),
    handleSubmit(values){
        // Perform Validation
    },

})(ContactInfoUI)

export default ContactInfo;