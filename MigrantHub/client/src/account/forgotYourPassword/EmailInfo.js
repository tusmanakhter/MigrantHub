import React, { Component } from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import validator from 'validator';
import { injectIntl, intlShape, FormattedMessage } from 'react-intl';

const styles = ({});

class EmailInfo extends Component {
    state = {
      emailError: '',
    };

    validate = () => {
      const { email, intl } = this.props;

      let isError = false;
      const errors = {
        emailError: '',
      };

      if (validator.isEmpty(email)) {
        errors.emailError = `${intl.formatMessage({ id: 'email' })}  ${intl.formatMessage({ id: 'isrequired' })}`;
        isError = true;
      } else if (!validator.isEmail(email)) {
        errors.emailError = `${intl.formatMessage({ id: 'email' })}  ${intl.formatMessage({ id: 'notvalid' })}`;
        isError = true;
      }

      this.setState(prevState => ({
        ...prevState,
        ...errors,
      }));

      return isError;
    };

    render() {
      const { email, handleChange } = this.props;
      const { emailError } = this.state;

      return (
        <React.Fragment>
          <Typography variant="h6" gutterBottom>
            <FormattedMessage id="signup.accountinfo" />
          </Typography>
          <Grid container spacing={24}>
            <Grid item xs={12}>
              <TextField
                id="email"
                name="email"
                label={<FormattedMessage id="email" />}
                value={email}
                onChange={event => handleChange(event)}
                fullWidth
                helperText={emailError}
                error={emailError.length > 0}
              />
            </Grid>
          </Grid>
        </React.Fragment>
      );
    }
}

EmailInfo.propTypes = {
  email: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired,
  intl: intlShape.isRequired,
};

export default withStyles(styles)(injectIntl(EmailInfo, { withRef: true }));
