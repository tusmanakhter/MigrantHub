import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import DeleteIcon from '@material-ui/icons/Delete';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormLabel from '@material-ui/core/FormLabel';
import InputAdornment from '@material-ui/core/InputAdornment';

const gender = [
  { value: 'male', label: 'Male' },
  { value: 'female', label: 'Female' },
  { value: 'other', label: 'Other' },
];

const relations = [
  { value: 'daughter', label: 'Daughter' },
  { value: 'son', label: 'Son' },
  { value: 'mother', label: 'Mother' },
  { value: 'father', label: 'Father' },
  { value: 'brother', label: 'Brother' },
  { value: 'sister', label: 'Sister' },
]

const relationshipStatus = [
  { value: 'married', label: 'Married' },
  { value: 'single', label: 'Single' },
  { value: 'divorced', label: 'Divorced' },
  { value: 'widowed', label: 'Widowed' },
]

const familyObject = { age: '', gender: '', relation: '', relationshipStatus: '' };

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
class FamilyInfo extends Component {
  render() {
    const { classes } = this.props;

    const handleAddObject= this.props.handleAddObject;
    const handleRemoveObject= this.props.handleRemoveObject;
    const handleEditObject= this.props.handleEditObject;
    const family = this.props.family;

    return (
      <React.Fragment>
      <Typography variant="title" gutterBottom>
        Family Information
      </Typography>
      <Grid container spacing={24}>
        <Grid item xs={12}>
          <Typography variant="subheading" gutterBottom className={classes.row}>
          Add family member
          </Typography>
          <Button variant="fab" mini color="secondary" 
                  aria-label="Add" 
                  onClick={event => handleAddObject("family", familyObject)}
                  className={classes.button}>
            <AddIcon />
          </Button>
        </Grid>
        {family.map((member, index) => (
          <React.Fragment key={index}>
          <Grid container spacing={24} item xs={12} sm={11}>
            <Grid item xs={12} sm={2}>
              <TextField 
                id="age"
                name="age"
                label="Age"
                value={member.age}
                onChange={handleEditObject("family", index)}
                fullWidth
                InputProps={{
                  endAdornment: <InputAdornment position="end">years</InputAdornment>
                }}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <FormControl component="fieldset" fullWidth className={classes.formControl}>
                <FormLabel component="legend">Gender</FormLabel>
                <RadioGroup
                  aria-label="Gender"
                  id="gender"
                  name="gender"
                  className={classes.group}
                  value={member.gender}
                  onChange={handleEditObject("family", index)}
                >
                  {gender.map(option => (
                    <FormControlLabel key={option.value} value={option.value} control={<Radio />} label={option.label}>
                      {option.label}
                    </FormControlLabel>
                  ))}
                </RadioGroup>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={3}>
              <TextField
                id="relationshipStatus"
                name="relationshipStatus"
                select
                label="Relationship Status"
                value={member.relationshipStatus}
                onChange={handleEditObject("family", index)}
                helperText="Please select a relationship status"
                fullWidth
              >
                {relationshipStatus.map(option => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={12} sm={3}>
              <TextField
                id="relation"
                name="relation"
                select
                label="Relation to you"
                value={member.relation}
                onChange={handleEditObject("family", index)}
                helperText="Please select a relation"
                fullWidth
              >
                {relations.map(option => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
          </Grid>
          <Grid item xs={12} sm={1}>
          <Button variant="fab" mini aria-label="Delete" 
                  onClick={(event) => handleRemoveObject("family", index, event)}
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

FamilyInfo.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(FamilyInfo);
