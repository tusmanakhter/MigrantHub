import React, { Component } from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import validator from 'validator';
import { injectIntl, intlShape, FormattedMessage } from 'react-intl';

const styles = ({});

class VerificationCode extends Component {
    state = {
        verificationCodeError: '',
    };

    validate = () => {
        const { verificationCode, intl } = this.props;

        let isError = false;
        const errors = {
            verificationCodeError: '',
        };

        if (validator.isEmpty(verificationCode)) {
            errors.verificationCodeError = 'Verification code is required';
            isError = true;
        }

        this.setState(prevState => ({
            ...prevState,
            ...errors,
        }));

        return isError;
    };

    render() {
        const { verificationCode, handleChange } = this.props;
        const { verificationCodeError } = this.state;

        return (
            <React.Fragment>
                <Typography variant="title" gutterBottom>
                    <FormattedMessage id="forgotpassword.validationcode" />
                </Typography>
                <Grid container spacing={24}>
                    <Grid item xs={12}>
                        <Typography variant="subheading" alignLeft color='secondary'>
                            <FormattedMessage id="forgotpassword.validationcode.info" />
                        </Typography>
                        <TextField
                            id="verificationCode"
                            name="verificationCode"
                            label={<FormattedMessage id="forgotpassword.validationcode" />}
                            value={verificationCode}
                            onChange={event => handleChange(event)}
                            fullWidth
                            helperText={verificationCodeError}
                            error={verificationCodeError.length > 0}
                        />
                    </Grid>
                </Grid>
            </React.Fragment>
        );
    }
}

VerificationCode.propTypes = {
    verificationCode: PropTypes.string.isRequired,
    handleChange: PropTypes.func.isRequired,
    intl: intlShape.isRequired,
};

export default withStyles(styles)(injectIntl(VerificationCode, { withRef: true }));
