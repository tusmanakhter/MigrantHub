import React, { Component } from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import validator from 'validator';
import axios from 'axios';
import Clearfix from "components/Clearfix/Clearfix.jsx";
import { handleChange } from 'helpers/Forms';
import FormValidator from 'forms/FormValidator';
import Validations from 'forms/Validations';
import { injectIntl, intlShape, FormattedMessage } from 'react-intl';
import { toast } from 'react-toastify';
import { Redirect } from 'react-router-dom';

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
    this.validator = new FormValidator(Validations.createBug);
    this.state = {
      user: '',
      title: '',
      description: '',
      success: false,
      validation: this.validator.valid()
    };
    this.handleChange = handleChange.bind(this);
  }

  validate = () => {
    const validation = this.validator.validate(this.state);
    this.setState({ validation });
    return validation.isValid;
  }

  handleSubmit = () => {
    const isValid = this.validate();
    if (isValid) {
      this.createBug();
    }
  };

  // Send bug data in post body to add to mongodb
  createBug = () => {
    const {
      user, title, description, success
    } = this.state;
    
    const formData = {
      user: user,
      bugName: title,
      description: description
    };

    axios.post('/api/bugs/', formData).then((response) => {
      if (response.status === 200) {
        toast.success(response.data);
        this.setState({ success: true });
      }
    }).catch((error) => {
      toast.error(error.response.data)
    });
  }

  render() {
    const {
      title, description, validation, success
    } = this.state;
    const { classes } = this.props;
    return (
      <React.Fragment>
        {success && <Redirect to="/main" />}
        <div className={classes.mainContainer}>
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
                          id: "title",
                          name: "title",
                          value: title,
                          onChange: event => this.handleChange(event),
                        }}
                        fullWidth
                        helperText={validation.title.message}
                        error={validation.title.message.length > 0}
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
                        }}
                        value={description}
                        helperText={validation.description.message}
                        error={validation.description.message.length > 0}
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