import React from 'react';
import FormComponent from '../FormComponent';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormLabel from '@material-ui/core/FormLabel';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import DeleteIcon from '@material-ui/icons/Delete';
import InputAdornment from '@material-ui/core/InputAdornment';

const jobStatus = [
  { value: 'fulltime', label: 'Full Time' },
  { value: 'parttime', label: 'Part Time' },
  { value: 'unemployed', label: 'Unemployed' },
  { value: 'student', label: 'Student' }
]

const lookingForJob = [
  { value: 'true', label: 'Yes' },
  { value: 'false', label: 'No' },
]

const styles = theme => ({
  container: {
    position: 'relative',
  },
  suggestionsContainerOpen: {
    position: 'absolute',
    zIndex: 1,
    marginTop: theme.spacing.unit,
    left: 0,
    right: 0,
  },
  suggestion: {
    display: 'block',
  },
  suggestionsList: {
    margin: 0,
    padding: 0,
    listStyleType: 'none',
  },
  row: {
    display: 'inline-block'
  },
  button: {
    margin: theme.spacing.unit,
  },
  group: {
    flexDirection: 'row'
  },
  formControl: {
    textAlign: 'left'
  }
});
class EmploymentInfo extends FormComponent {
  state = {
    jobStatus: '',
    lookingForJob: '',
    currentIncome: '', //optional
    workExperience: [], //optional
  }

  handleAddWork = () => {
    this.setState({
      workExperience: this.state.workExperience.concat([{ title: '', company: '', years: '' }]),
    });
  }

  handleRemoveWork = (index) => {
    this.setState({
      workExperience: this.state.workExperience.filter((s, _index) => _index !== index),
    });
  }

  handleEditWork= (index) => (event) => {
    this.setState({
      workExperience: this.state.workExperience.map((s, _index) => {
        if (_index !== index) return s;
        return { ...s, [event.target.name]: event.target.value };
      }),
    });
  }

  render() {
    const { classes } = this.props;

    return (
      <React.Fragment>
      <Typography variant="title" gutterBottom>
        Employment Information
      </Typography>
      <Grid container spacing={24}>
        <Grid item xs={12} sm={4}>
          <TextField
            name="jobStatus"
            select
            label="Job Status"
            value={this.state.jobStatus}
            onChange={event => this.handleChange(event)}
            helperText="Please select a job status"
            fullWidth
          >
            {jobStatus.map(option => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
        </Grid>
        <Grid item xs={12} sm={4}>
          <TextField 
              name="currentIncome"
              label="Current Income (Optional)"
              value={this.state.currentIncome}
              onChange={ event => this.handleChange(event)}
              fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <FormControl component="fieldset" fullWidth className={classes.formControl}>
            <FormLabel component="legend">Looking for a job?</FormLabel>
            <RadioGroup
              aria-label="Looking for a job?"
              id="lookingForJob"
              name="lookingForJob"
              className={classes.group}
              value={this.state.lookingForJob}
              onChange={ event => this.handleChange(event) }
            >
              {lookingForJob.map(option => (
                <FormControlLabel key={option.value} value={option.value} control={<Radio />} label={option.label}>
                  {option.label}
                </FormControlLabel>
              ))}
            </RadioGroup>
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="subheading" gutterBottom className={classes.row}>
          Add work experience
          </Typography>
          <Button variant="fab" mini color="secondary" 
                  aria-label="Add" 
                  onClick={this.handleAddWork}
                  className={classes.button}>
            <AddIcon />
          </Button>
        </Grid>
        {this.state.workExperience.map((work, index) => (
          <React.Fragment key={index}>
          <Grid container spacing={24} item xs={12} sm={11}>
            <Grid item xs={12} sm={4}>
              <TextField 
                id="title"
                name="title"
                label="Title"
                value={work.title}
                onChange={this.handleEditWork(index)}
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField 
                id="company"
                name="company"
                label="Company"
                value={work.company}
                onChange={this.handleEditWork(index)}
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField 
                id="years"
                name="years"
                label="years"
                value={work.years}
                onChange={this.handleEditWork(index)}
                fullWidth
                InputProps={{
                  endAdornment: <InputAdornment position="end">years</InputAdornment>
                }}
              />
            </Grid>
          </Grid>
          <Grid item xs={12} sm={1}>
          <Button variant="fab" mini aria-label="Delete" 
                  onClick={(event) => this.handleRemoveWork(index, event)}
                  className={classes.button}>
            <DeleteIcon />
          </Button>
          </Grid>
          </React.Fragment>
          ))}
      </Grid>    
      </React.Fragment>
    );
  }
}

EmploymentInfo.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(EmploymentInfo);
