import React from 'react';
import FormComponent from './FormComponent';
import TextField from '@material-ui/core/TextField';
import Input from '@material-ui/core/Input'
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import FormControl from '@material-ui/core/FormControl';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { withFormik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { render } from 'react-dom';

const AccountInfoUI = ({
    values,
    errors,
    touched,
    handleChange,
    handleBlur
}) => (
        <React.Fragment>
            <Typography variant="title" gutterBottom>
                Account Information
        </Typography>
            <Grid container spacing={24}>
                <Grid item xs={12}>
                    <div>
                        <TextField
                            id="email"
                            name="email"
                            label="Email"
                            value={values.email}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            fullWidth
                            margin="normal"
                        />
                        {touched.email && errors.email && <div>{errors.email}</div>}
                    </div>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <FormControl margin="normal" fullWidth>
                        <InputLabel htmlFor="password">Password</InputLabel>
                        <Input
                            name="password"
                            type={values.showPassword ? 'text' : 'password'}
                            value={values.password}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            endAdornment={
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label="Toggle password visibility"
                                        onClick={() => { values.showPassword = !values.showPassword }}
                                    >
                                        {values.showPassword ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                </InputAdornment>
                            }
                        />
                        {() => { console.log('tuu') }}
                        {touched.password && errors.password && <div>{errors.password}</div>}
                    </FormControl>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <FormControl margin="normal" fullWidth>
                        <InputLabel htmlFor="password">Confirm Password</InputLabel>
                        <Input
                            name="confirmPassword"
                            type={values.showPassword ? 'text' : 'password'}
                            value={values.confirmPassword}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            endAdornment={
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label="Toggle password visibility"
                                        onClick={() => { values.showPassword = !values.showPassword }}
                                    >
                                        {values.showPassword ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                </InputAdornment>
                            }
                        />
                        {touched.confirmPassword && errors.confirmPassword && <div>{errors.confirmPassword}</div>}
                    </FormControl>
                </Grid>
            </Grid>
        </React.Fragment>
    );

const AccountInfo = withFormik({
    mapPropsToValues({ showPassword }) {
        return {
            showPassword: showPassword || true,
        }
    },
    validationSchema: Yup.object().shape({
        email: Yup.string().email('Email not valid').required('Email is required'),
        password: Yup.string().min(9, 'Password must be 9 characters or longer.').required('Password is required'),
        confirmPassword: Yup.string().min(9, 'Password must be 9 characters or longer.').oneOf([Yup.ref('password')], 'Password does not match').required('Confirm Password is Required'),
    }),
    handleSubmit(values) {
        // Perform Validation
    },

})(AccountInfoUI)

export default AccountInfo;