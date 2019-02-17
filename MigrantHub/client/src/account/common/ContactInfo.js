import React, { Component } from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import validator from 'validator';
import FirstName from 'components/fields/contact/FirstName';
import LastName from 'components/fields/contact/LastName';
import Address from 'components/fields/contact/Address';
import Apartment from 'components/fields/contact/Apartment';
import City from 'components/fields/contact/City';
import Province from 'components/fields/contact/Province';
import PostalCode from 'components/fields/contact/PostalCode';
import PhoneNumber from 'components/fields/contact/PhoneNumber';
import { injectIntl, intlShape, FormattedMessage } from 'react-intl';

const styles = ({});

class ContactInfo extends Component {
  state = {
    firstNameError: '',
    lastNameError: '',
    addressError: '',
    apartmentError: '',
    cityError: '',
    provinceError: '',
    postalCodeError: '',
    phoneNumberError: '',
  }

  validate = () => {
    const {
      firstName, lastName, city, postalCode, phoneNumber, intl,
    } = this.props;
    let isError = false;
    const errors = {
      firstNameError: '',
      lastNameError: '',
      apartmentError: '',
      cityError: '',
      postalCodeError: '',
      phoneNumberError: '',
    };

    if (validator.isEmpty(firstName)) {
      errors.firstNameError = `${intl.formatMessage({ id: 'contact.firstname' })}  ${intl.formatMessage({ id: 'isrequired' })}`;
      isError = true;
    } else if (!validator.isAlpha(firstName)) {
      errors.firstNameError = `${intl.formatMessage({ id: 'contact.firstname' })}  ${intl.formatMessage({ id: 'notvalid' })}`;
      isError = true;
    }

    if (validator.isEmpty(lastName)) {
      errors.lastNameError = `${intl.formatMessage({ id: 'contact.lastname' })}  ${intl.formatMessage({ id: 'isrequired' })}`;
      isError = true;
    } else if (!validator.isAlpha(lastName)) {
      errors.lastNameError = `${intl.formatMessage({ id: 'contact.lastname' })}  ${intl.formatMessage({ id: 'notvalid' })}`;
      isError = true;
    }

    if ((city !== '' && city !== undefined) && !validator.isAlpha(city)) {
      errors.cityError = `${intl.formatMessage({ id: 'contact.city' })}  ${intl.formatMessage({ id: 'notvalid' })}`;
      isError = true;
    }

    if ((postalCode !== '' && postalCode !== undefined) && !validator.isLength(postalCode, { min: 7, max: 7 })) {
      errors.postalCodeError = `${intl.formatMessage({ id: 'contact.postal' })}  ${intl.formatMessage({ id: 'notvalid' })}`;
      isError = true;
    }

    if (phoneNumber !== '' && phoneNumber !== undefined) {
      if (validator.isEmpty(phoneNumber)) {
        errors.phoneNumberError = `${intl.formatMessage({ id: 'contact.phone' })}  ${intl.formatMessage({ id: 'required' })}`;
        isError = true;
      } else if (!validator.isLength(phoneNumber, { min: 14, max: 14 })) {
        errors.phoneNumberError = `${intl.formatMessage({ id: 'contact.phone' })}  ${intl.formatMessage({ id: 'notvalid' })}`;
        isError = true;
      }
    }

    this.setState(prevState => ({
      ...prevState,
      ...errors,
    }));

    return isError;
  }

  render() {
    const {
      firstNameError, lastNameError, addressError, apartmentError, cityError,
      provinceError, postalCodeError, phoneNumberError,
    } = this.state;

    const {
      handleChange, firstName, lastName, address, apartment, city, province,
      postalCode, phoneNumber,
    } = this.props;

    return (
      <React.Fragment>
        <Typography variant="h6" gutterBottom>
          <FormattedMessage id="signup.contactinfo" />
        </Typography>
        <Grid container spacing={24}>
          <Grid item xs={12} sm={6}>
            <FirstName
              firstName={firstName}
              firstNameError={firstNameError}
              handleChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <LastName
              lastName={lastName}
              lastNameError={lastNameError}
              handleChange={handleChange}
            />
          </Grid>
          <Grid item xs={12}>
            <Address
              address={address}
              addressError={addressError}
              handleChange={handleChange}
            />
          </Grid>
          <Grid item xs={12}>
            <Apartment
              apartment={apartment}
              apartmentError={apartmentError}
              handleChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <City
              city={city}
              cityError={cityError}
              handleChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Province
              province={province}
              provinceError={provinceError}
              handleChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <PostalCode
              postalCode={postalCode}
              postalCodeError={postalCodeError}
              handleChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <PhoneNumber
              phoneNumber={phoneNumber}
              phoneNumberError={phoneNumberError}
              handleChange={handleChange}
            />
          </Grid>
        </Grid>
      </React.Fragment>
    );
  }
}

ContactInfo.propTypes = {
  handleChange: PropTypes.func.isRequired,
  firstName: PropTypes.string.isRequired,
  lastName: PropTypes.string.isRequired,
  address: PropTypes.string.isRequired,
  apartment: PropTypes.string.isRequired,
  city: PropTypes.string.isRequired,
  province: PropTypes.string.isRequired,
  postalCode: PropTypes.string.isRequired,
  phoneNumber: PropTypes.string.isRequired,
  intl: intlShape.isRequired,
};

export default withStyles(styles)(injectIntl(ContactInfo, { withRef: true }));
