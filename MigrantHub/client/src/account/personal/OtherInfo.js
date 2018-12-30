import React, { Component } from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import validator from 'validator';
import SettlingLocation from '../../components/fields/other/SettlingLocation';
import SettlingDuration from '../../components/fields/other/SettlingDuration';
import JoiningReason from '../../components/fields/other/JoiningReason';

const styles = ({});
class OtherInfo extends Component {
  state = {
    settlingLocationError: '',
    settlingDurationError: '',
    joiningReasonError: '',
  }

  validate = () => {
    const { settlingLocation, joiningReason } = this.props;
    let isError = false;
    const errors = {
      settlingLocationError: '',
      joiningReasonError: '',
    };

    if (validator.isEmpty(settlingLocation)) {
      errors.settlingLocationError = 'Settling location is required';
      isError = true;
    }

    if (validator.isEmpty(joiningReason)) {
      errors.joiningReasonError = 'Joining reason is required';
      isError = true;
    }

    this.setState(prevState => ({
      ...prevState,
      ...errors,
    }));

    return isError;
  }

  render() {
    const {
      handleChange, handleAutoSuggestChange, settlingLocation, settlingDuration,
      joiningReason,
    } = this.props;
    const {
      settlingLocationError, settlingDurationError, joiningReasonError,
    } = this.state;

    return (
      <React.Fragment>
        <Typography variant="title" gutterBottom> Other Information </Typography>
        <Grid container spacing={24}>
          <Grid item xs={12} sm={6}>
            <SettlingLocation
              settlingLocation={settlingLocation}
              settlingLocationError={settlingLocationError}
              handleAutoSuggestChange={handleAutoSuggestChange('settlingLocation')}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <SettlingDuration
              settlingDuration={settlingDuration}
              settlingDurationError={settlingDurationError}
              handleChange={handleChange}
            />
          </Grid>
          <Grid item xs={12}>
            <JoiningReason
              joiningReason={joiningReason}
              joiningReasonError={joiningReasonError}
              handleChange={handleChange}
            />
          </Grid>
        </Grid>
      </React.Fragment>
    );
  }
}

OtherInfo.propTypes = {
  classes: PropTypes.shape({}).isRequired,
  handleChange: PropTypes.func.isRequired,
  handleAutoSuggestChange: PropTypes.func.isRequired,
  settlingLocation: PropTypes.string.isRequired,
  settlingDuration: PropTypes.string.isRequired,
  joiningReason: PropTypes.string.isRequired,
};

export default withStyles(styles)(OtherInfo);
