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
import FormHelperText from '@material-ui/core/FormHelperText';
import Paper from '@material-ui/core/Paper';
import validator from 'validator';
import { objectErrorText } from '../../helpers/Object';
import { genders, relations, relationshipStatuses, familyObject } from '../../lib/SignUpConstants';

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
});
class FamilyInfo extends Component {
  constructor(props) {
    super(props);
    this.objectErrorText = objectErrorText.bind(this);
  }

  state = {
    familyError: [],
  }

  validate = () => {
    const { family } = this.props;
    let isError = false;
    const errors = {
      familyError: [],
    };

    family.forEach((member, index) => {
      errors.familyError = errors.familyError.concat([JSON.parse(JSON.stringify(familyObject))]);

      if (validator.isEmpty(member.age)) {
        errors.familyError[index].age = 'Age is required';
        isError = true;
      }

      if (validator.isEmpty(member.gender)) {
        errors.familyError[index].gender = 'Gender is required';
        isError = true;
      }

      if (validator.isEmpty(member.relationshipStatus)) {
        errors.familyError[index].relationshipStatus = 'Relationship status is required';
        isError = true;
      }

      if (validator.isEmpty(member.relation)) {
        errors.familyError[index].relation = 'Relation is required';
        isError = true;
      }
    });

    this.setState(prevState => ({
      ...prevState,
      ...errors,
    }));

    return isError;
  }

  render() {
    const {
      classes, handleAddObject, handleRemoveObject, handleEditObject, family,
    } = this.props;

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
            <Button
              variant="fab"
              mini
              color="secondary"
              aria-label="Add"
              onClick={event => handleAddObject('family', familyObject)}
              className={classes.button}
            >
              <AddIcon />
            </Button>
          </Grid>
          {family.map((member, index) => (
            <React.Fragment key={index}>
              <Paper className={classes.paper}>
                <Typography variant="subheading" align="left" gutterBottom>
                          Member
                  {' '}
                  {index + 1}
                </Typography>
                <Grid justify="center" alignItems="center" container item xs>
                  <Grid container spacing={24} item xs={11}>
                    <Grid item xs={12} sm={4}>
                      <TextField
                        id="age"
                        name="age"
                        label="Age"
                        value={member.age}
                        type="number"
                        onChange={handleEditObject('family', index)}
                        helperText={this.objectErrorText('familyError', index, 'age')}
                        error={this.objectErrorText('familyError', index, 'age').length > 0}
                        fullWidth
                        InputProps={{
                          endAdornment: <InputAdornment position="end">years</InputAdornment>,
                        }}
                      />
                    </Grid>
                    <Grid item xs={12} sm={4}>
                      <TextField
                        id="relationshipStatus"
                        name="relationshipStatus"
                        select
                        label="Relationship Status"
                        value={member.relationshipStatus}
                        onChange={handleEditObject('family', index)}
                        className={classes.select}
                        helperText={this.objectErrorText('familyError', index, 'relationshipStatus')}
                        error={this.objectErrorText('familyError', index, 'relationshipStatus').length > 0}
                        fullWidth
                      >
                        {relationshipStatuses.map(option => (
                          <MenuItem key={option.value} value={option.value}>
                            {option.label}
                          </MenuItem>
                        ))}
                      </TextField>
                    </Grid>
                    <Grid item xs={12} sm={4}>
                      <TextField
                        id="relation"
                        name="relation"
                        select
                        label="Relation to you"
                        value={member.relation}
                        onChange={handleEditObject('family', index)}
                        className={classes.select}
                        helperText={this.objectErrorText('familyError', index, 'relation')}
                        error={this.objectErrorText('familyError', index, 'relation').length > 0}
                        fullWidth
                      >
                        {relations.map(option => (
                          <MenuItem key={option.value} value={option.value}>
                            {option.label}
                          </MenuItem>
                        ))}
                      </TextField>
                    </Grid>
                    <Grid item xs={12}>
                      <FormControl component="fieldset" fullWidth className={classes.formControl}>
                        <FormLabel
                          component="legend"
                          error={this.objectErrorText('familyError', index, 'gender').length > 0}
                        >
Gender
                        </FormLabel>
                        <RadioGroup
                          aria-label="Gender"
                          id="gender"
                          name="gender"
                          className={classes.group}
                          value={member.gender}
                          onChange={handleEditObject('family', index)}
                        >
                          {genders.map(option => (
                            <FormControlLabel key={option.value} value={option.value} control={<Radio />} label={option.label}>
                              {option.label}
                            </FormControlLabel>
                          ))}
                        </RadioGroup>
                        <FormHelperText
                          error={this.objectErrorText('familyError', index, 'gender').length > 0}
                        >
                          {this.objectErrorText('familyError', index, 'gender')}
                        </FormHelperText>
                      </FormControl>
                    </Grid>
                  </Grid>
                  <Grid item xs={1}>
                    <Button
                      variant="fab"
                      mini
                      aria-label="Delete"
                      onClick={event => handleRemoveObject('family', index, event)}
                      className={classes.button}
                    >
                      <DeleteIcon />
                    </Button>
                  </Grid>
                </Grid>
              </Paper>
            </React.Fragment>
          ))}
        </Grid>
      </React.Fragment>
    );
  }
}

FamilyInfo.propTypes = {
  classes: PropTypes.shape({}).isRequired,
  handleAddObject: PropTypes.func.isRequired,
  handleRemoveObject: PropTypes.func.isRequired,
  handleEditObject: PropTypes.func.isRequired,
  family: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
};

export default withStyles(styles)(FamilyInfo);
