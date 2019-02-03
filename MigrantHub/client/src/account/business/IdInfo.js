import React, { Component } from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import validator from 'validator';
import CircularProgress from '@material-ui/core/CircularProgress';
import IdApi from 'account/business/IdApi';
import { injectIntl, intlShape, FormattedMessage } from 'react-intl';

const styles = ({});

class IdInfo extends Component {
  state = {
    corpIdError: '',
    loading: false,
  }

  validate = async () => {
    const { corpId, intl } = this.props;

    let isError = false;
    const errors = {
      corpIdError: '',
    };

    if (validator.isEmpty(corpId)) {
      errors.corpIdError = `${intl.formatMessage({ id: 'business.corpId' })}  ${intl.formatMessage({ id: 'isrequired' })}`;
      isError = true;
    } else if (!validator.isNumeric(corpId)) {
      errors.corpIdError = intl.formatMessage({ id: 'corpid.validation.length' });
      isError = true;
    } else {
      this.setState({ loading: true });
      const validId = await IdApi.checkCorpId(corpId);
      this.setState({ loading: false });
      if (!validId) {
        errors.corpIdError = `${intl.formatMessage({ id: 'business.corpId' })}  ${intl.formatMessage({ id: 'notvalid' })}`;
        isError = true;
      }
    }

    this.setState({
      ...errors,
    });

    return isError;
  }

  render() {
    const { corpId, handleChange } = this.props;
    const { corpIdError, loading } = this.state;

    return (
      <React.Fragment>
        <Typography variant="title" gutterBottom>
          <FormattedMessage id="business.corpVerification" />
        </Typography>
        <i>
          <small>
            <FormattedMessage id="business.corpIdDesc" />
          </small>
        </i>
        <Grid container spacing={24}>
          <Grid item xs={12}>
            <TextField
              id="corpId"
              name="corpId"
              label={<FormattedMessage id="business.corpIdEx" />}
              value={corpId}
              onChange={event => handleChange(event)}
              fullWidth
              helperText={corpIdError}
              error={corpIdError.length > 0}
            />
          </Grid>
        </Grid>
        {loading ? (
          <div>
            <br />
            <CircularProgress />
            <br />
            <p><FormattedMessage id="business.corpIdLoading" /></p>
          </div>
        ) : ''
        }
      </React.Fragment>
    );
  }
}

IdInfo.propTypes = {
  classes: PropTypes.shape({}).isRequired,
  handleChange: PropTypes.func.isRequired,
  corpId: PropTypes.number.isRequired,
  intl: intlShape.isRequired,
};

export default withStyles(styles)(injectIntl(IdInfo, { withRef: true }));
