import React, { Component } from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import validator from 'validator';
import axios from 'axios';
import Clearfix from "components/Clearfix/Clearfix.jsx";
import moment from 'moment'
import FormData from 'form-data';
import { injectIntl, intlShape, FormattedMessage } from 'react-intl';

// core components
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import CustomInput from "components/CustomInput/CustomInput.jsx";
import Button from "components/CustomButtons/Button.jsx";
import Card from "components/Card/Card.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardText from "components/Card/CardText.jsx";
import CardBody from "components/Card/CardBody.jsx";

import extendedFormsStyle from "assets/jss/material-dashboard-pro-react/views/extendedFormsStyle.jsx";
import regularFormsStyle from "assets/jss/material-dashboard-pro-react/views/regularFormsStyle";

import qs from 'qs';

const styles = theme => ({
  ...extendedFormsStyle,
  ...regularFormsStyle,
  container: {
    position: 'relative',
  },
  formControl: {
    textAlign: 'left',
  },
  select: {
    textAlign: 'left',
  },
});

class BugForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      bugName: '',
      description: '',
      displaySuccessMessage: false,

      // Errors
      bugNameError: '',
      descriptionError: '',

      // DB response
      messageFromServer: '',
    };
    this.handleChange = this.handleChange.bind(this);
  }

  validate = () => {
    const { intl } = this.props;
    const {
      bugName, description, displaySuccessMessage
    } = this.state;

    let isError = false;
    const errors = {
      bugNameError: '',
      descriptionError: ''
    };

    if (validator.isEmpty(bugName)) {
      errors.bugNameError = `${intl.formatMessage({ id: 'form.title' })}  ${intl.formatMessage({ id: 'isrequired' })}`;
      isError = true;
    }

    if (validator.isEmpty(description)) {
      errors.descriptionError = `${intl.formatMessage({ id: 'form.description' })}  ${intl.formatMessage({ id: 'isrequired' })}`;
      isError = true;
    } else if (!validator.isLength(description, { min: 10 })) {
      errors.descriptionError = `${intl.formatMessage({ id: 'form.description' })}  ${intl.formatMessage({ id: 'form.min.char.10' })}`;
      isError = true;
    }

    this.setState(prevState => ({
      ...prevState,
      ...errors,
    }));

    return isError;
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  handleMoment = (fieldName, momentObj, formatType) => {
    if (momentObj !== moment.isMoment()) {
      momentObj = moment(momentObj);
    }
    this.setState({
      [fieldName]: momentObj.format(formatType),
    });
  }

  handleSubmit = () => {
    const error = this.validate();
    if (!error) {
      this.createBug();
    }
  };

  // Send bug data in post body to add to mongodb
  createBug = () => {
    const {
      bugName, description
    } = this.state;

    const formData = new FormData();
    formData.append('bugDetails', qs.stringify({
      bugName,
      description
    }));

    axios.post('/api/bugs/', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    }).then((response) => {
      if (response.status === 200) {
        this.setState({
          messageFromServer: response.data,
        });
      }
    }).catch((error) => {
      this.setState({
        messageFromServer: error.response.data,
      });
    });
  }

  render() {
    const {
      bugName, description, displaySuccessMessage, bugNameError, descriptionError,
      messageFromServer, editMode
    } = this.state;
    const { classes } = this.props;
    return (
      <React.Fragment>
        <div className={classes.mainContainer}>
          {messageFromServer.split('\n').map((item, key) => (
            <span key={key}>
              {item}
              <br />
            </span>
          ))}
          <GridItem xs={12} sm={12} md={12}>
            <Card>
              <CardHeader color="success" text>
                <CardText color="success">
                  <h4><FormattedMessage id="report.bug" /></h4>
                </CardText>
              </CardHeader>
              <CardBody>
                <form>
                  <GridContainer>
                    <GridItem xs={12} sm={12} md={12}>
                      <CustomInput
                        className={classes.input}
                        labelText={<FormattedMessage id="form.title" />}
                        formControlProps={{
                          fullWidth: true
                        }}
                        inputProps={{
                          id: "bugName",
                          name: "bugName",
                          value: bugName,
                          onChange: event => this.handleChange(event),
                        }}
                        fullWidth
                        helperText={bugNameError}
                        error={bugNameError.length > 0}
                      />
                    </GridItem>
                    <GridItem xs={12} sm={12} md={12}>
                      <CustomInput
                        labelText={<FormattedMessage id="form.description" />}
                        formControlProps={{
                          fullWidth: true
                        }}
                        inputProps={{
                          multiline: true,
                          rows: 5,
                          name: "description",
                          id: "description",
                          onChange: event => this.handleChange(event),
                          error: descriptionError.length > 0
                        }}
                        value={description}
                        helperText={descriptionError}
                        error={descriptionError.length > 0}
                      />
                    </GridItem>
                  </GridContainer>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={(event) => this.handleSubmit(event)}
                    className={classes.button}
                  >
                    <FormattedMessage id="report" />
                  </Button>
                  <br/>
                  { displaySuccessMessage &&
                    <FormattedMessage id="congrats.reported.bug" />
                  }
                  <Clearfix />
                </form>
              </CardBody>
            </Card>
          </GridItem>
        </div>
      </React.Fragment>
    );
  }
}

BugForm.propTypes = {
  classes: PropTypes.shape({}).isRequired,
  intl: intlShape.isRequired,
};

export default withStyles(styles)(injectIntl(BugForm));