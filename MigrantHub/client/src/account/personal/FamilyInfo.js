import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import DeleteIcon from '@material-ui/icons/Delete';
import Paper from '@material-ui/core/Paper';
import validator from 'validator';
import { objectErrorText } from '../../helpers/Object';
import { familyObject } from '../../lib/SignUpConstants';
import Age from '../../components/fields/personal/Age';
import RelationshipStatus from '../../components/fields/personal/RelationshipStatus';
import Relation from '../../components/fields/family/Relation';
import Gender from '../../components/fields/personal/Gender';

const styles = theme => ({
  row: {
    display: 'inline-block',
  },
  button: {
    margin: theme.spacing.unit,
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
        <Typography variant="title" gutterBottom> Family Information </Typography>
        <Grid container spacing={24}>
          <Grid item xs={12}>
            <Typography variant="subheading" gutterBottom className={classes.row}> Add family member </Typography>
            <Button
              variant="fab"
              mini
              color="secondary"
              aria-label="Add"
              onClick={() => handleAddObject('family', familyObject)}
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
                      <Age
                        age={member.age}
                        ageError={this.objectErrorText('familyError', index, 'age')}
                        handleChange={handleEditObject('family', index)}
                      />
                    </Grid>
                    <Grid item xs={12} sm={4}>
                      <RelationshipStatus
                        relationshipStatus={member.relationshipStatus}
                        relationshipStatusError={this.objectErrorText('familyError', index, 'relationshipStatus')}
                        handleChange={handleEditObject('family', index)}
                      />
                    </Grid>
                    <Grid item xs={12} sm={4}>
                      <Relation
                        relation={member.relation}
                        relationError={this.objectErrorText('familyError', index, 'relation')}
                        handleChange={handleEditObject('family', index)}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <Gender
                        gender={member.gender}
                        genderError={this.objectErrorText('familyError', index, 'gender')}
                        handleChange={handleEditObject('family', index)}
                      />
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
