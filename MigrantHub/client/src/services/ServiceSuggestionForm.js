import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';
import validator from 'validator';
import axios from 'axios';
import { Redirect } from 'react-router-dom';
import qs from 'qs';
import Header from '../components/Header/Header';
import { serviceCategories } from '../lib/ServiceCategories';

const styles = theme => ({
  container: {
    position: 'relative',
  },
  row: {
    display: 'inline-block',
  },
  button: {
    margin: theme.spacing.unit,
  },
  group: {
    flexDirection: 'row',
  },
  formControl: {
    textAlign: 'left',
  },
  select: {
    textAlign: 'left',
  },
  paper: {
    width: '100%',
    marginTop: theme.spacing.unit,
    marginBottom: theme.spacing.unit,
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
    paddingLeft: theme.spacing.unit * 2,
    [theme.breakpoints.up(600 + theme.spacing.unit * 3 * 2)]: {
      marginTop: theme.spacing.unit,
      marginBottom: theme.spacing.unit,
      paddingTop: theme.spacing.unit * 3,
      paddingBottom: theme.spacing.unit * 3,
      paddingLeft: theme.spacing.unit * 3,
    },
    layout: {
      marginLeft: theme.spacing.unit,
      marginRight: theme.spacing.unit,
    },
  },
  timeContainer: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 200,
  },
  rightIcon: {
    marginLeft: theme.spacing.unit,
  },
  img: {
    width: 400,
    length: 300,

  },
});
class ServiceSuggestionForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      serviceTitleError: '',
      serviceSummaryError: '',
      categoryError: '',
      subcategoryError: '',
      serviceTitle: '',
      serviceSummary: '',
      category: '',
      subcategory: '',
      subcategoriesArray: [],
      // Server response
      messageFromServer: '',
      redirectToAllServices: false,
    };

    const { location } = this.props;
    if (location.state) {
      this.getData = this.getData.bind(this);
    }
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  handleCategoryChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
      subcategoriesArray: [],
      subcategory: '',
    });

    this.handleSubCategoryChange(event.target.value);
  }

  handleSubCategoryChange = (value) => {
    const tempArray = serviceCategories.find(x => x.value === value).SubCategories;

    if (tempArray) {
      this.setState({
        subcategoriesArray: tempArray,
      });
    }
  }

  handleSubmit = () => {
    const error = this.validate();
    if (!error) {
      this.createSuggestion();
    }
  };

  renderRedirectToAllServices = () => {
    const { redirectToAllServices } = this.state;
    if (redirectToAllServices) {
      return <Redirect to="/services" />;
    }
  }

  validate = () => {
    let isError = false;

    const {
      serviceTitle, serviceSummary, category, subcategory, subcategoriesArray,
    } = this.state;

    const errors = {
      serviceTitleError: '',
      serviceSummaryError: '',
      categoryError: '',
      subcategoryError: '',
    };

    if (validator.isEmpty(serviceTitle)) {
      errors.serviceTitleError = 'Title is required';
      isError = true;
    }

    if (validator.isEmpty(serviceSummary)) {
      errors.serviceSummaryError = 'Service summary is required';
      isError = true;
    }

    if (validator.isEmpty(category)) {
      errors.categoryError = 'Service category is required';
      isError = true;
    }

    if (subcategoriesArray.length > 0) {
      if (validator.isEmpty(subcategory)) {
        errors.subcategoryError = 'Service sub-category is required';
        isError = true;
      }
    }

    this.setState(prevState => ({
      ...prevState,
      ...errors,
    }));

    return isError;
  }

  createSuggestion = () => {
    const {
      serviceTitle, serviceSummary, category, subcategory,
    } = this.state;

    axios.post('/api/services/suggestions/',
      qs.stringify({
        serviceTitle,
        serviceSummary,
        category,
        subcategory,
      })).then((response) => {
      if (response.status === 200) {
        this.setState({
          redirectToAllServices: true,
        });
      }
    }).catch((error) => {
      this.setState({
        messageFromServer: error.response.data,
      });
    });
  }

  render() {
    const { classes } = this.props;
    const {
      serviceTitle, serviceSummary, category, subcategory,
      serviceTitleError, serviceSummaryError, categoryError, subcategoryError,
      messageFromServer, subcategoriesArray,
    } = this.state;

    return (
      <React.Fragment>
        {messageFromServer}
        {this.renderRedirectToAllServices()}
        <Typography variant="title" gutterBottom> Add Suggestion </Typography>
        <Grid container spacing={24}>
          <Grid item xs={12}>
            <TextField
              id="serviceTitle"
              name="serviceTitle"
              label="Service Title"
              value={serviceTitle}
              onChange={event => this.handleChange(event)}
              fullWidth
              helperText={serviceTitleError}
              error={serviceTitleError.length > 0}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              id="serviceSummary"
              name="serviceSummary"
              label="Service Summary"
              value={serviceSummary}
              onChange={event => this.handleChange(event)}
              fullWidth
              helperText={serviceSummaryError}
              error={serviceSummaryError.length > 0}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              name="category"
              select
              label="Category"
              value={category}
              onChange={event => this.handleCategoryChange(event)}
              className={classes.select}
              fullWidth
              helperText={categoryError}
              error={categoryError.length > 0}
            >
              {serviceCategories.map(option => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              name="subcategory"
              select
              label="SubCategory"
              value={subcategory}
              onChange={event => this.handleChange(event)}
              className={classes.select}
              fullWidth
              helperText={subcategoryError}
              error={subcategoryError.length > 0}
            >
              {subcategoriesArray.map(option => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
          <Button
            variant="contained"
            color="primary"
            onClick={this.handleSubmit}
            className={classes.button}
          >
            Create
          </Button>
        </Grid>
      </React.Fragment>
    );
  }
}

ServiceSuggestionForm.propTypes = {
  classes: PropTypes.shape({}).isRequired,
  location: PropTypes.shape({}).isRequired,
};

export default withStyles(styles)(ServiceSuggestionForm);
